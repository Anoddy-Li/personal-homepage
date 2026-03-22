import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { SetupAlert } from "@/components/setup-alert";
import { StudyLogCard } from "@/components/study-log-card";
import { StudyLogFilters } from "@/components/study-log-filters";
import { profile } from "@/config/profile";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { buildMetadata } from "@/lib/metadata";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { getFeaturedTags, isFiltered, listPublicStudyLogs } from "@/lib/study-log-service";
import { isSupabaseConfigured } from "@/lib/env";

export const metadata = buildMetadata({
  description: "公开的学习日志，支持按日期、标签和关键词筛选。",
  path: "/study-log",
  title: "Study Log",
});

export default async function StudyLogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <div className="container-shell space-y-10">
        <PageHero
          eyebrow="Study Log"
          title="A searchable archive of public learning notes."
          description="The page structure is ready. Connect Supabase to turn on real data, filtering, and publishing."
        />
        <SetupAlert />
      </div>
    );
  }

  const { filters, logs } = await listPublicStudyLogs({
    rawFilters: params,
    repo: createSupabaseStudyLogRepository(createSupabasePublicClient()),
  });

  const suggestedTags = getFeaturedTags(logs, profile.studyLog.featuredTags);

  return (
    <div className="container-shell space-y-10">
      <PageHero
        eyebrow="Study Log"
        title="A public record of daily learning, revision, and reflection."
        description="Search by keyword, narrow by date, or browse by tags. Only published entries are visible on the public site."
      />
      <StudyLogFilters action="/study-log" filters={filters} suggestedTags={suggestedTags} />
      {logs.length === 0 ? (
        <EmptyState
          title={isFiltered(filters) ? "No entries match these filters" : "No public study logs yet"}
          description={
            isFiltered(filters)
              ? "Try a different keyword, clear the date filter, or switch to another tag."
              : "Once an entry is published from the admin area, it will appear here automatically."
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {logs.map((log) => (
            <StudyLogCard key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}
