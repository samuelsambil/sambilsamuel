/**
 * Seeds the Sanity dataset with the content that used to be hard-coded in the
 * site, plus one example blog post.
 *
 *   node scripts/seed-sanity.mjs
 *
 * Every document is created with `createIfNotExists`, so running it twice is
 * safe: anything you have since edited in the Studio is left alone.
 *
 * Document ids must not contain a dot. Sanity reserves dotted ids for drafts
 * and system documents, and the public read grant (`_id in path("*")`) skips
 * them, so a dotted id would be invisible to the live site.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv(file) {
  try {
    for (const line of readFileSync(resolve(file), "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const value = match[2].replace(/^["']|["']$/g, "");
      if (!process.env[match[1]]) process.env[match[1]] = value;
    }
  } catch {
    // No .env.local is fine as long as the variables are already exported.
  }
}

loadEnv(".env.local");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN. " +
      "Copy .env.example to .env.local and fill them in."
  );
  process.exit(1);
}

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}${Date.now().toString(36)}`;

const span = (text) => ({ _key: key(), _type: "span", text, marks: [] });
const block = (style, text) => ({
  _key: key(),
  _type: "block",
  style,
  children: [span(text)],
});
const p = (text) => block("normal", text);
const h2 = (text) => block("h2", text);

const projects = [
  {
    _id: "project-sustainability-llm",
    title: "Sustainability LLM",
    slug: "sustainability-llm",
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
    _id: "project-environmental-monitoring-robot",
    title: "Environmental Monitoring Robot",
    slug: "environmental-monitoring-robot",
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
    _id: "project-built-by-sambil",
    title: "Built by Sambil",
    slug: "built-by-sambil",
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
    _id: "project-dharva-voice-assistant",
    title: "Dharva Voice Assistant",
    slug: "dharva-voice-assistant",
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
    _id: "project-touch-free-sanitizer",
    title: "Touch-Free Sanitizer System",
    slug: "touch-free-sanitizer",
    description:
      "An automatic hand sanitizer dispenser built from an ultrasonic sensor, a pump and a microcontroller.",
    techStack: ["Arduino", "C++", "Ultrasonic Sensors"],
    category: "Hardware",
    featured: false,
    completedAt: "2024-11-01",
    challenge:
      "Shared dispensers defeat their own purpose. The surface everyone touches sits directly between them and clean hands.",
    approach:
      "An ultrasonic sensor triggers a small pump through a microcontroller, with the dispense volume tuned so a single pass gives enough without waste.",
    keyLearnings:
      "The first working prototype took an evening. Making it reliable enough to leave unattended took considerably longer.",
  },
];

const projectDocs = projects.map(({ slug, ...rest }) => ({
  _type: "project",
  ...rest,
  slug: { _type: "slug", current: slug },
}));

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  heroEyebrow: "Learning. Building. Scaling.",
  heroTagline:
    "Builder working across software and hardware, from AI and robotics to websites for small businesses.",
  heroDescription:
    "Every project is an opportunity to solve a real problem and learn something new.",
  currentProject: {
    name: "Dharva",
    description:
      "An AI voice model for daily organisation. Schedules, reminders and planning through natural conversation.",
    status: "building",
  },
  aboutBio: [
    p(
      "I am Samuel Sambil, a builder working across both software and hardware, driven by a want to make practical things that hold up in the real world."
    ),
    p(
      "It started as curiosity. I wanted to understand how things work underneath, not just at the surface. That pulled me from tinkering with code into building whole systems: a small language model for sustainability guidance, robotics for environmental monitoring, a touch-free sanitizer, and an AI voice model for daily organisation."
    ),
    p(
      "I do not think of myself as only a developer. I think at the platform level. Not just apps, but systems and companies. I study founders and companies like Tesla, Nvidia, SpaceX and Google, because I want to build companies, not only projects."
    ),
    p(
      "On the side I run Built by Sambil, my web development brand, where I build modern websites for small businesses and individuals."
    ),
    p(
      "When I am not building I am learning. I keep a steady weightlifting and nutrition routine, read biographies, history and engineering, follow McKinsey, TechCrunch and tech blogs, and I am teaching myself to cook international cuisines."
    ),
  ],
  socialLinks: {
    github: "https://github.com/samuelsambil",
    linkedin: "https://www.linkedin.com/in/samuel-sambil-3265a2423/",
    twitter: "https://x.com/i_am_sambil",
    youtube: "https://www.youtube.com/@SambilSamuel",
    email: "sambilsamuel1@gmail.com",
  },
};

const posts = [
  {
    _id: "post-why-i-write-here",
    _type: "post",
    title: "Why I am writing this down",
    slug: { _type: "slug", current: "why-i-write-here" },
    excerpt:
      "A short first post on what this blog is for: build logs, the things that broke, and what I would do differently next time.",
    topics: ["Writing", "Building"],
    featured: true,
    publishedAt: new Date().toISOString(),
    body: [
      p(
        "Most of what I learn while building never leaves my own head. A sensor that needed a different power budget, a model that got worse when I gave it more data, a client site that taught me more about handover than about code. It stays as a vague memory and I end up relearning it a year later."
      ),
      h2("What goes here"),
      p(
        "Build logs, mostly. What I set out to do, what actually happened, and the part I would change. Some of it will be about AI and robotics, some about the web work I do through Built by Sambil, and some about the habits that keep the rest of it running."
      ),
      h2("What does not"),
      p(
        "No tutorials rewritten from documentation, and nothing I have not actually built. If a post claims something works, it is because I watched it work."
      ),
      p(
        "That is the whole idea. If you are building something similar, I hope the mistakes save you an evening."
      ),
    ],
    relatedProjects: [
      { _key: key(), _type: "reference", _ref: "project-dharva-voice-assistant" },
    ],
  },
];

const documents = [siteSettings, ...projectDocs, ...posts];

const mutations = documents.map((doc) => ({ createIfNotExists: doc }));

const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`;

const response = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ mutations }),
});

const result = await response.json();

if (!response.ok || result.error) {
  console.error("Seed failed:");
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

console.log(
  `Seeded ${dataset}: ${documents.length} documents submitted, ` +
    `${result.results?.length ?? 0} written or already present.`
);
for (const item of result.results ?? []) {
  console.log(`  ${item.operation.padEnd(8)} ${item.id}`);
}
