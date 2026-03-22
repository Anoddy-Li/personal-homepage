import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: profile.siteDescription,
  path: "/",
  title: profile.siteTitle,
});

export default function HomePage() {
  return (
    <div className="container-shell">
      <section className="mx-auto max-w-3xl space-y-8 py-10 md:py-16">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{profile.hero.eyebrow}</p>
          <h1 className="font-heading text-5xl font-semibold leading-tight tracking-tight text-balance md:text-7xl">
            {profile.hero.headline}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{profile.hero.intro}</p>
        </div>
        <div className="space-y-4 rounded-[2rem] border border-border/70 bg-card/75 p-6 md:p-8">
          <div className="space-y-1">
            <p className="font-heading text-2xl font-semibold">{profile.name}</p>
            <p className="text-muted-foreground">{profile.role}</p>
          </div>
          {profile.quickIntro.map((paragraph) => (
            <p key={paragraph} className="leading-8 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants()} href={profile.hero.primaryCta.href}>
            {profile.hero.primaryCta.label}
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={profile.hero.secondaryCta.href}
          >
            {profile.hero.secondaryCta.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
