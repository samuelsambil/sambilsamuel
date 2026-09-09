import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { RecentWork } from "@/components/sections/RecentWork";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { safeFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  featuredProjectsQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/lib/sanity/queries";
import type { Project, SiteSettings, Testimonial } from "@/lib/sanity/types";
import { currentlyBuilding, fallbackProjects, site } from "@/lib/content";

export default async function HomePage() {
  const [settings, projects, testimonials] = await Promise.all([
    safeFetch<SiteSettings | null>(siteSettingsQuery, {}, null),
    safeFetch<Project[]>(featuredProjectsQuery, {}, []),
    safeFetch<Testimonial[]>(testimonialsQuery, {}, []),
  ]);

  const featured =
    projects.length > 0
      ? projects
      : fallbackProjects.filter((p) => p.featured);

  const building = {
    name: settings?.currentProject?.name || currentlyBuilding.name,
    description:
      settings?.currentProject?.description || currentlyBuilding.description,
    status: settings?.currentProject?.status || currentlyBuilding.status,
    url: settings?.currentProject?.url || currentlyBuilding.url || undefined,
  };

  return (
    <>
      <Hero
        eyebrow={settings?.heroEyebrow || site.role}
        tagline={settings?.heroTagline || site.tagline}
        description={settings?.heroDescription || site.description}
        portraitUrl={
          settings?.portrait
            ? urlFor(settings.portrait).width(840).height(1050).url()
            : "/profile.png"
        }
      />
      <Marquee />
      <RecentWork projects={featured} />
      <CurrentlyBuilding {...building} />
      <Services />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
