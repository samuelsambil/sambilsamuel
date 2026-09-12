import type { PortableTextBlock } from "@portabletext/react";

export function formatPostDate(value: string | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Machine-readable date for `<time dateTime>`, empty when the date is junk. */
export function isoDate(value: string | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

/**
 * Reading time from the Portable Text body. Counts words in text spans and
 * ignores images and code, at the 200 words a minute people usually assume.
 */
export function readingTime(body: PortableTextBlock[] | undefined): number {
  if (!body || body.length === 0) return 1;

  let words = 0;
  for (const block of body) {
    if (block._type !== "block") continue;
    const children = (block.children ?? []) as { text?: string }[];
    for (const child of children) {
      if (typeof child.text !== "string") continue;
      words += child.text.trim().split(/\s+/).filter(Boolean).length;
    }
  }

  return Math.max(1, Math.round(words / 200));
}
