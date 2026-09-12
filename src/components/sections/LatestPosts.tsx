import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Motion";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/sanity/types";

export function LatestPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-line py-24">
      <Container>
        <SectionHeading
          label="Latest writing"
          action={{ href: "/blog", label: "Read the blog" }}
        />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <StaggerItem key={post._id} className="h-full">
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
