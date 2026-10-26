/**
 * Paisaje 8-bit del monte Fuji para el fondo del hero.
 *
 * La montaña se genera por código en lugar de dibujarse píxel a píxel: una
 * curva cóncava da la silueta del volcán y, a partir de ella, salen la nieve
 * y las laderas. Así se ajusta la forma cambiando un número en vez de
 * reescribir un mapa de miles de celdas.
 *
 * La nieve se mide por altitud —una línea horizontal con borde irregular— y
 * no por distancia al contorno. Medirla desde el borde dibuja un marco
 * blanco alrededor de toda la montaña en vez de una cima nevada.
 *
 * Todo es SVG estático: se renderiza en el servidor y no envía JavaScript.
 * Las nubes se mueven con CSS, que se desactiva con prefers-reduced-motion.
 */

const ART_W = 220;
const ART_H = 90;
const BASE_Y = 84;

const COLORS = {
  starDim: "#2a3a5c",
  starBright: "#4a6396",
  moon: "#c8d8ec",
  slopeFar: "#1a2740",
  slopeFarLit: "#1a2740",
  snowFar: "#6b7d9d",
  slope: "#223450",
  slopeLit: "#223450",
  snow: "#d2dff0",
  snowShade: "#97a9c7",
  cloud: "#1d2b48",
  cloudLit: "#263857",
  ground: "#131d31",
};

type Rect = { x: number; y: number; width: number; height: number; fill: string };

type MountainOptions = {
  peakX: number;
  peakY: number;
  spread: number;
  /** < 1 abre las faldas: así se ve volcán y no triángulo. */
  curve: number;
  /** Ancho de la cima achatada, en píxeles. */
  flatTop: number;
  /** Altura a la que baja la nieve, medida desde la cima. */
  snowDrop: number;
  colors: { slope: string; lit: string; snow: string; shade: string };
};

function buildMountain(o: MountainOptions): Rect[] {
  const rects: Rect[] = [];
  const snowLine = o.peakY + o.snowDrop;

  for (let x = 0; x < ART_W; x++) {
    const dist = Math.max(0, Math.abs(x - o.peakX) - o.flatTop / 2);
    const d = dist / o.spread;
    if (d > 1) continue;

    const top = Math.round(o.peakY + Math.pow(d, o.curve) * (BASE_Y - o.peakY));
    const lit = x < o.peakX;

    rects.push({
      x,
      y: top,
      width: 1,
      height: BASE_Y - top + 1,
      fill: lit ? o.colors.lit : o.colors.slope,
    });

    // Nieve: sobre la línea de altitud, con el borde inferior dentado.
    const wobble =
      (Math.sin(x * 0.8) > 0.3 ? 1 : 0) +
      (Math.sin(x * 2.1 + 1) > 0.6 ? 1 : 0) +
      (Math.sin(x * 3.7) > 0.8 ? 1 : 0);
    const bottom = snowLine + wobble;
    if (top < bottom) {
      rects.push({
        x,
        y: top,
        width: 1,
        height: bottom - top,
        fill: lit ? o.colors.snow : o.colors.shade,
      });
    }
  }

  return rects;
}

const STARS: Rect[] = [
  [16, 10], [34, 6], [52, 14], [63, 8], [79, 5], [95, 12], [106, 7],
  [121, 11], [138, 6], [152, 13], [169, 8], [184, 5], [199, 11], [211, 7],
  [25, 19], [71, 21], [113, 17], [160, 20], [191, 16], [44, 24], [131, 23],
].map(([x, y], i) => ({
  x,
  y,
  width: 1,
  height: 1,
  fill: i % 3 === 0 ? COLORS.starBright : COLORS.starDim,
}));

/** Luna pixelada, construida por filas. */
const MOON: Rect[] = [
  { x: 182, y: 11, width: 6, height: 1 },
  { x: 181, y: 12, width: 8, height: 1 },
  { x: 180, y: 13, width: 10, height: 3 },
  { x: 181, y: 16, width: 8, height: 1 },
  { x: 182, y: 17, width: 6, height: 1 },
].map((r) => ({ ...r, fill: COLORS.moon }));

function cloud(x: number, y: number, scale = 1): Rect[] {
  const w = Math.round(11 * scale);
  return [
    { x, y, width: w, height: 1, fill: COLORS.cloudLit },
    { x: x - 3, y: y + 1, width: w + 7, height: 1, fill: COLORS.cloud },
    { x: x - 1, y: y + 2, width: w + 3, height: 1, fill: COLORS.cloud },
  ];
}

export function PixelFuji({ className }: { className?: string }) {
  const far = buildMountain({
    peakX: 58,
    peakY: 50,
    spread: 72,
    curve: 0.62,
    flatTop: 3,
    snowDrop: 5,
    colors: {
      slope: COLORS.slopeFar,
      lit: COLORS.slopeFarLit,
      snow: COLORS.snowFar,
      shade: COLORS.snowFar,
    },
  });

  const fuji = buildMountain({
    peakX: 132,
    peakY: 31,
    spread: 96,
    curve: 0.58,
    flatTop: 4,
    snowDrop: 9,
    colors: {
      slope: COLORS.slope,
      lit: COLORS.slopeLit,
      snow: COLORS.snow,
      shade: COLORS.snowShade,
    },
  });

  return (
    <svg
      viewBox={`0 0 ${ART_W} ${ART_H}`}
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {STARS.map((s, i) => (
        <rect key={`st-${i}`} {...s} />
      ))}
      {MOON.map((m, i) => (
        <rect key={`mo-${i}`} {...m} />
      ))}

      {far.map((r, i) => (
        <rect key={`fa-${i}`} {...r} />
      ))}
      {fuji.map((r, i) => (
        <rect key={`fu-${i}`} {...r} />
      ))}

      <rect x="0" y={BASE_Y + 1} width={ART_W} height={ART_H - BASE_Y} fill={COLORS.ground} />

      {/* Nubes: dos capas a ritmos distintos. Cada grupo lleva su contenido
          duplicado 220 px más allá, de modo que el bucle encaja sin salto. */}
      <g className="fuji-clouds fuji-clouds--slow">
        {[...cloud(12, 27), ...cloud(92, 22, 1.3), ...cloud(165, 30)].map((r, i) => (
          <rect key={`c1-${i}`} {...r} />
        ))}
        {[...cloud(232, 27), ...cloud(312, 22, 1.3), ...cloud(385, 30)].map((r, i) => (
          <rect key={`c1b-${i}`} {...r} />
        ))}
      </g>
      <g className="fuji-clouds fuji-clouds--fast">
        {[...cloud(48, 40, 0.8), ...cloud(140, 44, 1.1)].map((r, i) => (
          <rect key={`c2-${i}`} {...r} />
        ))}
        {[...cloud(268, 40, 0.8), ...cloud(360, 44, 1.1)].map((r, i) => (
          <rect key={`c2b-${i}`} {...r} />
        ))}
      </g>
    </svg>
  );
}
