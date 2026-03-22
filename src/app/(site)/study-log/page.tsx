import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/page-hero";
import { SetupAlert } from "@/components/setup-alert";
import { StudyLogCard } from "@/components/study-log-card";
import { StudyLogFilters } from "@/components/study-log-filters";
import { profile } from "@/config/profile";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { isSupabaseConfigured } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { getFeaturedTags, isFiltered, listPublicStudyLogs } from "@/lib/study-log-service";

export const metadata = buildMetadata({
  description: "公开的学习日志，支持按日期、标签和关键词筛选。",
  path: "/study-log",
  title: "学习日志",
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
          eyebrow={profile.studyLogPage.eyebrow}
          title="学习日志暂时不可用"
          description="页面已经准备好，但当前环境缺少数据库配置，暂时无法读取日志数据。"
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
        eyebrow={profile.studyLogPage.eyebrow}
        title={profile.studyLogPage.title}
        description={profile.studyLogPage.description}
      />
      <StudyLogFilters action="/study-log" filters={filters} suggestedTags={suggestedTags} />
      {logs.length === 0 ? (
        <EmptyState
          title={
            isFiltered(filters)
              ? profile.studyLogPage.filteredEmptyTitle
              : profile.studyLogPage.emptyTitle
          }
          description={
            isFiltered(filters)
              ? profile.studyLogPage.filteredEmptyDescription
              : profile.studyLogPage.emptyDescription
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
