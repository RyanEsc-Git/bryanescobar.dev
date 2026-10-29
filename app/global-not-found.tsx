import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { NotFoundContent } from "@/components/sections/not-found-content";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * 404 de las rutas que no existen.
 *
 * El layout raíz vive en app/[locale], así que no hay un app/layout.tsx desde
 * el que componer este 404: Next se salta el renderizado normal y sirve este
 * archivo, que por eso trae su propio <html>, sus fuentes y los estilos.
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `404 — ${siteConfig.name}`,
  description: "Page not found · Página no encontrada",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <header className="border-b border-border">
          <div className="container-page flex h-16 items-center">
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-widest text-fg"
            >
              {siteConfig.shortName}
              <span className="text-accent-light">.</span>
            </Link>
          </div>
        </header>

        <main className="flex-1">
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
