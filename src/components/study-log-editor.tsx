"use client";

import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { ZodIssue } from "zod/v4";

import { Badge } from "@/components/ui/badge";
import { MarkdownContent } from "@/components/markdown-content";
import { StatusAlert } from "@/components/status-alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/config/profile";
import type { StudyLog } from "@/db/study-log-repository";
import { getErrorMessage } from "@/lib/app-error";
import { cn } from "@/lib/utils";
import { studyLogFormSchema, type StudyLogFormValues } from "@/schemas/study-log";

interface FeedbackState {
  message: string;
  tone: "error" | "success";
}

function toFormValues(log?: StudyLog): StudyLogFormValues {
  return {
    content: log?.content ?? "",
    date: log?.date ?? new Date().toISOString().slice(0, 10),
    durationMinutes: log?.durationMinutes ? String(log.durationMinutes) : "",
    isPublic: log?.isPublic ?? false,
    mood: log?.mood ?? "",
    summary: log?.summary ?? "",
    tagsInput: log?.tags.join(", ") ?? "",
    title: log?.title ?? "",
  };
}

export function StudyLogEditor({
  initialLog,
  mode,
}: {
  initialLog?: StudyLog;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StudyLogFormValues>({
    defaultValues: toFormValues(initialLog),
  });
  const contentPreview = form.watch("content");
  const summaryPreview = form.watch("summary");
  const titlePreview = form.watch("title");
  const isPublicPreview = form.watch("isPublic");
  const tagsPreview = form
    .watch("tagsInput")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  function applyIssues(issues: ZodIssue[]) {
    issues.forEach((issue) => {
      const fieldName = issue.path[0];

      if (typeof fieldName === "string") {
        form.setError(fieldName as keyof StudyLogFormValues, {
          message: issue.message,
          type: "manual",
        });
      }
    });
  }

  const endpoint =
    mode === "create"
      ? "/api/admin/study-logs"
      : `/api/admin/study-logs/${initialLog?.id ?? ""}`;
  const method = mode === "create" ? "POST" : "PATCH";

  async function onSubmit(values: StudyLogFormValues) {
    setIsSubmitting(true);
    setFeedback(null);
    form.clearErrors();

    const parsed = studyLogFormSchema.safeParse(values);

    if (!parsed.success) {
      applyIssues(parsed.error.issues);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        body: JSON.stringify(parsed.data),
        headers: {
          "Content-Type": "application/json",
        },
        method,
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? "保存学习日志失败。");
      }

      setFeedback({
        message: mode === "create" ? "学习日志已创建。" : "学习日志已更新。",
        tone: "success",
      });

      startTransition(() => {
        router.push(mode === "create" ? "/admin/study-logs?success=created" : "/admin/study-logs?success=updated");
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        message: getErrorMessage(error, "保存学习日志失败。"),
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="surface-panel space-y-6 rounded-[2rem] p-6 shadow-sm md:p-8">
      {feedback ? (
        <StatusAlert
          description={feedback.message}
          title={feedback.tone === "success" ? "已保存" : "保存失败"}
          tone={feedback.tone}
        />
      ) : null}
      <form
        className="grid gap-6"
        onSubmit={form.handleSubmit((values) => {
          void onSubmit(values);
        })}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">标题</Label>
            <Input id="title" className="rounded-2xl bg-white/75" {...form.register("title")} />
            <p className="text-sm text-destructive">{form.formState.errors.title?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">日期</Label>
            <Input id="date" type="date" className="rounded-2xl bg-white/75" {...form.register("date")} />
            <p className="text-sm text-destructive">{form.formState.errors.date?.message}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">摘要</Label>
          <Textarea id="summary" rows={4} className="rounded-[1.5rem] bg-white/75" {...form.register("summary")} />
          <p className="text-sm text-destructive">{form.formState.errors.summary?.message}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-2">
            <Label htmlFor="content">正文（Markdown）</Label>
            <Textarea
              id="content"
              rows={18}
              className="min-h-[24rem] rounded-[1.5rem] bg-white/75"
              {...form.register("content")}
            />
            <p className="text-sm text-muted-foreground">
              支持 Markdown。保存后会直接写入数据库，公开页会按正式样式展示。
            </p>
            <p className="text-sm text-destructive">{form.formState.errors.content?.message}</p>
          </div>
          <div className="space-y-4 rounded-[1.5rem] border border-border/70 bg-white/72 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium text-foreground">实时预览</p>
              <Badge variant={isPublicPreview ? "default" : "secondary"} className="rounded-full">
                {isPublicPreview ? "公开" : "草稿"}
              </Badge>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                {titlePreview || "这里会显示标题预览"}
              </h3>
              <p className="leading-7 text-muted-foreground">
                {summaryPreview || "建议先用一两句话写清今天的重点收获或卡点。"}
              </p>
            </div>
            {tagsPreview.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tagsPreview.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full border border-border/60 bg-background/85">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
            <div className="rounded-[1.35rem] border border-border/70 bg-background/85 p-4">
              {contentPreview ? (
                <MarkdownContent content={contentPreview} />
              ) : (
                <p className="leading-7 text-muted-foreground">
                  正文预览会显示在这里。建议按“今天做了什么 / 为什么 / 下一步”来组织内容。
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="tagsInput">标签</Label>
            <Input
              id="tagsInput"
              className="rounded-2xl bg-white/75"
              placeholder="物理, 编程, 反思"
              {...form.register("tagsInput")}
            />
            <p className="text-sm text-destructive">{form.formState.errors.tagsInput?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mood">状态</Label>
            <Input
              id="mood"
              list="mood-options"
              className="rounded-2xl bg-white/75"
              placeholder="专注"
              {...form.register("mood")}
            />
            <datalist id="mood-options">
              {profile.studyLog.moodOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
            <p className="text-sm text-destructive">{form.formState.errors.mood?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="durationMinutes">时长（分钟）</Label>
            <Input
              id="durationMinutes"
              inputMode="numeric"
              className="rounded-2xl bg-white/75"
              placeholder="90"
              {...form.register("durationMinutes")}
            />
            <p className="text-sm text-destructive">
              {form.formState.errors.durationMinutes?.message}
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <label className="flex items-center gap-3 rounded-[1.5rem] border border-border/70 bg-secondary/50 p-4">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border"
              {...form.register("isPublic")}
            />
            <div>
              <p className="font-medium">公开显示</p>
              <p className="text-sm text-muted-foreground">
                打开后，这篇日志会出现在公开的学习日志页面。
              </p>
            </div>
          </label>
          <div className="rounded-[1.5rem] border border-border/70 bg-white/72 p-4">
            <p className="mb-3 font-medium text-foreground">填写建议</p>
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              {profile.studyLog.editorTips.map((tip) => (
                <li key={tip}>- {tip}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button className="h-10 rounded-full px-4" disabled={isSubmitting} type="submit">
            {isSubmitting ? "保存中..." : mode === "create" ? "创建日志" : "保存修改"}
          </Button>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-4")}
            href="/admin/study-logs"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
