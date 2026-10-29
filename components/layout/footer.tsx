import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Instagram, Linkedin } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { localePath, type Locale } from "@/lib/i18n";
import type { UIDictionary } from "@/content/es/ui";

export function Footer({ locale, ui }: { locale: Locale; ui: UIDictionary }) {
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: ui.nav.home },
    { href: "/about", label: ui.nav.about },
    { href: "/projects", label: ui.nav.projects },
    { href: "/experience", label: ui.nav.experience },
    { href: "/contact", label: ui.nav.contact },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-surface/40">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-semibold tracking-widest">
              BRYAN ESCOBAR
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {ui.footer.tagline} · {siteConfig.location}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-subtle">
              {ui.footer.availability}
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label={ui.footer.siteLinks}>
              <p className="label-mono mb-4">{ui.footer.navigation}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localePath(link.href, locale)}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label-mono mb-4">{ui.footer.contact}</p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Mail className="size-4" aria-hidden />
                    {ui.footer.email}
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
          <p>{ui.footer.builtBy}</p>
        </div>
      </div>
    </footer>
  );
}
