import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import type { UIDictionary } from "@/content/es/ui";

type Group = { category: string; items: readonly string[] };

export function TechStack({
  ui,
  groups,
}: {
  ui: UIDictionary;
  groups: readonly Group[];
}) {
  return (
    <Section id="stack" className="border-y border-border bg-surface/30">
      <SectionHeader
        eyebrow={ui.home.stack.eyebrow}
        title={ui.home.stack.title}
        description={ui.home.stack.description}
      />

      <div className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
        {groups.map((group, index) => (
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
