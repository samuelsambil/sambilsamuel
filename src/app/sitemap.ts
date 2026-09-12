import type { MetadataRoute } from "next";
import { POST_TAG, PROJECT_TAG, safeFetch } from "@/lib/sanity/fetch";
import { postSitemapQuery, projectSitemapQuery } from "@/lib/sanity/queries";
import { siteUpdatedAt, siteUrl } from "@/lib/content";

type SitemapEntry = {
  slug: string;
  updatedAt?: string | null;
  completedAt?: string | null;
  publishedAt?: string | null;
};

/** Parses a Sanity date, ignoring anything that is missing or malformed. */
function toDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * `lastModified` has to mark a real content change. A timestamp that moves on
 * every request teaches crawlers to ignore the field, so project and post pages
 * date from Sanity and the static pages from `siteUpdatedAt`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([
    safeFetch<SitemapEntry[]>(projectSitemapQuery, {}, [], {
      tags: [PROJECT_TAG],
    }),
    safeFetch<SitemapEntry[]>(postSitemapQuery, {}, [], { tags: [POST_TAG] }),
  ]);

  const siteDate = toDate(siteUpdatedAt) ?? new Date();

  // The blog index changes whenever its newest post does.
  const newestPost = posts
    .map((post) => toDate(post.updatedAt) ?? toDate(post.publishedAt))
    .filter((date): date is Date => date !== null)
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const entries = (items: SitemapEntry[], prefix: string, priority: number) =>
    items
      .filter((item) => item.slug)
      .map((item) => ({
        url: `${siteUrl}${prefix}/${item.slug}`,
        lastModified:
          toDate(item.updatedAt) ??
          toDate(item.completedAt) ??
          toDate(item.publishedAt) ??
          siteDate,
        changeFrequency: "yearly" as const,
        priority,
      }));

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
      url: `${siteUrl}/blog`,
      lastModified: newestPost ?? siteDate,
      changeFrequency: "weekly",
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
    ...entries(projects, "/work", 0.6),
    ...entries(posts, "/blog", 0.6),
  ];
}
