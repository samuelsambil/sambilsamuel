import { client } from "./client";

/**
 * Sanity reads that never break the page. The dataset may be empty or
 * unreachable at build time, in which case components fall back to the
 * content in `src/lib/content.ts`.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    return result ?? fallback;
  } catch {
    return fallback;
  }
}
