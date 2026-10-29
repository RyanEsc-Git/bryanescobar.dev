import type { Locale } from "@/lib/i18n";
import type { Project } from "@/types";

import { ui as uiEs } from "./es/ui";
import { ui as uiEn } from "./en/ui";

import * as profileEs from "./es/profile";
import * as profileEn from "./en/profile";

import { projects as projectsEs } from "./es/projects";
import { projects as projectsEn } from "./en/projects";

/**
 * Punto único de entrada al contenido.
 *
 * Las páginas piden el idioma y reciben el paquete completo, así que ningún
 * componente importa un archivo de idioma concreto. El español es la
 * referencia: el diccionario en inglés está tipado contra él, de modo que una
 * clave que falte es un error de compilación y no una etiqueta vacía.
 */

const dictionaries = {
  es: { ui: uiEs, profile: profileEs, projects: projectsEs },
  en: { ui: uiEn, profile: profileEn, projects: projectsEn },
} as const;

export function getContent(locale: Locale) {
  return dictionaries[locale];
}

export function getUI(locale: Locale) {
  return dictionaries[locale].ui;
}

export function getProfile(locale: Locale) {
  return dictionaries[locale].profile;
}

export function getProjects(locale: Locale): Project[] {
  return dictionaries[locale].projects;
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getProjects(locale).filter((project) => project.featured);
}

export function getProjectBySlug(
  locale: Locale,
  slug: string,
): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

/** Siguiente proyecto de la lista, para la navegación entre casos de estudio. */
export function getAdjacentProject(
  locale: Locale,
  slug: string,
): Project | undefined {
  const list = getProjects(locale);
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1 || list.length < 2) return undefined;
  return list[(index + 1) % list.length];
}

/**
 * Los slugs son los mismos en ambos idiomas: una misma ruta cambia de idioma
 * sin cambiar de dirección, que es lo que necesita el selector.
 */
export function getAllSlugs(): string[] {
  return projectsEs.map((project) => project.slug);
}
