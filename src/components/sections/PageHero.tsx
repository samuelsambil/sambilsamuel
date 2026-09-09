import { Container } from "@/components/layout/Container";
import { FadeUp } from "@/components/ui/Motion";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[72px]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_0%,rgba(201,162,39,0.12),transparent_62%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-4 select-none text-center font-display text-[15vw] font-semibold leading-none tracking-[0.14em] text-cream/[0.025]"
      >
        {title.toUpperCase()}
      </span>

      <Container className="relative py-20 sm:py-28">
        <FadeUp className="text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow text-gold-light">{eyebrow}</span>
            <span className="h-px w-8 bg-gold/60" />
          </div>
          <h1 className="text-gold-gradient font-display text-4xl font-semibold tracking-[0.14em] sm:text-6xl">
            {title.toUpperCase()}
          </h1>
          {description && (
            <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted">
              {description}
            </p>
          )}
        </FadeUp>
      </Container>
    </section>
  );
}
