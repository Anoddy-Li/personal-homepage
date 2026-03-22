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
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(159,188,176,0.16),transparent_38%),radial-gradient(circle_at_88%_10%,rgba(86,110,146,0.09),transparent_22%)]" />
        <div className="ambient-grid absolute inset-0 opacity-[0.28] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.22),transparent)]" />
      </div>
      <SiteHeader />
      <main className="flex-1 pb-14 pt-6 md:pb-20 md:pt-8">{children}</main>
      <SiteFooter isAdmin={session.isAdmin} />
    </div>
  );
}
