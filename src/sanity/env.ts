/**
 * Sanity connection details. Deliberately non-fatal when unset: every read goes
 * through `safeFetch`, which falls back to `src/lib/content.ts`, so a build with
 * no Sanity credentials still produces a complete site.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const hasSanity = projectId.length > 0;
