import type { EducationEntry, ExperienceEntry } from "@/types";

export const heroContent = {
  eyebrow: "El Salvador · Available for projects",
  name: "Bryan Escobar",
  headline: "I build software that solves real problems.",
  subheadline: "Software Development · Web Applications · Automation · Systems",
  intro:
    "I build web applications and systems that digitise how real businesses operate: less paperwork, fewer mistakes, and decisions based on data that actually exists.",
} as const;

export const aboutPreview = [
  { label: "Location", value: "El Salvador" },
  { label: "Focus", value: "Software Engineering / Systems" },
  { label: "Interests", value: "Software · Automation · Systems · AI" },
] as const;

export const aboutContent = {
  lead: "I'm a systems and network engineering student and a software developer with a fairly concrete way of working: pick a problem that costs someone time or money, and build the whole solution until it's running in production.",
  paragraphs: [
    "My training started on the technical side —electronics and electrical work— before moving into systems, and that mix shaped how I work: I want to understand how something works from the inside before trying to improve it.",
    "Most of what I've built came out of real needs in small businesses: a workshop tracking its jobs in notebooks, a distributor balancing the books from memory every night. In both cases the hard part wasn't writing the code, but understanding the operation, modelling it, and getting the system used every single day.",
    "I work with Node.js, React, JavaScript and TypeScript, SQL databases, and I handle the full cycle: analysis, development, server deployment, HTTPS, backups and maintenance. I'd rather have a simple architecture I can sustain and explain than impressive infrastructure nobody needs.",
  ],
  principles: [
    {
      title: "Problem first",
      description:
        "Before choosing technology, I understand the process being solved. The right tool depends on that, not the other way round.",
    },
    {
      title: "Simple until it can't be",
      description:
        "I don't add infrastructure or abstractions before they're needed. Complexity is justified by a requirement, not by a trend.",
    },
    {
      title: "Get it to production",
      description:
        "A project isn't finished when it runs on my machine, but when someone uses it in their daily work and it keeps running without me.",
    },
    {
      title: "Leave a trail",
      description:
        "Documentation, version history and auditing in the data. Code that can't be explained can't be maintained.",
    },
  ],
} as const;

export const whatIDo = [
  {
    title: "Software Development",
    description:
      "Applications and systems built around a concrete need, from the data model to the interface.",
  },
  {
    title: "Web Applications",
    description:
      "Modern web experiences that are fast, responsive and maintainable, designed to be used daily.",
  },
  {
    title: "Business Automation",
    description:
      "Digitising operational processes: records, inventory, collections and reports that used to live on paper.",
  },
  {
    title: "Systems & Technology",
    description:
      "Analysis, architecture, server deployment and integration of the pieces that keep a system running.",
  },
] as const;

export const techStack = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Server Actions", "JWT"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "SQLite"],
  },
  {
    category: "Tools & Deploy",
    items: ["Git", "GitHub", "VS Code", "Vercel", "nginx", "PM2", "Linux VPS"],
  },
] as const;

export const workProcess = [
  { step: "01", title: "Discover", description: "Understand the problem and who it hurts." },
  { step: "02", title: "Analyze", description: "Identify requirements, data and existing processes." },
  { step: "03", title: "Design", description: "Design the architecture, data model and experience." },
  { step: "04", title: "Build", description: "Develop the solution in short iterations." },
  { step: "05", title: "Test", description: "Validate how it behaves with real cases and real data." },
  { step: "06", title: "Deploy", description: "Ship to production, measure and improve." },
] as const;

export const experience: ExperienceEntry[] = [
  {
    period: "2026",
    title: "ID Inventory — Site inventory control",
    context: "Client in the construction sector · El Salvador",
    description:
      "Technical audit and offline capability for an inventory system already in production, used by warehouse staff on sites with patchy coverage.",
    responsibilities: [
      "Audit of the database and security model: 27 tables with RLS, 40 policies and 31 functions",
      "Offline operation: an IndexedDB queue with staggered retries and guaranteed idempotency",
      "Automatic sync once the signal returns, issuing and filing the matching receipts",
      "Six pre-existing defects found and fixed, verified in production",
      "Documented handover: user, administration and technical manuals",
    ],
    stack: ["PWA", "Supabase", "PostgreSQL", "IndexedDB", "Service Worker", "Vercel"],
  },
  {
    period: "2026",
    title: "SGTT — Workshop management system",
    context: "Own project · Taller Tony",
    description:
      "Design, development and deployment of a web system for a car workshop's daily operation, running today on its own server.",
    responsibilities: [
      "Analysis of the operational process and full database modelling",
      "React front end and REST API in Node.js",
      "Deployment on a VPS with nginx, HTTPS, PM2 and automated backups",
      "Maintenance, versioning and documentation of the system",
    ],
    stack: ["React", "Node.js", "Express", "SQLite", "nginx", "PM2"],
  },
  {
    period: "2025",
    title: "Distribuidora de Huevos Escobar",
    context: "Own project · Family business",
    description:
      "Sales, inventory and accounts receivable system that replaced the daily paper records of a distribution business.",
    responsibilities: [
      "Requirements gathering with the people who run the business",
      "Back end, database and web interface development",
      "Role-based authentication and access control",
      "Rollout and support through the adoption of the system",
    ],
    stack: ["JavaScript", "Node.js", "Express", "SQLite", "JWT"],
  },
  {
    period: "2024 — present",
    title: "Web development and process automation",
    context: "Independent projects",
    description:
      "Custom web solutions for small businesses, focused on digitising manual processes and reducing recording errors.",
    responsibilities: [
      "Process analysis and technical proposal",
      "Full stack development and production deployment",
      "Technical documentation and user training",
    ],
    stack: ["JavaScript", "Node.js", "SQL", "Linux"],
  },
];

export const education: EducationEntry[] = [
  {
    period: "In progress",
    institution: "Universidad Gerardo Barrios",
    degree: "BEng in Systems and Network Engineering",
    detail:
      "Software development, databases, networking and systems architecture.",
  },
  {
    period: "Secondary",
    institution: "Instituto Capitán de Navío DEM César Yanes Urías",
    degree: "Technical Baccalaureate in Electronics and Electrical Engineering",
    detail:
      "Technical grounding in electronics, circuits and hardware troubleshooting.",
  },
];
