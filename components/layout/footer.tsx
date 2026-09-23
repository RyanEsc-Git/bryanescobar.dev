import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Instagram, Linkedin } from "@/components/ui/icons";
import { navLinks, siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface/40">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-semibold tracking-widest">
              BRYAN ESCOBAR
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Software Development · {siteConfig.location}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-subtle">
              Disponible para oportunidades profesionales, colaboraciones y
              proyectos tecnológicos.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Enlaces del sitio">
              <p className="label-mono mb-4">Navegación</p>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label-mono mb-4">Contacto</p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Mail className="size-4" aria-hidden />
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Github className="size-4" aria-hidden />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Linkedin className="size-4" aria-hidden />
                    LinkedIn
                  </a>
                </li>
                {siteConfig.links.instagram ? (
                  <li>
                    <a
                      href={siteConfig.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                    >
                      <Instagram className="size-4" aria-hidden />
                      Instagram
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Bryan Escobar</p>
          <p>Diseñado y construido por Bryan Escobar</p>
        </div>
      </div>
    </footer>
  );
}
