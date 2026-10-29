import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { getProfile } from "@/content";
import { LOCALES } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/page-params";

export const alt = `${siteConfig.name} — Software Development`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/** El dominio se saca de la URL real del sitio, no de una constante a mano. */
const siteHost = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default async function OpenGraphImage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  const { heroContent } = getProfile(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(140deg, #09090B 0%, #111113 55%, #16213f 100%)",
          padding: 80,
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              color: "#A1A1AA",
              textTransform: "uppercase",
            }}
          >
            {siteConfig.location}
          </div>
          <div style={{ fontSize: 82, fontWeight: 700, marginTop: 26 }}>
            Bryan Escobar
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#A1A1AA",
              marginTop: 20,
              maxWidth: 900,
            }}
          >
            {heroContent.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272A",
            paddingTop: 32,
            fontSize: 26,
          }}
        >
          <div style={{ color: "#A1A1AA" }}>
            Software · Web Apps · Automation
          </div>
          <div style={{ color: "#3B82F6" }}>{siteHost}</div>
        </div>
      </div>
    ),
    size,
  );
}
