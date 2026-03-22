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
    <section className="space-y-4">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>
      <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
