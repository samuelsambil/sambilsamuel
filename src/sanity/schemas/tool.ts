import { defineField, defineType } from "sanity";

export const tool = defineType({
  name: "tool",
  title: "Tool / Setup Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Development", value: "Development" },
          { title: "Hardware", value: "Hardware" },
          { title: "Software", value: "Software" },
          { title: "Productivity", value: "Productivity" },
          { title: "Fitness", value: "Fitness" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});
