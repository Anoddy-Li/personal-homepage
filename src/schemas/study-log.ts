import { z } from "zod/v4";

import { AppError } from "@/lib/app-error";
import { getFirstValue, type RouteSearchParams } from "@/lib/url";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const studyLogFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(30, "Content should be at least 30 characters.")
    .max(20000, "Content is too long."),
  date: z.string().regex(isoDateRegex, "Choose a valid date."),
  durationMinutes: z
    .string()
    .trim()
    .max(5, "Duration is too long.")
    .optional()
    .default(""),
  isPublic: z.boolean(),
  mood: z.string().trim().max(40, "Mood is too long.").optional().default(""),
  summary: z
    .string()
    .trim()
    .min(12, "Summary should be at least 12 characters.")
    .max(280, "Summary is too long."),
  tagsInput: z
    .string()
    .trim()
    .min(1, "Add at least one tag.")
    .max(120, "Too many tags."),
  title: z
    .string()
    .trim()
    .min(3, "Title should be at least 3 characters.")
    .max(120, "Title is too long."),
});

export const studyLogVisibilitySchema = z.object({
  isPublic: z.boolean(),
});

export const studyLogFiltersSchema = z.object({
  date: z.string().regex(isoDateRegex).optional().or(z.literal("")).default(""),
  q: z.string().trim().max(100).optional().default(""),
  tag: z.string().trim().max(24).optional().default(""),
  visibility: z
    .enum(["all", "public", "private"])
    .optional()
    .default("all"),
});

export interface StudyLogFormValues {
  content: string;
  date: string;
  durationMinutes: string;
  isPublic: boolean;
  mood: string;
  summary: string;
  tagsInput: string;
  title: string;
}

export interface StudyLogFilterValues {
  date: string;
  q: string;
  tag: string;
  visibility: "all" | "public" | "private";
}

export interface StudyLogMutationInput {
  content: string;
  date: string;
  durationMinutes: number | null;
  isPublic: boolean;
  mood: string | null;
  summary: string;
  tags: string[];
  title: string;
}

export function normalizeTagsInput(tagsInput: string) {
  return Array.from(
    new Set(
      tagsInput
        .split(/[,\n]/)
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

export function parseStudyLogFormValues(
  rawInput: unknown,
): StudyLogMutationInput {
  const parsed = studyLogFormSchema.safeParse(rawInput);

  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? "Invalid study log data.");
  }

  const tags = normalizeTagsInput(parsed.data.tagsInput);

  if (tags.length === 0) {
    throw new AppError(400, "Add at least one tag.");
  }

  const durationMinutes = parsed.data.durationMinutes
    ? Number(parsed.data.durationMinutes)
    : null;

  if (durationMinutes !== null) {
    if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
      throw new AppError(400, "Duration must be a positive whole number.");
    }

    if (durationMinutes > 1440) {
      throw new AppError(400, "Duration must be less than one day.");
    }
  }

  return {
    content: parsed.data.content,
    date: parsed.data.date,
    durationMinutes,
    isPublic: parsed.data.isPublic,
    mood: parsed.data.mood ? parsed.data.mood : null,
    summary: parsed.data.summary,
    tags,
    title: parsed.data.title,
  };
}

export function parseStudyLogFilters(searchParams: RouteSearchParams) {
  return studyLogFiltersSchema.parse({
    date: getFirstValue(searchParams.date),
    q: getFirstValue(searchParams.q),
    tag: getFirstValue(searchParams.tag),
    visibility: getFirstValue(searchParams.visibility),
  });
}
