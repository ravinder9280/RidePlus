import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/how-it-works",
  "/safety",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/onboarding(.*)", // <- add this
  "/api/webhook/clerk(.*)", // allow webhooks
  "/api/healthz(.*)", // optional health check
  "/api/rides/search(.*)", // <-- make search public
  "/api/cron/cleanup", // <-- make search public
  "/api/chat",
  "/api/cron/(.*)", ///make vercel cron job public
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Skip protection for public routes
  if (isPublicRoute(req)) return;
  // Protect everything else
  const { sessionClaims, isAuthenticated, redirectToSignIn } = await auth();
  if (isAuthenticated && isOnboardingRoute(req)) {
    return NextResponse.next();
  }
  if (!isAuthenticated && !isPublicRoute(req))
    return redirectToSignIn({ returnBackUrl: req.url });

  if (isAuthenticated && !sessionClaims?.metadata?.onboarded) {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  if (isAuthenticated && !isPublicRoute(req)) return NextResponse.next();
});

export const config = {
  matcher: [
    // Run on all routes except Next internals & static assets
    "/((?!_next|.*\\.(?:js|css|png|jpg|jpeg|gif|svg|ico|txt|json|webmanifest|map)).*)",
    "/(api|trpc)(.*)",
  ],
};
