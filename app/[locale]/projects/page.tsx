import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/project-card";
import { CallToAction } from "@/components/sections/cta";
import { getProjects, getUI } from "@/content";
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
    title: ui.projects.metaTitle,
    description: ui.projects.metaDescription,
    path: "/projects",
    locale,
  });
}

export default async function ProjectsPage({ params }: LocaleParams) {
  const { locale, ui } = await resolvePage(params);
  const projects = getProjects(locale);

  return (
    <>
      <PageHeader
        eyebrow={ui.projects.eyebrow}
        title={ui.projects.title}
        description={ui.projects.description}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              ui={ui}
            />
          ))}
        </div>
      </Section>

      <CallToAction locale={locale} ui={ui} />
    </>
  );
}
