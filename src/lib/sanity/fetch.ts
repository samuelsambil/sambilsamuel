import { hasSanity } from "@/sanity/env";
import { client } from "./client";

/** Cache tags, so a Sanity webhook can refresh a page the moment you publish. */
export const SANITY_TAG = "sanity";
export const PROJECT_TAG = "project";
export const POST_TAG = "post";

interface FetchOptions {
  /** Extra cache tags on top of `sanity`. */
  tags?: string[];
  /** Seconds before the cached response goes stale. */
  revalidate?: number;
}

/**
 * A Sanity read that never takes the page down with it. The API can be
 * unreachable at build time or the credentials absent, and a portfolio page
 * that renders without its content still beats a 500.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
  options: FetchOptions = {}
): Promise<T> {
  if (!hasSanity) return fallback;

  try {
    const result = await client.fetch<T>(query, params, {
      next: {
        revalidate: options.revalidate ?? 60,
        tags: [SANITY_TAG, ...(options.tags ?? [])],
      },
    });
    return result ?? fallback;
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return fallback;
  }
}
