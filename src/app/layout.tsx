import type { Metadata, Viewport } from "next";
import { Cinzel, Jost, Geist_Mono } from "next/font/google";
import { site, siteUrl } from "@/lib/content";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.eyebrow}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.tagline} ${site.description}`,
  keywords: [
    "Samuel Sambil",
    "Sambil",
    "Built by Sambil",
    "AI",
    "robotics",
    "web development",
    "Next.js developer",
    "Ghana",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.eyebrow}`,
    description: site.tagline,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.eyebrow}`,
    description: site.tagline,
    creator: "@i_am_sambil",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${jost.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">{children}</body>
    </html>
  );
}
