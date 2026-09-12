import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/sections/PostCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FadeUp, Stagger, StaggerItem } from "@/components/ui/Motion";
import { CornerBrackets } from "@/components/ui/Ornaments";
import { formatPostDate, isoDate } from "@/lib/blog";
import { POST_TAG, safeFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { allPostsQuery } from "@/lib/sanity/queries";
import type { Post } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Build logs and notes from Samuel Sambil on AI, robotics, hardware and the web.",
  alternates: { canonical: "/blog" },
};

/** The newest post gets a wide panel above the grid. */
function LeadPost({ post }: { post: Post }) {
  const cover = post.coverImage
    ? urlFor(post.coverImage).width(1600).height(900).url()
    : null;

  return (
    <FadeUp className="mb-14">
      <Link
        href={`/blog/${post.slug.current}`}
        className="group grid gap-8 border border-line bg-panel/60 p-6 transition-all duration-500 hover:border-line-gold hover:bg-panel sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center"
      >
        {cover && (
          <div className="relative aspect-video overflow-hidden border border-line">
            <Image
              src={cover}
              alt={post.coverImage?.alt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <CornerBrackets />
          </div>
        )}

        <div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="eyebrow text-gold-strong">Latest</span>
            <time
              dateTime={isoDate(post.publishedAt)}
              className="text-[0.62rem] uppercase tracking-[0.2em] text-dim"
            >
              {formatPostDate(post.publishedAt)}
            </time>
          </div>

          <h2 className="mt-5 font-display text-2xl font-semibold leading-snug tracking-[0.05em] text-ink transition-colors group-hover:text-gold-strong sm:text-3xl">
            {post.title}
          </h2>

          <p className="mt-5 max-w-xl text-[0.92rem] leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <span className="mt-8 inline-flex text-[0.65rem] uppercase tracking-[0.2em] text-gold-strong">
            Read the post
          </span>
        </div>
      </Link>
    </FadeUp>
  );
}

export default async function BlogPage() {
  const posts = await safeFetch<Post[]>(allPostsQuery, {}, [], {
    tags: [POST_TAG],
  });

  const [lead, ...rest] = posts;
  const topics = Array.from(new Set(posts.flatMap((post) => post.topics ?? [])));

  return (
    <>
      <PageHero
        eyebrow="Notes and build logs"
        title="Blog"
        description="What I am building, what broke along the way, and what I would do differently next time."
      />

      <section className="py-20">
        <Container>
          {posts.length === 0 ? (
            <EmptyState
              title="No posts published yet"
              description="Posts live in Sanity. Write one in the Studio, set a publish date, and it appears here within a minute."
            />
          ) : (
            <>
              {topics.length > 0 && (
                <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-[0.62rem] uppercase tracking-[0.2em] text-dim"
                    >
                      {topic}
                      <span className="ml-2 text-gold/50">
                        {
                          posts.filter((post) => post.topics?.includes(topic))
                            .length
                        }
                      </span>
                    </span>
                  ))}
                </div>
              )}

              <LeadPost post={lead} />

              {rest.length > 0 && (
                <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <StaggerItem key={post._id} className="h-full">
                      <PostCard post={post} />
                    </StaggerItem>
                  ))}
                </Stagger>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
