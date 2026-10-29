import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  localePath,
  type Locale,
} from "@/lib/i18n";

type PageMetaInput = {
  title: string;
  description: string;
  /** Ruta sin idioma: "/about", "/projects/mi-proyecto". */
  path: string;
  locale: Locale;
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  locale,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const localized = localePath(path, locale);
  const url = `${siteConfig.url}${localized}`;

  // Las imágenes Open Graph se generan con los archivos opengraph-image.tsx
  // de cada segmento; solo se declaran aquí si se pasa una explícita.
  return {
    title,
    description,
    alternates: {
      canonical: localized,
      languages: {
        es: localePath(path, "es"),
        en: localePath(path, "en"),
        "x-default": localePath(path, DEFAULT_LOCALE),
      },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: LOCALE_META[locale].ogLocale,
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: title }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Software Developer",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "SV",
      addressLocality: siteConfig.location,
    },
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
    ].filter(Boolean),
    knowsAbout: [
      "Software Development",
      "Web Applications",
      "Business Automation",
      "Databases",
      "Systems Engineering",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ["es", "en"],
    author: { "@type": "Person", name: siteConfig.name },
  };
}
