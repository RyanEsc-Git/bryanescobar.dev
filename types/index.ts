export type CaseStudySection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  role: string;
  client: string;
  stack: string[];
  /** Portada de marca que se muestra en las tarjetas de proyecto. */
  cover: string;
  coverAlt: string;
  /** Captura real del producto, dentro del caso de estudio. */
  screenshot?: string;
  screenshotAlt?: string;
  featured: boolean;
  order: number;
  status: "En producción" | "En desarrollo" | "Finalizado";
  links?: {
    live?: string;
    github?: string;
    docs?: string;
  };
  metrics: ProjectMetric[];
  overview: string[];
  problem: string[];
  challenge: string[];
  solution: string[];
  architecture: string[];
  technologies: { name: string; role: string }[];
  features: { title: string; description: string }[];
  process: string[];
  decisions: { title: string; body: string }[];
  results: string[];
  learned: string[];
};

export type ExperienceEntry = {
  period: string;
  title: string;
  context: string;
  description: string;
  responsibilities: string[];
  stack: string[];
};

export type EducationEntry = {
  period: string;
  institution: string;
  degree: string;
  detail?: string;
};
