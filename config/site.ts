/**
 * Configuración central del sitio.
 * Editar aquí cambia el contenido en todo el portafolio.
 */

/**
 * URL pública del sitio, de la que salen el canonical, el sitemap y las
 * tarjetas sociales. Se resuelve sola según dónde corra:
 *
 *   1. NEXT_PUBLIC_SITE_URL  — para forzar un valor concreto.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — la define Vercel. Al conectar un
 *      dominio propio pasa a ser ese dominio, sin tocar este archivo.
 *   3. localhost — en desarrollo.
 *
 * Solo se usa en el servidor (metadata, sitemap, robots y JSON-LD).
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Bryan Escobar",
  shortName: "BE",
  role: "Software Development · Web Applications · Automation",
  title: "Bryan Escobar — Software Development & Web Applications",
  description:
    "Desarrollo software y soluciones digitales orientadas a resolver problemas reales, automatizar procesos y mejorar la forma en que operan las organizaciones.",
  url: resolveSiteUrl(),
  locale: "es_SV",
  location: "El Salvador",
  email: "bryan79escobar@gmail.com",
  links: {
    github: "https://github.com/RyanEsc-Git",
    linkedin: "https://www.linkedin.com/in/bryan-escobar-6a275b179/",
    // Poner la URL completa del perfil para que aparezca en el sitio.
    // Mientras esté vacío, el enlace de Instagram simplemente no se muestra.
    instagram: "https://www.instagram.com/bryan.esc_" as string,
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
