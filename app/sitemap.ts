import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllSlugs } from "@/content";
import { DEFAULT_LOCALE, LOCALES, localePath } from "@/lib/i18n";

/**
 * Cada página aparece una vez por idioma, y cada entrada declara sus
 * alternativas con hreflang para que Google no las trate como duplicados.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/contact",
    ...getAllSlugs().map((slug) => `/projects/${slug}`),
  ];

  const priorityOf = (path: string) => {
    if (path === "") return 1;
    if (path.startsWith("/projects/")) return 0.7;
    return 0.8;
  };

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${siteConfig.url}${localePath(path || "/", locale)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: priorityOf(path),
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.map((alt) => [
              alt,
              `${siteConfig.url}${localePath(path || "/", alt)}`,
            ]),
          ),
          "x-default": `${siteConfig.url}${localePath(path || "/", DEFAULT_LOCALE)}`,
        },
      },
    })),
  );
}
