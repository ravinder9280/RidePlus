// lib/withRateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { auth } from "@clerk/nextjs/server";

type Options = {
  scope: string; // keeps budgets separate per endpoint
  points: number; // tokens per window
  window: `${number} ${"s" | "m" | "h" | "d"}`; // e.g., "1 m", "10 s"
  kind?: "sliding" | "fixed"; // default sliding (nicer UX)
};

const redis = Redis.fromEnv();

function makeLimiter(opts: Options) {
  return new Ratelimit({
    redis,
    limiter:
      opts.kind === "fixed"
        ? Ratelimit.fixedWindow(opts.points, opts.window)
        : Ratelimit.slidingWindow(opts.points, opts.window),
    prefix: "rl",
  });
}

// Derive a stable key: Clerk userId if present, else client IP
async function rateKey(req: Request, scope: string) {
  const { userId } = await auth();
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  return userId ? `u:${userId}:${scope}` : `ip:${ip}:${scope}`;
}

/** Wrap a Route Handler to enforce rate limit + set headers for you */
export function withRateLimit<
  T extends (req: Request, ctx?: any) => Promise<Response>,
>(opts: Options, handler: T) {
  const limiter = makeLimiter(opts);

  return async (req: Parameters<T>[0], ...rest: any[]): Promise<Response> => {
    const key = await rateKey(req, opts.scope);
    const { success, limit, remaining, reset } = await limiter.limit(key);

    // Always prepare RL headers
    const rlHeaders = new Headers({
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
    });

    if (!success) {
      const retry = Math.max(0, Math.ceil((reset - Date.now()) / 1000));
      rlHeaders.set("Retry-After", String(retry));
      return new Response(
        JSON.stringify({
          ok: false,
          error: `Too Many Requests Retry after ${retry} sec`,
        }),
        {
          status: 429,
          headers: mergeHeaders(rlHeaders, {
            "Content-Type": "application/json",
          }),
        },
      );
    }

    // Call your real handler
    const res = await handler(req, ...rest);

    // Merge RL headers into the outgoing response (preserve existing)
    const merged = new Headers(res.headers);
    rlHeaders.forEach((v, k) => merged.set(k, v));

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: merged,
    });
  };
}

function mergeHeaders(base: Headers, extra: Record<string, string>) {
  const h = new Headers(base);
  for (const [k, v] of Object.entries(extra)) h.set(k, v);
  return h;
}
