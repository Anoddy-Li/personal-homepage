import Link from "next/link";

import { StatusAlert } from "@/components/status-alert";

export function SetupAlert() {
  return (
    <div className="space-y-3">
      <StatusAlert
        title="需要完成 Supabase 配置"
        description="网站结构已经准备好，但学习日志依赖数据库；在环境变量补齐之前，日志内容无法读取。"
        tone="info"
      />
      <p className="text-sm text-muted-foreground">
        先把 <code className="rounded bg-secondary px-1.5 py-0.5">.env.example</code> 复制成{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5">.env.local</code>，再补齐 Supabase
        相关环境变量，并按 README 中的步骤执行 migration 和 seed。
      </p>
      <Link href="/contact" className="text-sm text-foreground underline underline-offset-4">
        即使数据库尚未接好，联系页仍然可以正常预览。
      </Link>
    </div>
  );
}
