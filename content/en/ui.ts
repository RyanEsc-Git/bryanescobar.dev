import type { UIDictionary } from "../es/ui";

/**
 * Interface strings in English.
 *
 * The Spanish dictionary is the reference: this object must satisfy the same
 * shape, so a missing key becomes a type error instead of a blank label.
 */

export const ui: UIDictionary = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    resume: "Download CV",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    home_aria: "home",
  },

  hero: {
    viewProjects: "See my work",
    contactMe: "Get in touch",
    resume: "CV",
    window: {
      file: "developer.ts",
      close: "Close the window",
      minimize: "Minimise the window",
      zoom: "Zoom the window",
      restore: "Restore the window",
      reopen: "Open developer.ts",
    },
  },

  home: {
    selectedWork: {
      eyebrow: "Selected Work",
      title: "Projects that solve something real",
      description:
        "Each one started as a manual process that cost time or money. Open the case study to see the problem, the architecture and the decisions behind it.",
      allProjects: "All projects",
    },
    about: {
      eyebrow: "About",
      more: "More about me",
    },
    whatIDo: {
      eyebrow: "What I Do",
      title: "Four ways of solving the same kind of problem",
      description:
        "Everything I build points the same way: turning a manual, scattered or error-prone process into a system you can measure and maintain.",
    },
    stack: {
      eyebrow: "Tech Stack",
      title: "Tools I use and can explain",
      description:
        "Not a list of everything out there: these are the technologies I have built and shipped real systems with.",
    },
    process: {
      eyebrow: "How I work",
      title: "From problem to production",
      description:
        "A short, repeatable method. Most of the value shows up before the first line of code.",
    },
  },

  cta: {
    eyebrow: "Contact",
    title: "Shall we build something?",
    description:
      "I'm open to professional opportunities, collaborations and projects where technology solves a concrete need.",
    contact: "Get in touch",
  },

  projects: {
    eyebrow: "Projects",
    title: "Case studies, not loose screenshots",
    description:
      "Each project documents the problem it solved, the architecture I chose, the trade-offs I accepted and what I learned along the way.",
    viewCaseStudy: "Read case study",
    metaTitle: "Projects",
    metaDescription:
      "Case studies of systems and web applications built for real businesses: problem, architecture, technical decisions and results.",
  },

  projectStatus: {
    production: "In production",
    development: "In development",
    finished: "Completed",
  },

  caseStudy: {
    label: "Case Study",
    backToProjects: "All projects",
    liveDemo: "Live site",
    sourceCode: "Source",
    client: "Client",
    year: "Year",
    role: "Role",
    stack: "Stack",
    nextProject: "Next project",
    sections: {
      overview: "Overview",
      problem: "The problem",
      challenge: "The challenge",
      solution: "The solution",
      architecture: "Architecture",
      technologies: "Technologies",
      features: "Features",
      process: "Development process",
      decisions: "Decisions and trade-offs",
      results: "Results",
      learned: "What I learned",
    },
    table: {
      technology: "Technology",
      role: "Role",
    },
    notFound: {
      title: "Project not found",
      description: "The case study you're looking for doesn't exist.",
    },
  },

  about: {
    eyebrow: "About",
    title: "I build systems someone uses every day",
    principles: {
      eyebrow: "Principles",
      title: "How I decide",
      description:
        "Four rules I apply to every project, from the first conversation to deployment.",
    },
    education: {
      eyebrow: "Education",
      title: "Academic background",
    },
    photoAlt: "Professional photograph of Bryan Escobar",
    avatarAlt: "Bryan Escobar in 8-bit",
    metaTitle: "About",
    metaDescription:
      "Systems engineering student and software developer based in El Salvador. I build web applications and systems that digitise how real businesses operate.",
  },

  experience: {
    eyebrow: "Experience",
    title: "Background and projects",
    description:
      "A walk through what I have built, with the context, the responsibilities and the technologies behind each stage.",
    education: {
      eyebrow: "Education",
      title: "Education and certifications",
    },
    metaTitle: "Experience",
    metaDescription:
      "Bryan Escobar's professional background: software development projects, management systems and automation for real businesses.",
  },

  contact: {
    eyebrow: "Contact",
    title: "Shall we build something?",
    description:
      "Tell me what you need to solve. I reply to professional opportunities, collaborations and projects where software makes a concrete difference.",
    channels: {
      email: "Email",
      linkedin: "LinkedIn",
      linkedinValue: "Let's connect",
      github: "GitHub",
      githubValue: "My code",
      instagram: "Instagram",
      instagramValue: "Follow me",
      location: "Location",
    },
    note: "I usually reply within 24 hours. If your message is about a project, telling me the problem you want to solve helps me give you a useful answer from the first email.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email address",
      emailPlaceholder: "you@example.com",
      subject: "Subject",
      subjectPlaceholder: "Opportunity, project or question",
      message: "Message",
      messagePlaceholder: "Tell me what you have in mind.",
      submit: "Send message",
      sending: "Sending...",
      honeypot: "Do not fill in this field",
      validation: {
        name: "Enter your name (at least 2 characters).",
        nameLong: "That name is too long.",
        email: "Enter a valid email address.",
        subject: "Add a short subject.",
        subjectLong: "That subject is too long.",
        message: "Tell me a bit more: at least 20 characters.",
        messageLong: "That message is too long.",
        review: "Please check the highlighted fields.",
      },
      status: {
        notConfigured:
          "Form delivery is not set up yet. Write to me directly at {email}.",
        failed: "The message could not be sent. You can email me at {email}.",
        network: "A network error occurred. You can email me at {email}.",
        success: "Message sent. I'll get back to you as soon as I can.",
      },
    },
    metaTitle: "Contact",
    metaDescription:
      "Get in touch about professional opportunities, collaborations or software development and automation projects.",
  },

  notFound: {
    title: "This page doesn't exist",
    description:
      "The link may be broken or the page may have moved. From the home page you can reach everything else.",
    backHome: "Back home",
    viewProjects: "See projects",
    game: {
      title: "404 Runner",
      start: "Fancy a game?",
      gameOver: "Game over",
      points: "points",
      pressToStart: "Space or click to start",
      pressToRetry: "Space or click to retry",
      jump: "Jump",
      startAria: "Start the game: jump over the obstacles",
      caption:
        "Built with the same sprite as the avatar, drawn pixel by pixel on canvas.",
    },
  },

  footer: {
    tagline: "Software Development",
    availability:
      "Open to professional opportunities, collaborations and technology projects.",
    navigation: "Navigation",
    contact: "Contact",
    email: "Email",
    siteLinks: "Site links",
    builtBy: "Designed and built by Bryan Escobar",
  },

  language: {
    label: "Language",
    switchTo: "Ver en español",
  },
};
