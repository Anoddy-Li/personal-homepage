import slugify from "slugify";
import type { User } from "@supabase/supabase-js";

import type {
  StudyLog,
  StudyLogRepository,
  StudyLogWriteInput,
} from "@/db/study-log-repository";
import { AppError } from "@/lib/app-error";
import { assertAdminAccess } from "@/lib/auth";
import {
  parseStudyLogFilters,
  parseStudyLogFormValues,
  type StudyLogFilterValues,
} from "@/schemas/study-log";
import type { RouteSearchParams } from "@/lib/url";

function buildBaseSlug(date: string, title: string) {
  return (
    slugify(`${date} ${title}`, {
      lower: true,
      strict: true,
      trim: true,
    }) || `study-log-${date}`
  );
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

  return params.repo.create(buildWriteInput(input, slug, params.actor?.id));
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
    throw new AppError(404, "Study log entry not found.");
  }

  const input = parseStudyLogFormValues(params.rawInput);
  const slug = await generateUniqueSlug(
    params.repo,
    input.date,
    input.title,
    params.id,
  );

  return params.repo.update(params.id, buildWriteInput(input, slug, existing.authorId));
}

export async function deleteStudyLog(params: {
  actor: Pick<User, "email"> | null;
  id: string;
  repo: StudyLogRepository;
}) {
  assertAdminAccess(params.actor);

  const existing = await params.repo.findById(params.id);

  if (!existing) {
    throw new AppError(404, "Study log entry not found.");
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
    throw new AppError(404, "Study log entry not found.");
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
    throw new AppError(404, "Study log entry not found.");
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
    throw new AppError(404, "Study log entry not found.");
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

export function getFeaturedTags(logs: StudyLog[], fallbackTags: readonly string[]) {
  const tagCounts = new Map<string, number>();

  logs.forEach((log) => {
    log.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });

  const dynamicTags = [...tagCounts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([tag]) => tag);

  return Array.from(new Set([...dynamicTags, ...fallbackTags])).slice(0, 8);
}

export function isFiltered(filters: StudyLogFilterValues) {
  return Boolean(filters.date || filters.q || filters.tag);
}
