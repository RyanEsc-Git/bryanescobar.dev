import type { Project } from "@/types";
import { idInventory } from "./id-inventory";
import { tallerTonyLanding } from "./taller-tony-landing";
import { sgtt } from "./sgtt";
import { distribuidoraHuevos } from "./distribuidora-huevos";

export const projects: Project[] = [
  idInventory,
  tallerTonyLanding,
  sgtt,
  distribuidoraHuevos,
].sort((a, b) => a.order - b.order);
