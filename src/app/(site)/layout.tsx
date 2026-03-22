import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSessionContext } from "@/lib/auth";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSessionContext();

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(143,166,139,0.12),transparent_28%),linear-gradient(180deg,rgba(251,250,247,0.96),rgba(244,241,234,0.96))]" />
      <SiteHeader />
      <main className="flex-1 py-14 md:py-16">{children}</main>
      <SiteFooter isAdmin={session.isAdmin} />
    </div>
  );
}
