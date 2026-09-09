import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "group inline-flex items-center justify-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-all duration-300";

const variants = {
  gold: "bg-gradient-to-r from-gold via-gold-soft to-gold px-7 py-3.5 text-ink hover:shadow-[0_0_34px_-6px_rgba(122,95,18,0.32)] hover:brightness-110",
  ghost:
    "border border-line-gold px-7 py-3.5 text-ink/85 hover:border-gold hover:bg-gold/[0.07] hover:text-gold-strong",
  minimal: "text-muted hover:text-gold-strong",
} as const;

type Variant = keyof typeof variants;

export function GoldLink({
  href,
  children,
  variant = "gold",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const classes = `${base} ${variants[variant]} ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function GoldButton({
  children,
  variant = "gold",
  className = "",
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
} & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
