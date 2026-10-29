import type { Project } from "@/types";

export const distribuidoraHuevos: Project = {
  slug: "distribuidora-huevos-escobar",
  title: "Distribuidora de Huevos Escobar",
  summary:
    "Sales, inventory and accounts receivable system for a distributor delivering on routes, where the daily record depended on handwritten notes.",
  year: 2025,
  role: "Analysis, development and deployment (solo project)",
  client: "Distribuidora de Huevos Escobar",
  stack: ["JavaScript", "Node.js", "Express", "SQLite", "JWT"],
  cover: "/projects/cover-distribuidora.png",
  screenshot: "/projects/shot-distribuidora.png",
  screenshotAlt:
    "Dashboard of the distributor's system showing sales, collections and daily targets",
  coverAlt:
    "Cover of the Distribuidora Escobar system: route sales and accounts receivable",
  featured: true,
  order: 4,
  status: "production",
  links: {},
  metrics: [
    { label: "Operation", value: "Daily" },
    { label: "Modules", value: "Sales · Inventory · Collections" },
    { label: "Users", value: "Multi-role" },
  ],
  overview: [
    "A distribution business lives on two numbers: what went out and what got paid. At this distributor both were written down by hand at the end of the day, and reconciling them was a memory exercise repeated every night.",
    "The system records sales by customer, deducts inventory, tracks the balance of those who buy on credit, and lets anyone check the history without relying on a notebook.",
  ],
  problem: [
    "Product went out on the route and came back as cash, unsold stock or debt, with no record tying the three together.",
    "Accounts receivable were the weakest point: balances lived in scattered notes, and a forgotten debt was money lost without anyone noticing.",
  ],
  challenge: [
    "The system had to be faster than paper. If recording a sale took longer than writing it down, nobody was going to use it.",
    "The users weren't technical: the interface had to work with the vocabulary of the business and the fewest possible steps.",
    "Inventory and sales had to stay consistent even when an earlier record was corrected.",
  ],
  solution: [
    "I developed a web application with a Node.js/Express back end and SQLite, and a front end in modular JavaScript with no framework, prioritising instant loading and a short capture flow.",
    "Recording a sale deducts inventory and updates the customer's balance in the same operation, so the three views of the business always agree.",
    "JWT authentication with hashed passwords separates what administration can do from what the route staff can do.",
  ],
  architecture: [
    "Browser — modular JavaScript (ES Modules)",
    "REST API — Node.js + Express",
    "JWT + bcrypt authentication",
    "Sales, inventory and collections logic",
    "SQLite (better-sqlite3)",
  ],
  technologies: [
    { name: "JavaScript (ES Modules)", role: "Framework-free interface with minimal load" },
    { name: "Node.js + Express", role: "REST API and business rules" },
    { name: "SQLite (better-sqlite3)", role: "Embedded database, backed up as a single file" },
    { name: "JWT + bcrypt", role: "Secure sessions and credentials" },
    { name: "CSS", role: "Responsive interface built from scratch, no dependencies" },
  ],
  features: [
    {
      title: "Sales recording",
      description: "Quick capture by customer and product, with the total calculated automatically.",
    },
    {
      title: "Inventory control",
      description: "Stock in and automatic deduction on sale, with quantities always visible.",
    },
    {
      title: "Accounts receivable",
      description: "Balance by customer, payment recording and access to the debt history.",
    },
    {
      title: "Customers",
      description: "Record with contact details, purchase history and account status.",
    },
    {
      title: "Period reports",
      description: "Sales and collections by date range, to close the day or the month.",
    },
    {
      title: "Users and access",
      description: "Separate roles for administration and day-to-day operation.",
    },
  ],
  process: [
    "Research — I watched a real delivery day end to end before writing any code.",
    "Requirements — I cut recording a sale down to the fewest possible fields.",
    "Architecture — Lightweight back end and database, designed to run on a single machine.",
    "UI/UX — A framework-free interface to keep load and complexity low.",
    "Development — Built module by module: sales first, then inventory, then collections.",
    "Testing — Validated with the business's real data before replacing the notebook.",
    "Deployment — Rollout with a backup of the database file.",
  ],
  decisions: [
    {
      title: "Framework-free JavaScript on the front end",
      body: "For an admin panel this size, a framework would have added weight and a build step without solving a real problem. ES Modules and hand-written CSS gave a fast interface that one person can maintain.",
    },
    {
      title: "Consistency in a single operation",
      body: "Sale, inventory and balance update together. Separating them would have been more flexible, but it opened the door to inconsistent states: stock deducted with no sale recorded, or a sale with no debt attached.",
    },
    {
      title: "SQLite as a file you can back up",
      body: "Having the whole database as a single file makes a backup a copy, not a procedure. For a business with no technical staff, that's the difference between having backups and talking about them.",
    },
  ],
  results: [
    "Closing the day stopped depending on reconstructing it from memory.",
    "Customer debts became visible and queryable at any time, not only when the customer came back.",
    "Inventory reflects the day's sales without a manual count to know what's left.",
  ],
  learned: [
    "When the system competes against paper, capture speed matters more than the number of features.",
    "Modelling the business well up front —what a sale is, what a payment is, what a debt is— saves weeks of corrections later.",
    "Starting with the module that hurts most (accounts receivable) earns the user's trust from day one.",
  ],
};
