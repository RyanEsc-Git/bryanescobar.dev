/**
 * Configuración de idiomas.
 *
 * El sitio vive bajo /es y /en. El middleware redirige cualquier ruta sin
 * prefijo al idioma por defecto, así que los enlaces antiguos siguen vivos.
 */

export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Etiquetas del selector de idioma. */
export const LOCALE_LABELS: Record<Locale, { name: string; short: string; flag: string }> = {
  es: { name: "Español", short: "ES", flag: "🇸🇻" },
  en: { name: "English", short: "EN", flag: "🇺🇸" },
};

/** Código para el atributo lang y para Open Graph. */
export const LOCALE_META: Record<Locale, { htmlLang: string; ogLocale: string }> = {
  es: { htmlLang: "es", ogLocale: "es_SV" },
  en: { htmlLang: "en", ogLocale: "en_US" },
};

/** Antepone el idioma a una ruta interna: ("/about", "en") → "/en/about". */
export function localePath(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Quita el prefijo de idioma de una ruta: "/en/about" → "/about". */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isLocale(parts[0])) parts.shift();
  return parts.length ? `/${parts.join("/")}` : "/";
}
