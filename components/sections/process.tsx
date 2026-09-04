import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { workProcess } from "@/content/profile";

export function Process() {
  return (
    <Section id="proceso">
      <SectionHeader
        eyebrow="Cómo trabajo"
        title="Del problema a producción"
        description="Un método corto y repetible. La mayor parte del valor aparece antes de escribir la primera línea de código."
      />

      <ol className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {workProcess.map((item, index) => (
          <Reveal key={item.step} delay={index * 60} as="li">
            <div className="h-full bg-bg p-7">
              <span className="font-mono text-sm text-accent-light">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
