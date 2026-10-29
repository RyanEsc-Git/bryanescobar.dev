import { Boxes, Code2, Cpu, Workflow } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import type { UIDictionary } from "@/content/es/ui";

const icons = [Code2, Boxes, Workflow, Cpu];

type Item = { title: string; description: string };

export function WhatIDo({
  ui,
  items,
}: {
  ui: UIDictionary;
  items: readonly Item[];
}) {
  return (
    <Section id="servicios">
      <SectionHeader
        eyebrow={ui.home.whatIDo.eyebrow}
        title={ui.home.whatIDo.title}
        description={ui.home.whatIDo.description}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal key={item.title} delay={index * 70}>
              <article className="surface-card h-full p-7 transition-colors hover:border-border-strong">
                <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface-2">
                  <Icon className="size-5 text-accent-light" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
