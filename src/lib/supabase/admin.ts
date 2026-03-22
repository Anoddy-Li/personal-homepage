import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/db/database.types";
import { assertSupabaseAdminConfigured, env } from "@/lib/env";

export function createSupabaseAdminClient() {
  assertSupabaseAdminConfigured();

  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
