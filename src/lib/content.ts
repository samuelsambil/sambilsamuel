export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sambilsamuel.com";

/**
 * Date the static page copy last changed, used as `lastModified` in the
 * sitemap. Projects and posts carry their own dates from Sanity, so this only
 * covers the wording baked into the home, work, blog, about and contact pages.
 * Bump it by hand when that copy actually changes.
 */
export const siteUpdatedAt = "2026-09-09";

export const site = {
  name: "Samuel Sambil",
  shortName: "SAMBIL",
  role: "Builder & Developer",
  eyebrow: "Learning. Building. Scaling.",
  tagline:
    "Builder working across software and hardware, from AI and robotics to websites for small businesses.",
  description:
    "Every project is an opportunity to solve a real problem and learn something new.",
  email: "sambilsamuel1@gmail.com",
} as const;

export const socials = {
  github: "https://github.com/samuelsambil",
  linkedin: "https://www.linkedin.com/in/samuel-sambil-3265a2423/",
  twitter: "https://x.com/i_am_sambil",
  youtube: "https://www.youtube.com/@SambilSamuel",
  email: `mailto:${site.email}`,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const currentlyBuilding = {
  name: "Dharva",
  description:
    "An AI voice model for daily organisation. Schedules, reminders and planning through natural conversation.",
  status: "building" as const,
  url: "",
};

export const services = [
  {
    title: "Website Design & Development",
    description:
      "Custom, modern websites that look sharp and load fast. Built with Next.js, React and Tailwind CSS.",
  },
  {
    title: "E-Commerce",
    description:
      "Online stores that make selling simple. Product catalogues, payments and inventory in one place.",
  },
  {
    title: "Hosting & Maintenance",
    description:
      "Ongoing support so the site keeps running. Updates, performance monitoring and help when you need it.",
  },
];

export const skills = [
  {
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS", "C/C++"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Next.js", "React", "Tailwind CSS", "Sanity"],
  },
  {
    title: "Hardware & IoT",
    items: ["Arduino", "Raspberry Pi", "Sensors & Actuators", "3D Printing"],
  },
  {
    title: "Exploring",
    items: [
      "AI/ML Frameworks",
      "ROS",
      "Edge Computing",
      "Computer Vision",
    ],
  },
];

export const interests = [
  "Artificial Intelligence",
  "Robotics",
  "Sustainability",
  "Web Development",
  "Hardware",
  "Entrepreneurship",
  "Machine Learning",
  "Fitness",
  "Self-Improvement",
  "Cooking",
];

export const bio: string[] = [
  "I am Samuel Sambil, a builder working across both software and hardware, driven by a want to make practical things that hold up in the real world.",
  "It started as curiosity. I wanted to understand how things work underneath, not just at the surface. That pulled me from tinkering with code into building whole systems: a small language model for sustainability guidance, robotics for environmental monitoring, a touch-free sanitizer, and an AI voice model for daily organisation.",
  "I do not think of myself as only a developer. I think at the platform level. Not just apps, but systems and companies. I study founders and companies like Tesla, Nvidia, SpaceX and Google, because I want to build companies, not only projects.",
  "On the side I run Built by Sambil, my web development brand, where I build modern websites for small businesses and individuals.",
  "When I am not building I am learning. I keep a steady weightlifting and nutrition routine, read biographies, history and engineering, follow McKinsey, TechCrunch and tech blogs, and I am teaching myself to cook international cuisines.",
];

export const focusAreas = [
  {
    title: "AI & Machine Learning",
    description:
      "Agentic workflows, world models and multimodal systems. Building things that can reason and then act.",
  },
  {
    title: "Robotics",
    description:
      "Environmental monitoring and hardware-software integration, where the digital meets the physical.",
  },
  {
    title: "Sustainability",
    description:
      "Using technology on environmental problems, from collecting the data to acting on it.",
  },
  {
    title: "Web Development",
    description:
      "Fast, modern web experiences for small businesses through Built by Sambil.",
  },
  {
    title: "Fitness & Discipline",
    description:
      "Weightlifting, nutrition and structured routine. Systems for physical and mental performance.",
  },
  {
    title: "Continuous Learning",
    description:
      "Books, tech writing and international cuisines. Always a subject in progress.",
  },
];

export const faqs = [
  {
    question: "What kind of work do you take on?",
    answer:
      "Websites for small businesses and individuals, plus collaborations on AI, robotics and hardware projects. If it is a real problem and I can learn from it, I am interested.",
  },
  {
    question: "How long does a website take?",
    answer:
      "A focused marketing site usually lands in two to three weeks. Stores and custom builds take longer, and I give you a timeline before any work starts.",
  },
  {
    question: "Do you handle hosting?",
    answer:
      "Yes. I set up hosting, domains and deployment, and I can stay on for updates and monitoring afterwards.",
  },
  {
    question: "How soon do you reply?",
    answer:
      "Within a day or two. Email is the fastest route if something is urgent.",
  },
];
