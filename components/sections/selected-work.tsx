import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ProjectShowcase } from "@/components/projects/project-card";
import { localePath, type Locale } from "@/lib/i18n";
import type { UIDictionary } from "@/content/es/ui";
import type { Project } from "@/types";

export function SelectedWork({
  locale,
  ui,
  projects,
}: {
  locale: Locale;
  ui: UIDictionary;
  projects: Project[];
}) {
  return (
    <Section id="trabajo">
      <SectionHeader
        eyebrow={ui.home.selectedWork.eyebrow}
        title={ui.home.selectedWork.title}
        description={ui.home.selectedWork.description}
        action={
          <ButtonLink href={localePath("/projects", locale)} variant="secondary">
            {ui.home.selectedWork.allProjects}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        }
      />

      <div className="flex flex-col gap-20 sm:gap-28">
        {projects.map((project, index) => (
          <ProjectShowcase
            key={project.slug}
            project={project}
            locale={locale}
            ui={ui}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
