import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { PixelAvatar } from "@/components/pixel/pixel-avatar";
import { PixelFuji } from "@/components/pixel/pixel-fuji";
import { CodeWindow } from "./code-window";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { capabilities, resumeHref, siteConfig } from "@/config/site";
import { localePath, type Locale } from "@/lib/i18n";
import type { UIDictionary } from "@/content/es/ui";

type HeroContent = {
  eyebrow: string;
  name: string;
  headline: string;
  intro: string;
};

export function Hero({
  locale,
  ui,
  hero,
}: {
  locale: Locale;
  ui: UIDictionary;
  hero: HeroContent;
}) {
  return (
    <section className="relative">
      {/* El paisaje se ancla a este bloque y no a toda la sección: con
          bottom-0 sobre la sección entera quedaba detrás de la franja de
          capacidades que va al final. */}
      <div className="relative overflow-hidden">
        {/* El paisaje va a lo ancho con la altura que le toque por su
            proporción. Fijarle la altura en un porcentaje lo dejaba más
            estrecho que el bloque y aparecían dos franjas negras a los
            lados. El cielo es transparente, así que lo que sobra por arriba
            se funde con el fondo. */}
        {/* En móvil se agranda y se recorta por los lados: a lo ancho de la
            pantalla el paisaje completo queda en una franja de 170 px y no se
            ve nada. */}
        <PixelFuji className="pointer-events-none absolute bottom-0 left-[-30%] h-auto w-[160%] opacity-50 lg:left-0 lg:w-full lg:opacity-60" />

        {/* Velo para que el texto quede sobre fondo limpio sin esconder el
            paisaje. Cambia de dirección con el diseño: en móvil el texto va
            encima del paisaje, así que el velo baja de arriba abajo; a partir
            de lg van en columnas y el velo va de izquierda a derecha. */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-bg/65 to-bg lg:bg-gradient-to-r lg:from-bg lg:via-bg/55 lg:to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 grid-lines opacity-[0.5]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 hero-glow"
          aria-hidden
        />

        <div className="container-page relative pb-16 pt-20 sm:pb-24 sm:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {hero.eyebrow}
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-7 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  {hero.name}
                  <span className="mt-3 block text-2xl font-normal leading-snug text-muted sm:text-3xl lg:text-4xl">
                    {hero.headline}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
                  {hero.intro}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <ButtonLink href={localePath("/projects", locale)}>
                    {ui.hero.viewProjects}
                    <ArrowRight className="size-4" aria-hidden />
                  </ButtonLink>
                  <ButtonLink
                    href={localePath("/contact", locale)}
                    variant="secondary"
                  >
                    {ui.hero.contactMe}
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Github className="size-4" aria-hidden />
                    GitHub
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Linkedin className="size-4" aria-hidden />
                    LinkedIn
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                  <a
                    href={resumeHref(locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <FileText className="size-4" aria-hidden />
                    {ui.hero.resume}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative hidden lg:block">
              <PixelAvatar
                scale={6}
                floating
                className="absolute -top-20 right-6 z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
                title={ui.about.avatarAlt}
              />
              <CodeWindow labels={ui.hero.window} />
            </Reveal>
          </div>
        </div>
      </div>

      <div className="relative border-y border-border bg-surface/40">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 sm:justify-between">
          {capabilities.map((item) => (
            <span key={item} className="label-mono">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
