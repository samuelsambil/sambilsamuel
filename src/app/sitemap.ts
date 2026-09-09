import type { MetadataRoute } from "next";
import { safeFetch } from "@/lib/sanity/fetch";
import { projectSlugsQuery } from "@/lib/sanity/queries";
import { fallbackProjects, siteUrl } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fetched = await safeFetch<{ slug: string }[]>(projectSlugsQuery, {}, []);
  const slugs = Array.from(
    new Set([
      ...fetched.map((s) => s.slug),
      ...fallbackProjects.map((p) => p.slug.current),
    ])
  );

  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...slugs.map((slug) => ({
      url: `${siteUrl}/work/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
