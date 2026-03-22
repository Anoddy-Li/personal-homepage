export function PageHero({
  eyebrow,
  description,
  title,
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="space-y-3">
      <p className="text-sm text-muted-foreground">{eyebrow}</p>
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>
      <p className="max-w-3xl leading-8 text-muted-foreground md:text-lg">{description}</p>
    </section>
  );
}
