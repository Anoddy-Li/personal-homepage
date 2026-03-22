import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: "联系信息与协作偏好。",
  path: "/contact",
  title: "Contact",
});

export default function ContactPage() {
  return (
    <div className="container-shell space-y-10">
      <PageHero
        eyebrow="Contact"
        title="A simple contact page that is easy to update later."
        description="The layout is ready for your real contact details. Replace the placeholders in src/config/profile.ts before publishing broadly."
      />
      <div className="grid gap-5 md:grid-cols-3">
        <Card className="rounded-[2rem] border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">{profile.contact.emailLabel}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">{profile.contact.location}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">{profile.contact.availability}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
