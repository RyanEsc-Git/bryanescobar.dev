import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { aboutContent, aboutPreview } from "@/content/profile";

export function AboutPreview() {
  return (
    <Section id="sobre-mi" className="border-y border-border bg-surface/30">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:gap-20">
        <Reveal>
          <p className="label-mono mb-4">Sobre mí</p>
          <p className="text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
            {aboutContent.lead}
          </p>
          <p className="mt-6 leading-relaxed text-muted">
            {aboutContent.paragraphs[1]}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-fg"
          >
            Conoce más sobre mí
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <dl className="surface-card divide-y divide-border">
            {aboutPreview.map((item) => (
              <div key={item.label} className="px-6 py-5">
                <dt className="label-mono">{item.label}</dt>
                <dd className="mt-2 text-sm text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
