import Link from "next/link";

import { SectionReveal } from "@/components/section-reveal";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  description: "联系信息与协作偏好。",
  path: "/contact",
  title: "联系",
});

export default function ContactPage() {
  return (
    <div className="container-shell space-y-6">
      <SectionReveal>
        <PageHero
          eyebrow={profile.contactPage.eyebrow}
          title={profile.contactPage.title}
          description={profile.contactPage.description}
        />
      </SectionReveal>

      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <SectionReveal delay={70}>
          <section className="surface-panel rounded-[2rem] px-6 py-6 md:px-8 md:py-7">
            <div className="space-y-5">
              <p className="eyebrow-line">邮件联系</p>
              <div className="space-y-3">
                <h2 className="font-heading break-all text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {profile.contact.email}
                </h2>
                <p className="max-w-2xl leading-8 text-muted-foreground">{profile.contact.emailNote}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  className={cn(buttonVariants(), "h-10 rounded-full px-4")}
                  href={`mailto:${profile.contact.email}`}
                >
                  发送邮件
                </Link>
                <Link
                  className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-4")}
                  href="/study-log"
                >
                  先看看学习日志
                </Link>
              </div>
            </div>
          </section>
        </SectionReveal>

        <div className="grid gap-4">
          <SectionReveal delay={130}>
            <section className="surface-panel rounded-[2rem] px-6 py-6">
              <div className="space-y-3">
                <p className="eyebrow-line">基础信息</p>
                <div className="space-y-2 leading-7 text-muted-foreground">
                  <p>
                    <span className="text-foreground">所在地：</span>
                    {profile.contact.location}
                  </p>
                  <p>
                    <span className="text-foreground">当前身份：</span>
                    {profile.institution} · {profile.role}
                  </p>
                </div>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal delay={190}>
            <section className="surface-panel rounded-[2rem] px-6 py-6">
              <div className="space-y-3">
                <p className="eyebrow-line">适合交流的话题</p>
                <p className="leading-8 text-muted-foreground">{profile.contact.availability}</p>
              </div>
            </section>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
