import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

export type ProjectCategory =
  | "AI & Robotics"
  | "Web Dev"
  | "Hardware"
  | "Experiments";

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  techStack?: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  completedAt?: string;
  challenge?: string;
  approach?: string;
  keyLearnings?: string;
}

export interface Testimonial {
  _id: string;
  quote: string;
  clientName: string;
  clientRole?: string;
  clientCompany?: string;
  clientImage?: SanityImage;
}

export interface Tool {
  _id: string;
  name: string;
  category: string;
  url?: string;
  description?: string;
}

export interface SiteSettings {
  heroEyebrow?: string;
  heroTagline?: string;
  heroDescription?: string;
  portrait?: SanityImage;
  currentProject?: {
    name?: string;
    description?: string;
    status?: "building" | "launched" | "experimenting";
    url?: string;
  };
  aboutBio?: PortableTextBlock[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    email?: string;
  };
  resumeUrl?: string;
}
