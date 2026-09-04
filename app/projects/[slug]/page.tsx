import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/icons";
import {
  ArchitectureDiagram,
  CaseBlock,
  Prose,
} from "@/components/projects/case-study";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CallToAction } from "@/components/sections/cta";
import {
  getAdjacentProject,
  getProjectBySlug,
  projects,
} from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Proyecto no encontrado",
      description: "El caso de estudio solicitado no existe.",
      path: `/projects/${slug}`,
    });
  }

  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const next = getAdjacentProject(project.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteConfig.url}/projects/${project.slug}`,
    dateCreated: String(project.year),
    author: { "@type": "Person", name: siteConfig.name },
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <header className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
        <div className="container-page relative py-16 sm:py-24">
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Todos los proyectos
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="label-mono">Case Study</span>
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted">
                {project.status}
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {project.summary}
            </p>

            {project.links?.live || project.links?.github ? (
              <div className="mt-9 flex flex-wrap gap-3">
                {project.links.live ? (
                  <ButtonLink href={project.links.live} external>
                    Ver en vivo
                    <ExternalLink className="size-4" aria-hidden />
                  </ButtonLink>
                ) : null}
                {project.links.github ? (
                  <ButtonLink href={project.links.github} variant="secondary" external>
                    <Github className="size-4" aria-hidden />
                    Código
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}

            <dl className="mt-12 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-bg p-5">
                <dt className="label-mono">Cliente</dt>
                <dd className="mt-2 text-sm">{project.client}</dd>
              </div>
              <div className="bg-bg p-5">
                <dt className="label-mono">Año</dt>
                <dd className="mt-2 text-sm">{project.year}</dd>
              </div>
              <div className="bg-bg p-5">
                <dt className="label-mono">Rol</dt>
                <dd className="mt-2 text-sm">{project.role}</dd>
              </div>
              <div className="bg-bg p-5">
                <dt className="label-mono">Stack</dt>
                <dd className="mt-2 text-sm">{project.stack.join(" · ")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      <div className="container-page">
        <Reveal className="-mt-0 pt-14">
          <div className="surface-card relative aspect-[16/9] overflow-hidden">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              priority
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="divide-y divide-border">
          <CaseBlock eyebrow="01" title="Overview">
            <Prose paragraphs={project.overview} />
          </CaseBlock>

          <CaseBlock eyebrow="02" title="El problema">
            <Prose paragraphs={project.problem} />
          </CaseBlock>

          <CaseBlock eyebrow="03" title="El reto">
            <ul className="flex flex-col gap-4">
              {project.challenge.map((item) => (
                <li
                  key={item.slice(0, 40)}
                  className="flex gap-3 text-base leading-relaxed text-muted"
                >
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-light" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </CaseBlock>

          <CaseBlock eyebrow="04" title="La solución">
            <Prose paragraphs={project.solution} />
          </CaseBlock>

          <CaseBlock eyebrow="05" title="Arquitectura">
            <ArchitectureDiagram layers={project.architecture} />
          </CaseBlock>

          <CaseBlock eyebrow="06" title="Tecnologías">
            <div className="overflow-x-auto rounded-card border border-border">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-surface-2">
                    <th scope="col" className="px-5 py-3 font-medium text-fg">
                      Tecnología
                    </th>
                    <th scope="col" className="px-5 py-3 font-medium text-fg">
                      Función
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.technologies.map((tech) => (
                    <tr key={tech.name} className="border-t border-border">
                      <th
                        scope="row"
                        className="px-5 py-4 align-top font-mono text-xs font-normal text-fg"
                      >
                        {tech.name}
                      </th>
                      <td className="px-5 py-4 align-top text-muted">
                        {tech.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CaseBlock>

          <CaseBlock eyebrow="07" title="Funcionalidades">
            <div className="grid gap-5 sm:grid-cols-2">
              {project.features.map((feature) => (
                <article
                  key={feature.title}
                  className="surface-card h-full p-6"
                >
                  <h3 className="text-base font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </CaseBlock>

          <CaseBlock eyebrow="08" title="Proceso de desarrollo">
            <ol className="flex flex-col gap-4">
              {project.process.map((step, index) => (
                <li key={step.slice(0, 30)} className="flex gap-4">
                  <span className="font-mono text-sm text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </CaseBlock>

          <CaseBlock eyebrow="09" title="Decisiones y trade-offs">
            <div className="flex flex-col gap-5">
              {project.decisions.map((decision) => (
                <article key={decision.title} className="surface-card p-6">
                  <h3 className="text-base font-semibold tracking-tight">
                    {decision.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {decision.body}
                  </p>
                </article>
              ))}
            </div>
          </CaseBlock>

          <CaseBlock eyebrow="10" title="Resultados">
            <ul className="flex flex-col gap-4">
              {project.results.map((result) => (
                <li
                  key={result.slice(0, 40)}
                  className="flex gap-3 text-base leading-relaxed text-muted"
                >
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  {result}
                </li>
              ))}
            </ul>
          </CaseBlock>

          <CaseBlock eyebrow="11" title="Qué aprendí">
            <Prose paragraphs={project.learned} />
          </CaseBlock>
        </div>

        {next ? (
          <Reveal className="border-t border-border py-14">
            <p className="label-mono">Siguiente proyecto</p>
            <Link
              href={`/projects/${next.slug}`}
              className="group mt-4 flex flex-wrap items-center justify-between gap-4"
            >
              <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {next.title}
              </span>
              <ArrowRight
                className="size-6 text-accent-light transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        ) : null}
      </div>

      <CallToAction />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
