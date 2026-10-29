import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";
import { getProfile, getUI } from "@/content";

/** Forma de los params de cualquier página dentro de [locale]. */
export type LocaleParams = { params: Promise<{ locale: string }> };
export type SlugParams = { params: Promise<{ locale: string; slug: string }> };

/**
 * Valida el idioma de la URL y entrega el contenido ya resuelto.
 * Una ruta como /fr/about cae en notFound en lugar de renderizar a medias.
 */
export async function resolvePage(params: Promise<{ locale: string }>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  return { locale, ui: getUI(locale), profile: getProfile(locale) };
}

/** Variante para metadata: no lanza notFound, solo cae al idioma por defecto. */
export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale: raw } = await params;
  return isLocale(raw) ? raw : DEFAULT_LOCALE;
}
