import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  // Las imágenes Open Graph se generan con los archivos opengraph-image.tsx
  // de cada segmento; solo se declaran aquí si se pasa una explícita.
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
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
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
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
    inLanguage: "es",
    author: { "@type": "Person", name: siteConfig.name },
  };
}
