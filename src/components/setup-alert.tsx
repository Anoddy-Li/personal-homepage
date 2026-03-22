import Link from "next/link";

import { StatusAlert } from "@/components/status-alert";

export function SetupAlert() {
  return (
    <div className="space-y-3">
      <StatusAlert
        title="Supabase setup required"
        description="The site is ready, but database-backed study logs need Supabase environment variables before content can load."
        tone="info"
      />
      <p className="text-sm text-muted-foreground">
        Copy <code className="rounded bg-secondary px-1.5 py-0.5">.env.example</code> to{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5">.env.local</code>, fill the
        Supabase keys, then run the migration and seed steps from the README.
      </p>
      <Link href="/contact" className="text-sm text-foreground underline underline-offset-4">
        Contact page preview is still available while setup is pending.
      </Link>
    </div>
  );
}
