import type { Project } from "@/types";

export const sgtt: Project = {
  slug: "sgtt-sistema-gestion-taller",
  title: "SGTT — Workshop Management System",
  summary:
    "Web application that digitises the whole operation of a car workshop: job orders, parts inventory, invoicing and accounts receivable, with user control and auditing.",
  year: 2026,
  role: "Design, development and deployment (solo project)",
  client: "Taller Tony",
  stack: ["React", "Node.js", "Express", "SQLite", "JWT", "nginx", "PM2"],
  cover: "/projects/cover-sgtt.png",
  screenshot: "/projects/shot-sgtt.png",
  screenshotAlt:
    "SGTT main dashboard showing active orders, income and inventory",
  coverAlt:
    "Cover of SGTT, the workshop management system: orders, inventory and collections",
  featured: true,
  order: 3,
  status: "production",
  links: {},
  metrics: [
    { label: "Status", value: "In production" },
    { label: "Modules", value: "8+" },
    { label: "Backups", value: "Daily" },
  ],
  overview: [
    "SGTT is a web system built for a car workshop that ran its daily work on notebooks and loose sheets of paper. The goal was never «to make an app»: it was to bring order to the real operation of the business without forcing the team to change how they worked overnight.",
    "The system covers the full life of a job order —vehicle intake, diagnosis, parts used, labour, closing and payment— and keeps inventory and accounts receivable in step with every movement.",
  ],
  problem: [
    "The workshop's information lived on paper and in the owner's memory. There was no reliable way to know how much had been invoiced in a month, which parts were left in the store, or which customers still owed money.",
    "The costliest errors weren't technical but clerical: parts handed over and never charged, jobs closed without being recorded, and debts forgotten until the customer came back months later.",
  ],
  challenge: [
    "The staff had no previous experience with administrative software, so every screen had to explain itself and tolerate mistyped entries.",
    "The business needed genuine availability: if the system went down, the workshop stopped. That called for a stable deployment with automated backups, not a demo.",
    "Corrections had to be possible without destroying history: in a real business invoices get things wrong, but deleting records removes the evidence of what happened.",
  ],
  solution: [
    "I built a web application with a React front end and a REST API in Node.js/Express over SQLite, deployed on my own VPS with nginx as a reverse proxy, HTTPS and PM2 keeping the process alive.",
    "Instead of allowing deletions, the system voids with an audit trail: every voided document keeps who voided it, when and why. The history is never lost.",
    "The system's behaviour is tuned with configuration flags in the database (whether stock is tracked, for example, or whether a worker can void documents), so the same code serves different business rules without reprogramming.",
  ],
  architecture: [
    "Browser — React SPA",
    "nginx — reverse proxy + HTTPS",
    "REST API — Node.js + Express (PM2)",
    "Business logic and validation",
    "SQLite (better-sqlite3) on persistent disk",
    "Automated nightly backup via cron",
  ],
  technologies: [
    { name: "React", role: "Admin panel interface and the job order flow" },
    { name: "Node.js + Express", role: "REST API, business rules and access control" },
    { name: "SQLite (better-sqlite3)", role: "Local, fast persistence with no extra server" },
    { name: "JWT + bcrypt", role: "Role-based authentication and safe password storage" },
    { name: "nginx + Certbot", role: "Reverse proxy, HTTPS and domain exposure" },
    { name: "PM2 + cron", role: "Always-on process, boot start and nightly backups" },
  ],
  features: [
    {
      title: "Job orders",
      description:
        "Vehicle intake, diagnosis, parts, labour and closing, with history by customer.",
    },
    {
      title: "Parts inventory",
      description:
        "Stock in, stock out and automatic deduction on invoicing, optional via configuration.",
    },
    {
      title: "Invoicing and receivables",
      description:
        "Sales documents, partial payments and tracking of outstanding balances by customer.",
    },
    {
      title: "Users and roles",
      description:
        "Separate access for administration and workshop staff, with per-action permissions.",
    },
    {
      title: "Void auditing",
      description:
        "No record with history is deleted: it is marked as void, keeping user, date and reason.",
    },
    {
      title: "Automated backups",
      description:
        "Nightly copy of the database with automatic rotation of the oldest versions.",
    },
  ],
  process: [
    "Research — I followed the workshop's operation to understand how a job order really flows, not how it ideally should.",
    "Requirements — I defined what had to be recorded and what could stay optional so as not to slow the user down.",
    "Architecture — I chose a simple, self-contained stack so the system could live on a single server with no external dependencies.",
    "UI/UX — Screens using the workshop's vocabulary, not the programmer's: «order», «part», «payment».",
    "Development — Short iterations with non-destructive, idempotent database migrations.",
    "Testing — Scripts that sign a valid token and hit the real API, checking whole features and cleaning up test data afterwards.",
    "Deployment — VPS with nginx, HTTPS, PM2 and scheduled backups; updates by pulling the repository and a controlled restart.",
  ],
  decisions: [
    {
      title: "SQLite instead of PostgreSQL",
      body: "For a single-location business with moderate writes and one server, SQLite removes an entire infrastructure layer at no functional cost. The file lives on persistent disk and is backed up with a single command. If the business grew to several concurrent branches, moving to PostgreSQL would be the natural next step.",
    },
    {
      title: "Void instead of delete",
      body: "Allowing straight deletion would have been quicker to implement, but it destroys the accounting trail. Voiding with a reason and a responsible user keeps the evidence and makes mistakes auditable rather than invisible.",
    },
    {
      title: "Idempotent migrations in the code",
      body: "Instead of an external migration tool, each start-up checks for and adds any missing columns. It's a deliberate choice for simplicity: deployment comes down to updating the repository and restarting, with no manual steps to forget.",
    },
    {
      title: "Configuration flags in the database",
      body: "Rules such as stock tracking or voiding permissions change with how the business works. Storing them as configuration avoids parallel code branches and allows the behaviour to be adjusted without a new deployment.",
    },
  ],
  results: [
    "The workshop moved from paper records to a system it can query: invoicing, inventory and outstanding balances no longer depend on memory.",
    "Corrections stopped being a risk: every void is recorded with a responsible user and a reason.",
    "The system runs on its own server with HTTPS, automatic start-up and a daily database backup.",
  ],
  learned: [
    "The biggest obstacle for a system in a real business isn't technical, it's adoption. Screens that speak the user's language get used; screens that speak the programmer's language get abandoned.",
    "Simple infrastructure wins when the maintenance team is one person: fewer pieces means fewer ways to fail at eight in the morning.",
    "Testing against the real API with scripts paid off better than building a UI test suite: it found business logic errors for a fraction of the effort.",
  ],
};
