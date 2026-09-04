import { ArrowRight } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />
      <div className="container-page relative py-24 text-center sm:py-32">
        <Reveal>
          <p className="label-mono">Contacto</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            ¿Construimos algo?
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
            Estoy abierto a oportunidades profesionales, colaboraciones y
            proyectos donde la tecnología resuelva una necesidad concreta.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact">
              Contactarme
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={siteConfig.links.linkedin} variant="secondary" external>
              <Linkedin className="size-4" aria-hidden />
              LinkedIn
            </ButtonLink>
            <ButtonLink href={siteConfig.links.github} variant="secondary" external>
              <Github className="size-4" aria-hidden />
              GitHub
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
