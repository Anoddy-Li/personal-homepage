"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NavLink } from "@/components/nav-link";
import { profile } from "@/config/profile";
import { resolveSiteHeaderState } from "@/lib/site-header-scroll";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const headerRef = useRef<HTMLElement | null>(null);
  const reducedMotionRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const [headerHeight, setHeaderHeight] = useState(92);
  const [headerState, setHeaderState] = useState(() =>
    resolveSiteHeaderState({
      currentY: 0,
    }),
  );

  useEffect(() => {
    const headerNode = headerRef.current;

    if (!headerNode) {
      return;
    }

    const updateHeight = () => {
      const nextHeight = Math.round(headerNode.getBoundingClientRect().height);

      if (nextHeight > 0) {
        setHeaderHeight(nextHeight);
      }
    };

    updateHeight();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            updateHeight();
          })
        : null;

    observer?.observe(headerNode);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncHeaderState = () => {
      const nextState = resolveSiteHeaderState({
        currentY: window.scrollY,
      });

      setHeaderState((current) =>
        current.hidden === nextState.hidden &&
        current.scrolled === nextState.scrolled &&
        current.showBackToTop === nextState.showBackToTop &&
        current.withinTopRange === nextState.withinTopRange
          ? current
          : nextState,
      );
    };

    const handleMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
      syncHeaderState();
    };

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        syncHeaderState();
      });
    };

    handleMotionPreference();
    window.addEventListener("scroll", handleScroll, { passive: true });
    motionQuery.addEventListener?.("change", handleMotionPreference);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("scroll", handleScroll);
      motionQuery.removeEventListener?.("change", handleMotionPreference);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      behavior: reducedMotionRef.current ? "auto" : "smooth",
      top: 0,
    });
  };

  return (
    <>
      <div aria-hidden className="shrink-0" style={{ height: `${headerHeight}px` }} />
      <header
        ref={headerRef}
        data-hidden={headerState.hidden ? "true" : "false"}
        className={cn(
          "fixed inset-x-0 top-0 z-40 px-4 pt-4 will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          headerState.hidden ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border px-5 py-3.5 transition-[background-color,border-color,box-shadow] duration-300",
            headerState.scrolled
              ? "border-border/70 bg-background/88 shadow-[0_18px_48px_-28px_rgba(14,26,46,0.28)] backdrop-blur-xl"
              : "border-border/55 bg-background/72 backdrop-blur-md",
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl border border-border/70 bg-white/75 text-sm font-semibold text-foreground shadow-sm">
              {profile.initials}
            </div>
            <div className="space-y-1">
              <div className="text-xs tracking-[0.18em] text-muted-foreground">{profile.brand.label}</div>
              <div className="font-heading text-lg font-semibold text-foreground">{profile.name}</div>
            </div>
          </Link>
          <nav className="flex flex-1 flex-wrap items-center justify-end gap-2 rounded-full border border-border/60 bg-white/70 p-1 backdrop-blur">
            {profile.navigation.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>
      </header>
      <button
        type="button"
        aria-label="回到顶部"
        data-visible={headerState.showBackToTop ? "true" : "false"}
        onClick={handleBackToTop}
        className={cn(
          "fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/88 px-3.5 py-3 text-sm text-foreground shadow-[0_18px_40px_-26px_rgba(14,26,46,0.32)] backdrop-blur-xl transition-[opacity,transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-border hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 motion-reduce:transition-none md:bottom-6 md:right-6",
          headerState.showBackToTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <ArrowUp className="size-4" />
        <span className="hidden sm:inline">回到顶部</span>
      </button>
    </>
  );
}
