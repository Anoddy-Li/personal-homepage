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
