import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { PixelAvatar } from "@/components/pixel/pixel-avatar";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CallToAction } from "@/components/sections/cta";
import { getUI } from "@/content";
import { buildMetadata } from "@/lib/metadata";
import {
  resolveLocale,
  resolvePage,
  type LocaleParams,
} from "@/lib/page-params";

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const ui = getUI(locale);

  return buildMetadata({
    title: ui.about.metaTitle,
    description: ui.about.metaDescription,
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, ui, profile } = await resolvePage(params);
  const { aboutContent, education } = profile;

  return (
    <>
      <PageHeader
        eyebrow={ui.about.eyebrow}
        title={ui.about.title}
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
              <PixelAvatar
                scale={4}
                floating
                className="absolute bottom-4 right-4 z-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                title={ui.about.avatarAlt}
              />
              <Image
                src="/bryan-escobar.png"
                alt={ui.about.photoAlt}
                fill
                priority
                sizes="(min-width: 1024px) 35vw, (min-width: 640px) 60vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="border-y border-border bg-surface/30">
        <SectionHeader
          eyebrow={ui.about.principles.eyebrow}
          title={ui.about.principles.title}
          description={ui.about.principles.description}
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
          eyebrow={ui.about.education.eyebrow}
          title={ui.about.education.title}
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

      <CallToAction locale={locale} ui={ui} />
    </>
  );
}
