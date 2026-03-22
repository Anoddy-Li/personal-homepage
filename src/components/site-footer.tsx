import { profile } from "@/config/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p>{profile.name}</p>
          <p>{profile.role}</p>
        </div>
        <div className="space-y-1 text-left md:text-right">
          <p>Built with Next.js, Tailwind, shadcn/ui, Supabase, and Vercel.</p>
          <p>Update personal details in src/config/profile.ts.</p>
        </div>
      </div>
    </footer>
  );
}
