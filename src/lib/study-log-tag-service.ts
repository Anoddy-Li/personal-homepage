import type { User } from "@supabase/supabase-js";

import type { StudyLog, StudyLogRepository, StudyLogWriteInput } from "@/db/study-log-repository";
import { AppError } from "@/lib/app-error";
import { assertAdminAccess } from "@/lib/auth";
import {
  STUDY_LOG_TAG_CATALOG_DATE,
  STUDY_LOG_TAG_CATALOG_SLUG,
  STUDY_LOG_TAG_CATALOG_TITLE,
} from "@/lib/study-log-tag-catalog";
import {
  parseCreateTagInput,
  parseDeleteTagInput,
  parseRenameTagInput,
} from "@/schemas/study-log-tag";

export interface ManagedStudyLogTag {
  name: string;
  usageCount: number;
}

function sortTags(tags: string[]) {
  return [...new Set(tags)].sort((left, right) => left.localeCompare(right, "zh-CN"));
}

function collectTags(logs: StudyLog[]) {
  return sortTags(logs.flatMap((log) => log.tags));
}

function buildCatalogWriteInput(tags: string[]): StudyLogWriteInput {
  return {
    authorId: null,
    content: "系统保留：用于维护学习日志的标签目录。",
    date: STUDY_LOG_TAG_CATALOG_DATE,
    durationMinutes: null,
    isPublic: false,
    mood: null,
    slug: STUDY_LOG_TAG_CATALOG_SLUG,
    summary: "系统保留：用于维护学习日志的标签目录。",
    tags: sortTags(tags),
    title: STUDY_LOG_TAG_CATALOG_TITLE,
  };
}

async function getTagCatalogRecord(repo: StudyLogRepository) {
  return repo.findBySlug(STUDY_LOG_TAG_CATALOG_SLUG);
}

async function upsertTagCatalog(repo: StudyLogRepository, tags: string[]) {
  const existing = await getTagCatalogRecord(repo);
  const nextTags = sortTags(tags);

  if (existing) {
    return repo.update(existing.id, {
      tags: nextTags,
    });
  }

  return repo.create(buildCatalogWriteInput(nextTags));
}

export async function listManagedStudyLogTags(repo: StudyLogRepository) {
  const [catalog, logs] = await Promise.all([
    getTagCatalogRecord(repo),
    repo.listAdmin({ visibility: "all" }),
  ]);

  return sortTags([...(catalog?.tags ?? []), ...collectTags(logs)]);
}

export async function listManagedStudyLogTagsWithUsage(repo: StudyLogRepository) {
  const [tags, logs] = await Promise.all([
    listManagedStudyLogTags(repo),
    repo.listAdmin({ visibility: "all" }),
  ]);

  return tags.map((name) => ({
    name,
    usageCount: logs.filter((log) => log.tags.includes(name)).length,
  })) satisfies ManagedStudyLogTag[];
}

export async function syncManagedStudyLogTags(repo: StudyLogRepository, tags: string[]) {
  if (tags.length === 0) {
    return listManagedStudyLogTags(repo);
  }

  const currentTags = await listManagedStudyLogTags(repo);
  const mergedTags = sortTags([...currentTags, ...tags]);

  await upsertTagCatalog(repo, mergedTags);

  return mergedTags;
}

export async function createManagedStudyLogTag(params: {
  actor: Pick<User, "email"> | null;
  rawInput: unknown;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const input = parseCreateTagInput(params.rawInput);
  const currentTags = await listManagedStudyLogTags(params.repo);

  if (currentTags.includes(input.name)) {
    throw new AppError(409, "这个标签已经存在。");
  }

  const nextTags = sortTags([...currentTags, input.name]);
  await upsertTagCatalog(params.repo, nextTags);

  return nextTags;
}

export async function renameManagedStudyLogTag(params: {
  actor: Pick<User, "email"> | null;
  rawInput: unknown;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const input = parseRenameTagInput(params.rawInput);

  if (input.currentName === input.nextName) {
    throw new AppError(400, "新旧标签名称不能相同。");
  }

  const logs = await params.repo.listAdmin({ visibility: "all" });
  const currentTags = await listManagedStudyLogTags(params.repo);

  if (!currentTags.includes(input.currentName)) {
    throw new AppError(404, "要修改的标签不存在。");
  }

  if (currentTags.includes(input.nextName)) {
    throw new AppError(409, "新的标签名称已经存在。");
  }

  const affectedLogs = logs.filter((log) => log.tags.includes(input.currentName));

  for (const log of affectedLogs) {
    await params.repo.update(log.id, {
      tags: sortTags(
        log.tags.map((tag) => (tag === input.currentName ? input.nextName : tag)),
      ),
    });
  }

  const nextTags = sortTags(
    currentTags.map((tag) => (tag === input.currentName ? input.nextName : tag)),
  );

  await upsertTagCatalog(params.repo, nextTags);

  return {
    affectedLogCount: affectedLogs.length,
    tags: nextTags,
  };
}

export async function deleteManagedStudyLogTag(params: {
  actor: Pick<User, "email"> | null;
  rawInput: unknown;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const input = parseDeleteTagInput(params.rawInput);
  const logs = await params.repo.listAdmin({ visibility: "all" });
  const currentTags = await listManagedStudyLogTags(params.repo);

  if (!currentTags.includes(input.name)) {
    throw new AppError(404, "要删除的标签不存在。");
  }

  const usageCount = logs.filter((log) => log.tags.includes(input.name)).length;

  if (usageCount > 0) {
    throw new AppError(409, `还有 ${usageCount} 篇日志正在使用这个标签，请先编辑相关日志后再删除。`);
  }

  const nextTags = currentTags.filter((tag) => tag !== input.name);
  await upsertTagCatalog(params.repo, nextTags);

  return nextTags;
}
