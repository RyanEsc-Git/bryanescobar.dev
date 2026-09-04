import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-sm text-accent-light">404</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
          Esta página no existe
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-muted">
          El enlace puede estar roto o la página pudo haber cambiado de
          dirección. Desde el inicio puedes llegar a todo lo demás.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            <ArrowLeft className="size-4" aria-hidden />
            Volver al inicio
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Ver proyectos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
