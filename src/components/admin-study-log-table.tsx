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
    throw new Error(body?.error ?? "Request failed.");
  }

  return body?.message ?? "Success.";
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
        message: log.isPublic ? "Entry moved back to draft." : "Entry published.",
        tone: "success",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        message: getErrorMessage(error, "Unable to update visibility."),
        tone: "error",
      });
    } finally {
      setPendingKey(null);
    }
  }

  async function deleteEntry(log: StudyLog) {
    if (!window.confirm(`Delete "${log.title}"? This cannot be undone.`)) {
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
        message: "Entry deleted.",
        tone: "success",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        message: getErrorMessage(error, "Unable to delete this entry."),
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
          title={feedback.tone === "success" ? "Done" : "Request failed"}
          tone={feedback.tone}
        />
      ) : null}
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                    {log.isPublic ? "Public" : "Draft"}
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
                      Edit
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
                      {log.isPublic ? "Unpublish" : "Publish"}
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
                      Delete
                    </Button>
                    {log.isPublic ? (
                      <Link
                        className={buttonVariants({ size: "sm", variant: "ghost" })}
                        href={`/study-log/${log.slug}`}
                      >
                        View
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
