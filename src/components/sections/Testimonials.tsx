import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { urlFor } from "@/lib/sanity/image";
import type { Testimonial } from "@/lib/sanity/types";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-y border-line bg-paper-soft py-24">
      <Container>
        <SectionHeading label="Kind words" />
        <Stagger className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <StaggerItem key={t._id} className="h-full">
              <figure className="flex h-full flex-col border border-line bg-panel/50 p-8">
                <span
                  aria-hidden="true"
                  className="font-display text-4xl leading-none text-gold/40"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
                  {t.clientImage && (
                    <Image
                      src={urlFor(t.clientImage).width(96).height(96).url()}
                      alt={t.clientName}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm text-ink">{t.clientName}</p>
                    {(t.clientRole || t.clientCompany) && (
                      <p className="text-xs text-dim">
                        {[t.clientRole, t.clientCompany]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
