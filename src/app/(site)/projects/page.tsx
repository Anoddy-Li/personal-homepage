import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: "精选项目与正在推进的方向。",
  path: "/projects",
  title: "Projects",
});

export default function ProjectsPage() {
  return (
    <div className="container-shell space-y-10">
      <PageHero
        eyebrow="Projects"
        title="A small set of projects with practical value and room to grow."
        description="The emphasis is on durable systems rather than flashy demos: tools that support thinking, tracking, and long-term iteration."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {profile.projects.map((project) => (
          <Card key={project.title} className="rounded-[2rem] border-border/70 bg-card/80">
            <CardHeader className="space-y-3">
              <Badge className="w-fit rounded-full" variant="secondary">
                {project.status}
              </Badge>
              <CardTitle className="font-heading text-3xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
