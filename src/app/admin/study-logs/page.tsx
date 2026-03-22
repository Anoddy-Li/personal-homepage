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
    return "Study log created successfully.";
  }

  if (value === "updated") {
    return "Study log updated successfully.";
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
      {successMessage ? (
        <StatusAlert title="Saved" description={successMessage} tone="success" />
      ) : null}
      <StudyLogFilters
        action="/admin/study-logs"
        filters={filters}
        mode="admin"
        suggestedTags={getFeaturedTags(logs, profile.studyLog.featuredTags)}
      />
      {logs.length === 0 ? (
        <EmptyState
          title={isFiltered(filters) ? "No entries match these filters" : "No study logs yet"}
          description={
            isFiltered(filters)
              ? "Clear one or more filters and try again."
              : "Create your first entry to start the archive."
          }
          actionHref="/admin/study-logs/new"
          actionLabel="Create an entry"
        />
      ) : (
        <AdminStudyLogTable logs={logs} />
      )}
    </div>
  );
}
