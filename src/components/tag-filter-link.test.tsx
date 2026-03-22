import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TagFilterLink } from "@/components/tag-filter-link";

describe("TagFilterLink", () => {
  it("keeps active tag text visible and toggles back to the base url", () => {
    render(
      <TagFilterLink
        action="/study-log"
        filters={{
          date: "",
          q: "",
          tag: "物理",
          visibility: "public",
        }}
        mode="public"
        tag="物理"
      />,
    );

    const link = screen.getByRole("link", { name: "物理" });

    expect(link).toHaveTextContent("物理");
    expect(link).toHaveAttribute("href", "/study-log");
    expect(link.className).toContain("text-primary-foreground");
  });

  it("builds a tag filter url while preserving other filters", () => {
    render(
      <TagFilterLink
        action="/study-log"
        filters={{
          date: "2026-03-22",
          q: "推导",
          tag: "",
          visibility: "public",
        }}
        mode="public"
        tag="反思"
      />,
    );

    expect(screen.getByRole("link", { name: "反思" })).toHaveAttribute(
      "href",
      "/study-log?q=%E6%8E%A8%E5%AF%BC&date=2026-03-22&tag=%E5%8F%8D%E6%80%9D",
    );
  });
});
