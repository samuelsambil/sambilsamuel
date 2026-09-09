import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, FadeUp } from "@/components/ui/Motion";
import { GoldLink } from "@/components/ui/Button";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading label="Built by Sambil" />

        <FadeUp className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-[0.06em] text-cream sm:text-4xl">
            I also build websites for{" "}
            <span className="text-gold-gradient">small businesses</span>
          </h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
            Fast, modern sites that help a business look the part and get found.
            Design, build, hosting and the support that comes after.
          </p>
        </FadeUp>

        <Stagger className="grid gap-px border border-line bg-line sm:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={service.title} className="h-full">
              <div className="group flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-surface">
                <span className="font-display text-xs tracking-[0.24em] text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-[0.05em] text-cream transition-colors group-hover:text-gold-light">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp className="mt-12 flex justify-center">
          <GoldLink href="/contact">Need a website</GoldLink>
        </FadeUp>
      </Container>
    </section>
  );
}
