import { defineField, defineType } from "sanity";

/**
 * A blog post. The field order and the groups below are the writing template:
 * fill in Content, add the Meta, publish. Nothing outside Content is required,
 * so a draft can be started with just a title and a body.
 */
export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "The headline. Keep it under about 70 characters.",
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "One or two sentences. Shown on the blog index and used as the search description.",
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      description: "Optional. A post without one gets a gold monogram card.",
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      group: "content",
      description:
        "The post itself. Headings, lists, quotes, images and code blocks.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published on",
      type: "datetime",
      group: "meta",
      description: "Posts are ordered by this date, newest first.",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      group: "meta",
      options: { layout: "tags" },
      description: "A few words like AI, Robotics, Web. Used as filters.",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "meta",
      description: "Pins the post to the top of the blog index.",
      initialValue: false,
    }),
    defineField({
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      description: "Optional. Linked at the bottom of the post.",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Oldest first",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
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
      publishedAt: "publishedAt",
      featured: "featured",
    },
    prepare({ title, media, publishedAt, featured }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Unpublished";
      return {
        title,
        media,
        subtitle: featured ? `${date} · Featured` : date,
      };
    },
  },
});
