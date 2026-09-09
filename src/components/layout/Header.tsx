"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks, site } from "@/lib/content";
import { Container } from "./Container";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
            aria-label={`${site.name} home`}
          >
            <Monogram />
            <span className="font-display text-sm font-semibold tracking-[0.34em] text-ink transition-colors group-hover:text-gold-strong">
              {site.shortName}
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "text-gold-strong"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 h-px w-full bg-gold/70" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="border border-line-gold px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-strong transition-all duration-300 hover:bg-gold/10 hover:shadow-[0_0_24px_-8px_rgba(122,95,18,0.34)]"
            >
              Let&apos;s talk
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="text-ink transition-colors hover:text-gold-strong md:hidden"
          >
            {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <Container>
              <nav className="flex flex-col py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-4 text-sm uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold-strong"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Monogram() {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-8 w-8 rotate-45 items-center justify-center border border-line-gold transition-colors group-hover:border-gold"
    >
      <span className="-rotate-45 font-display text-[0.7rem] font-semibold text-gold-strong">
        S
      </span>
    </span>
  );
}
