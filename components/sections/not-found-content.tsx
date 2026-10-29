"use client";

import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PixelRunner } from "@/components/pixel/pixel-runner";
import { ui as uiEs } from "@/content/es/ui";
import { ui as uiEn } from "@/content/en/ui";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/lib/i18n";

/**
 * Un not-found.tsx no recibe params, así que el idioma se deduce de la URL en
 * el cliente. Por eso importa los dos diccionarios directamente y no pasa por
 * content/index.ts: así el 404 no arrastra los casos de estudio al bundle.
 */
function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : DEFAULT_LOCALE;
}

export function NotFoundContent() {
  const locale = localeFromPath(usePathname());
  const ui = locale === "en" ? uiEn : uiEs;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-mono text-sm text-accent-light">404</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
          {ui.notFound.title}
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-muted">
          {ui.notFound.description}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={localePath("/", locale)}>
            <ArrowLeft className="size-4" aria-hidden />
            {ui.notFound.backHome}
          </ButtonLink>
          <ButtonLink href={localePath("/projects", locale)} variant="secondary">
            {ui.notFound.viewProjects}
          </ButtonLink>
        </div>

        <div className="mt-14 w-full">
          <PixelRunner labels={ui.notFound.game} />
        </div>
      </div>
    </section>
  );
}
