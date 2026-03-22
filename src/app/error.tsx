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
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Unexpected error
            </p>
            <h1 className="font-heading text-4xl font-semibold tracking-tight">
              Something interrupted the page.
            </h1>
            <p className="leading-7 text-muted-foreground">
              {error.message || "Please try again. If the issue persists, check the deployment logs."}
            </p>
            <Button onClick={reset} type="button">
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
