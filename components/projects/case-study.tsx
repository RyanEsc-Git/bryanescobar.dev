import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type BlockProps = {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function CaseBlock({ id, eyebrow, title, children }: BlockProps) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-16">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-14">
          <div>
            <p className="label-mono">{eyebrow}</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight lg:sticky lg:top-24">
              {title}
            </h2>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </Reveal>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="flex flex-col gap-5 text-base leading-relaxed text-muted">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </div>
  );
}

export function ArchitectureDiagram({ layers }: { layers: readonly string[] }) {
  return (
    <ol className="flex flex-col items-stretch">
      {layers.map((layer, index) => (
        <li key={layer}>
          <div className="surface-card bg-surface-2 px-5 py-4 text-center font-mono text-sm text-fg">
            {layer}
          </div>
          {index < layers.length - 1 ? (
            <div className="flex justify-center py-2" aria-hidden>
              <ChevronDown className="size-4 text-subtle" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
