import { notFound } from "next/navigation";

import { StudyLogEditor } from "@/components/study-log-editor";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { AppError } from "@/lib/app-error";
import { getSessionContext } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStudyLogById } from "@/lib/study-log-service";

export default async function EditStudyLogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSessionContext();
  let log;

  try {
    log = await getStudyLogById({
      actor: session.user,
      id,
      repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
    });
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">编辑日志</p>
        <h2 className="font-heading text-4xl font-semibold tracking-tight">{log.title}</h2>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          这里修改的是数据库中的正式内容。保存后会立即生效，公开状态也会一起更新。
        </p>
      </div>
      <StudyLogEditor initialLog={log} mode="edit" />
    </div>
  );
}
