import Link from "next/link";

import { profile } from "@/config/profile";

export function SiteFooter({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  return (
    <footer className="pb-8 pt-2 md:pb-10">
      <div className="container-shell">
        <div className="surface-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-7">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.85fr_0.75fr]">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{profile.nickname}</p>
                <p className="font-heading text-2xl font-semibold text-foreground">{profile.name}</p>
              </div>
              <p className="max-w-md leading-7 text-muted-foreground">{profile.footer.summary}</p>
              <p className="text-sm text-muted-foreground">{profile.footer.note}</p>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="text-foreground">站点导航</p>
              <div className="flex flex-col gap-2">
                {profile.navigation.map((item) => (
                  <Link key={item.href} className="transition-colors hover:text-foreground" href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="text-foreground">联系与维护</p>
              <p>{profile.contact.email}</p>
              <p>{profile.contact.location}</p>
              <Link
                className="inline-flex w-fit underline underline-offset-4 transition-colors hover:text-foreground"
                href={isAdmin ? "/admin" : "/login"}
              >
                {isAdmin ? profile.footer.adminLabel : profile.footer.loginLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
