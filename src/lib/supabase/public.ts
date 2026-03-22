import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/db/database.types";
import { assertSupabaseConfigured, env } from "@/lib/env";

export function createSupabasePublicClient() {
  assertSupabaseConfigured();

  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
