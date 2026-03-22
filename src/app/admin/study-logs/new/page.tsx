import { StudyLogEditor } from "@/components/study-log-editor";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { listManagedStudyLogTags } from "@/lib/study-log-tag-service";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export default async function NewStudyLogPage() {
  const availableTags = await listManagedStudyLogTags(
    createSupabaseStudyLogRepository(createSupabaseAdminClient()),
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">新建日志</p>
        <h2 className="font-heading text-4xl font-semibold tracking-tight">创建一篇学习日志</h2>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          保存后会直接写入数据库；是否公开由下方开关控制，后续也可以在列表页继续切换。
        </p>
      </div>
      <StudyLogEditor availableTags={availableTags} mode="create" />
    </div>
  );
}
