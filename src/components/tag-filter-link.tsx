import Link from "next/link";

import type { StudyLogFilterValues } from "@/schemas/study-log";
import { cn } from "@/lib/utils";

function buildTagFilterHref(params: {
  action: string;
  filters: StudyLogFilterValues;
  mode: "admin" | "public";
  tag: string;
}) {
  const searchParams = new URLSearchParams();
  const isActive = params.filters.tag === params.tag;

  if (params.filters.q) {
    searchParams.set("q", params.filters.q);
  }

  if (params.filters.date) {
    searchParams.set("date", params.filters.date);
  }

  if (params.mode === "admin" && params.filters.visibility !== "all") {
    searchParams.set("visibility", params.filters.visibility);
  }

  if (!isActive) {
    searchParams.set("tag", params.tag);
  }

  const query = searchParams.toString();

  return query ? `${params.action}?${query}` : params.action;
}

export function TagFilterLink({
  action,
  filters,
  mode,
  tag,
}: {
  action: string;
  filters: StudyLogFilterValues;
  mode: "admin" | "public";
  tag: string;
}) {
  const isActive = filters.tag === tag;

  return (
    <Link
      href={buildTagFilterHref({ action, filters, mode, tag })}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-primary/70 bg-primary text-primary-foreground hover:bg-primary/92"
          : "border-border/70 bg-white/75 text-foreground hover:bg-secondary",
      )}
    >
      {tag}
    </Link>
  );
}
