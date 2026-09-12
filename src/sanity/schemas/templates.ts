import type { Template } from "sanity";

/** Portable Text array items need a stable `_key`, generated per new document. */
function key() {
  return Math.random().toString(36).slice(2, 12);
}

function heading(text: string) {
  return {
    _key: key(),
    _type: "block",
    style: "h2",
    children: [{ _key: key(), _type: "span", text, marks: [] }],
  };
}

function paragraph(text = "") {
  return {
    _key: key(),
    _type: "block",
    style: "normal",
    children: [{ _key: key(), _type: "span", text, marks: [] }],
  };
}

/** An outline of headings with an empty paragraph waiting under each one. */
function outline(headings: string[]) {
  return headings.flatMap((text) => [heading(text), paragraph()]);
}

/**
 * "Create new" starters. Picking one of these opens a document that is already
 * shaped like the finished thing, so writing means filling in blanks rather
 * than remembering which sections a project page or a post is supposed to have.
 */
export const initialValueTemplates: Template[] = [
  {
    id: "project-starter",
    title: "Project — starter",
    schemaType: "project",
    value: () => ({
      category: "Web Dev",
      featured: false,
      completedAt: new Date().toISOString().slice(0, 10),
      techStack: [],
      challenge: "",
      approach: "",
      keyLearnings: "",
    }),
  },
  {
    id: "project-case-study",
    title: "Project — full case study",
    schemaType: "project",
    value: () => ({
      category: "Web Dev",
      featured: true,
      completedAt: new Date().toISOString().slice(0, 10),
      techStack: [],
      challenge: "",
      approach: "",
      keyLearnings: "",
      body: outline([
        "Background",
        "How it works",
        "What I would change",
      ]),
    }),
  },
  {
    id: "post-starter",
    title: "Blog post — starter",
    schemaType: "post",
    value: () => ({
      publishedAt: new Date().toISOString(),
      featured: false,
      topics: [],
      body: [paragraph()],
    }),
  },
  {
    id: "post-build-log",
    title: "Blog post — build log",
    schemaType: "post",
    value: () => ({
      publishedAt: new Date().toISOString(),
      featured: false,
      topics: [],
      body: outline([
        "What I set out to build",
        "How it went",
        "What broke",
        "What is next",
      ]),
    }),
  },
];
