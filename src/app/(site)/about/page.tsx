import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: "个人简介、技能、学习经历、兴趣方向与最近在做的事。",
  path: "/about",
  title: "关于我",
});

export default function AboutPage() {
  return (
    <div className="container-shell space-y-10">
      <PageHero
        eyebrow={profile.aboutPage.eyebrow}
        title={profile.aboutPage.title}
        description={profile.aboutPage.description}
      />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">个人简介</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 leading-8 text-muted-foreground">
            <p>{profile.statement}</p>
            {profile.quickIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>
        <div className="grid gap-6">
          <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-3xl">技能</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-full px-4 py-1.5">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-3xl">常用工具</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.tools.map((tool) => (
                <Badge key={tool} variant="secondary" className="rounded-full px-4 py-1.5">
                  {tool}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">学习经历</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.education.map((item) => (
              <div key={`${item.phase}-${item.period}`} className="space-y-2 border-l border-border/70 pl-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{item.period}</p>
                  <h3 className="font-medium text-foreground">
                    {item.phase} · {item.school}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.major}</p>
                </div>
                <p className="leading-7 text-muted-foreground">{item.focus}</p>
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="grid gap-6">
          <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-3xl">兴趣与长期关注</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.hobbies.map((item) => (
                <div key={item.title} className="space-y-1">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="leading-7 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-3xl">最近在做</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.projects.map((item) => (
                <div key={item.title} className="space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <Badge variant="secondary" className="rounded-full">
                      {item.status}
                    </Badge>
                  </div>
                  <p className="leading-7 text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
