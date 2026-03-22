import { beforeEach, describe, expect, it } from "vitest";

import type {
  StudyLog,
  StudyLogRepository,
  StudyLogWriteInput,
} from "@/db/study-log-repository";
import { AppError } from "@/lib/app-error";
import { STUDY_LOG_TAG_CATALOG_SLUG } from "@/lib/study-log-tag-catalog";
import {
  createManagedStudyLogTag,
  deleteManagedStudyLogTag,
  listManagedStudyLogTags,
  renameManagedStudyLogTag,
  syncManagedStudyLogTags,
} from "@/lib/study-log-tag-service";

class InMemoryStudyLogRepository implements StudyLogRepository {
  private logs: StudyLog[] = [];

  async create(input: StudyLogWriteInput) {
    const now = new Date().toISOString();
    const log: StudyLog = {
      authorId: input.authorId ?? null,
      content: input.content,
      createdAt: now,
      date: input.date,
      durationMinutes: input.durationMinutes,
      id: `log-${this.logs.length + 1}`,
      isPublic: input.isPublic,
      mood: input.mood,
      slug: input.slug,
      summary: input.summary,
      tags: input.tags,
      title: input.title,
      updatedAt: now,
    };

    this.logs.push(log);

    return log;
  }

  async delete(id: string) {
    this.logs = this.logs.filter((log) => log.id !== id);
  }

  async findById(id: string) {
    return this.logs.find((log) => log.id === id) ?? null;
  }

  async findBySlug(slug: string) {
    return this.logs.find((log) => log.slug === slug) ?? null;
  }

  async findPublicBySlug(slug: string) {
    return this.logs.find((log) => log.slug === slug && log.isPublic) ?? null;
  }

  async listAdmin(_filters?: { date?: string; q?: string; tag?: string; visibility?: "all" | "public" | "private" }) {
    void _filters;

    return this.logs.filter((log) => log.slug !== STUDY_LOG_TAG_CATALOG_SLUG);
  }

  async listPublic(_filters?: { date?: string; q?: string; tag?: string; visibility?: "all" | "public" | "private" }) {
    void _filters;

    return this.logs.filter((log) => log.isPublic && log.slug !== STUDY_LOG_TAG_CATALOG_SLUG);
  }

  async update(id: string, input: Partial<StudyLogWriteInput>) {
    const existing = await this.findById(id);

    if (!existing) {
      throw new AppError(404, "学习日志不存在。");
    }

    const nextLog: StudyLog = {
      ...existing,
      authorId: input.authorId ?? existing.authorId,
      content: input.content ?? existing.content,
      date: input.date ?? existing.date,
      durationMinutes: input.durationMinutes ?? existing.durationMinutes,
      isPublic: input.isPublic ?? existing.isPublic,
      mood: input.mood ?? existing.mood,
      slug: input.slug ?? existing.slug,
      summary: input.summary ?? existing.summary,
      tags: input.tags ?? existing.tags,
      title: input.title ?? existing.title,
      updatedAt: new Date().toISOString(),
    };

    this.logs = this.logs.map((log) => (log.id === id ? nextLog : log));

    return nextLog;
  }
}

const adminActor = {
  email: "admin@example.com",
};

describe("study log tag service", () => {
  beforeEach(() => {
    process.env.ADMIN_EMAILS = "admin@example.com";
  });

  it("creates a managed tag", async () => {
    const repo = new InMemoryStudyLogRepository();

    const tags = await createManagedStudyLogTag({
      actor: adminActor,
      rawInput: { name: "物理" },
      repo,
    });

    expect(tags).toEqual(["物理"]);
  });

  it("renames a managed tag and syncs related logs", async () => {
    const repo = new InMemoryStudyLogRepository();
    await repo.create({
      content: "正文内容足够长，用来模拟一篇真实日志。",
      date: "2026-03-22",
      durationMinutes: 90,
      isPublic: true,
      mood: "专注",
      slug: "2026-03-22-demo",
      summary: "这是一个满足长度要求的摘要，用于测试标签改名。",
      tags: ["物理"],
      title: "测试日志",
    });
    await syncManagedStudyLogTags(repo, ["物理"]);

    const result = await renameManagedStudyLogTag({
      actor: adminActor,
      rawInput: { currentName: "物理", nextName: "理论物理" },
      repo,
    });

    const logs = await repo.listAdmin({ visibility: "all" });

    expect(result.affectedLogCount).toBe(1);
    expect(logs[0]?.tags).toEqual(["理论物理"]);
    await expect(listManagedStudyLogTags(repo)).resolves.toEqual(["理论物理"]);
  });

  it("blocks deleting a tag that is still used by logs", async () => {
    const repo = new InMemoryStudyLogRepository();
    await repo.create({
      content: "正文内容足够长，用来模拟一篇真实日志。",
      date: "2026-03-22",
      durationMinutes: 90,
      isPublic: true,
      mood: "专注",
      slug: "2026-03-22-demo",
      summary: "这是一个满足长度要求的摘要，用于测试标签删除。",
      tags: ["物理"],
      title: "测试日志",
    });
    await syncManagedStudyLogTags(repo, ["物理"]);

    await expect(
      deleteManagedStudyLogTag({
        actor: adminActor,
        rawInput: { name: "物理" },
        repo,
      }),
    ).rejects.toMatchObject({
      statusCode: 409,
    });
  });
});
