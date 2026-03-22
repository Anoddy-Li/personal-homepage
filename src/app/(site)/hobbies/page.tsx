import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: "日常爱好、兴趣方向与长期关注主题。",
  path: "/hobbies",
  title: "Hobbies",
});

export default function HobbiesPage() {
  return (
    <div className="container-shell space-y-10">
      <PageHero
        eyebrow="Hobbies"
        title="Interests that keep the work humane, patient, and sustainable."
        description="These themes shape how I rest, how I explore ideas outside class, and how I return to focused work with more clarity."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {profile.hobbies.map((item) => (
          <Card key={item.title} className="rounded-[2rem] border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
