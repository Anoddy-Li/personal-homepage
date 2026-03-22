import { SectionReveal } from "@/components/section-reveal";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: "个人简介、技能、学习经历、兴趣方向与最近在做的事。",
  path: "/about",
  title: "关于我",
});

export default function AboutPage() {
  return (
    <div className="container-shell space-y-6">
      <SectionReveal>
        <PageHero
          eyebrow={profile.aboutPage.eyebrow}
          title={profile.aboutPage.title}
          description={profile.aboutPage.description}
        />
      </SectionReveal>

      <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
        <SectionReveal delay={60}>
          <section className="surface-panel rounded-[2rem] px-6 py-6 md:px-8">
            <div className="space-y-5">
              <p className="eyebrow-line">个人简介</p>
              <p className="font-heading text-3xl font-semibold leading-snug text-foreground">
                {profile.statement}
              </p>
              <div className="space-y-4 leading-8 text-muted-foreground">
                {profile.quickIntro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "昵称", value: profile.nickname },
                  { label: "学校", value: profile.institution },
                  { label: "所在地", value: profile.city },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.35rem] border border-border/70 bg-white/70 px-4 py-3"
                  >
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-1 text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <div className="grid gap-4">
          <SectionReveal delay={120}>
            <section className="surface-panel rounded-[2rem] px-6 py-6">
              <div className="space-y-4">
                <p className="eyebrow-line">研究兴趣</p>
                <div className="space-y-4">
                  {profile.researchInterests.map((item) => (
                    <div key={item.title} className="space-y-2 rounded-[1.35rem] border border-border/70 bg-white/70 px-4 py-4">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal delay={180}>
            <section className="surface-panel rounded-[2rem] px-6 py-6">
              <div className="space-y-4">
                <p className="eyebrow-line">技能与工具</p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="rounded-full px-4 py-1.5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="rounded-full px-4 py-1.5">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
        <SectionReveal delay={100}>
          <section className="surface-panel rounded-[2rem] px-6 py-6 md:px-8">
            <div className="space-y-5">
              <p className="eyebrow-line">学习经历</p>
              <div className="space-y-6">
                {profile.education.map((item) => (
                  <div key={`${item.phase}-${item.period}`} className="space-y-3 border-l border-border/70 pl-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{item.period}</p>
                      <h2 className="font-medium text-foreground">
                        {item.phase} · {item.school}
                      </h2>
                      <p className="text-sm text-muted-foreground">{item.major}</p>
                    </div>
                    <p className="leading-7 text-muted-foreground">{item.focus}</p>
                    <p className="text-sm leading-7 text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <div className="grid gap-4">
          <SectionReveal delay={160}>
            <section className="surface-panel rounded-[2rem] px-6 py-6">
              <div className="space-y-4">
                <p className="eyebrow-line">做事方式</p>
                <div className="space-y-4">
                  {profile.principles.map((item) => (
                    <div key={item.title} className="space-y-2">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal delay={220}>
            <section className="surface-panel rounded-[2rem] px-6 py-6">
              <div className="space-y-5">
                <div className="space-y-4">
                  <p className="eyebrow-line">兴趣与长期关注</p>
                  {profile.hobbies.map((item) => (
                    <div key={item.title} className="space-y-2">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <p className="eyebrow-line">最近在做</p>
                  {profile.projects.map((item) => (
                    <div key={item.title} className="space-y-2 rounded-[1.35rem] border border-border/70 bg-white/70 px-4 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-foreground">{item.title}</p>
                        <Badge variant="secondary" className="rounded-full">
                          {item.status}
                        </Badge>
                      </div>
                      <p className="leading-7 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
