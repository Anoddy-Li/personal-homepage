import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseStudyLogRepository } from "@/db/study-log-repository";
import { getSessionContext } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listAdminStudyLogs, summarizeStudyLogs } from "@/lib/study-log-service";

export default async function AdminDashboardPage() {
  const session = await getSessionContext();
  const { logs } = await listAdminStudyLogs({
    actor: session.user,
    rawFilters: {},
    repo: createSupabaseStudyLogRepository(createSupabaseAdminClient()),
  });
  const summary = summarizeStudyLogs(logs);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
        {[
          { label: "日志总数", value: summary.totalCount },
          { label: "已公开", value: summary.publicCount },
          { label: "草稿", value: summary.draftCount },
        ].map((item) => (
          <Card key={item.label} className="rounded-[2rem] border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle className="text-base text-muted-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-5xl font-semibold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="rounded-[2rem] border-border/70 bg-card/80">
        <CardHeader>
          <CardTitle className="font-heading text-3xl">最近更新</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {logs.slice(0, 5).map((log) => (
            <div key={log.id} className="rounded-2xl border border-border/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{log.title}</p>
                  <p className="text-sm text-muted-foreground">{log.summary}</p>
                </div>
                <p className="text-sm text-muted-foreground">{log.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
