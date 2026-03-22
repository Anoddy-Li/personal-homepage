import Link from "next/link";

import { profile } from "@/config/profile";

export function SiteFooter({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p>{profile.name}</p>
          <p>{profile.role}</p>
        </div>
        <div className="space-y-1 text-left md:text-right">
          <p>{profile.footer.summary}</p>
          <Link className="underline underline-offset-4" href={isAdmin ? "/admin" : "/login"}>
            {isAdmin ? profile.footer.adminLabel : profile.footer.loginLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
