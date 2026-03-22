import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[65vh] items-center justify-center py-16">
      <div className="max-w-xl space-y-4 rounded-[2rem] border border-border/70 bg-card/85 p-8 shadow-sm">
        <p className="text-sm text-muted-foreground">404</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">你访问的页面不存在。</h1>
        <p className="leading-7 text-muted-foreground">
          这个地址可能已经变更，或者链接已经失效。你可以从导航继续访问首页、关于我、学习日志和联系页面。
        </p>
        <Link className="text-foreground underline underline-offset-4" href="/">
          返回首页
        </Link>
      </div>
    </div>
  );
}
