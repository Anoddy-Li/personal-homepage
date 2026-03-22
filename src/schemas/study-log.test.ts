import { describe, expect, it } from "vitest";

import { normalizeTagsInput, parseStudyLogFormValues } from "@/schemas/study-log";

const validForm = {
  content: "我先复习了一章内容，又把推导过程重新写了一遍，最后用自己的话整理了关键假设。",
  date: "2026-03-22",
  durationMinutes: "80",
  isPublic: true,
  mood: "专注",
  summary: "这是一段满足长度要求的摘要，用来说明这次学习内容。",
  tagsInput: "物理, 编程, 反思",
  title: "一次有效的学习记录",
};

describe("study log schema", () => {
  it("normalizes comma-separated tags", () => {
    expect(normalizeTagsInput(" 物理, 编程, 物理 , 反思 ")).toEqual(["物理", "编程", "反思"]);
  });

  it("rejects invalid form data", () => {
    expect(() =>
      parseStudyLogFormValues({
        ...validForm,
        content: "太短",
      }),
    ).toThrow("正文至少需要 30 个字符。");

    expect(() =>
      parseStudyLogFormValues({
        ...validForm,
        durationMinutes: "-5",
      }),
    ).toThrow("时长必须是大于 0 的整数。");
  });
});
