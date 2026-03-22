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

  it("hides on downward scroll and shows on upward scroll", () => {
    render(<SiteHeader />);

    const header = screen.getByRole("banner");

    expect(header).toHaveAttribute("data-hidden", "false");

    act(() => {
      setScrollY(168);
      window.dispatchEvent(new Event("scroll"));
      vi.runAllTimers();
    });

    expect(header).toHaveAttribute("data-hidden", "true");

    act(() => {
      setScrollY(108);
      window.dispatchEvent(new Event("scroll"));
      vi.runAllTimers();
    });

    expect(header).toHaveAttribute("data-hidden", "false");
  });
});
