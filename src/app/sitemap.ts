import type { MetadataRoute } from "next";
import { safeFetch } from "@/lib/sanity/fetch";
import { projectSitemapQuery } from "@/lib/sanity/queries";
import { fallbackProjects, siteUpdatedAt, siteUrl } from "@/lib/content";

type SitemapProject = {
  slug: string;
  updatedAt?: string | null;
  completedAt?: string | null;
};

/** Parses a Sanity date, ignoring anything that is missing or malformed. */
function toDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * `lastModified` has to mark a real content change. A timestamp that moves on
 * every request teaches crawlers to ignore the field, so project pages date
 * from Sanity and the static pages from `siteUpdatedAt`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fetched = await safeFetch<SitemapProject[]>(
    projectSitemapQuery,
    {},
    []
  );

  const siteDate = toDate(siteUpdatedAt) ?? new Date();

  // Fallback content first, so a slug Sanity also knows about keeps its
  // position in the list and picks up the live date below.
  const projectDates = new Map<string, Date>();
  for (const project of fallbackProjects) {
    projectDates.set(
      project.slug.current,
      toDate(project.completedAt) ?? siteDate
    );
  }
  for (const project of fetched) {
    if (!project.slug) continue;
    const date = toDate(project.updatedAt) ?? toDate(project.completedAt);
    if (date || !projectDates.has(project.slug)) {
      projectDates.set(project.slug, date ?? siteDate);
    }
  }

  return [
    {
      url: siteUrl,
      lastModified: siteDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: siteDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: siteDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: siteDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...Array.from(projectDates, ([slug, lastModified]) => ({
      url: `${siteUrl}/work/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
