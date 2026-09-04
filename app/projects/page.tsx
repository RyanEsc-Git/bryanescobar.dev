import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/project-card";
import { CallToAction } from "@/components/sections/cta";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Proyectos",
  description:
    "Casos de estudio de sistemas y aplicaciones web construidos para negocios reales: problema, arquitectura, decisiones técnicas y resultados.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="Casos de estudio, no capturas sueltas"
        description="Cada proyecto documenta el problema que resolvía, la arquitectura elegida, los compromisos que asumí y lo que aprendí en el camino."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <CallToAction />
    </>
  );
}
