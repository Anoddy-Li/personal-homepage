import { createClient } from "@supabase/supabase-js";
import slugify from "slugify";

import type { Database } from "../src/db/database.types";
import { getErrorMessage } from "../src/lib/app-error";
import { env, isSupabaseAdminConfigured } from "../src/lib/env";
import { parseStudyLogFormValues } from "../src/schemas/study-log";

async function main() {
  if (!isSupabaseAdminConfigured()) {
    throw new Error(
      "Missing Supabase admin configuration. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY first.",
    );
  }

  const supabase = createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  const entries = [
    {
      content: `## What I studied

- Reviewed kinematics notes
- Re-derived constant acceleration equations
- Wrote a short recap in my own words

## Reflection

The math felt more stable after I forced myself to explain why each term appears in the derivation instead of just memorizing the final formula.`,
      date: "2026-03-20",
      durationMinutes: "95",
      isPublic: true,
      mood: "Focused",
      summary: "Revisited constant acceleration from first principles and wrote a clearer summary.",
      tagsInput: "physics, mechanics, reflection",
      title: "Re-deriving constant acceleration formulas",
    },
    {
      content: `## What I studied

- Refactored a small Next.js form component
- Tightened validation rules with Zod
- Documented what still feels repetitive

## Reflection

Small interface decisions become easier once the data shape is strict. I want to keep that standard across future projects.`,
      date: "2026-03-21",
      durationMinutes: "75",
      isPublic: false,
      mood: "Steady",
      summary: "Worked on frontend form ergonomics and clarified validation boundaries.",
      tagsInput: "coding, typescript, zod",
      title: "Improving a form workflow with stricter validation",
    },
  ].map((entry) => {
    const parsed = parseStudyLogFormValues(entry);

    return {
      content: parsed.content,
      date: parsed.date,
      duration_minutes: parsed.durationMinutes,
      is_public: parsed.isPublic,
      mood: parsed.mood,
      slug: slugify(`${parsed.date} ${parsed.title}`, {
        lower: true,
        strict: true,
        trim: true,
      }),
      summary: parsed.summary,
      tags: parsed.tags,
      title: parsed.title,
    };
  });

  const { error } = await supabase.from("study_logs").upsert(entries, {
    onConflict: "slug",
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(`Seeded ${entries.length} study log entries.`);
}

main().catch((error) => {
  console.error(getErrorMessage(error, "Failed to seed study logs."));
  process.exitCode = 1;
});
