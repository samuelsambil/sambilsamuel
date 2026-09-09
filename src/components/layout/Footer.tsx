import Link from "next/link";
import { navLinks, site } from "@/lib/content";
import { SocialRow } from "@/components/ui/SocialRow";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[110px]"
      />

      <Container className="relative py-20">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow text-gold-light">Let&apos;s connect</span>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            Get in touch for project work, collaborations, or just to talk about
            what you are building.
          </p>
          <div className="mt-8">
            <SocialRow />
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 text-base tracking-[0.06em] text-cream transition-colors hover:text-gold-light"
          >
            {site.email}
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-line pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs tracking-[0.14em] text-dim">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <nav className="flex flex-wrap justify-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.65rem] uppercase tracking-[0.2em] text-dim transition-colors hover:text-gold-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
