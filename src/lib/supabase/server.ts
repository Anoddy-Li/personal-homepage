import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/db/database.types";
import { assertSupabaseConfigured, env } from "@/lib/env";

export async function createSupabaseServerClient() {
  assertSupabaseConfigured();

  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, options, value }) => {
              cookieStore.set(name, value, options);
            });
          } catch {}
        },
      },
    },
  );
}
