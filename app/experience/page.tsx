import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CallToAction } from "@/components/sections/cta";
import { education, experience } from "@/content/profile";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Experiencia",
  description:
    "Trayectoria profesional de Bryan Escobar: proyectos de desarrollo de software, sistemas de gestión y automatización para negocios reales.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experiencia"
        title="Trayectoria y proyectos"
        description="Un recorrido por lo que he construido, con el contexto, las responsabilidades y las tecnologías de cada etapa."
      >
        <div className="mt-9">
          <ButtonLink href={siteConfig.links.resume} variant="secondary" external>
            Descargar CV
          </ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <ol className="relative flex flex-col gap-10 border-l border-border pl-8 sm:pl-10">
          {experience.map((entry, index) => (
            <Reveal key={entry.title} delay={index * 80} as="li">
              <span
                className="absolute -left-[6.5px] mt-2 size-3 rounded-full border-2 border-bg bg-accent"
                aria-hidden
              />
              <article>
                <p className="label-mono">{entry.period}</p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {entry.title}
                </h2>
                <p className="mt-1.5 text-sm text-subtle">{entry.context}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  {entry.description}
                </p>

                <ul className="mt-5 flex flex-col gap-2.5">
                  {entry.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-subtle" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {entry.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-border bg-surface/30">
        <SectionHeader eyebrow="Educación" title="Formación y certificaciones" />
        <ul className="flex flex-col gap-5">
          {education.map((item, index) => (
            <Reveal key={item.institution} delay={index * 70} as="li">
              <article className="surface-card flex flex-col gap-4 p-7 sm:flex-row sm:items-start sm:gap-7">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
                  <GraduationCap className="size-5 text-accent-light" aria-hidden />
                </span>
                <div>
                  <p className="label-mono">{item.period}</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.institution}</p>
                  {item.detail ? (
                    <p className="mt-3 text-sm leading-relaxed text-subtle">
                      {item.detail}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CallToAction />
    </>
  );
}
