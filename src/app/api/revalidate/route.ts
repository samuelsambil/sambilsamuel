import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { POST_TAG, PROJECT_TAG, SANITY_TAG } from "@/lib/sanity/fetch";

/**
 * Sanity webhook target. Without it, an edit takes up to a minute to appear
 * because that is the cache window in `safeFetch`; with it, publishing in the
 * Studio refreshes the affected pages straight away.
 *
 * Set SANITY_REVALIDATE_SECRET, then in sanity.io/manage add a webhook:
 *   URL     https://sambilsamuel.com/api/revalidate?secret=<the secret>
 *   Trigger create, update, delete
 *   Filter  _type in ["project", "post", "siteSettings"]
 *   Payload { "_type": _type }
 */
const TAGS_BY_TYPE: Record<string, string> = {
  project: PROJECT_TAG,
  post: POST_TAG,
};

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "SANITY_REVALIDATE_SECRET is not set." },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const provided =
    url.searchParams.get("secret") ??
    request.headers.get("x-revalidate-secret");

  if (provided !== secret) {
    return NextResponse.json({ error: "Invalid secret." }, { status: 401 });
  }

  let type: string | undefined;

  try {
    const body = (await request.json()) as { _type?: string };
    type = body._type;
  } catch {
    // A webhook with no payload still means something changed.
  }

  // Every query carries the `sanity` tag, so this covers types without one
  // of their own, such as siteSettings, testimonials and tools.
  const tags = [SANITY_TAG];
  const specific = type ? TAGS_BY_TYPE[type] : undefined;
  if (specific) tags.push(specific);

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: tags, type: type ?? null });
}
