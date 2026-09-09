import { interests } from "@/lib/content";

export function Marquee() {
  const track = [...interests, ...interests];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-soft py-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-soft to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-soft to-transparent"
      />
      <div className="animate-marquee flex w-max items-center gap-10">
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">
              {item}
            </span>
            <span aria-hidden="true" className="text-gold/60">
              &#9670;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
