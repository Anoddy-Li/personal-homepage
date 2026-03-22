import { AdminStudyLogTable } from "@/components/admin-study-log-table";
import { EmptyState } from "@/components/empty-state";
import { StatusAlert } from "@/components/status-alert";
import { StudyLogFilters } from "@/components/study-log-filters";
import { profile } from "@/config/profile";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { getSessionContext } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getFeaturedTags, isFiltered, listAdminStudyLogs } from "@/lib/study-log-service";
import { getFirstValue } from "@/lib/url";

function getSuccessMessage(value: string | undefined) {
  if (value === "created") {
    return "学习日志已创建。";
  }

  if (value === "updated") {
    return "学习日志已更新。";
  }

  return null;
}

export default async function AdminStudyLogsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const session = await getSessionContext();
  const { filters, logs } = await listAdminStudyLogs({
    actor: session.user,
    rawFilters: params,
    repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
  });
  const successMessage = getSuccessMessage(getFirstValue(params.success));

  return (
    <div className="space-y-6">
      {successMessage ? <StatusAlert title="保存成功" description={successMessage} tone="success" /> : null}
      <div className="rounded-[1.5rem] border border-border/70 bg-white/70 px-5 py-4 text-sm leading-7 text-muted-foreground">
        这里维护的是数据库中的正式学习日志内容。你可以直接新增、编辑、删除和发布，不需要修改任何源文件。
      </div>
      <StudyLogFilters
        action="/admin/study-logs"
        filters={filters}
        mode="admin"
        suggestedTags={getFeaturedTags(logs, profile.studyLog.featuredTags)}
      />
      {logs.length === 0 ? (
        <EmptyState
          title={isFiltered(filters) ? "没有符合条件的日志" : "还没有学习日志"}
          description={
            isFiltered(filters)
              ? "可以清掉部分筛选条件后再试。"
              : "先新建第一篇日志，再慢慢把归档补起来。"
          }
          actionHref="/admin/study-logs/new"
          actionLabel="新建日志"
        />
      ) : (
        <AdminStudyLogTable logs={logs} />
      )}
    </div>
  );
}
