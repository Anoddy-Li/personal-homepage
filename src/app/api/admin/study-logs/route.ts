import { NextResponse } from "next/server";

import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { getErrorMessage, AppError } from "@/lib/app-error";
import { getSessionContext } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createStudyLog } from "@/lib/study-log-service";

export async function POST(request: Request) {
  try {
    const session = await getSessionContext();
    const body = await request.json();
    const log = await createStudyLog({
      actor: session.user,
      rawInput: body,
      repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
    });

    return NextResponse.json(
      {
        data: log,
        message: "Study log created.",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "Unable to create this study log.") },
      { status: error instanceof AppError ? error.statusCode : 500 },
    );
  }
}
