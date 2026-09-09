import type { Project } from "@/lib/sanity/types";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sambilsamuel.com";

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

export const fallbackProjects: Project[] = [
  {
    _id: "sustainability-llm",
    title: "Sustainability LLM",
    slug: { current: "sustainability-llm" },
    description:
      "A small language model tuned to give practical sustainability guidance and environmental awareness insights.",
    techStack: ["Python", "Transformers", "NLP"],
    category: "AI & Robotics",
    featured: true,
    completedAt: "2025-06-01",
    challenge:
      "General purpose models give generic sustainability advice that ignores local context, cost and what a person can actually act on today.",
    approach:
      "Curated a focused dataset of environmental practices, fine-tuned a compact open model on it, and shaped the prompting so every answer ends in a concrete next step.",
    keyLearnings:
      "Data quality beats model size for a narrow domain. A small, well-fed model outperformed a much larger general one on the answers that mattered.",
  },
  {
    _id: "environmental-monitoring-robot",
    title: "Environmental Monitoring Robot",
    slug: { current: "environmental-monitoring-robot" },
    description:
      "A robotics system that collects and transmits live sensor readings from locations that are awkward or unsafe to visit.",
    techStack: ["Python", "Raspberry Pi", "Sensors", "Telemetry"],
    category: "Hardware",
    featured: true,
    completedAt: "2025-03-01",
    challenge:
      "Environmental data in remote spots gets collected by hand, rarely and inconsistently, so trends are invisible until they are problems.",
    approach:
      "Built a mobile sensor platform on a Raspberry Pi with air, temperature and humidity sensors, and a telemetry link that pushes readings back on an interval.",
    keyLearnings:
      "Hardware punishes optimism. Power budget and weather sealing shaped the design far more than the software ever did.",
  },
  {
    _id: "built-by-sambil",
    title: "Built by Sambil",
    slug: { current: "built-by-sambil" },
    description:
      "My web development brand. Modern, fast websites for small businesses and individuals who need a real presence online.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Sanity"],
    category: "Web Dev",
    featured: true,
    completedAt: "2025-08-01",
    liveUrl: "https://builtbysambil.com",
    challenge:
      "Small businesses are sold either a template that looks like everyone else or an agency package they cannot afford to maintain.",
    approach:
      "A repeatable stack: Next.js for speed, a headless CMS so owners edit their own copy, and hosting set up so the running cost stays close to nothing.",
    keyLearnings:
      "Clients do not buy technology. They buy the confidence that the site will keep working after I hand it over.",
  },
  {
    _id: "dharva-voice-assistant",
    title: "Dharva Voice Assistant",
    slug: { current: "dharva-voice-assistant" },
    description:
      "An AI voice model for daily organisation. Schedules, reminders and planning through natural conversation.",
    techStack: ["Python", "Speech Recognition", "LLMs"],
    category: "AI & Robotics",
    featured: true,
    completedAt: "2025-09-01",
    challenge:
      "Planning tools demand typing and tapping at exactly the moments when your hands and attention are busy elsewhere.",
    approach:
      "Pairing speech recognition with an intent layer so a spoken sentence turns straight into a scheduled item, with the model asking only when something is genuinely ambiguous.",
    keyLearnings:
      "Latency is the whole product. A correct answer that arrives late feels worse than a fast answer you have to correct.",
  },
  {
    _id: "touch-free-sanitizer",
    title: "Touch-Free Sanitizer System",
    slug: { current: "touch-free-sanitizer" },
    description:
      "An automatic hand sanitizer dispenser built from an ultrasonic sensor, a pump and a microcontroller.",
    techStack: ["Arduino", "C++", "Ultrasonic Sensors"],
    category: "Hardware",
    completedAt: "2024-11-01",
    challenge:
      "Shared dispensers defeat their own purpose. The surface everyone touches sits directly between them and clean hands.",
    approach:
      "An ultrasonic sensor triggers a small pump through a microcontroller, with the dispense volume tuned so a single pass gives enough without waste.",
    keyLearnings:
      "The first working prototype took an evening. Making it reliable enough to leave unattended took considerably longer.",
  },
];

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
