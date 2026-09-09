import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-display text-2xl font-semibold tracking-[0.06em] text-cream">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-3 font-display text-xl font-semibold tracking-[0.05em] text-cream">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-gold/60 pl-6 text-cream/85 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-muted">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-5 list-disc space-y-2 text-muted marker:text-gold/60">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2 text-muted marker:text-gold/60">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-cream">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-gold-light">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold-light underline underline-offset-4 transition-colors hover:text-gold"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage & { caption?: string } }) => (
      <figure className="my-10">
        <div className="relative aspect-video overflow-hidden border border-line">
          <Image
            src={urlFor(value).width(1400).url()}
            alt={value.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-center text-xs text-dim">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
