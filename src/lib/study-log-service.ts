import type { User } from "@supabase/supabase-js";

import type {
  StudyLog,
  StudyLogRepository,
  StudyLogWriteInput,
} from "@/db/study-log-repository";
import { AppError } from "@/lib/app-error";
import { assertAdminAccess } from "@/lib/auth";
import { syncManagedStudyLogTags } from "@/lib/study-log-tag-service";
import { buildStudyLogBaseSlug } from "@/lib/study-log-slug";
import type { RouteSearchParams } from "@/lib/url";
import {
  parseStudyLogFilters,
  parseStudyLogFormValues,
  type StudyLogFilterValues,
} from "@/schemas/study-log";

function buildBaseSlug(date: string, title: string) {
  return buildStudyLogBaseSlug(date, title);
}

async function generateUniqueSlug(
  repo: StudyLogRepository,
  date: string,
  title: string,
  excludeId?: string,
) {
  const baseSlug = buildBaseSlug(date, title);
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await repo.findBySlug(candidate);

    if (!existing || existing.id === excludeId) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

function buildWriteInput(
  input: ReturnType<typeof parseStudyLogFormValues>,
  slug: string,
  authorId?: string | null,
): StudyLogWriteInput {
  return {
    authorId: authorId ?? null,
    content: input.content,
    date: input.date,
    durationMinutes: input.durationMinutes,
    isPublic: input.isPublic,
    mood: input.mood,
    slug,
    summary: input.summary,
    tags: input.tags,
    title: input.title,
  };
}

export async function createStudyLog(params: {
  actor: Pick<User, "email" | "id"> | null;
  rawInput: unknown;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const input = parseStudyLogFormValues(params.rawInput);
  const slug = await generateUniqueSlug(params.repo, input.date, input.title);
  const log = await params.repo.create(buildWriteInput(input, slug, params.actor?.id));

  await syncManagedStudyLogTags(params.repo, input.tags);

  return log;
}

export async function updateStudyLog(params: {
  actor: Pick<User, "email" | "id"> | null;
  id: string;
  rawInput: unknown;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const existing = await params.repo.findById(params.id);

  if (!existing) {
    throw new AppError(404, "学习日志不存在。");
  }

  const input = parseStudyLogFormValues(params.rawInput);
  const slug = await generateUniqueSlug(params.repo, input.date, input.title, params.id);
  const log = await params.repo.update(params.id, buildWriteInput(input, slug, existing.authorId));

  await syncManagedStudyLogTags(params.repo, input.tags);

  return log;
}

export async function deleteStudyLog(params: {
  actor: Pick<User, "email"> | null;
  id: string;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const existing = await params.repo.findById(params.id);

  if (!existing) {
    throw new AppError(404, "学习日志不存在。");
  }

  await params.repo.delete(params.id);
}

export async function setStudyLogVisibility(params: {
  actor: Pick<User, "email"> | null;
  id: string;
  isPublic: boolean;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const existing = await params.repo.findById(params.id);

  if (!existing) {
    throw new AppError(404, "学习日志不存在。");
  }

  return params.repo.update(params.id, {
    isPublic: params.isPublic,
  });
}

export async function getPublicStudyLogBySlug(params: {
  repo: StudyLogRepository;
  slug: string;
}) {
  const log = await params.repo.findPublicBySlug(params.slug);

  if (!log) {
    throw new AppError(404, "学习日志不存在。");
  }

  return log;
}

export async function getStudyLogById(params: {
  actor: Pick<User, "email"> | null;
  id: string;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const log = await params.repo.findById(params.id);

  if (!log) {
    throw new AppError(404, "学习日志不存在。");
  }

  return log;
}

export async function listPublicStudyLogs(params: {
  rawFilters: RouteSearchParams;
  repo: StudyLogRepository;
}) {
  const filters = parseStudyLogFilters(params.rawFilters);

  return {
    filters,
    logs: await params.repo.listPublic(filters),
  };
}

export async function listAdminStudyLogs(params: {
  actor: Pick<User, "email"> | null;
  rawFilters: RouteSearchParams;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const filters = parseStudyLogFilters(params.rawFilters);

  return {
    filters,
    logs: await params.repo.listAdmin(filters),
  };
}

export function summarizeStudyLogs(logs: StudyLog[]) {
  return {
    draftCount: logs.filter((log) => !log.isPublic).length,
    publicCount: logs.filter((log) => log.isPublic).length,
    totalCount: logs.length,
  };
}

export function isFiltered(filters: StudyLogFilterValues) {
  return Boolean(filters.date || filters.q || filters.tag);
}
