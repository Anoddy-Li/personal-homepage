import { NextResponse } from "next/server";

import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { AppError, getErrorMessage } from "@/lib/app-error";
import { getSessionContext } from "@/lib/auth";
import {
  createManagedStudyLogTag,
  deleteManagedStudyLogTag,
  renameManagedStudyLogTag,
} from "@/lib/study-log-tag-service";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const session = await getSessionContext();
    const body = await request.json();
    await createManagedStudyLogTag({
      actor: session.user,
      rawInput: body,
      repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
    });

    return NextResponse.json(
      {
        message: "标签已新增。",
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "新增标签失败。") },
      { status: error instanceof AppError ? error.statusCode : 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSessionContext();
    const body = await request.json();
    const result = await renameManagedStudyLogTag({
      actor: session.user,
      rawInput: body,
      repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
    });

    return NextResponse.json({
      data: result,
      message:
        result.affectedLogCount > 0
          ? `标签已更新，并同步修改了 ${result.affectedLogCount} 篇日志。`
          : "标签已更新。",
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "修改标签失败。") },
      { status: error instanceof AppError ? error.statusCode : 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSessionContext();
    const body = await request.json();
    await deleteManagedStudyLogTag({
      actor: session.user,
      rawInput: body,
      repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
    });

    return NextResponse.json({
      message: "标签已删除。",
    });
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, "删除标签失败。") },
      { status: error instanceof AppError ? error.statusCode : 500 },
    );
  }
}
