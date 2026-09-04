import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { ProjectShowcase } from "@/components/projects/project-card";
import { featuredProjects } from "@/content/projects";

export function SelectedWork() {
  return (
    <Section id="trabajo">
      <SectionHeader
        eyebrow="Selected Work"
        title="Proyectos que resuelven algo real"
        description="Cada uno nació de un proceso manual que costaba tiempo o dinero. Entra al caso de estudio para ver el problema, la arquitectura y las decisiones detrás."
        action={
          <ButtonLink href="/projects" variant="secondary">
            Todos los proyectos
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        }
      />

      <div className="flex flex-col gap-20 sm:gap-28">
        {featuredProjects.map((project, index) => (
          <ProjectShowcase key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
