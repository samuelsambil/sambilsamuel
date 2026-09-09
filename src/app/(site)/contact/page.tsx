import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/ui/Motion";
import { SocialRow } from "@/components/ui/SocialRow";
import { faqs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Samuel Sambil about project work, websites, or collaborations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        description="Project work, a website for your business, or just a conversation about what you are building. All of it is welcome."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <SectionHeading label="Send a message" />
              <ContactForm />
            </div>

            <div className="space-y-12">
              <FadeUp>
                <h2 className="eyebrow mb-5 text-gold-strong">Direct</h2>
                <a
                  href={`mailto:${site.email}`}
                  className="text-base tracking-[0.04em] text-ink transition-colors hover:text-gold-strong"
                >
                  {site.email}
                </a>
                <div className="mt-7">
                  <SocialRow />
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 className="eyebrow mb-5 text-gold-strong">Questions</h2>
                <dl className="divide-y divide-[color:var(--color-line)] border-y border-line">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="py-5">
                      <dt className="text-sm font-medium text-ink">
                        {faq.question}
                      </dt>
                      <dd className="mt-2 text-[0.82rem] leading-relaxed text-muted">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
