/**
 * Configuración central del sitio.
 * Editar aquí cambia el contenido en todo el portafolio.
 */

export const siteConfig = {
  name: "Bryan Escobar",
  shortName: "BE",
  role: "Software Development · Web Applications · Automation",
  title: "Bryan Escobar — Software Development & Web Applications",
  description:
    "Desarrollo software y soluciones digitales orientadas a resolver problemas reales, automatizar procesos y mejorar la forma en que operan las organizaciones.",
  url: "https://bryanescobar.dev",
  locale: "es_SV",
  location: "El Salvador",
  email: "bryan79escobar@gmail.com",
  links: {
    github: "https://github.com/RyanEsc-Git",
    linkedin: "https://www.linkedin.com/in/bryan-escobar-6a275b179/",
    resume: "/resume/CV-Bryan-Escobar.pdf",
  },
  keywords: [
    "Bryan Escobar",
    "desarrollador de software",
    "software developer El Salvador",
    "Next.js",
    "React",
    "TypeScript",
    "automatización de procesos",
    "aplicaciones web",
    "ingeniería en sistemas",
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Sobre mí" },
  { href: "/projects", label: "Proyectos" },
  { href: "/experience", label: "Experiencia" },
  { href: "/contact", label: "Contacto" },
] as const;

export const capabilities = [
  "SOFTWARE DEVELOPMENT",
  "WEB APPLICATIONS",
  "AUTOMATION",
  "DATABASES",
  "SYSTEMS",
] as const;
