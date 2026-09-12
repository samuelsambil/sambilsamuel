import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Container } from "@/components/layout/Container";
import { FadeUp } from "@/components/ui/Motion";
import { RichText } from "@/components/ui/RichText";
import { CornerBrackets } from "@/components/ui/Ornaments";
import { PROJECT_TAG, safeFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { projectBySlugQuery, projectSlugsQuery } from "@/lib/sanity/queries";
import type { Project } from "@/lib/sanity/types";

function getProject(slug: string) {
  return safeFetch<Project | null>(projectBySlugQuery, { slug }, null, {
    tags: [PROJECT_TAG],
  });
}

export async function generateStaticParams() {
  const slugs = await safeFetch<{ slug: string }[]>(projectSlugsQuery, {}, [], {
    tags: [PROJECT_TAG],
  });
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

const detailBlocks = [
  { key: "challenge", label: "The challenge" },
  { key: "approach", label: "My approach" },
  { key: "keyLearnings", label: "Key learnings" },
] as const;

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const cover = project.coverImage
    ? urlFor(project.coverImage).width(1600).height(900).url()
    : null;

  return (
    <article className="pt-[72px]">
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(80%_110%_at_50%_0%,rgba(168,135,29,0.14),transparent_60%)]"
        />
        <Container className="relative py-16 sm:py-24">
          <Link
            href="/work"
            className="mb-10 inline-flex text-[0.65rem] uppercase tracking-[0.2em] text-dim transition-colors hover:text-gold-strong"
          >
            All work
          </Link>

          <FadeUp>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="border border-line-gold px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-gold-strong">
                {project.category}
              </span>
              {project.completedAt && (
                <span className="text-[0.62rem] uppercase tracking-[0.2em] text-dim">
                  {new Date(project.completedAt).getFullYear()}
                </span>
              )}
            </div>

            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-[0.06em] text-ink sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted">
              {project.description}
            </p>

            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-9 flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-gold via-gold-soft to-gold px-6 py-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink transition-all hover:brightness-110"
                  >
                    Visit site
                    <FiExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 border border-line-gold px-6 py-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-gold-strong transition-all hover:bg-gold/10"
                  >
                    Source
                    <FiGithub className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}
          </FadeUp>
        </Container>
      </section>

      {cover && (
        <Container className="relative -mt-px py-14">
          <FadeUp>
            <div className="relative aspect-video overflow-hidden border border-line">
              <Image
                src={cover}
                alt={project.coverImage?.alt || project.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
              />
              <CornerBrackets />
            </div>
          </FadeUp>
        </Container>
      )}

      <Container className="py-16">
        <div className="grid gap-14 lg:grid-cols-[1fr_260px]">
          <div>
            {detailBlocks.map(({ key, label }) =>
              project[key] ? (
                <FadeUp key={key} className="mb-12">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="eyebrow text-gold-strong">{label}</span>
                    <span className="rule-gold h-px flex-1 opacity-30" />
                  </div>
                  <p className="text-[0.95rem] leading-relaxed text-muted">
                    {project[key]}
                  </p>
                </FadeUp>
              ) : null
            )}

            {project.body && project.body.length > 0 && (
              <FadeUp className="mt-4 text-[0.95rem]">
                <RichText value={project.body} />
              </FadeUp>
            )}
          </div>

          <aside className="lg:border-l lg:border-line lg:pl-10">
            {project.techStack && project.techStack.length > 0 && (
              <FadeUp>
                <h2 className="eyebrow mb-5 text-gold-strong">Built with</h2>
                <ul className="space-y-2.5">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="border-b border-line pb-2.5 text-sm text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </FadeUp>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}
