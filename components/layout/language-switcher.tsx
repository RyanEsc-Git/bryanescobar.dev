"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stripLocale, type Locale } from "@/lib/i18n";
import { FlagSV, FlagUS } from "@/components/ui/flags";
import { cn } from "@/lib/utils";

/**
 * Interruptor ES / EN.
 *
 * Es un enlace, no un botón: lleva a la misma página en el otro idioma, así
 * que se puede abrir en otra pestaña, lo indexa Google y funciona sin
 * JavaScript. La ruta se conserva porque los slugs son iguales en ambos
 * idiomas.
 */
export function LanguageSwitcher({
  locale,
  className,
  label,
}: {
  locale: Locale;
  className?: string;
  label: string;
}) {
  const pathname = usePathname();
  const other: Locale = locale === "es" ? "en" : "es";
  // La bandera es la del idioma al que se va, igual que el enlace.
  const Flag = other === "en" ? FlagUS : FlagSV;
  const target = `/${other}${stripLocale(pathname) === "/" ? "" : stripLocale(pathname)}`;

  return (
    <Link
      href={target}
      hrefLang={other}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-fg",
        className,
      )}
    >
      <Flag className="h-3 w-4 shrink-0 rounded-[2px]" />
      <span className="flex items-center gap-1">
        <span className={cn(locale === "es" ? "text-fg" : "text-subtle")}>
          ES
        </span>
        <span className="text-subtle">/</span>
        <span className={cn(locale === "en" ? "text-fg" : "text-subtle")}>
          EN
        </span>
      </span>
    </Link>
  );
}
