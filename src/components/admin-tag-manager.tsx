"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { StatusAlert } from "@/components/status-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/app-error";

interface ManagedTagItem {
  name: string;
  usageCount: number;
}

interface FeedbackState {
  message: string;
  tone: "error" | "success";
}

async function parseResponseMessage(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string; message?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.error ?? "请求失败。");
  }

  return payload?.message ?? "操作成功。";
}

export function AdminTagManager({
  tags,
}: {
  tags: ManagedTagItem[];
}) {
  const router = useRouter();
  const [newTagName, setNewTagName] = useState("");
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  async function createTag() {
    const key = "create";
    setPendingKey(key);
    setFeedback(null);

    try {
      const message = await parseResponseMessage(
        await fetch("/api/admin/tags", {
          body: JSON.stringify({ name: newTagName }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }),
      );

      setNewTagName("");
      setFeedback({
        message,
        tone: "success",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        message: getErrorMessage(error, "新增标签失败。"),
        tone: "error",
      });
    } finally {
      setPendingKey(null);
    }
  }

  async function renameTag(currentName: string) {
    const key = `${currentName}:rename`;
    setPendingKey(key);
    setFeedback(null);

    try {
      const message = await parseResponseMessage(
        await fetch("/api/admin/tags", {
          body: JSON.stringify({ currentName, nextName: renameValue }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
        }),
      );

      setEditingTag(null);
      setRenameValue("");
      setFeedback({
        message,
        tone: "success",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        message: getErrorMessage(error, "修改标签失败。"),
        tone: "error",
      });
    } finally {
      setPendingKey(null);
    }
  }

  async function deleteTag(name: string) {
    if (!window.confirm(`确定删除标签“${name}”吗？`)) {
      return;
    }

    const key = `${name}:delete`;
    setPendingKey(key);
    setFeedback(null);

    try {
      const message = await parseResponseMessage(
        await fetch("/api/admin/tags", {
          body: JSON.stringify({ name }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
        }),
      );

      setFeedback({
        message,
        tone: "success",
      });
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setFeedback({
        message: getErrorMessage(error, "删除标签失败。"),
        tone: "error",
      });
    } finally {
      setPendingKey(null);
    }
  }

  return (
    <div className="space-y-5">
      {feedback ? (
        <StatusAlert
          description={feedback.message}
          title={feedback.tone === "success" ? "操作成功" : "操作失败"}
          tone={feedback.tone}
        />
      ) : null}
      <div className="surface-panel rounded-[1.75rem] p-5">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="font-medium text-foreground">新增标签</p>
            <p className="text-sm text-muted-foreground">
              标签会进入后台标签目录，日志编辑时可以直接选择。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={newTagName}
              onChange={(event) => {
                setNewTagName(event.target.value);
              }}
              placeholder="例如：量子力学"
              className="h-10 rounded-2xl bg-white/75"
            />
            <Button
              type="button"
              className="h-10 rounded-2xl px-4"
              disabled={pendingKey === "create"}
              onClick={() => {
                void createTag();
              }}
            >
              新增标签
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-3">
        {tags.map((tag) => {
          const isEditing = editingTag === tag.name;

          return (
            <div key={tag.name} className="surface-panel rounded-[1.5rem] p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{tag.name}</p>
                  <p className="text-sm text-muted-foreground">
                    当前有 {tag.usageCount} 篇日志使用这个标签。
                  </p>
                </div>
                {isEditing ? (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Input
                      value={renameValue}
                      onChange={(event) => {
                        setRenameValue(event.target.value);
                      }}
                      className="h-10 rounded-2xl bg-white/75"
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        className="h-10 rounded-2xl px-4"
                        disabled={pendingKey === `${tag.name}:rename`}
                        onClick={() => {
                          void renameTag(tag.name);
                        }}
                      >
                        保存
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-10 rounded-2xl px-4"
                        onClick={() => {
                          setEditingTag(null);
                          setRenameValue("");
                        }}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-2xl px-4"
                      onClick={() => {
                        setEditingTag(tag.name);
                        setRenameValue(tag.name);
                      }}
                    >
                      修改名称
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="h-10 rounded-2xl px-4"
                      disabled={pendingKey === `${tag.name}:delete`}
                      onClick={() => {
                        void deleteTag(tag.name);
                      }}
                    >
                      删除
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
