import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { safeFetch } from "@/lib/sanity/fetch";
import { allProjectsQuery } from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";
import { fallbackProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects across AI, robotics, hardware and the web, built by Samuel Sambil.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const fetched = await safeFetch<Project[]>(allProjectsQuery, {}, []);
  const projects = fetched.length > 0 ? fetched : fallbackProjects;

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
        </Container>
      </section>
    </>
  );
}
