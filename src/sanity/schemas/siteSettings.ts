import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      description: "Small line above the name.",
      initialValue: "Learning. Building. Scaling.",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "text",
      rows: 2,
      description: "Sentence under the name.",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      description: "Hero image. Falls back to /profile.png.",
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
    }),
    defineField({
      name: "currentProject",
      title: "Currently Building",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "Project Name" },
        { name: "description", type: "string", title: "One-line Description" },
        {
          name: "status",
          type: "string",
          title: "Status",
          options: {
            list: [
              { title: "Building", value: "building" },
              { title: "Launched", value: "launched" },
              { title: "Experimenting", value: "experimenting" },
            ],
          },
          initialValue: "building",
        },
        { name: "url", type: "url", title: "URL" },
      ],
    }),
    defineField({
      name: "aboutBio",
      title: "About Page Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "github", type: "url", title: "GitHub" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "twitter", type: "url", title: "Twitter / X" },
        { name: "youtube", type: "url", title: "YouTube" },
        { name: "email", type: "string", title: "Email" },
      ],
    }),
    defineField({ name: "resumeUrl", title: "Resume URL", type: "url" }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
