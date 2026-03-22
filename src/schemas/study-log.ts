import { z } from "zod/v4";

import { AppError } from "@/lib/app-error";
import { getFirstValue, type RouteSearchParams } from "@/lib/url";

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const studyLogFormSchema = z.object({
  content: z.string().trim().min(30, "正文至少需要 30 个字符。").max(20000, "正文内容过长。"),
  date: z.string().regex(isoDateRegex, "请选择有效日期。"),
  durationMinutes: z.string().trim().max(5, "时长输入过长。").optional().default(""),
  isPublic: z.boolean(),
  mood: z.string().trim().max(40, "状态内容过长。").optional().default(""),
  summary: z.string().trim().min(12, "摘要至少需要 12 个字符。").max(280, "摘要内容过长。"),
  tagsInput: z.string().trim().min(1, "请至少填写一个标签。").max(120, "标签内容过长。"),
  title: z.string().trim().min(3, "标题至少需要 3 个字符。").max(120, "标题内容过长。"),
});

export const studyLogVisibilitySchema = z.object({
  isPublic: z.boolean(),
});

export const studyLogFiltersSchema = z.object({
  date: z.string().regex(isoDateRegex).optional().or(z.literal("")).default(""),
  q: z.string().trim().max(100).optional().default(""),
  tag: z.string().trim().max(24).optional().default(""),
  visibility: z.enum(["all", "public", "private"]).optional().default("all"),
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

export function parseStudyLogFormValues(rawInput: unknown): StudyLogMutationInput {
  const parsed = studyLogFormSchema.safeParse(rawInput);

  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? "学习日志数据不合法。");
  }

  const tags = normalizeTagsInput(parsed.data.tagsInput);

  if (tags.length === 0) {
    throw new AppError(400, "请至少填写一个标签。");
  }

  const durationMinutes = parsed.data.durationMinutes ? Number(parsed.data.durationMinutes) : null;

  if (durationMinutes !== null) {
    if (!Number.isInteger(durationMinutes) || durationMinutes <= 0) {
      throw new AppError(400, "时长必须是大于 0 的整数。");
    }

    if (durationMinutes > 1440) {
      throw new AppError(400, "时长不能超过一天。");
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
