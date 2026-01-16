import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

export function supabaseClient(getToken: any) {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({
            template: "supabase",
          });

          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    },
  );
}
