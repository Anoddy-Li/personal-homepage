import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: "学习经历时间线与阶段重点。",
  path: "/education",
  title: "Education",
});

export default function EducationPage() {
  return (
    <div className="container-shell space-y-10">
      <PageHero
        eyebrow="Education"
        title="A concise timeline of formal study and self-directed practice."
        description="The emphasis here is not only where I studied, but how each stage changed the way I learn and build."
      />
      <div className="space-y-5">
        {profile.education.map((item) => (
          <Card key={`${item.phase}-${item.period}`} className="rounded-[2rem] border-border/70 bg-card/80">
            <CardHeader className="grid gap-2 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <CardTitle className="font-heading text-3xl">{item.phase}</CardTitle>
                <p className="text-lg text-foreground">{item.school}</p>
              </div>
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">{item.period}</p>
            </CardHeader>
            <CardContent className="space-y-3 leading-7 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Major / Direction:</span> {item.major}
              </p>
              <p>
                <span className="font-medium text-foreground">Focus:</span> {item.focus}
              </p>
              <p>
                <span className="font-medium text-foreground">Notes:</span> {item.note}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
