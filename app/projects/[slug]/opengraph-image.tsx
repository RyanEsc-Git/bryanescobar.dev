import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "@/content/projects";
import { siteConfig } from "@/config/site";

export const alt = "Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#3B82F6" }}>
            CASE STUDY
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              marginTop: 28,
              maxWidth: 1000,
              lineHeight: 1.1,
            }}
          >
            {project?.title ?? "Proyecto"}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#A1A1AA",
              marginTop: 24,
              maxWidth: 950,
            }}
          >
            {project?.stack.slice(0, 5).join("  ·  ") ?? ""}
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
            {`${siteConfig.name} · Software Development`}
          </div>
          <div style={{ color: "#3B82F6" }}>bryanescobar.dev</div>
        </div>
      </div>
    ),
    size,
  );
}
