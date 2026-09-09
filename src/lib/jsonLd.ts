import { site, siteUrl, socials } from "./content";

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
