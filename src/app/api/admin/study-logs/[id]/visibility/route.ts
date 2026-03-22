import { NextResponse } from "next/server";

import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { AppError, getErrorMessage } from "@/lib/app-error";
import { getSessionContext } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { setStudyLogVisibility } from "@/lib/study-log-service";
import { studyLogVisibilitySchema } from "@/schemas/study-log";

export async function POST(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as unknown;
    const parsed = studyLogVisibilitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "可见性参数不合法。" },
        { status: 400 },
      );
    }

    const session = await getSessionContext();
    const log = await setStudyLogVisibility({
      actor: session.user,
      id,
      isPublic: parsed.data.isPublic,
      repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
    });

    return NextResponse.json({
      data: log,
      message: parsed.data.isPublic ? "学习日志已公开。" : "学习日志已转为草稿。",
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "更新可见性失败。") },
      { status: error instanceof AppError ? error.statusCode : 500 },
    );
  }
}
