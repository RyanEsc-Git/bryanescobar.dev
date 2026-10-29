import type { Project } from "@/types";

export const idInventory: Project = {
  slug: "id-inventory",
  title: "ID Inventory — Offline operation",
  summary:
    "Technical audit and offline layer for an inventory system already in production, so warehouse staff could keep working on sites with no signal and nothing would be lost or duplicated once the connection came back.",
  year: 2026,
  role: "Technical audit and development of the offline layer",
  client: "Client in the construction sector · El Salvador",
  stack: ["PWA", "Supabase", "PostgreSQL", "IndexedDB", "Service Worker", "Vercel"],
  cover: "/projects/cover-id-inventory.png",
  coverAlt:
    "ID Inventory project cover: offline operation for site inventory control",
  featured: true,
  order: 1,
  status: "production",
  links: {},
  metrics: [
    { label: "Audit", value: "27 tables · 40 policies" },
    { label: "Defects fixed", value: "6" },
    { label: "Operation", value: "Offline" },
  ],
  overview: [
    "ID Inventory already existed and was running in production: an installable web application for tracking purchases, deliveries and dispatches in construction warehouses. I didn't build it. I joined a system already in use to solve the problem that was holding it back.",
    "The job had two halves: audit the system thoroughly —database, security and business logic— and then build the offline operation, so a storekeeper on a site with no signal could keep recording movements knowing nothing would be lost.",
  ],
  problem: [
    "Site warehouses sit where the construction is, not where the coverage is. The application needed a connection for every operation, so when the signal dropped the work stopped or went back to paper, which is exactly what the system had come to replace.",
    "The risk wasn't only losing a record. A badly handled retry is worse than a failure: a delivery sent twice duplicates stock nobody received, and that error surfaces weeks later in a count that doesn't add up.",
  ],
  challenge: [
    "Working on code I hadn't written, in a system with real users. Any change had to coexist with what was already there without disrupting daily operations.",
    "Understanding the security model first: 27 tables with row-level access control, 40 policies and 31 database functions I had to grasp before touching anything.",
    "Guaranteeing that an operation queued and resent several times produced exactly the same result as if it had been sent once.",
    "Leaving the work maintainable by someone else, not merely working.",
  ],
  solution: [
    "I started with the audit, not the code: I walked the full schema, the access policies and the business functions, documenting what each piece did and where the gaps were. That turned up six pre-existing defects, which I fixed and verified in production.",
    "For offline operation I built a local queue in IndexedDB: with no network, the operation is stored on the device instead of failing, and the user keeps working with a visible indication that they are offline.",
    "Once the signal returns, the queue syncs on its own with staggered retries —each failure waits a little longer than the last— so it doesn't hammer the server when the connection comes back unstable, which is how it usually comes back on a site.",
    "Idempotency is what makes that resend safe: every operation travels with a unique key the server uses to recognise it. If a delivery arrives twice, the second one duplicates nothing. Once confirmed, the system issues and files the matching receipt.",
    "I closed with documentation: user manual, administration manual and technical documentation, so the system doesn't depend on me being available.",
  ],
  architecture: [
    "Installable PWA — Service Worker + app shell",
    "IndexedDB — local queue of pending operations",
    "Sync — staggered retries once the network returns",
    "Supabase Auth + RLS — access by user and warehouse",
    "PostgreSQL + RPC functions — business logic",
    "Vercel — application deployment",
  ],
  technologies: [
    { name: "IndexedDB", role: "Queue of pending operations on the device" },
    { name: "Service Worker", role: "App shell available without network and client version control" },
    { name: "Supabase", role: "Authentication, database, RPC functions and storage" },
    { name: "PostgreSQL + RLS", role: "Relational model with row-level access control" },
    { name: "Idempotency keys", role: "Each operation is identified so a resend can't duplicate it" },
    { name: "Vercel", role: "Deployment and delivery of the application" },
  ],
  features: [
    {
      title: "Works offline",
      description:
        "Operations are recorded with no network, with a visible indicator of the connection status.",
    },
    {
      title: "Pending queue",
      description:
        "Anything captured without signal stays on the device until it is confirmed by the server.",
    },
    {
      title: "Automatic sync",
      description:
        "Once the connection returns, the queue sends itself with staggered retries.",
    },
    {
      title: "Idempotent operations",
      description:
        "Every operation carries a unique key: resending it duplicates no stock and no documents.",
    },
    {
      title: "Receipts",
      description:
        "Once an operation is confirmed, its matching receipt is issued and filed.",
    },
    {
      title: "Handover documentation",
      description:
        "User manual, administration manual and technical documentation of the system.",
    },
  ],
  process: [
    "Audit — A full pass over the schema, the access policies and the business functions before writing a line.",
    "Diagnosis — Documenting the findings, including the pre-existing defects and their real impact on the operation.",
    "Fixes — Six defects resolved and verified against the production system.",
    "Offline design — Which operations get queued, how they are identified and when they count as confirmed.",
    "Implementation — IndexedDB queue, sync with staggered retries and end-to-end idempotency.",
    "Verification — Testing the full cycle: lose the signal, keep working, restore the network and confirm there are no duplicates.",
    "Handover — User, administration and technical documentation.",
  ],
  decisions: [
    {
      title: "Audit before coding",
      body: "The temptation in someone else's system is to go straight to the feature you were asked for. Spending the first stage understanding 27 tables, 40 policies and 31 functions looked like lost time, but it's what let me build the offline layer without breaking the existing access control, and it surfaced six defects nobody had reported yet.",
    },
    {
      title: "Queue instead of fail",
      body: "The easy alternative was to block the interface when there's no network and ask the user to retry. On a construction site that means going back to the notebook. Storing the operation on the device and syncing later keeps the storekeeper working, at the cost of taking on all the complexity of reconciling it afterwards.",
    },
    {
      title: "Idempotency rather than trusting the retry",
      body: "An unprotected retry is a duplication waiting to happen: the server may have processed the operation even if the response never reached the device. Giving each operation a unique key moves the responsibility to the server, which recognises what it has already processed. It's the difference between a queue that works and one that quietly corrupts the inventory.",
    },
    {
      title: "Staggered retries, not immediate ones",
      body: "Connectivity on a site doesn't come back all at once: it appears and disappears. Retrying immediately across several devices would have produced bursts against the server at its most fragile moment. Spacing each retry progressively spreads the load and makes better use of an intermittent signal.",
    },
    {
      title: "Integrate rather than rewrite",
      body: "Proposing a rewrite would have been more comfortable for me and much worse for the client: their system was already in production and working. The value was in adding the missing layer while respecting the existing decisions, even where they weren't the ones I'd have made from scratch.",
    },
  ],
  results: [
    "Warehouse staff can work on sites with no coverage, and the system syncs by itself once the signal returns.",
    "Resends stopped being a risk: a repeated operation duplicates neither stock nor documents.",
    "Six pre-existing defects found in the audit were fixed and verified in production.",
    "The system was handed over documented at three levels —user, administration and technical— so its maintenance doesn't depend on one person.",
  ],
  learned: [
    "Joining someone else's production system calls for a different discipline than starting from scratch: first understand why it was built this way, then propose. The audit wasn't the preamble to the work, it was part of it.",
    "«Offline» isn't a feature, it's a consistency model. The hard part isn't storing data on the device, but deciding what it means for an operation to be confirmed when device and server disagree.",
    "The most expensive errors are the ones that don't fail visibly. Duplicated stock raises no alert: it shows up months later as a shortfall nobody can explain.",
  ],
};
