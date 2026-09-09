import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <span className="eyebrow text-gold-light">Error 404</span>
      <h1 className="text-gold-gradient mt-6 font-display text-6xl font-semibold tracking-[0.14em] sm:text-8xl">
        LOST
      </h1>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
        This page does not exist, or it moved somewhere else.
      </p>
      <Link
        href="/"
        className="mt-10 border border-line-gold px-7 py-3.5 text-[0.65rem] uppercase tracking-[0.22em] text-gold-light transition-all hover:bg-gold/10"
      >
        Back home
      </Link>
    </main>
  );
}
