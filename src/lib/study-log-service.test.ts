import { beforeEach, describe, expect, it } from "vitest";

import type {
  StudyLog,
  StudyLogRepository,
  StudyLogWriteInput,
} from "@/db/study-log-repository";
import { AppError } from "@/lib/app-error";
import {
  createStudyLog,
  deleteStudyLog,
  getPublicStudyLogBySlug,
  listPublicStudyLogs,
  setStudyLogVisibility,
  updateStudyLog,
} from "@/lib/study-log-service";

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

  async listAdmin() {
    return [...this.logs];
  }

  async listPublic() {
    return this.logs.filter((log) => log.isPublic);
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
  id: "user-1",
};

const validInput = {
  content: "我把推导一步一步重新写了一遍，也记录了自己卡住的地方和后来理顺思路的过程。",
  date: "2026-03-22",
  durationMinutes: "90",
  isPublic: false,
  mood: "专注",
  summary: "这是一段满足校验要求的摘要，用来描述一次认真复盘的学习过程。",
  tagsInput: "物理, 反思",
  title: "更耐心地重新整理推导过程",
};

describe("study log service", () => {
  beforeEach(() => {
    process.env.ADMIN_EMAILS = "admin@example.com";
  });

  it("creates a study log entry", async () => {
    const repo = new InMemoryStudyLogRepository();

    const created = await createStudyLog({
      actor: adminActor,
      rawInput: validInput,
      repo,
    });

    expect(created.id).toBeTruthy();
    expect(created.slug).toContain("2026-03-22");
    expect(created.tags).toEqual(["物理", "反思"]);
  });

  it("supports Chinese titles when generating slugs", async () => {
    const repo = new InMemoryStudyLogRepository();

    const created = await createStudyLog({
      actor: adminActor,
      rawInput: {
        ...validInput,
        title: "重新整理受力分析",
      },
      repo,
    });

    expect(created.slug.startsWith("2026-03-22-")).toBe(true);
    expect(created.slug.length).toBeGreaterThan("2026-03-22-".length);
  });

  it("edits an existing study log entry", async () => {
    const repo = new InMemoryStudyLogRepository();
    const created = await createStudyLog({
      actor: adminActor,
      rawInput: validInput,
      repo,
    });

    const updated = await updateStudyLog({
      actor: adminActor,
      id: created.id,
      rawInput: {
        ...validInput,
        title: "修改后的标题更准确",
      },
      repo,
    });

    expect(updated.title).toBe("修改后的标题更准确");
    expect(updated.slug).toContain("2026-03-22-");
  });

  it("deletes a study log entry", async () => {
    const repo = new InMemoryStudyLogRepository();
    const created = await createStudyLog({
      actor: adminActor,
      rawInput: validInput,
      repo,
    });

    await deleteStudyLog({
      actor: adminActor,
      id: created.id,
      repo,
    });

    await expect(repo.findById(created.id)).resolves.toBeNull();
  });

  it("keeps private entries out of public queries until published", async () => {
    const repo = new InMemoryStudyLogRepository();
    const draft = await createStudyLog({
      actor: adminActor,
      rawInput: validInput,
      repo,
    });
    const published = await createStudyLog({
      actor: adminActor,
      rawInput: {
        ...validInput,
        isPublic: true,
        title: "已经公开的日志",
      },
      repo,
    });

    const publicBeforePublish = await listPublicStudyLogs({
      rawFilters: {},
      repo,
    });

    expect(publicBeforePublish.logs.map((log) => log.id)).toEqual([published.id]);
    await expect(
      getPublicStudyLogBySlug({
        repo,
        slug: draft.slug,
      }),
    ).rejects.toMatchObject({
      statusCode: 404,
    });

    await setStudyLogVisibility({
      actor: adminActor,
      id: draft.id,
      isPublic: true,
      repo,
    });

    const publicAfterPublish = await listPublicStudyLogs({
      rawFilters: {},
      repo,
    });

    expect(publicAfterPublish.logs.map((log) => log.id).sort()).toEqual(
      [draft.id, published.id].sort(),
    );
  });

  it("blocks non-admin users from admin mutations", async () => {
    const repo = new InMemoryStudyLogRepository();

    await expect(
      createStudyLog({
        actor: { email: "student@example.com", id: "user-2" },
        rawInput: validInput,
        repo,
      }),
    ).rejects.toMatchObject({
      statusCode: 403,
    });
  });
});
