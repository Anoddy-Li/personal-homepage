import { NextResponse } from "next/server";

import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { AppError, getErrorMessage } from "@/lib/app-error";
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
        message: "学习日志已创建。",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "创建学习日志失败。") },
      { status: error instanceof AppError ? error.statusCode : 500 },
    );
  }
}
