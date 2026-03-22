import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[65vh] items-center justify-center py-16">
      <div className="max-w-xl space-y-4 rounded-[2rem] border border-border/70 bg-card/85 p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">404</p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight">
          The page you requested is not here.
        </h1>
        <p className="leading-7 text-muted-foreground">
          It may have moved, or the link may be outdated. The Study Log, About page, and contact
          details are still available from the main navigation.
        </p>
        <Link className="text-foreground underline underline-offset-4" href="/">
          Return to the homepage
        </Link>
      </div>
    </div>
  );
}
