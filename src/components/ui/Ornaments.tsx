/** Hairline corner bracket used around images. */
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
