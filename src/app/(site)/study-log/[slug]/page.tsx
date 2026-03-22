import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { MarkdownContent } from "@/components/markdown-content";
import { profile } from "@/config/profile";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { AppError } from "@/lib/app-error";
import { isSupabaseConfigured } from "@/lib/env";
import { formatDisplayDate, formatDuration } from "@/lib/format";
import { buildMetadata } from "@/lib/metadata";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { getPublicStudyLogBySlug } from "@/lib/study-log-service";

async function loadStudyLog(slug: string) {
  return getPublicStudyLogBySlug({
    repo: createSupabaseStudyLogRepository(createSupabasePublicClient()),
    slug,
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isSupabaseConfigured()) {
    return buildMetadata({
      description: "学习日志详情页",
      path: `/study-log/${slug}`,
      title: "学习日志",
    });
  }

  try {
    const log = await loadStudyLog(slug);

    return buildMetadata({
      description: log.summary,
      path: `/study-log/${slug}`,
      title: log.title,
    });
  } catch {
    return buildMetadata({
      description: "学习日志详情页",
      path: `/study-log/${slug}`,
      title: "学习日志",
    });
  }
}

export default async function StudyLogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isSupabaseConfigured()) {
    notFound();
  }

  let log;

  try {
    log = await loadStudyLog(slug);
  } catch (error) {
    if (error instanceof AppError && error.statusCode === 404) {
      notFound();
    }

    throw error;
  }

  const duration = formatDuration(log.durationMinutes);

  return (
    <article className="container-shell space-y-8">
      <div className="space-y-4">
        <Link className="text-sm text-muted-foreground underline underline-offset-4" href="/study-log">
          {profile.studyLogPage.backLabel}
        </Link>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{formatDisplayDate(log.date)}</p>
          <h1 className="max-w-4xl font-heading text-5xl font-semibold tracking-tight text-balance">
            {log.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{log.summary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {log.mood ? <Badge variant="secondary">{log.mood}</Badge> : null}
          {duration ? <Badge variant="secondary">{duration}</Badge> : null}
          {log.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-sm md:p-8">
        <MarkdownContent content={log.content} />
      </div>
    </article>
  );
}
