import type { ReactNode } from "react";

import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/site-header";

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

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

class ResizeObserverMock {
  disconnect() {}

  observe() {}

  unobserve() {}
}

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value,
    writable: true,
  });
}

describe("SiteHeader", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setScrollY(0);
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: vi.fn(),
      writable: true,
    });
    vi.stubGlobal(
      "requestAnimationFrame",
      ((callback: FrameRequestCallback) => {
        return window.setTimeout(() => callback(0), 0);
      }) as typeof requestAnimationFrame,
    );
    vi.stubGlobal(
      "cancelAnimationFrame",
      ((id: number) => {
        window.clearTimeout(id);
      }) as typeof cancelAnimationFrame,
    );
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        addEventListener: vi.fn(),
        matches: false,
        media: query,
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("shows only within the top range and keeps the back-to-top button in sync", () => {
    render(<SiteHeader />);

    const header = screen.getByRole("banner");
    const backToTopButton = screen.getByRole("button", { name: "回到顶部" });

    expect(header).toHaveAttribute("data-hidden", "false");
    expect(backToTopButton).toHaveAttribute("data-visible", "false");

    act(() => {
      setScrollY(148);
      window.dispatchEvent(new Event("scroll"));
      vi.runAllTimers();
    });

    expect(header).toHaveAttribute("data-hidden", "true");
    expect(backToTopButton).toHaveAttribute("data-visible", "true");

    act(() => {
      setScrollY(220);
      window.dispatchEvent(new Event("scroll"));
      vi.runAllTimers();
    });

    expect(header).toHaveAttribute("data-hidden", "true");
    expect(backToTopButton).toHaveAttribute("data-visible", "true");

    act(() => {
      setScrollY(48);
      window.dispatchEvent(new Event("scroll"));
      vi.runAllTimers();
    });

    expect(header).toHaveAttribute("data-hidden", "false");
    expect(backToTopButton).toHaveAttribute("data-visible", "false");
  });

  it("scrolls back to the top when the floating button is pressed", async () => {
    render(<SiteHeader />);

    const backToTopButton = screen.getByRole("button", { name: "回到顶部" });

    act(() => {
      setScrollY(180);
      window.dispatchEvent(new Event("scroll"));
      vi.runAllTimers();
    });

    expect(backToTopButton).toHaveAttribute("data-visible", "true");

    backToTopButton.click();

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
    });
  });
});
