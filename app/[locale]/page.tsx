import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { SelectedWork } from "@/components/sections/selected-work";
import { WhatIDo } from "@/components/sections/what-i-do";
import { TechStack } from "@/components/sections/tech-stack";
import { Process } from "@/components/sections/process";
import { CallToAction } from "@/components/sections/cta";
import { getFeaturedProjects } from "@/content";
import { resolvePage, type LocaleParams } from "@/lib/page-params";

export default async function HomePage({ params }: LocaleParams) {
  const { locale, ui, profile } = await resolvePage(params);
  const featured = getFeaturedProjects(locale);

  return (
    <>
      <Hero locale={locale} ui={ui} hero={profile.heroContent} />
      <SelectedWork locale={locale} ui={ui} projects={featured} />
      <AboutPreview
        locale={locale}
        ui={ui}
        about={profile.aboutContent}
        highlights={profile.aboutPreview}
      />
      <WhatIDo ui={ui} items={profile.whatIDo} />
      <TechStack ui={ui} groups={profile.techStack} />
      <Process ui={ui} steps={profile.workProcess} />
      <CallToAction locale={locale} ui={ui} />
    </>
  );
}
