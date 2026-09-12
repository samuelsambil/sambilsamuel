import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./env";
import { schemaTypes } from "./schemas";
import { initialValueTemplates } from "./schemas/templates";

export const studioConfig = defineConfig({
  name: "sambilsamuel",
  title: "Samuel Sambil",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),
            S.divider(),

            S.listItem()
              .title("Work")
              .child(
                S.list()
                  .title("Work")
                  .items([
                    S.listItem()
                      .title("All projects")
                      .child(
                        S.documentTypeList("project")
                          .title("All projects")
                          .defaultOrdering([
                            { field: "completedAt", direction: "desc" },
                          ])
                      ),
                    S.listItem()
                      .title("Featured on home page")
                      .child(
                        S.documentList()
                          .title("Featured projects")
                          .filter('_type == "project" && featured == true')
                          .defaultOrdering([
                            { field: "completedAt", direction: "desc" },
                          ])
                      ),
                    S.divider(),
                    ...["AI & Robotics", "Web Dev", "Hardware", "Experiments"].map(
                      (category) =>
                        S.listItem()
                          .title(category)
                          .child(
                            S.documentList()
                              .title(category)
                              .filter(
                                '_type == "project" && category == $category'
                              )
                              .params({ category })
                              .defaultOrdering([
                                { field: "completedAt", direction: "desc" },
                              ])
                          )
                    ),
                  ])
              ),

            S.listItem()
              .title("Blog")
              .child(
                S.list()
                  .title("Blog")
                  .items([
                    S.listItem()
                      .title("All posts")
                      .child(
                        S.documentTypeList("post")
                          .title("All posts")
                          .defaultOrdering([
                            { field: "publishedAt", direction: "desc" },
                          ])
                      ),
                    S.listItem()
                      .title("Featured")
                      .child(
                        S.documentList()
                          .title("Featured posts")
                          .filter('_type == "post" && featured == true')
                          .defaultOrdering([
                            { field: "publishedAt", direction: "desc" },
                          ])
                      ),
                    S.listItem()
                      .title("Scheduled")
                      .child(
                        S.documentList()
                          .title("Scheduled posts")
                          .filter('_type == "post" && publishedAt > now()')
                          .defaultOrdering([
                            { field: "publishedAt", direction: "asc" },
                          ])
                      ),
                  ])
              ),

            S.divider(),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("tool").title("Tools & Skills"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      // Site Settings is a singleton, so it never appears in "Create new".
      ...prev.filter((template) => template.schemaType !== "siteSettings"),
      ...initialValueTemplates,
    ],
  },
});
