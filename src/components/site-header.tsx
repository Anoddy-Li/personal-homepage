import Link from "next/link";

import { NavLink } from "@/components/nav-link";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/config/profile";

export function SiteHeader({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="space-y-1">
          <div className="text-sm uppercase tracking-[0.32em] text-muted-foreground">
            Personal Homepage
          </div>
          <div className="font-heading text-xl font-semibold text-foreground">
            {profile.name}
          </div>
        </Link>
        <nav className="flex flex-1 flex-wrap items-center justify-end gap-1">
          {profile.navigation.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          <Link
            className={buttonVariants({
              className: "ml-2",
              variant: isAdmin ? "default" : "outline",
            })}
            href={isAdmin ? "/admin" : "/login"}
          >
            {isAdmin ? "Admin" : "Login"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
