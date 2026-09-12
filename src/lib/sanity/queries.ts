import { groq } from "next-sanity";

const projectCardFields = `
  _id,
  title,
  slug,
  description,
  coverImage,
  techStack,
  category,
  featured,
  liveUrl,
  githubUrl,
  completedAt
`;

const postCardFields = `
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  topics,
  featured,
  publishedAt
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

/**
 * Posts dated in the future stay off the site until their time comes, which
 * makes `publishedAt` a scheduling field rather than just a label.
 */
const publishedPosts = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

export const allPostsQuery = groq`
  *[${publishedPosts}] | order(featured desc, publishedAt desc) {
    ${postCardFields}
  }
`;

export const recentPostsQuery = groq`
  *[${publishedPosts}] | order(publishedAt desc) [0...$limit] {
    ${postCardFields}
  }
`;

export const postBySlugQuery = groq`
  *[${publishedPosts} && slug.current == $slug][0] {
    ${postCardFields},
    body,
    relatedProjects[]-> { _id, title, slug, category }
  }
`;

export const postSlugsQuery = groq`
  *[${publishedPosts}] { "slug": slug.current }
`;

export const postSitemapQuery = groq`
  *[${publishedPosts}] {
    "slug": slug.current,
    "updatedAt": _updatedAt,
    publishedAt
  }
`;

/** The post before and after this one, for the footer of a post page. */
export const adjacentPostsQuery = groq`
  {
    "previous": *[${publishedPosts} && publishedAt < $publishedAt]
      | order(publishedAt desc) [0] { title, slug },
    "next": *[${publishedPosts} && publishedAt > $publishedAt]
      | order(publishedAt asc) [0] { title, slug }
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
