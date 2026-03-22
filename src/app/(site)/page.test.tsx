import type { ReactNode } from "react";

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import HomePage from "@/app/(site)/page";
import { profile } from "@/config/profile";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/section-reveal", () => ({
  SectionReveal: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe("HomePage", () => {
  it("renders the restored hero identity strip above the main heading", () => {
    render(<HomePage />);

    const strip = screen.getByTestId("hero-identity-strip");

    expect(strip).toBeInTheDocument();
    expect(strip).toHaveTextContent(profile.hero.eyebrow);
    expect(strip).toHaveTextContent(profile.hero.kicker);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: profile.hero.headline,
      }),
    ).toBeInTheDocument();
  });
});
