import { FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/Motion";
import { GoldLattice } from "@/components/ui/Ornaments";

const statusLabel = {
  building: "Building",
  launched: "Launched",
  experimenting: "Experimenting",
} as const;

export function CurrentlyBuilding({
  name,
  description,
  status = "building",
  url,
}: {
  name: string;
  description: string;
  status?: keyof typeof statusLabel;
  url?: string;
}) {
  const body = (
    <div className="relative overflow-hidden border border-line-gold bg-[linear-gradient(105deg,#101017_0%,#16161f_55%,rgba(201,162,39,0.10)_100%)] px-8 py-12 sm:px-12">
      <GoldLattice className="absolute -right-6 -top-8 h-56 w-40 opacity-40" />

      <div className="relative max-w-2xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="animate-shimmer h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="text-[0.6rem] uppercase tracking-[0.24em] text-gold-light">
            {statusLabel[status]}
          </span>
        </div>

        <h3 className="font-display text-3xl font-semibold tracking-[0.1em] text-cream sm:text-4xl">
          {name}
        </h3>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">
          {description}
        </p>

        {url && (
          <span className="mt-7 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-gold-light">
            Visit
            <FiArrowRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-8">
      <Container>
        <SectionHeading label="Currently building" />
        <FadeUp>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform duration-500 hover:-translate-y-1"
            >
              {body}
            </a>
          ) : (
            body
          )}
        </FadeUp>
      </Container>
    </section>
  );
}
