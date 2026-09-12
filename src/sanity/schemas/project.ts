import { defineField, defineType } from "sanity";

export const PROJECT_CATEGORIES = [
  "AI & Robotics",
  "Web Dev",
  "Hardware",
  "Experiments",
] as const;

/**
 * A piece of work. The three text fields under Story — challenge, approach,
 * learnings — are the spine of every project page, so they sit together in
 * their own group rather than being buried at the bottom of one long form.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "story", title: "Story" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "The name of the project as it appears everywhere.",
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "The URL. Press Generate after you settle on the title.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "One or two sentences for the card and the search description.",
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "Optional. A project without one gets a gold monogram card.",
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: PROJECT_CATEGORIES.map((value) => ({ title: value, value })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techStack",
      title: "Tech stack",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      options: { layout: "tags" },
      description: "Listed in the sidebar. The first four show on the card.",
    }),
    defineField({
      name: "challenge",
      title: "The challenge",
      type: "text",
      rows: 4,
      group: "story",
      description: "The problem, stated plainly. What was actually wrong?",
    }),
    defineField({
      name: "approach",
      title: "My approach",
      type: "text",
      rows: 4,
      group: "story",
      description: "What you built and the decisions behind it.",
    }),
    defineField({
      name: "keyLearnings",
      title: "Key learnings",
      type: "text",
      rows: 4,
      group: "story",
      description: "What the project taught you, including what went wrong.",
    }),
    defineField({
      name: "body",
      title: "Full write-up",
      type: "blockContent",
      group: "story",
      description:
        "Optional. A longer piece below the story, with images and code.",
    }),
    defineField({
      name: "completedAt",
      title: "Date",
      type: "date",
      group: "meta",
      description: "Projects are ordered by this date, newest first.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on home page",
      type: "boolean",
      group: "meta",
      description: "The home page shows the three most recent featured projects.",
      initialValue: false,
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      group: "meta",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      group: "meta",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "completedAtDesc",
      by: [{ field: "completedAt", direction: "desc" }],
    },
    {
      title: "Oldest first",
      name: "completedAtAsc",
      by: [{ field: "completedAt", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      category: "category",
      featured: "featured",
    },
    prepare({ title, media, category, featured }) {
      return {
        title,
        media,
        subtitle: featured ? `${category} · Featured` : category,
      };
    },
  },
});
