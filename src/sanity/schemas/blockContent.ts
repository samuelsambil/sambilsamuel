import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The rich-text body shared by projects and blog posts. Defining it once means
 * a formatting option added here shows up in every editor at the same time.
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading", value: "h2" },
        { title: "Sub-heading", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.required().uri({
                    scheme: ["http", "https", "mailto"],
                  }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and search.",
        }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineArrayMember({
      name: "codeBlock",
      title: "Code",
      type: "object",
      fields: [
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              { title: "TypeScript", value: "typescript" },
              { title: "JavaScript", value: "javascript" },
              { title: "Python", value: "python" },
              { title: "C / C++", value: "cpp" },
              { title: "Bash", value: "bash" },
              { title: "JSON", value: "json" },
              { title: "Plain text", value: "text" },
            ],
          },
          initialValue: "typescript",
        }),
        defineField({
          name: "code",
          title: "Code",
          type: "text",
          rows: 10,
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: "filename", title: "Filename", type: "string" }),
      ],
      preview: {
        select: { language: "language", filename: "filename", code: "code" },
        prepare({ language, filename, code }) {
          return {
            title: filename || `${language || "code"} snippet`,
            subtitle: (code || "").split("\n")[0],
          };
        },
      },
    }),
  ],
});
