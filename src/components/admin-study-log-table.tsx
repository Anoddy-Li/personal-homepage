"use client";

import Link from "next/link";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { StatusAlert } from "@/components/status-alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { StudyLog } from "@/db/study-log-repository";
import { getErrorMessage } from "@/lib/app-error";
import { formatDisplayDate } from "@/lib/format";

interface FeedbackState {
  message: string;
  tone: "error" | "success";
}

async function parseResponseMessage(response: Response) {
  const body = (await response.json().catch(() => null)) as
    | { error?: string; message?: string }
    | null;

  if (!response.ok) {
    throw new Error(body?.error ?? "请求失败。");
  }

  return body?.message ?? "操作成功。";
}

export function AdminStudyLogTable({
  logs,
}: {
  logs: StudyLog[];
}) {
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  async function toggleVisibility(log: StudyLog) {
    const key = `${log.id}:toggle`;
    setPendingKey(key);
    setFeedback(null);

    try {
      await parseResponseMessage(
        await fetch(`/api/admin/study-logs/${log.id}/visibility`, {
          body: JSON.stringify({ isPublic: !log.isPublic }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }),
      );

      setFeedback({
        message: log.isPublic ? "日志已切换回草稿。" : "日志已公开发布。",
        tone: "success",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        message: getErrorMessage(error, "更新可见性失败。"),
        tone: "error",
      });
    } finally {
      setPendingKey(null);
    }
  }

  async function deleteEntry(log: StudyLog) {
    if (!window.confirm(`确定删除《${log.title}》吗？此操作无法撤销。`)) {
      return;
    }

    const key = `${log.id}:delete`;
    setPendingKey(key);
    setFeedback(null);

    try {
      await parseResponseMessage(
        await fetch(`/api/admin/study-logs/${log.id}`, {
          method: "DELETE",
        }),
      );

      setFeedback({
        message: "日志已删除。",
        tone: "success",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        message: getErrorMessage(error, "删除日志失败。"),
        tone: "error",
      });
    } finally {
      setPendingKey(null);
    }
  }

  return (
    <div className="space-y-4">
      {feedback ? (
        <StatusAlert
          description={feedback.message}
          title={feedback.tone === "success" ? "操作完成" : "操作失败"}
          tone={feedback.tone}
        />
      ) : null}
      <div className="grid gap-4 md:hidden">
        {logs.map((log) => (
          <div key={log.id} className="surface-panel rounded-[1.5rem] p-5">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{log.title}</p>
                  <p className="text-sm leading-7 text-muted-foreground">{log.summary}</p>
                </div>
                <Badge variant={log.isPublic ? "default" : "secondary"} className="rounded-full">
                  {log.isPublic ? "公开" : "草稿"}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>{formatDisplayDate(log.date)}</span>
                {log.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  className={buttonVariants({ size: "sm", variant: "outline" })}
                  href={`/admin/study-logs/${log.id}/edit`}
                >
                  编辑
                </Link>
                <Button
                  onClick={() => {
                    void toggleVisibility(log);
                  }}
                  size="sm"
                  type="button"
                  variant="outline"
                  disabled={pendingKey === `${log.id}:toggle`}
                >
                  {log.isPublic ? "转为草稿" : "发布"}
                </Button>
                <Button
                  onClick={() => {
                    void deleteEntry(log);
                  }}
                  size="sm"
                  type="button"
                  variant="destructive"
                  disabled={pendingKey === `${log.id}:delete`}
                >
                  删除
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="surface-panel hidden overflow-hidden rounded-3xl bg-card/80 md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>日期</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>标签</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{log.title}</p>
                    <p className="text-sm text-muted-foreground">{log.summary}</p>
                  </div>
                </TableCell>
                <TableCell>{formatDisplayDate(log.date)}</TableCell>
                <TableCell>
                  <Badge variant={log.isPublic ? "default" : "secondary"}>
                    {log.isPublic ? "公开" : "草稿"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {log.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      className={buttonVariants({ size: "sm", variant: "outline" })}
                      href={`/admin/study-logs/${log.id}/edit`}
                    >
                      编辑
                    </Link>
                    <Button
                      onClick={() => {
                        void toggleVisibility(log);
                      }}
                      size="sm"
                      type="button"
                      variant="outline"
                      disabled={pendingKey === `${log.id}:toggle`}
                    >
                      {log.isPublic ? "转为草稿" : "发布"}
                    </Button>
                    <Button
                      onClick={() => {
                        void deleteEntry(log);
                      }}
                      size="sm"
                      type="button"
                      variant="destructive"
                      disabled={pendingKey === `${log.id}:delete`}
                    >
                      删除
                    </Button>
                    {log.isPublic ? (
                      <Link
                        className={buttonVariants({ size: "sm", variant: "ghost" })}
                        href={`/study-log/${log.slug}`}
                      >
                        查看
                      </Link>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
