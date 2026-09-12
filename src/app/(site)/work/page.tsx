import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { PROJECT_TAG, safeFetch } from "@/lib/sanity/fetch";
import { allProjectsQuery } from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects across AI, robotics, hardware and the web, built by Samuel Sambil.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await safeFetch<Project[]>(allProjectsQuery, {}, [], {
    tags: [PROJECT_TAG],
  });

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <>
      <PageHero
        eyebrow="Selected projects"
        title="Work"
        description="Things I have built across AI, robotics, hardware and the web. Each one started as a problem worth solving."
      />

      <section className="py-20">
        <Container>
          {projects.length === 0 ? (
            <EmptyState
              title="No projects published yet"
              description="Projects live in Sanity. Add one in the Studio and it appears here within a minute."
            />
          ) : (
            <>
              <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="text-[0.62rem] uppercase tracking-[0.2em] text-dim"
                  >
                    {category}
                    <span className="ml-2 text-gold/50">
                      {projects.filter((p) => p.category === category).length}
                    </span>
                  </span>
                ))}
              </div>

              <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <StaggerItem key={project._id} className="h-full">
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
