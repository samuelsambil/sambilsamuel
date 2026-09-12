import Image from "next/image";
import Link from "next/link";
import { formatPostDate, isoDate } from "@/lib/blog";
import { urlFor } from "@/lib/sanity/image";
import type { Post } from "@/lib/sanity/types";

export function PostCard({ post }: { post: Post }) {
  const cover = post.coverImage
    ? urlFor(post.coverImage).width(760).height(430).url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group relative flex h-full flex-col border border-line bg-panel/60 transition-all duration-500 hover:border-line-gold hover:bg-panel"
    >
      {cover && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={cover}
            alt={post.coverImage?.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-paper/80 via-transparent to-transparent"
          />
        </div>
      )}

      <div
        className={`flex flex-1 flex-col p-6 transition-colors duration-500 ${
          cover ? "border-t border-line group-hover:border-line-gold" : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <time
            dateTime={isoDate(post.publishedAt)}
            className="text-[0.6rem] uppercase tracking-[0.2em] text-dim"
          >
            {formatPostDate(post.publishedAt)}
          </time>
          {post.featured && (
            <span className="border border-line-gold px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.2em] text-gold-strong">
              Featured
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-[0.04em] text-ink transition-colors group-hover:text-gold-strong">
          {post.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-[0.82rem] leading-relaxed text-muted">
          {post.excerpt}
        </p>

        {post.topics && post.topics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
            {post.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-[0.6rem] uppercase tracking-[0.16em] text-dim"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <span className="mt-6 text-[0.62rem] uppercase tracking-[0.2em] text-gold-strong opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          Read the post
        </span>
      </div>
    </Link>
  );
}
