import { NextResponse } from "next/server";

import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { AppError, getErrorMessage } from "@/lib/app-error";
import { getSessionContext } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { deleteStudyLog, updateStudyLog } from "@/lib/study-log-service";

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await context.params;
    const session = await getSessionContext();
    const body = await request.json();
    const log = await updateStudyLog({
      actor: session.user,
      id,
      rawInput: body,
      repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
    });

    return NextResponse.json({
      data: log,
      message: "Study log updated.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "Unable to update this study log.") },
      { status: error instanceof AppError ? error.statusCode : 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await context.params;
    const session = await getSessionContext();
    await deleteStudyLog({
      actor: session.user,
      id,
      repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
    });

    return NextResponse.json({
      message: "Study log deleted.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "Unable to delete this study log.") },
      { status: error instanceof AppError ? error.statusCode : 500 },
    );
  }
}
