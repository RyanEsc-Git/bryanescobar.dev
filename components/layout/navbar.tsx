"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Github, Instagram, Linkedin } from "@/components/ui/icons";
import { LanguageSwitcher } from "./language-switcher";
import { resumeHref, siteConfig } from "@/config/site";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import type { UIDictionary } from "@/content/es/ui";
import { cn } from "@/lib/utils";

export function Navbar({
  locale,
  ui,
}: {
  locale: Locale;
  ui: UIDictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "/", label: ui.nav.home },
    { href: "/about", label: ui.nav.about },
    { href: "/projects", label: ui.nav.projects },
    { href: "/experience", label: ui.nav.experience },
    { href: "/contact", label: ui.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const current = stripLocale(pathname);
  const isActive = (href: string) =>
    href === "/" ? current === "/" : current.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-border bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label={ui.nav.mainNav}
        className="container-page flex h-16 items-center justify-between"
      >
        <Link
          href={localePath("/", locale)}
          className="font-mono text-sm font-semibold tracking-widest text-fg"
          aria-label={`${siteConfig.name} — ${ui.nav.home_aria}`}
        >
          {siteConfig.shortName}
          <span className="text-accent-light">.</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={localePath(link.href, locale)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive(link.href) ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-muted transition-colors hover:text-fg"
          >
            <Github className="size-4" aria-hidden />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-muted transition-colors hover:text-fg"
          >
            <Linkedin className="size-4" aria-hidden />
          </a>
          {siteConfig.links.instagram ? (
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-md p-2 text-muted transition-colors hover:text-fg"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
          ) : null}

          <LanguageSwitcher
            locale={locale}
            label={ui.language.switchTo}
            className="ml-2"
          />

          <a
            href={resumeHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            {ui.nav.resume}
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} label={ui.language.switchTo} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.nav.closeMenu : ui.nav.openMenu}
            className="rounded-md p-2 text-muted transition-colors hover:text-fg"
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-border bg-bg md:hidden">
          <ul className="container-page flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={localePath(link.href, locale)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block border-b border-border/60 py-3 text-base",
                    isActive(link.href) ? "text-fg" : "text-muted",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-page flex items-center gap-3 py-4">
            <a
              href={resumeHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-center text-sm font-medium"
            >
              {ui.nav.resume}
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-border p-2.5 text-muted"
            >
              <Github className="size-4" aria-hidden />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-border p-2.5 text-muted"
            >
              <Linkedin className="size-4" aria-hidden />
            </a>
            {siteConfig.links.instagram ? (
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-border p-2.5 text-muted"
              >
                <Instagram className="size-4" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
