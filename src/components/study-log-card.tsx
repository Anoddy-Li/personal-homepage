import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudyLog } from "@/db/study-log-repository";
import { formatDisplayDate, formatDuration } from "@/lib/format";

export function StudyLogCard({
  log,
}: {
  log: StudyLog;
}) {
  const duration = formatDuration(log.durationMinutes);

  return (
    <Card className="surface-panel h-full rounded-[1.75rem] border-border/70 bg-card/80 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-28px_rgba(14,26,46,0.26)]">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full border border-border/70 bg-white/70 px-3 py-1">
            {formatDisplayDate(log.date)}
          </span>
          {log.mood ? (
            <span className="rounded-full border border-border/70 bg-white/70 px-3 py-1">{log.mood}</span>
          ) : null}
          {duration ? (
            <span className="rounded-full border border-border/70 bg-white/70 px-3 py-1">{duration}</span>
          ) : null}
        </div>
        <CardTitle className="font-heading text-xl leading-tight md:text-2xl">
          <Link href={`/study-log/${log.slug}`} className="group inline-flex items-start gap-2 hover:text-primary">
            <span>{log.title}</span>
            <ArrowUpRight className="mt-1 size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        <p className="line-clamp-3 leading-7 text-muted-foreground">{log.summary}</p>
        <div className="flex flex-wrap gap-2">
          {log.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full border border-border/60 bg-white/75">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
