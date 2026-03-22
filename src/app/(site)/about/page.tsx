import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: "个人信息、技能栈、常用工具与简短个人陈述。",
  path: "/about",
  title: "About",
});

export default function AboutPage() {
  return (
    <div className="container-shell space-y-10">
      <PageHero
        eyebrow="About"
        title="A focused profile shaped by physics, software, and steady learning."
        description="This page keeps the personal layer centralized: what I study, how I build, and which tools I rely on to stay consistent."
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[2rem] border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle className="font-heading text-3xl">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 leading-8 text-muted-foreground">
            <p>{profile.statement}</p>
            <p>
              My current focus sits at the intersection of foundational physics, programming craft,
              and reflective writing. I prefer clean systems, small iterations, and tools that make
              thought visible.
            </p>
            <p>
              The whole site is configured so personal content can be updated from a single source
              file at <code className="rounded bg-secondary px-1.5 py-0.5">src/config/profile.ts</code>.
            </p>
          </CardContent>
        </Card>
        <div className="grid gap-6">
          <Card className="rounded-[2rem] border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle className="font-heading text-3xl">Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-full px-4 py-1.5">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle className="font-heading text-3xl">Tools</CardTitle>
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
    </div>
  );
}
