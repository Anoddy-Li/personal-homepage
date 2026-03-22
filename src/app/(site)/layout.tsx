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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(132,193,196,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(246,243,237,0.92))]" />
      <SiteHeader isAdmin={session.isAdmin} />
      <main className="flex-1 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
