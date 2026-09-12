import { site, siteUrl, socials } from "./content";
import { urlFor } from "./sanity/image";
import type { SanityImage } from "./sanity/types";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}/profile.png`,
    jobTitle: site.role,
    email: site.email,
    description: site.tagline,
    sameAs: [
      socials.github,
      socials.linkedin,
      socials.twitter,
      socials.youtube,
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    description: site.tagline,
  };
}

/** BlogPosting markup for a single post page. */
export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: { current: string };
  publishedAt: string;
  coverImage?: SanityImage;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.slug.current}`,
    datePublished: post.publishedAt,
    image: post.coverImage
      ? urlFor(post.coverImage).width(1200).height(630).url()
      : `${siteUrl}/profile.png`,
    author: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
  };
}
