import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { techStack } from "@/content/profile";

export function TechStack() {
  return (
    <Section id="stack" className="border-y border-border bg-surface/30">
      <SectionHeader
        eyebrow="Tech Stack"
        title="Herramientas que uso y puedo explicar"
        description="No es una lista de todo lo que existe: son las tecnologías con las que he construido y desplegado sistemas en uso real."
      />

      <div className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
        {techStack.map((group, index) => (
          <Reveal key={group.category} delay={index * 60}>
            <div className="h-full bg-bg p-7">
              <p className="label-mono">{group.category}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
