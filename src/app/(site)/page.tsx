import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { StudyLogCard } from "@/components/study-log-card";
import { SetupAlert } from "@/components/setup-alert";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/config/profile";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { isSupabaseConfigured } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { listPublicStudyLogs } from "@/lib/study-log-service";

export const metadata = buildMetadata({
  description: profile.siteDescription,
  path: "/",
  title: profile.siteTitle,
});

export default async function HomePage() {
  const featuredLogs = isSupabaseConfigured()
    ? (
        await listPublicStudyLogs({
          rawFilters: {},
          repo: createSupabaseStudyLogRepository(createSupabasePublicClient()),
        })
      ).logs.slice(0, profile.studyLog.homePreviewCount)
    : [];

  return (
    <div className="container-shell space-y-20">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Clean minimal academic
          </p>
          <div className="space-y-4">
            <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-tight tracking-tight text-balance md:text-7xl">
              {profile.hero.headline}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {profile.hero.intro}
            </p>
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
          <div className="flex flex-wrap gap-2">
            {profile.focus.map((item) => (
              <Badge key={item} variant="secondary" className="rounded-full px-4 py-1.5">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <Card className="overflow-hidden rounded-[2rem] border-border/70 bg-card/90 shadow-sm">
          <CardContent className="grid gap-6 p-8">
            <Avatar className="h-24 w-24 rounded-[1.5rem] bg-secondary">
              <AvatarFallback className="rounded-[1.5rem] bg-secondary text-3xl font-semibold text-foreground">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-3">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  Identity
                </p>
                <h2 className="font-heading text-3xl font-semibold">{profile.name}</h2>
              </div>
              <p className="text-lg text-foreground">{profile.role}</p>
              <p className="leading-7 text-muted-foreground">{profile.statement}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {profile.quickLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full rounded-[1.75rem] border-border/70 bg-card/75 transition-transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Core module</p>
            <h2 className="font-heading text-4xl font-semibold tracking-tight">Latest public study logs</h2>
          </div>
          <Link className="text-sm text-foreground underline underline-offset-4" href="/study-log">
            View all entries
          </Link>
        </div>
        {!isSupabaseConfigured() ? (
          <SetupAlert />
        ) : featuredLogs.length === 0 ? (
          <EmptyState
            title="No public study logs yet"
            description="The Study Log module is live. Add your first entry from the admin panel after Supabase and admin login are configured."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {featuredLogs.map((log) => (
              <StudyLogCard key={log.id} log={log} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
