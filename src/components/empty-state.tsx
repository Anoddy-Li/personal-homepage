import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EmptyState({
  actionHref,
  actionLabel,
  description,
  title,
}: {
  actionHref?: string;
  actionLabel?: string;
  description: string;
  title: string;
}) {
  return (
    <Card className="border-dashed bg-card/80">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        {actionHref && actionLabel ? (
          <Link
            className="inline-flex rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"
            href={actionHref}
          >
            {actionLabel}
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}
