import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { SetupAlert } from "@/components/setup-alert";
import { StatusAlert } from "@/components/status-alert";
import { buttonVariants } from "@/components/ui/button";
import { getSessionContext } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionContext();

  if (!session.isConfigured) {
    return (
      <div className="container-shell py-10">
        <SetupAlert />
      </div>
    );
  }

  if (!session.isAuthenticated) {
    redirect("/login?next=/admin");
  }

  if (!session.isAdmin) {
    return (
      <div className="container-shell py-10">
        <StatusAlert
          title="没有权限"
          description="这个账号已经登录，但没有在 ADMIN_EMAILS 中被配置为管理员。"
          tone="error"
        />
      </div>
    );
  }

  return (
    <div className="container-shell space-y-8 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">后台管理</p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight">学习日志管理</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants({ variant: "outline" })} href="/admin">
            概览
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/admin/study-logs">
            日志列表
          </Link>
          <Link className={buttonVariants()} href="/admin/study-logs/new">
            新建日志
          </Link>
          <LogoutButton />
        </div>
      </header>
      {children}
    </div>
  );
}
