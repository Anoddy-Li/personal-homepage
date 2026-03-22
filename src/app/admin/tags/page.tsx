import { AdminTagManager } from "@/components/admin-tag-manager";
import { EmptyState } from "@/components/empty-state";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { listManagedStudyLogTagsWithUsage } from "@/lib/study-log-tag-service";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export default async function AdminTagsPage() {
  const tags = await listManagedStudyLogTagsWithUsage(
    createSupabaseStudyLogRepository(createSupabaseAdminClient()),
  );

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">标签管理</p>
        <h2 className="font-heading text-4xl font-semibold tracking-tight">统一维护学习日志标签</h2>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          这里维护的是数据库里的标签目录。修改标签名称会同步更新已关联日志；删除时会先检查是否仍被日志使用。
        </p>
      </div>
      {tags.length === 0 ? (
        <EmptyState
          title="还没有标签"
          description="先新建几个常用标签，之后在新增或编辑学习日志时就可以直接选择。"
        />
      ) : null}
      <AdminTagManager tags={tags} />
    </div>
  );
}
