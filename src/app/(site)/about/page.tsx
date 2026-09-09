import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp, Stagger, StaggerItem } from "@/components/ui/Motion";
import { RichText } from "@/components/ui/RichText";
import { CornerBrackets } from "@/components/ui/Ornaments";
import { GoldLink } from "@/components/ui/Button";
import { safeFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { siteSettingsQuery, toolsQuery } from "@/lib/sanity/queries";
import type { SiteSettings, Tool } from "@/lib/sanity/types";
import { bio, focusAreas, site, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Samuel Sambil is a builder working across software and hardware, from AI and robotics to websites for small businesses.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [settings, tools] = await Promise.all([
    safeFetch<SiteSettings | null>(siteSettingsQuery, {}, null),
    safeFetch<Tool[]>(toolsQuery, {}, []),
  ]);

  const portrait = settings?.portrait
    ? urlFor(settings.portrait).width(840).height(1050).url()
    : "/profile.png";

  const skillGroups =
    tools.length > 0
      ? Object.entries(
          tools.reduce<Record<string, string[]>>((acc, tool) => {
            (acc[tool.category] ||= []).push(tool.name);
            return acc;
          }, {})
        ).map(([title, items]) => ({ title, items }))
      : skills;

  return (
    <>
      <PageHero
        eyebrow="Who I am"
        title="About"
        description={site.tagline}
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[300px_1fr] lg:gap-16">
            <FadeUp>
              <div className="relative mx-auto max-w-[280px] lg:mx-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-4 -top-4 h-full w-full border border-line-gold"
                />
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image
                    src={portrait}
                    alt={site.name}
                    fill
                    priority
                    sizes="280px"
                    className="object-cover object-top grayscale-[0.9] brightness-[0.68] contrast-[1.15]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-br from-gold/45 via-gold/10 to-transparent mix-blend-overlay"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                  />
                  <CornerBrackets />
                </div>
              </div>

              <dl className="mt-10 space-y-4 border-t border-line pt-8">
                <div className="flex justify-between gap-4">
                  <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-dim">
                    Role
                  </dt>
                  <dd className="text-sm text-cream">{site.role}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-dim">
                    Brand
                  </dt>
                  <dd className="text-sm text-cream">Built by Sambil</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-dim">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm text-gold-light transition-colors hover:text-gold"
                    >
                      Say hello
                    </a>
                  </dd>
                </div>
              </dl>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="max-w-2xl">
                {settings?.aboutBio && settings.aboutBio.length > 0 ? (
                  <RichText value={settings.aboutBio} />
                ) : (
                  bio.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`mb-6 text-[0.98rem] leading-[1.85] ${
                        i === 0 ? "text-cream/90" : "text-muted"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-ink-soft py-20">
        <Container>
          <SectionHeading label="Skills & tools" />
          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <StaggerItem key={group.title}>
                <h3 className="mb-5 text-[0.62rem] uppercase tracking-[0.2em] text-gold-light">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line pb-2.5 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading label="What I am into" />
          <Stagger className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, i) => (
              <StaggerItem key={area.title} className="h-full">
                <div className="group flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-surface">
                  <span className="font-display text-xs tracking-[0.24em] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-[0.05em] text-cream transition-colors group-hover:text-gold-light">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">
                    {area.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeUp className="mt-14 flex justify-center">
            <GoldLink href="/contact">Work with me</GoldLink>
          </FadeUp>
        </Container>
      </section>
    </>
  );
}
