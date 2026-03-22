import { PageHero } from "@/components/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profile } from "@/config/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  description: "联系信息与协作偏好。",
  path: "/contact",
  title: "联系",
});

export default function ContactPage() {
  return (
    <div className="container-shell space-y-10">
      <PageHero
        eyebrow={profile.contactPage.eyebrow}
        title={profile.contactPage.title}
        description={profile.contactPage.description}
      />
      <div className="grid gap-5 md:grid-cols-3">
        <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">邮箱</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-foreground">{profile.contact.email}</p>
            <p className="leading-7 text-muted-foreground">{profile.contact.emailNote}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">所在地</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">{profile.contact.location}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2rem] border-border/70 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">交流方向</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7 text-muted-foreground">{profile.contact.availability}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
