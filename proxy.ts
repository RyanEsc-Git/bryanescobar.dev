import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n";

/**
 * Antepone el idioma a cualquier ruta que no lo lleve.
 *
 * Va en proxy.ts: Next renombró el convenio y "middleware" quedó obsoleto.
 *
 * Con esto, /about sigue funcionando y lleva a /es/about, así que los enlaces
 * compartidos antes de la versión bilingüe no se rompen. Si el navegador pide
 * inglés, se respeta en la primera visita.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const accepted = request.headers.get("accept-language") ?? "";
  const prefersEnglish = /^\s*en\b/i.test(accepted);
  const locale = prefersEnglish ? "en" : DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Se excluye lo interno de Next y todo lo que tenga extensión, para que el
  // proxy no se meta con las imágenes, el CV ni el sitemap. El punto va
  // escapado como "\\." porque esto es una cadena, no un literal de regex:
  // con un solo backslash el punto pasa a ser "cualquier carácter" y el
  // matcher deja de aceptar /about.
  matcher: ["/((?!_next|api/|.*\\..*).*)"],
};
