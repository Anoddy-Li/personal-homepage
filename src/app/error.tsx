"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-background text-foreground">
        <div className="container-shell flex min-h-screen items-center justify-center">
          <div className="max-w-xl space-y-4 rounded-[2rem] border border-border/70 bg-card/85 p-8 shadow-sm">
            <p className="text-sm text-muted-foreground">页面错误</p>
            <h1 className="font-heading text-4xl font-semibold tracking-tight">页面加载被中断了。</h1>
            <p className="leading-7 text-muted-foreground">
              {error.message || "请稍后再试。如果问题持续存在，可以检查部署日志。"}
            </p>
            <Button onClick={reset} type="button">
              重新加载
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
