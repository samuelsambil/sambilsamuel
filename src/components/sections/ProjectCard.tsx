import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/sanity/types";

/** Deterministic gold monogram stands in when a project has no cover image. */
function Placeholder({ title }: { title: string }) {
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(80%_80%_at_50%_25%,rgba(201,162,39,0.14),transparent_70%)]">
      <span className="text-gold-gradient font-display text-4xl font-semibold tracking-[0.18em]">
        {initials}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.coverImage
    ? urlFor(project.coverImage).width(760).height(570).url()
    : null;

  return (
    <Link
      href={`/work/${project.slug.current}`}
      className="group relative flex h-full flex-col border border-line bg-surface/60 transition-all duration-500 hover:border-line-gold hover:bg-surface"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={project.coverImage?.alt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Placeholder title={project.title} />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
        />
        <span className="absolute left-4 top-4 border border-line-gold bg-ink/70 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-gold-light backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col border-t border-line p-5 transition-colors duration-500 group-hover:border-line-gold">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold tracking-[0.05em] text-cream transition-colors group-hover:text-gold-light">
            {project.title}
          </h3>
          <FiArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
        </div>

        <p className="mt-3 line-clamp-2 text-[0.8rem] leading-relaxed text-muted">
          {project.description}
        </p>

        {project.techStack && project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 pt-3">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[0.6rem] uppercase tracking-[0.16em] text-dim"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
