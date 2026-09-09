import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Studio",
  description: "Content management for sambilsamuel.com",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

/**
 * The Studio takes over the whole viewport and brings its own theme, so it
 * sits outside the site's dark shell rather than inside it.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="fixed inset-0 z-[100] bg-white">{children}</div>;
}
