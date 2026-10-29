import type { Project } from "@/types";

export const tallerTonyLanding: Project = {
  slug: "taller-tony-landing",
  title: "Taller Tony — Landing Page",
  summary:
    "Website for an auto electrical workshop, with a scroll animation built on canvas: 240 frames painted one by one, without a single video element.",
  year: 2026,
  role: "Design and front-end development (solo project)",
  client: "Taller Tony · La Unión, El Salvador",
  stack: ["Astro", "TypeScript", "CSS", "Canvas API", "WebP"],
  cover: "/projects/cover-taller-tony.png",
  screenshot: "/projects/shot-taller-tony.png",
  screenshotAlt:
    "Full-screen hero of the Taller Tony landing page",
  coverAlt:
    "Cover of the Taller Tony landing page, with the workshop name over a row of vehicles",
  featured: true,
  order: 2,
  status: "finished",
  links: {},
  metrics: [
    { label: "Hero", value: "240 frames" },
    { label: "Dependencies", value: "Astro only" },
    { label: "UI framework", value: "None" },
  ],
  overview: [
    "Taller Tony is an auto electrical, mechanical and lathe workshop in La Unión. Its digital presence amounted to social media, so anyone looking for the workshop couldn't find what it offered, where it was or how to reach it.",
    "The brief was a site that looked the part for a serious workshop and pushed visitors to a single place: a WhatsApp message. It's pure front-end work, with no back end and no admin panel.",
  ],
  problem: [
    "You choose a workshop on trust, and trust comes through the eyes before the text. A generic page with a list of services says exactly the same as the competition.",
    "At the same time, the typical visitor arrives on a phone and on mobile data: anything slow to load is lost before it appears.",
  ],
  challenge: [
    "Getting a hero with real impact without an embedded video, which on mobile is heavy, autoplays only sometimes and can't be driven by scroll.",
    "Presenting six services without building a wall of cards nobody reads.",
    "Keeping the site light and maintainable by one person, without dragging in a UI framework for what is essentially a single page.",
  ],
  solution: [
    "I built the site with Astro, which ships static HTML and only the JavaScript strictly needed, and wrote every line of CSS by hand instead of using a styling framework.",
    "For the hero I developed a scroll-driven animation in the style of Apple's product pages: 240 WebP frames extracted from a 10-second video, preloaded and painted onto a canvas that advances with the scroll position. There is no video element anywhere on the page.",
    "The services scroll horizontally instead of stacking, and the brands served pass by in a continuous marquee of vector logos. The rest —who they are, why choose them, frequently asked questions, location and opening hours— flows down in short sections to the contact.",
  ],
  architecture: [
    "Astro — static HTML, zero JavaScript by default",
    "Components in .astro — one section, one file",
    "ScrollVideo — canvas + 240 WebP frames",
    "Hand-written CSS — no styling framework",
    "Google Fonts and embedded Google Maps",
    "Static output, ready for any host",
  ],
  technologies: [
    { name: "Astro", role: "Site framework: static HTML and minimal JavaScript" },
    { name: "TypeScript", role: "Typed component props, such as the animation's" },
    { name: "CSS", role: "Every bit of styling written by hand, no framework" },
    { name: "Canvas API", role: "Painting the hero frames in sync with the scroll" },
    { name: "WebP", role: "Format for the 240 frames, far lighter than PNG or JPEG" },
    { name: "Bebas Neue + Inter", role: "Condensed headlines and readable body text" },
    { name: "Google Maps", role: "Workshop location embedded in the page" },
  ],
  features: [
    {
      title: "Scroll-driven hero",
      description:
        "240 frames painted on canvas that advance with the scroll, with a progress bar while they preload.",
    },
    {
      title: "Horizontal services",
      description:
        "Six services —diagnostics, oil and filters, brakes, electrical system, air conditioning and alignment— scrolled sideways.",
    },
    {
      title: "Brand marquee",
      description:
        "Twelve vector logos of the brands serviced, in a continuous infinite scroll.",
    },
    {
      title: "Frequently asked questions",
      description:
        "An accordion that answers the usual doubts before the customer has to ask them.",
    },
    {
      title: "Location and hours",
      description:
        "Embedded Google map, opening hours and contact channels in the footer.",
    },
    {
      title: "WhatsApp as the destination",
      description:
        "Every call to action opens WhatsApp with a message already written to book an appointment.",
    },
  ],
  process: [
    "Understanding — Working out what someone needs to know before taking their car to a workshop they don't know.",
    "Structure — Laying the page out as a conversation: what we do, who we are, why trust us, common questions, where we are.",
    "UI Design — Condensed uppercase headlines on a dark background, so the site feels close to the automotive world.",
    "Development — One component per section in Astro, with hand-written CSS and no UI dependencies.",
    "Hero animation — Extracting the video frames, converting them to WebP and developing the canvas component.",
    "Responsive — Adjusting the canvas crop and the horizontal sections for phone screens.",
    "Testing — Checking frame loading, navigation and scroll behaviour across sizes.",
  ],
  decisions: [
    {
      title: "Canvas with frames instead of a video element",
      body: "An embedded video can't be scrubbed by scroll reliably: mobile browsers block autoplay, seeking by position jumps around, and the file downloads in full even if nobody scrolls. With WebP frames drawn on canvas, the animation responds exactly to the scroll, loading progress can be shown, and the hero behaves the same on every device. The cost is the weight of the frames, which I accepted in exchange for full control.",
    },
    {
      title: "Astro instead of React or Next.js",
      body: "The page has no state, no session and no changing data: it's content. Astro delivers static HTML and only ships JavaScript where it's genuinely needed, which here is the hero, the accordion and the marquee. Bringing in a full framework would have multiplied the weight without adding anything.",
    },
    {
      title: "Hand-written CSS, no styling framework",
      body: "The site has a very distinct visual identity —condensed type, black background, red accent— that doesn't come from any existing design system. Writing the CSS by hand turned out shorter and clearer than fighting a framework's defaults.",
    },
    {
      title: "Horizontal scroll for the services",
      body: "Six stacked cards force a long scroll where everything looks the same. Horizontally, each service takes the focus in turn and the movement invites you to continue. On small screens it becomes a touch carousel.",
    },
    {
      title: "A parameterised animation component",
      body: "The hero component takes the number of frames, the source video dimensions and the height of the scroll track. Changing the animation means swapping the files and one parameter, not rewriting the component.",
    },
  ],
  results: [
    "The workshop went from having no website to a page that explains its services, its location and its hours, and pushes visitors towards WhatsApp.",
    "The hero achieves the effect of a video animation while keeping full control of the scroll and without depending on browser autoplay.",
    "The project runs on a single dependency, so maintaining it doesn't mean dragging along an entire ecosystem.",
  ],
  learned: [
    "How you present information weighs as much as the information itself: the same six services communicate differently stacked than scrolled sideways.",
    "Recreating an effect normally solved with a library forces you to understand how it works underneath. Syncing canvas and scroll taught me more than any animation plugin.",
    "Choose the tool for the problem, not out of habit: for a content page, an application framework would have been dead weight.",
  ],
};
