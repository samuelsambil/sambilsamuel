"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowDownRight, FiArrowRight } from "react-icons/fi";
import { GoldLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { CornerBrackets, GoldLattice, Glow } from "@/components/ui/Ornaments";
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
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_20%,rgba(201,162,39,0.13),transparent_58%)]"
      />
      <Glow className="-left-40 top-1/3 h-[26rem] w-[26rem]" color="rgba(201,162,39,0.08)" />

      {/* Watermark word, echoing the template's ghosted display type */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[8%] select-none text-center font-display text-[19vw] font-semibold leading-none tracking-[0.16em] text-cream/[0.028]"
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
              <span className="eyebrow text-gold-light">{eyebrow}</span>
            </motion.div>

            <h1 className="mb-8">
              <motion.span
                variants={fadeUpVariants}
                className="block font-display text-xl font-medium tracking-[0.3em] text-cream/80 sm:text-2xl"
              >
                THE WORK OF
              </motion.span>
              <motion.span
                variants={fadeUpVariants}
                className="text-gold-gradient mt-3 block font-display text-[3.4rem] font-semibold leading-[0.95] tracking-[0.12em] sm:text-7xl lg:text-8xl"
              >
                SAMBIL
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
                <FiArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </GoldLink>
              <GoldLink href="/contact">
                Hire me
                <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </GoldLink>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mt-12">
              <SocialRow />
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div variants={fadeUpVariants} className="relative">
            <GoldLattice className="animate-float absolute -right-4 top-6 hidden h-56 w-44 opacity-70 sm:block lg:-right-10" />

            <div className="relative mx-auto max-w-sm lg:ml-auto lg:mr-0">
              {/* Offset frame behind the image */}
              <span
                aria-hidden="true"
                className="absolute -left-5 -top-5 h-full w-full border border-line-gold"
              />
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={portraitUrl}
                  alt={site.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover object-top grayscale-[0.9] brightness-[0.68] contrast-[1.15]"
                />
                {/* Gold wash, so the portrait sits in the same palette as the page */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-gold/45 via-gold/10 to-transparent mix-blend-overlay"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
                />
                <CornerBrackets />
              </div>

              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 border border-line-gold bg-ink px-5 py-2.5 whitespace-nowrap">
                <span className="animate-shimmer h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[0.6rem] uppercase tracking-[0.22em] text-cream/80">
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
