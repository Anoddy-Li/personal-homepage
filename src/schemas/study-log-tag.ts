import { z } from "zod/v4";

import { AppError } from "@/lib/app-error";
import { normalizeTagsInput } from "@/schemas/study-log";

const tagNameSchema = z
  .string()
  .trim()
  .min(1, "请填写标签名称。")
  .max(24, "标签名称不能超过 24 个字符。")
  .refine((value) => normalizeTagsInput(value).length === 1, "一次只能填写一个标签。");

function normalizeSingleTag(value: string) {
  const [tag] = normalizeTagsInput(value);

  if (!tag) {
    throw new AppError(400, "请填写有效的标签名称。");
  }

  return tag;
}

export const createTagSchema = z.object({
  name: tagNameSchema,
});

export const renameTagSchema = z.object({
  currentName: tagNameSchema,
  nextName: tagNameSchema,
});

export const deleteTagSchema = z.object({
  name: tagNameSchema,
});

export function parseCreateTagInput(rawInput: unknown) {
  const parsed = createTagSchema.safeParse(rawInput);

  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? "标签数据不合法。");
  }

  return {
    name: normalizeSingleTag(parsed.data.name),
  };
}

export function parseRenameTagInput(rawInput: unknown) {
  const parsed = renameTagSchema.safeParse(rawInput);

  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? "标签数据不合法。");
  }

  return {
    currentName: normalizeSingleTag(parsed.data.currentName),
    nextName: normalizeSingleTag(parsed.data.nextName),
  };
}

export function parseDeleteTagInput(rawInput: unknown) {
  const parsed = deleteTagSchema.safeParse(rawInput);

  if (!parsed.success) {
    throw new AppError(400, parsed.error.issues[0]?.message ?? "标签数据不合法。");
  }

  return {
    name: normalizeSingleTag(parsed.data.name),
  };
}
