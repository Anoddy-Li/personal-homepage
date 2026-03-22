import Link from "next/link";

import { NavLink } from "@/components/nav-link";
import { profile } from "@/config/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="space-y-1">
          <div className="text-sm text-muted-foreground">{profile.brand.label}</div>
          <div className="font-heading text-xl font-semibold text-foreground">{profile.name}</div>
        </Link>
        <nav className="flex flex-1 flex-wrap items-center justify-end gap-3">
          {profile.navigation.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
      </div>
    </header>
  );
}
