import { describe, expect, it } from "vitest";

import { assertAdminAccess, isAdminEmail } from "@/lib/auth";

describe("auth helpers", () => {
  it("recognizes admin emails from environment configuration", () => {
    process.env.ADMIN_EMAILS = "admin@example.com, second@example.com";

    expect(isAdminEmail("admin@example.com")).toBe(true);
    expect(isAdminEmail("SECOND@example.com")).toBe(true);
    expect(isAdminEmail("student@example.com")).toBe(false);
  });

  it("throws when a non-admin user attempts admin access", () => {
    process.env.ADMIN_EMAILS = "admin@example.com";

    expect(() => assertAdminAccess({ email: "student@example.com" })).toThrow(
      "只有管理员可以执行这个操作。",
    );
  });
});
