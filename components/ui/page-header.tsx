import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 hero-glow opacity-70" aria-hidden />
      <div className="container-page relative py-20 sm:py-28">
        <Reveal>
          <p className="label-mono">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
