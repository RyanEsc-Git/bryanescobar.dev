import type { Project } from "@/types";
import { idInventory } from "./id-inventory";
import { sgtt } from "./sgtt";
import { distribuidoraHuevos } from "./distribuidora-huevos";

export const projects: Project[] = [idInventory, sgtt, distribuidoraHuevos].sort(
  (a, b) => a.order - b.order,
);

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return undefined;
  return projects[(index + 1) % projects.length];
}
