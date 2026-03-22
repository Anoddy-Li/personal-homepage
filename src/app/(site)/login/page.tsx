import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { PageHero } from "@/components/page-hero";
import { SetupAlert } from "@/components/setup-alert";
import { Card, CardContent } from "@/components/ui/card";
import { profile } from "@/config/profile";
import { getSessionContext } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { getFirstValue } from "@/lib/url";

export const metadata = buildMetadata({
  description: "管理员登录入口。",
  noIndex: true,
  path: "/login",
  title: "后台登录",
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const nextPath = getFirstValue(params.next) ?? "/admin";
  const session = await getSessionContext();

  if (session.isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
      <PageHero
        eyebrow={profile.loginPage.eyebrow}
        title={profile.loginPage.title}
        description={profile.loginPage.description}
      />
      <Card className="rounded-[2rem] border-border/70 bg-card/85 shadow-sm">
        <CardContent className="space-y-6 p-8">
          {!isSupabaseConfigured() ? <SetupAlert /> : <LoginForm nextPath={nextPath} />}
        </CardContent>
      </Card>
    </div>
  );
}
