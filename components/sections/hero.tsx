import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { capabilities, siteConfig } from "@/config/site";
import { heroContent } from "@/content/profile";

const codeLines = [
  [{ t: "const", c: "text-accent-light" }, { t: " developer", c: "text-fg" }, { t: " = {", c: "text-muted" }],
  [{ t: "  name: ", c: "text-muted" }, { t: '"Bryan Escobar"', c: "text-emerald-400" }, { t: ",", c: "text-muted" }],
  [{ t: "  focus: [", c: "text-muted" }],
  [{ t: '    "Software Development"', c: "text-emerald-400" }, { t: ",", c: "text-muted" }],
  [{ t: '    "Web Applications"', c: "text-emerald-400" }, { t: ",", c: "text-muted" }],
  [{ t: '    "Automation"', c: "text-emerald-400" }, { t: ",", c: "text-muted" }],
  [{ t: '    "Systems"', c: "text-emerald-400" }],
  [{ t: "  ],", c: "text-muted" }],
  [{ t: "  location: ", c: "text-muted" }, { t: '"El Salvador"', c: "text-emerald-400" }, { t: ",", c: "text-muted" }],
  [{ t: "  status: ", c: "text-muted" }, { t: '"Building..."', c: "text-emerald-400" }],
  [{ t: "};", c: "text-muted" }],
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.5]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden />

      <div className="container-page relative pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                {heroContent.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                {heroContent.name}
                <span className="mt-3 block text-2xl font-normal leading-snug text-muted sm:text-3xl lg:text-4xl">
                  {heroContent.headline}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
                {heroContent.intro}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/projects">
                  Ver mis proyectos
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Contactarme
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <Github className="size-4" aria-hidden />
                  GitHub
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <Linkedin className="size-4" aria-hidden />
                  LinkedIn
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
                <a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  <FileText className="size-4" aria-hidden />
                  CV
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="hidden lg:block">
            <div className="surface-card overflow-hidden shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-subtle">
                  developer.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed">
                <code>
                  {codeLines.map((line, index) => (
                    <span key={index} className="block">
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} className={token.c}>
                          {token.t}
                        </span>
                      ))}
                      {line.length === 0 ? " " : null}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-y border-border bg-surface/40">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 sm:justify-between">
          {capabilities.map((item) => (
            <span key={item} className="label-mono">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
