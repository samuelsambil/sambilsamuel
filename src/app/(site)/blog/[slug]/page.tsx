import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Container } from "@/components/layout/Container";
import { FadeUp } from "@/components/ui/Motion";
import { RichText } from "@/components/ui/RichText";
import { CornerBrackets } from "@/components/ui/Ornaments";
import { formatPostDate, isoDate, readingTime } from "@/lib/blog";
import { articleJsonLd } from "@/lib/jsonLd";
import { POST_TAG, safeFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  adjacentPostsQuery,
  postBySlugQuery,
  postSlugsQuery,
} from "@/lib/sanity/queries";
import type { Post } from "@/lib/sanity/types";

type AdjacentPost = { title: string; slug: { current: string } } | null;

function getPost(slug: string) {
  return safeFetch<Post | null>(postBySlugQuery, { slug }, null, {
    tags: [POST_TAG],
  });
}

export async function generateStaticParams() {
  const slugs = await safeFetch<{ slug: string }[]>(postSlugsQuery, {}, [], {
    tags: [POST_TAG],
  });
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: isoDate(post.publishedAt),
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const { previous, next } = await safeFetch<{
    previous: AdjacentPost;
    next: AdjacentPost;
  }>(
    adjacentPostsQuery,
    { publishedAt: post.publishedAt },
    { previous: null, next: null },
    { tags: [POST_TAG] }
  );

  const cover = post.coverImage
    ? urlFor(post.coverImage).width(1600).height(900).url()
    : null;

  const minutes = readingTime(post.body);

  return (
    <article className="pt-[72px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post)),
        }}
      />

      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(80%_110%_at_50%_0%,rgba(168,135,29,0.14),transparent_60%)]"
        />
        <Container className="relative py-16 sm:py-24">
          <Link
            href="/blog"
            className="mb-10 inline-flex text-[0.65rem] uppercase tracking-[0.2em] text-dim transition-colors hover:text-gold-strong"
          >
            All posts
          </Link>

          <FadeUp>
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              <time
                dateTime={isoDate(post.publishedAt)}
                className="text-[0.62rem] uppercase tracking-[0.2em] text-dim"
              >
                {formatPostDate(post.publishedAt)}
              </time>
              <span aria-hidden="true" className="h-px w-6 bg-gold/50" />
              <span className="text-[0.62rem] uppercase tracking-[0.2em] text-dim">
                {minutes} min read
              </span>
            </div>

            <h1 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-[0.05em] text-ink sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-muted">
              {post.excerpt}
            </p>

            {post.topics && post.topics.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {post.topics.map((topic) => (
                  <span
                    key={topic}
                    className="border border-line-gold px-3 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-gold-strong"
                  >
                    {topic}
                  </span>
                ))}
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
                alt={post.coverImage?.alt || post.title}
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
        <div className="mx-auto max-w-2xl">
          {post.body && post.body.length > 0 && (
            <FadeUp className="text-[0.98rem]">
              <RichText value={post.body} />
            </FadeUp>
          )}

          {post.relatedProjects && post.relatedProjects.length > 0 && (
            <FadeUp className="mt-16 border-t border-line pt-10">
              <h2 className="eyebrow mb-5 text-gold-strong">Related work</h2>
              <ul className="space-y-3">
                {post.relatedProjects.map((project) => (
                  <li key={project._id}>
                    <Link
                      href={`/work/${project.slug.current}`}
                      className="group flex items-baseline justify-between gap-6 border-b border-line pb-3 transition-colors hover:border-line-gold"
                    >
                      <span className="text-sm text-ink transition-colors group-hover:text-gold-strong">
                        {project.title}
                      </span>
                      <span className="text-[0.58rem] uppercase tracking-[0.2em] text-dim">
                        {project.category}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          )}

          {(previous || next) && (
            <nav
              aria-label="More posts"
              className="mt-16 grid gap-6 border-t border-line pt-10 sm:grid-cols-2"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug.current}`}
                  className="group border border-line p-5 transition-colors hover:border-line-gold"
                >
                  <span className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-dim">
                    <FiArrowLeft className="h-3 w-3" />
                    Previous
                  </span>
                  <span className="mt-3 block text-sm text-ink transition-colors group-hover:text-gold-strong">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}

              {next && (
                <Link
                  href={`/blog/${next.slug.current}`}
                  className="group border border-line p-5 text-right transition-colors hover:border-line-gold sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-2 text-[0.58rem] uppercase tracking-[0.2em] text-dim">
                    Next
                    <FiArrowRight className="h-3 w-3" />
                  </span>
                  <span className="mt-3 block text-sm text-ink transition-colors group-hover:text-gold-strong">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </Container>
    </article>
  );
}
