import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The template's section rule: a gold label, a hairline that eats the
 * remaining width, and an optional action on the far right.
 */
export function SectionHeading({
  label,
  action,
  children,
}: {
  label: string;
  action?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-5">
        <span className="eyebrow shrink-0 text-gold-light">{label}</span>
        <span className="rule-gold h-px flex-1 opacity-40" />
        {action && (
          <Link
            href={action.href}
            className="shrink-0 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold-light"
          >
            {action.label}
          </Link>
        )}
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-3xl font-semibold tracking-[0.06em] text-cream sm:text-4xl ${className}`}
    >
      {children}
    </h2>
  );
}
