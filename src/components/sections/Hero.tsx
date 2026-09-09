"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GoldLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { CornerBrackets, Glow } from "@/components/ui/Ornaments";
import { SocialRow } from "@/components/ui/SocialRow";
import { fadeUpVariants, staggerVariants } from "@/components/ui/Motion";
import { site } from "@/lib/content";

export function Hero({
  eyebrow,
  tagline,
  description,
  portraitUrl,
}: {
  eyebrow: string;
  tagline: string;
  description: string;
  portraitUrl: string;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]">
      {/* Ground */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_20%,rgba(168,135,29,0.15),transparent_58%)]"
      />
      <Glow className="-left-40 top-1/3 h-[26rem] w-[26rem]" color="rgba(168,135,29,0.13)" />

      {/* Watermark word, echoing the template's ghosted display type */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[8%] select-none text-center font-display text-[19vw] font-semibold leading-none tracking-[0.16em] text-ink/[0.05]"
      >
        SAMBIL
      </span>

      <Container className="relative z-10 py-20">
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
        >
          {/* Copy */}
          <div>
            <motion.div
              variants={fadeUpVariants}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-10 bg-gold/70" />
              <span className="eyebrow text-gold-strong">{eyebrow}</span>
            </motion.div>

            <h1 className="mb-8">
              <motion.span
                variants={fadeUpVariants}
                className="text-gold-gradient block font-display text-[1.6rem] font-semibold leading-[1.3] tracking-[0.08em] sm:text-[2.1rem] lg:text-[1.8rem] xl:text-[2.2rem]"
              >
                LEARNING
                <Pipe />
                BUILDING
                <Pipe />
                SCALING
              </motion.span>
            </h1>

            <motion.p
              variants={fadeUpVariants}
              className="mb-4 max-w-lg text-[0.95rem] leading-relaxed text-muted"
            >
              {tagline}
            </motion.p>
            <motion.p
              variants={fadeUpVariants}
              className="mb-10 max-w-lg text-[0.95rem] leading-relaxed text-dim"
            >
              {description}
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <GoldLink href="/work" variant="ghost">
                Works
              </GoldLink>
              <GoldLink href="/contact">Hire me</GoldLink>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mt-12">
              <SocialRow />
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div variants={fadeUpVariants} className="relative">
            <div className="relative mx-auto max-w-sm lg:ml-auto lg:mr-0">
              {/* Offset frame behind the image */}
              <span
                aria-hidden="true"
                className="absolute -left-5 -top-5 h-full w-full border border-line-gold"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-panel">
                <Image
                  src={portraitUrl}
                  alt={site.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover object-top grayscale-[0.85] brightness-[1.02] contrast-[1.04]"
                />
                {/* Gold wash, so the portrait sits in the same palette as the page */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-gold/30 via-gold/8 to-transparent mix-blend-overlay"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-paper via-paper/25 to-transparent"
                />
                <CornerBrackets />
              </div>

              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 border border-line-gold bg-paper px-5 py-2.5 whitespace-nowrap">
                <span className="animate-shimmer h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[0.6rem] uppercase tracking-[0.22em] text-ink/80">
                  {site.role}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/** Hairline divider between the heading words. */
function Pipe() {
  return (
    <span
      aria-hidden="true"
      className="mx-1.5 inline-block h-[0.78em] w-px translate-y-[0.06em] bg-gold/45"
    />
  );
}
