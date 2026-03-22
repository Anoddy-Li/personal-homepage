import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StudyLogFilterValues } from "@/schemas/study-log";

export function StudyLogFilters({
  action,
  filters,
  mode = "public",
  suggestedTags,
}: {
  action: string;
  filters: StudyLogFilterValues;
  mode?: "admin" | "public";
  suggestedTags: readonly string[];
}) {
  return (
    <div className="space-y-4 rounded-3xl border border-border/70 bg-card/70 p-5">
      <form action={action} className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={`${mode}-search`}>Keyword</Label>
          <Input
            id={`${mode}-search`}
            name="q"
            defaultValue={filters.q}
            placeholder="Search title, summary, or content"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-date`}>Date</Label>
          <Input id={`${mode}-date`} name="date" type="date" defaultValue={filters.date} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-tag`}>Tag</Label>
          <Input id={`${mode}-tag`} name="tag" defaultValue={filters.tag} placeholder="physics" />
        </div>
        {mode === "admin" ? (
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <select
              id="visibility"
              name="visibility"
              defaultValue={filters.visibility}
              className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        ) : (
          <input type="hidden" name="visibility" value="public" />
        )}
        <div className="flex items-end gap-3 md:col-span-4">
          <Button type="submit">Apply filters</Button>
          <Link
            className="inline-flex h-8 items-center justify-center rounded-lg border border-border px-3 text-sm transition-colors hover:bg-secondary"
            href={action}
          >
            Reset
          </Link>
        </div>
      </form>
      <div className="flex flex-wrap gap-2">
        {suggestedTags.map((tag) => (
          <Link key={tag} href={`${action}?tag=${encodeURIComponent(tag)}`}>
            <Badge variant={filters.tag === tag ? "default" : "secondary"} className="rounded-full">
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
