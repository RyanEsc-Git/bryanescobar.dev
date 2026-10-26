/**
 * Sprite 8-bit de Bryan.
 *
 * El personaje se define como una cuadrícula de caracteres: cada letra es un
 * color de la paleta y el punto es transparente. El mismo mapa alimenta tanto
 * el avatar en SVG como el personaje del juego en canvas, así que hay una sola
 * fuente de verdad para el dibujo.
 *
 *   H pelo        h brillo del pelo    P piel        p sombra de la piel
 *   B barba       G montura            L lente       O pupila
 *   C camisa      c sombra de camisa   A brazo       D pantalón
 *   S zapato
 */

export const PALETTE: Record<string, string> = {
  H: "#2a1f1a",
  h: "#3d2d24",
  P: "#c98d63",
  p: "#ac7449",
  B: "#3a2a20",
  G: "#0c0c0f",
  L: "#d7e8f7",
  O: "#101014",
  C: "#2a4a6b",
  c: "#1e3752",
  A: "#bd8259",
  D: "#1f2937",
  S: "#3f4654",
};

/** Postura de reposo. 18 columnas × 27 filas. */
export const SPRITE_IDLE = [
  "......HHHHHH......",
  "....HHhhhhhhHH....",
  "...HHhhhhhhhhHH...",
  "..HHhhhhhhhhhhHH..",
  "..HHhhhhhhhhhhHH..",
  "..HHHPPPPPPPPHHH..",
  "..HHPPPPPPPPPPHH..",
  "..HPPPPPPPPPPPPH..",
  "..HGGGGGGGGGGGGH..",
  "..HGLLLGGGGLLLGH..",
  "..HGLOLGGGGLOLGH..",
  "..HGLLLGPPGLLLGH..",
  "..HPPPPPPPPPPPPH..",
  "...PPPPpPPpPPPP...",
  "...PBBBBPPBBBBP...",
  "....BBBBBBBBBB....",
  ".....BBBBBBBB.....",
  "......PPPPPP......",
  "....CCCCCCCCCC....",
  "..ACCCCCCCCCCCCA..",
  "..ACCCCccCCCCCCA..",
  "..ACCCCccCCCCCCA..",
  "...CCCCCCCCCCCC...",
  "....DDDDDDDDDD....",
  "....DDDD..DDDD....",
  "....DDDD..DDDD....",
  "...SSSSS..SSSSS...",
] as const;

/** Carrera, paso 1. */
export const SPRITE_RUN_A = [
  "......HHHHHH......",
  "....HHhhhhhhHH....",
  "...HHhhhhhhhhHH...",
  "..HHhhhhhhhhhhHH..",
  "..HHhhhhhhhhhhHH..",
  "..HHHPPPPPPPPHHH..",
  "..HHPPPPPPPPPPHH..",
  "..HPPPPPPPPPPPPH..",
  "..HGGGGGGGGGGGGH..",
  "..HGLLLGGGGLLLGH..",
  "..HGLOLGGGGLOLGH..",
  "..HGLLLGPPGLLLGH..",
  "..HPPPPPPPPPPPPH..",
  "...PPPPpPPpPPPP...",
  "...PBBBBPPBBBBP...",
  "....BBBBBBBBBB....",
  ".....BBBBBBBB.....",
  "......PPPPPP......",
  "....CCCCCCCCCC....",
  "A.ACCCCCCCCCCCCA..",
  "AAACCCCccCCCCCCAA.",
  ".AACCCCccCCCCCCA..",
  "...CCCCCCCCCCCC...",
  "....DDDDDDDDDD....",
  "...DDDD....DDDD...",
  "..DDDD......DDDD..",
  "..SSSS......SSSS..",
] as const;

/** Carrera, paso 2. */
export const SPRITE_RUN_B = [
  "......HHHHHH......",
  "....HHhhhhhhHH....",
  "...HHhhhhhhhhHH...",
  "..HHhhhhhhhhhhHH..",
  "..HHhhhhhhhhhhHH..",
  "..HHHPPPPPPPPHHH..",
  "..HHPPPPPPPPPPHH..",
  "..HPPPPPPPPPPPPH..",
  "..HGGGGGGGGGGGGH..",
  "..HGLLLGGGGLLLGH..",
  "..HGLOLGGGGLOLGH..",
  "..HGLLLGPPGLLLGH..",
  "..HPPPPPPPPPPPPH..",
  "...PPPPpPPpPPPP...",
  "...PBBBBPPBBBBP...",
  "....BBBBBBBBBB....",
  ".....BBBBBBBB.....",
  "......PPPPPP......",
  "....CCCCCCCCCC....",
  "..ACCCCCCCCCCCCA.A",
  ".AACCCCccCCCCCCAAA",
  "..ACCCCccCCCCCCAA.",
  "...CCCCCCCCCCCC...",
  "....DDDDDDDDDD....",
  "....DDDDDDDD......",
  "....DDDD..DDD.....",
  "...SSSS....SSSS...",
] as const;

/** Salto: brazos arriba y piernas recogidas. */
export const SPRITE_JUMP = [
  "......HHHHHH......",
  "....HHhhhhhhHH....",
  "...HHhhhhhhhhHH...",
  "..HHhhhhhhhhhhHH..",
  "..HHhhhhhhhhhhHH..",
  "..HHHPPPPPPPPHHH..",
  "..HHPPPPPPPPPPHH..",
  "..HPPPPPPPPPPPPH..",
  "..HGGGGGGGGGGGGH..",
  "..HGLLLGGGGLLLGH..",
  "..HGLOLGGGGLOLGH..",
  "..HGLLLGPPGLLLGH..",
  "..HPPPPPPPPPPPPH..",
  "A..PPPPpPPpPPPP..A",
  "A..PBBBBPPBBBBP..A",
  "A...BBBBBBBBBB...A",
  "A....BBBBBBBB....A",
  "A.....PPPPPP.....A",
  "A...CCCCCCCCCC...A",
  "AA.CCCCCCCCCCCC.AA",
  ".ACCCCccCCCCCCCCA.",
  "..CCCCccCCCCCCCC..",
  "...CCCCCCCCCCCC...",
  "....DDDDDDDDDD....",
  "...DDDD....DDDD...",
  "..SSSS......SSSS..",
  "..................",
] as const;

export const SPRITE_WIDTH = SPRITE_IDLE[0].length;
export const SPRITE_HEIGHT = SPRITE_IDLE.length;

export type PixelRun = { x: number; y: number; width: number; color: string };

/**
 * Convierte el mapa en tramos horizontales del mismo color.
 * Un rectángulo por tramo en lugar de uno por píxel: el SVG pasa de unos
 * 300 nodos a poco más de 100.
 */
export function spriteToRuns(sprite: readonly string[]): PixelRun[] {
  const runs: PixelRun[] = [];

  sprite.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      if (key === ".") {
        x += 1;
        continue;
      }
      let width = 1;
      while (x + width < row.length && row[x + width] === key) width += 1;
      const color = PALETTE[key];
      if (color) runs.push({ x, y, width, color });
      x += width;
    }
  });

  return runs;
}
