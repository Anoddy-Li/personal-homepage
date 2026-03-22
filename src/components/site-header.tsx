"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { NavLink } from "@/components/nav-link";
import { profile } from "@/config/profile";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border px-5 py-3.5 transition-all duration-300",
          scrolled
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
  );
}
