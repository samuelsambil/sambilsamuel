import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/sanity/types";

export function RecentWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          label="Recent work"
          action={{ href: "/work", label: "See all works" }}
        />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <StaggerItem key={project._id} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
