/**
 * Decorative gold geometry borrowed from the template's hero: a chevron
 * lattice that fades out, and a hairline corner bracket used around images.
 */
export function GoldLattice({ className = "" }: { className?: string }) {
  const rows = 9;
  const cols = 7;
  const cell = 26;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${cols * cell} ${rows * cell}`}
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="latticeFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8c87e" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#c9a227" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const x = c * cell;
          const y = r * cell;
          return (
            <path
              key={`${r}-${c}`}
              d={`M${x} ${y + cell} L${x + cell / 2} ${y} L${x + cell} ${y + cell}`}
              stroke="url(#latticeFade)"
              strokeWidth="1"
            />
          );
        })
      )}
    </svg>
  );
}

export function CornerBrackets({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <span className="absolute -left-px -top-px h-8 w-8 border-l border-t border-gold/60" />
      <span className="absolute -right-px -top-px h-8 w-8 border-r border-t border-gold/60" />
      <span className="absolute -bottom-px -left-px h-8 w-8 border-b border-l border-gold/60" />
      <span className="absolute -bottom-px -right-px h-8 w-8 border-b border-r border-gold/60" />
    </div>
  );
}

/** Soft radial glow used behind hero and section anchors. */
export function Glow({
  className = "",
  color = "rgba(201,162,39,0.16)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[110px] ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}
