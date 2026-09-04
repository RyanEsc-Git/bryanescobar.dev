import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CallToAction } from "@/components/sections/cta";
import { aboutContent, education } from "@/content/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Sobre mí",
  description:
    "Estudiante de Ingeniería en Sistemas y desarrollador de software en El Salvador. Construyo aplicaciones web y sistemas que digitalizan la operación de negocios reales.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre mí"
        title="Construyo sistemas que alguien usa todos los días"
        description={aboutContent.lead}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_0.55fr] lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-6 text-base leading-relaxed text-muted">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="surface-card relative aspect-[4/5] overflow-hidden">
              <Image
                src="/bryan.png"
                alt="Fotografía profesional de Bryan Escobar"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-border bg-surface/30">
        <SectionHeader
          eyebrow="Principios"
          title="Cómo decido"
          description="Cuatro reglas que aplico en cada proyecto, desde la primera reunión hasta el despliegue."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {aboutContent.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 70}>
              <article className="surface-card h-full p-7">
                <h3 className="text-lg font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {principle.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Educación"
          title="Formación académica"
        />
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
