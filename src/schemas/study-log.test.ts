import { describe, expect, it } from "vitest";

import { normalizeTagsInput, parseStudyLogFormValues } from "@/schemas/study-log";

const validForm = {
  content:
    "I reviewed a chapter, wrote a short summary, and clarified the assumptions behind the derivation in my own words.",
  date: "2026-03-22",
  durationMinutes: "80",
  isPublic: true,
  mood: "Focused",
  summary: "A short but valid summary that explains the session clearly.",
  tagsInput: "physics, coding, reflection",
  title: "A valid study session",
};

describe("study log schema", () => {
  it("normalizes comma-separated tags", () => {
    expect(normalizeTagsInput(" Physics, coding, physics , reflection ")).toEqual([
      "physics",
      "coding",
      "reflection",
    ]);
  });

  it("rejects invalid form data", () => {
    expect(() =>
      parseStudyLogFormValues({
        ...validForm,
        content: "too short",
      }),
    ).toThrow("Content should be at least 30 characters.");

    expect(() =>
      parseStudyLogFormValues({
        ...validForm,
        durationMinutes: "-5",
      }),
    ).toThrow("Duration must be a positive whole number.");
  });
});
