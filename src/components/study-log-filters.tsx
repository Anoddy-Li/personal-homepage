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
  const hasAdvancedFilters = Boolean(filters.date || filters.tag);

  if (mode === "public") {
    return (
      <div className="space-y-4 rounded-[1.75rem] border border-border/70 bg-card/70 p-5">
        <form action={action} className="space-y-4">
          <input type="hidden" name="visibility" value="public" />
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="public-search">关键词</Label>
              <Input
                id="public-search"
                name="q"
                defaultValue={filters.q}
                placeholder="搜索标题、摘要或正文"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit">筛选</Button>
              <Link
                className="inline-flex h-8 items-center justify-center rounded-lg border border-border px-3 text-sm transition-colors hover:bg-secondary"
                href={action}
              >
                重置
              </Link>
            </div>
          </div>
          <details open={hasAdvancedFilters} className="rounded-2xl border border-border/70 px-4 py-3">
            <summary className="cursor-pointer text-sm text-muted-foreground">更多筛选</summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="public-date">日期</Label>
                <Input id="public-date" name="date" type="date" defaultValue={filters.date} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="public-tag">标签</Label>
                <Input
                  id="public-tag"
                  name="tag"
                  defaultValue={filters.tag}
                  placeholder="例如：物理"
                />
              </div>
            </div>
          </details>
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

  return (
    <div className="space-y-4 rounded-3xl border border-border/70 bg-card/70 p-5">
      <form action={action} className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={`${mode}-search`}>关键词</Label>
          <Input
            id={`${mode}-search`}
            name="q"
            defaultValue={filters.q}
            placeholder="搜索标题、摘要或正文"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-date`}>日期</Label>
          <Input id={`${mode}-date`} name="date" type="date" defaultValue={filters.date} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${mode}-tag`}>标签</Label>
          <Input id={`${mode}-tag`} name="tag" defaultValue={filters.tag} placeholder="例如：物理" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="visibility">可见范围</Label>
          <select
            id="visibility"
            name="visibility"
            defaultValue={filters.visibility}
            className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="all">全部</option>
            <option value="public">公开</option>
            <option value="private">草稿</option>
          </select>
        </div>
        <div className="flex items-end gap-3 md:col-span-4">
          <Button type="submit">筛选</Button>
          <Link
            className="inline-flex h-8 items-center justify-center rounded-lg border border-border px-3 text-sm transition-colors hover:bg-secondary"
            href={action}
          >
            重置
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
