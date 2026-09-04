import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
};

/** Bloque grande alternado usado en la Home. */
export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const reversed = index % 2 === 1;

  return (
    <Reveal>
      <article
        className={cn(
          "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
          reversed && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div>
          <p className="font-mono text-sm text-subtle">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="label-mono">{metric.label}</dt>
                <dd className="mt-1 text-sm text-fg">{metric.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-fg"
          >
            Ver caso de estudio
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="group surface-card relative block aspect-[16/10] overflow-hidden"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </Link>
      </article>
    </Reveal>
  );
}

/** Tarjeta compacta usada en /projects. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="surface-card group h-full overflow-hidden transition-colors hover:border-border-strong">
        <Link href={`/projects/${project.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="label-mono">{project.year}</span>
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted">
                {project.status}
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-light">
              Ver caso de estudio
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
