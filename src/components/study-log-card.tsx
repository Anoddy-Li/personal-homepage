import Link from "next/link";

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
    <Card className="h-full border-border/70 bg-card/80 transition-transform hover:-translate-y-0.5">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{formatDisplayDate(log.date)}</span>
          {log.mood ? <span>{log.mood}</span> : null}
          {duration ? <span>{duration}</span> : null}
        </div>
        <CardTitle className="font-heading text-2xl leading-tight">
          <Link href={`/study-log/${log.slug}`} className="hover:text-primary">
            {log.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="leading-7 text-muted-foreground">{log.summary}</p>
        <div className="flex flex-wrap gap-2">
          {log.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
