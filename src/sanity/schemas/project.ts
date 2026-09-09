import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
    }),
    defineField({
      name: "body",
      title: "Full Write-up",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
      ],
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "AI & Robotics", value: "AI & Robotics" },
          { title: "Web Dev", value: "Web Dev" },
          { title: "Hardware", value: "Hardware" },
          { title: "Experiments", value: "Experiments" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({
      name: "featured",
      title: "Featured on home page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "completedAt", title: "Date", type: "date" }),
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "approach",
      title: "My Approach",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "keyLearnings",
      title: "Key Learnings",
      type: "text",
      rows: 4,
    }),
  ],
  orderings: [
    {
      title: "Date, New",
      name: "completedAtDesc",
      by: [{ field: "completedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "category" },
  },
});
