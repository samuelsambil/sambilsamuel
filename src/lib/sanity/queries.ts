import { groq } from "next-sanity";

const projectCardFields = `
  _id,
  title,
  slug,
  description,
  coverImage,
  techStack,
  category,
  liveUrl,
  githubUrl,
  completedAt
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroEyebrow,
    heroTagline,
    heroDescription,
    portrait,
    currentProject,
    aboutBio,
    socialLinks,
    resumeUrl
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(completedAt desc) [0...4] {
    ${projectCardFields}
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(completedAt desc) {
    ${projectCardFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectCardFields},
    body,
    challenge,
    approach,
    keyLearnings
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] { "slug": slug.current }
`;

/** Slugs plus the dates the sitemap needs for an honest `lastmod`. */
export const projectSitemapQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current,
    "updatedAt": _updatedAt,
    completedAt
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] {
    _id,
    quote,
    clientName,
    clientRole,
    clientCompany,
    clientImage
  }
`;

export const toolsQuery = groq`
  *[_type == "tool"] | order(name asc) {
    _id,
    name,
    category,
    url,
    description
  }
`;
