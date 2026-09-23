import { Mail, MapPin } from "lucide-react";
import { Github, Instagram, Linkedin } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contacto",
  description:
    "Escríbeme para oportunidades profesionales, colaboraciones o proyectos de desarrollo de software y automatización.",
  path: "/contact",
});

const channels = [
  {
    icon: Mail,
    label: "Correo",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Conectemos",
    href: siteConfig.links.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Mi código",
    href: siteConfig.links.github,
  },
  ...(siteConfig.links.instagram
    ? [
        {
          icon: Instagram,
          label: "Instagram",
          value: "Sígueme",
          href: siteConfig.links.instagram,
        },
      ]
    : []),
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="¿Construimos algo?"
        description="Cuéntame qué necesitas resolver. Respondo a oportunidades profesionales, colaboraciones y proyectos donde el software haga una diferencia concreta."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-4">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    channel.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="surface-card flex items-center gap-4 p-5 transition-colors hover:border-border-strong"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
                    <channel.icon className="size-4 text-accent-light" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="label-mono block">{channel.label}</span>
                    <span className="mt-1 block truncate text-sm text-fg">
                      {channel.value}
                    </span>
                  </span>
                </a>
              ))}

              <div className="surface-card flex items-center gap-4 p-5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
                  <MapPin className="size-4 text-accent-light" aria-hidden />
                </span>
                <span>
                  <span className="label-mono block">Ubicación</span>
                  <span className="mt-1 block text-sm text-fg">
                    {siteConfig.location}
                  </span>
                </span>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-subtle">
                Suelo responder en menos de 24 horas. Si tu mensaje es sobre un
                proyecto, incluir el problema que quieres resolver ayuda mucho a
                darte una respuesta útil desde el primer correo.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
