import Link from "next/link";
import { ArrowRight, Binary, BookOpenText, FlaskConical } from "lucide-react";

import { SectionReveal } from "@/components/section-reveal";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  description: profile.siteDescription,
  path: "/",
  title: profile.siteTitle,
});

export default function HomePage() {
  const highlightIcons = [FlaskConical, Binary, BookOpenText];

  return (
    <div className="container-shell space-y-5">
      <SectionReveal>
        <section className="surface-panel ambient-grid relative overflow-hidden rounded-[2.5rem] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute -right-12 top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(163,194,186,0.22),transparent_68%)] blur-3xl" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.16fr)_minmax(18rem,0.84fr)] lg:items-end">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="max-w-4xl font-heading text-[2.85rem] font-semibold leading-[1.08] tracking-tight text-balance md:text-[4.35rem]">
                  {profile.hero.headline}
                </h1>
                <p className="max-w-2xl text-[1.02rem] leading-8 text-muted-foreground md:text-lg">
                  {profile.hero.intro}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link className={cn(buttonVariants(), "h-10 rounded-full px-4")} href={profile.hero.primaryCta.href}>
                  {profile.hero.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-4")}
                  href={profile.hero.secondaryCta.href}
                >
                  {profile.hero.secondaryCta.label}
                </Link>
              </div>
            </div>
            <aside className="surface-panel rounded-[2rem] p-5 md:p-6">
              <div className="space-y-4">
                <p className="eyebrow-line">当前主线</p>
                <div className="space-y-3">
                  <p className="font-heading text-2xl font-semibold leading-snug text-foreground">
                    物理学习、轻量科研与代码实践并行推进。
                  </p>
                  <p className="leading-7 text-muted-foreground">{profile.statement}</p>
                </div>
                <div className="grid gap-3 text-sm text-muted-foreground">
                  <div className="rounded-[1.35rem] border border-border/70 bg-white/70 px-4 py-3">
                    <p className="text-foreground">{profile.institution}</p>
                    <p>{profile.role}</p>
                  </div>
                  <div className="rounded-[1.35rem] border border-border/70 bg-white/70 px-4 py-3">
                    <p className="text-foreground">{profile.city}</p>
                    <p>把课程、科研和日常记录放在一个长期系统里。</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </SectionReveal>

      <div className="grid gap-4 lg:grid-cols-3">
        {profile.homeHighlights.map((item, index) => {
          const Icon = highlightIcons[index];

          return (
            <SectionReveal key={item.label} delay={index * 70}>
              <article className="surface-panel fine-divider h-full rounded-[1.75rem] p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <h2 className="font-heading text-2xl font-semibold leading-snug text-foreground">
                      {item.value}
                    </h2>
                  </div>
                  <div className="grid size-10 place-items-center rounded-2xl border border-border/70 bg-white/70 text-muted-foreground">
                    <Icon className="size-4" />
                  </div>
                </div>
                <p className="mt-5 leading-7 text-muted-foreground">{item.description}</p>
              </article>
            </SectionReveal>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <SectionReveal delay={80}>
          <section className="surface-panel rounded-[2rem] px-6 py-6 md:px-8">
            <div className="space-y-4">
              <p className="eyebrow-line">关于我</p>
              {profile.quickIntro.map((paragraph) => (
                <p key={paragraph} className="max-w-2xl leading-8 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              <Link
                className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-4")}
                href="/about"
              >
                查看完整介绍
              </Link>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delay={160}>
          <section className="surface-panel rounded-[2rem] px-6 py-6 md:px-8">
            <div className="space-y-4">
              <p className="eyebrow-line">学习日志</p>
              <p className="font-heading text-2xl font-semibold leading-snug text-foreground">
                日志是这个站点的核心部分，用来记录每天学了什么、卡在哪里，以及下一步准备怎么继续。
              </p>
              <p className="leading-7 text-muted-foreground">
                公开页只展示已发布内容；新增、编辑、删除和发布都在后台完成，日志数据真实写入数据库。
              </p>
              <Link className={cn(buttonVariants(), "h-10 rounded-full px-4")} href="/study-log">
                进入日志列表
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </section>
        </SectionReveal>
      </div>
    </div>
  );
}
