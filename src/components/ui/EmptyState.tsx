import Link from "next/link";

/**
 * What a listing shows when Sanity has nothing to show yet. It points at the
 * Studio rather than pretending the section does not exist.
 */
export function EmptyState({
  title,
  description,
  actionLabel = "Open the Studio",
  actionHref = "/studio",
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="border border-dashed border-line-gold bg-panel/40 px-8 py-16 text-center">
      <h2 className="font-display text-xl font-semibold tracking-[0.06em] text-ink">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
        {description}
      </p>
      <Link
        href={actionHref}
        className="mt-8 inline-flex border border-line-gold px-6 py-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-strong transition-all hover:bg-gold/10"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
