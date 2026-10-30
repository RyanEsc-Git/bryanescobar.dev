/**
 * Paisaje 8-bit del monte Fuji para el fondo del hero.
 *
 * La paleta es de atardecer japonés: cielo índigo, nubes rosadas, nieve con
 * reflejo cálido y, en primer plano, bosque oscuro con cerezos en flor. El
 * cielo se pinta con un degradado que arranca transparente, así la escena se
 * funde con el fondo de la página en vez de cortar en un rectángulo.
 *
 * La montaña se genera por código en lugar de dibujarse píxel a píxel: una
 * curva cóncava da la silueta del volcán y, a partir de ella, salen las
 * lenguas de nieve y las caras iluminada y en sombra. Así se ajusta la forma
 * cambiando un número en vez de reescribir un mapa de miles de celdas.
 *
 * Tres cosas que costaron encontrar y conviene no deshacer:
 *
 * 1. La nieve se mide por altitud, no por distancia al contorno. Medirla
 *    desde el borde dibuja un marco blanco alrededor de toda la montaña en
 *    vez de una cima nevada.
 * 2. Todo lo que se dibuje a una altura fija hay que recortarlo además
 *    contra la ladera, o acaba flotando en el cielo a los lados. Por eso la
 *    falda en sombra es un degradado sobre la propia silueta.
 * 3. El borde irregular de la nieve va en bloques de tres píxeles. Con ruido
 *    por columna salen púas de un píxel y la cima parece un gráfico de
 *    barras, no un glaciar.
 *
 * La montaña sale como unos pocos <path> escalonados, no como 220 <rect> por
 * columna: mismo resultado a la vista, con una fracción de los nodos. Los
 * bordes siguen siendo duros porque todas las coordenadas son enteras y el
 * SVG va con shapeRendering="crispEdges".
 *
 * Todo es SVG estático: se renderiza en el servidor y no envía nada de
 * JavaScript. El movimiento es CSS y se apaga con prefers-reduced-motion.
 */

const ART_W = 220;
const ART_H = 100;

/** Dónde se apoya la montaña. El bosque la tapa justo por debajo. */
const BASE_Y = 80;

const COLORS = {
  skyTop: "#2e2a5c",
  skyLow: "#4a4280",
  skyGlow: "#6d5f9c",
  starPale: "#e9c6d8",
  starDim: "#8a7fb5",
  moon: "#f6ecf4",
  cloudPale: "#f1c8ca",
  cloud: "#e2a2ae",
  cloudDeep: "#b8788f",
  ridgeFar: "#2f3365",
  ridge: "#262c54",
  mist: "#6d5f9c",
  slopeLit: "#505b89",
  slope: "#414c7a",
  slopeFoot: "#2d3459",
  snow: "#f7eef4",
  snowWarm: "#ecd6e2",
  snowShade: "#b7a3c4",
  forest: "#121430",
  forestMid: "#1b1f3e",
  blossom: "#f0ddeb",
  blossomShade: "#a78bb2",
  trunk: "#0d0f24",
};

type Rect = { x: number; y: number; width: number; height: number; fill: string };

type Column = { x: number; top: number; snowBottom: number };

/** Ruido determinista: el servidor y el cliente tienen que pintar lo mismo. */
function noise(i: number): number {
  const v = Math.sin(i * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

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
  /** Cuánto bajan las lenguas de nieve por las laderas. */
  streak: number;
};

/** Perfil de la montaña: para cada columna, dónde empieza y dónde acaba la nieve. */
function mountainColumns(o: MountainOptions): Column[] {
  const columns: Column[] = [];
  const snowLine = o.peakY + o.snowDrop;

  for (let x = 0; x < ART_W; x++) {
    const dist = Math.max(0, Math.abs(x - o.peakX) - o.flatTop / 2);
    const d = dist / o.spread;
    if (d > 1) continue;

    const top = Math.round(o.peakY + Math.pow(d, o.curve) * (BASE_Y - o.peakY));

    // El seno largo da los lóbulos anchos del glaciar; el ruido por bloques
    // de tres píxeles, las lenguas que bajan. Las dos cosas se apagan hacia
    // las faldas, donde ya no queda nieve.
    // Tres senos de periodo distinto, sin cuantizar. Cualquier ruido por
    // bloques da escalones rectos del mismo ancho y la cima acaba leyéndose
    // como el perfil de una ciudad; encadenar ondas la deja con lenguas que
    // entran y salen, que es como baja un glaciar.
    const fade = Math.max(0, 1 - d * 1.05);
    const wave =
      Math.sin(x * 0.085 + 4.2) * 0.46 +
      Math.sin(x * 0.21 + 0.6) * 0.34 +
      Math.sin(x * 0.44 + 2.1) * 0.2;
    const jitter = noise(x * 1.3) > 0.72 ? 1 : 0;
    const streak = Math.max(0, 0.45 + wave) * o.streak * fade + jitter;

    columns.push({ x, top, snowBottom: Math.round(snowLine + streak) });
  }

  return columns;
}

/** Silueta escalonada: borde superior de ida, base de vuelta. */
function silhouettePath(columns: Column[], baseY: number): string {
  if (!columns.length) return "";
  const parts = [`M${columns[0].x},${baseY}`];
  for (const c of columns) parts.push(`L${c.x},${c.top}`, `L${c.x + 1},${c.top}`);
  parts.push(`L${columns[columns.length - 1].x + 1},${baseY}`, "Z");
  return parts.join("");
}

/**
 * Franja entre dos alturas, columna a columna.
 *
 * Se queda con el tramo seguido más largo donde la franja tiene altura. El
 * ruido de la nieve hace que alguna columna suelta, lejos de la cima, cumpla
 * la condición; unirla con el bloque principal haría que el trazo saltara de
 * un lado al otro y dibujara un triángulo que no existe.
 */
function bandPath(
  columns: Column[],
  top: (c: Column) => number,
  bottom: (c: Column) => number,
): string {
  let visible: Column[] = [];
  let run: Column[] = [];
  for (const c of columns) {
    if (top(c) < bottom(c)) {
      run.push(c);
    } else {
      if (run.length > visible.length) visible = run;
      run = [];
    }
  }
  if (run.length > visible.length) visible = run;
  if (!visible.length) return "";

  const parts = [`M${visible[0].x},${top(visible[0])}`];
  for (const c of visible) parts.push(`L${c.x},${top(c)}`, `L${c.x + 1},${top(c)}`);
  for (let i = visible.length - 1; i >= 0; i--) {
    const c = visible[i];
    parts.push(`L${c.x + 1},${bottom(c)}`, `L${c.x},${bottom(c)}`);
  }
  parts.push("Z");
  return parts.join("");
}

/** Cordillera de fondo: ruido suave, sin nieve, casi del color del cielo. */
function ridgePath(offset: number, amplitude: number, baseline: number): string {
  const columns: Column[] = [];
  for (let x = 0; x < ART_W; x++) {
    const h =
      Math.sin(x * 0.07 + offset) * amplitude +
      Math.sin(x * 0.19 + offset * 2) * (amplitude * 0.55) +
      Math.sin(x * 0.41 + offset) * (amplitude * 0.25);
    columns.push({ x, top: Math.round(baseline - h), snowBottom: 0 });
  }
  return silhouettePath(columns, ART_H);
}

/**
 * Techo del bosque: valle en el centro y laderas que suben a los lados, igual
 * que en la referencia. Es la línea sobre la que se plantan pinos y cerezos,
 * y la que esconde la base de la montaña.
 */
function forestTop(x: number): number {
  const t = (x / ART_W) * Math.PI * 2;
  return Math.round(66 - Math.cos(t) * 10 + Math.sin(x * 0.11) * 1.5);
}

function forestPath(): string {
  const columns: Column[] = [];
  for (let x = 0; x < ART_W; x++) {
    columns.push({ x, top: forestTop(x), snowBottom: 0 });
  }
  return silhouettePath(columns, ART_H);
}

/** Pino en silueta: un triángulo escalonado con su tronco. */
function pine(x: number, baseY: number, height: number, fill: string): Rect[] {
  const rects: Rect[] = [];
  const half = Math.max(1, Math.round(height / 2.8));
  for (let row = 0; row < height; row++) {
    const w = Math.max(1, Math.round(((row + 1) / height) * half * 2));
    rects.push({
      x: x - Math.floor(w / 2),
      y: baseY - height + row,
      width: w,
      height: 1,
      fill,
    });
  }
  rects.push({ x, y: baseY, width: 1, height: 2, fill });
  return rects;
}

/**
 * Racimo de flor de cerezo: filas que se ensanchan y se cierran, con las de
 * abajo en sombra. Por filas y no como un círculo perfecto, que es lo que le
 * da el aire de pixel art.
 */
function blossom(cx: number, cy: number, rx: number, ry: number, seed = 0): Rect[] {
  const rects: Rect[] = [];
  for (let row = -ry; row <= ry; row++) {
    const t = row / (ry + 0.5);
    const wobble = noise(seed + row * 7) > 0.65 ? 1 : 0;
    const w = Math.round(rx * Math.sqrt(Math.max(0, 1 - t * t)) * 2) + wobble;
    if (w < 1) continue;
    rects.push({
      x: cx - Math.floor(w / 2),
      y: cy + row,
      width: w,
      height: 1,
      fill: row > ry * 0.2 ? COLORS.blossomShade : COLORS.blossom,
    });
  }
  return rects;
}

/**
 * Masa de cerezos: muchos racimos pequeños y desiguales en lugar de unas
 * pocas copas grandes, que a este tamaño se leen como algodón y no como flor.
 */
function blossomMass(from: number, to: number, count: number, seed: number): Rect[] {
  const rects: Rect[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const x = Math.round(from + (to - from) * t + (noise(seed + i) - 0.5) * 9);
    const drop = Math.round(noise(seed + i * 3) * 11);
    const y = forestTop(Math.min(ART_W - 1, Math.max(0, x))) + 5 + drop;
    const rx = 2 + Math.round(noise(seed + i * 5) * 2);
    rects.push(...blossom(x, y, rx, Math.max(2, rx), seed + i * 11));
  }
  return rects;
}

/** Cerezo con tronco: el de la esquina derecha, como en la referencia. */
function cherryTree(x: number, baseY: number): Rect[] {
  return [
    { x, y: baseY - 11, width: 2, height: 13, fill: COLORS.trunk },
    { x: x - 3, y: baseY - 9, width: 3, height: 1, fill: COLORS.trunk },
    { x: x + 2, y: baseY - 7, width: 4, height: 1, fill: COLORS.trunk },
    ...blossom(x, baseY - 15, 6, 4, 3),
    ...blossom(x - 7, baseY - 10, 4, 3, 17),
    ...blossom(x + 8, baseY - 8, 4, 3, 29),
    ...blossom(x + 1, baseY - 20, 4, 3, 41),
  ];
}

const STARS = [
  [16, 10], [34, 6], [52, 14], [63, 8], [79, 5], [95, 12], [106, 7],
  [121, 11], [138, 6], [152, 13], [169, 8], [184, 5], [199, 11], [211, 7],
  [25, 19], [71, 21], [113, 17], [160, 20], [191, 16], [44, 24], [131, 23],
  [8, 15], [87, 27], [147, 3], [176, 25], [205, 20], [57, 2], [100, 22],
] as const;

/** Luna pixelada, construida por filas. */
const MOON: Rect[] = [
  { x: 186, y: 10, width: 6, height: 1 },
  { x: 185, y: 11, width: 8, height: 1 },
  { x: 184, y: 12, width: 10, height: 3 },
  { x: 185, y: 15, width: 8, height: 1 },
  { x: 186, y: 16, width: 6, height: 1 },
].map((r) => ({ ...r, fill: COLORS.moon }));

/** Nube rosada de cuatro filas: cresta clara, cuerpo y sombra. */
function cloud(x: number, y: number, scale = 1): Rect[] {
  const w = Math.round(11 * scale);
  return [
    { x: x + 1, y: y - 1, width: Math.max(3, w - 4), height: 1, fill: COLORS.cloudPale },
    { x, y, width: w, height: 1, fill: COLORS.cloud },
    { x: x - 3, y: y + 1, width: w + 7, height: 1, fill: COLORS.cloud },
    { x: x - 1, y: y + 2, width: w + 3, height: 1, fill: COLORS.cloudDeep },
  ];
}

const FUJI = {
  peakX: 110,
  peakY: 16,
  spread: 88,
  curve: 0.75,
  flatTop: 3,
  snowDrop: 28,
  streak: 13,
};

export function PixelFuji({ className }: { className?: string }) {
  const fuji = mountainColumns(FUJI);
  const fujiLit = fuji.filter((c) => c.x < FUJI.peakX);
  const fujiShade = fuji.filter((c) => c.x >= FUJI.peakX);

  // Pinos sobre el techo del bosque: los de atrás, más claros, asoman por
  // encima de la silueta y le quitan el borde plano.
  const pinesFar = Array.from({ length: 26 }, (_, i) => Math.round(4 + i * 8.4)).flatMap(
    (x, i) => pine(x, forestTop(x) + 2, 5 + (i % 4), COLORS.forestMid),
  );
  const pinesNear = Array.from({ length: 20 }, (_, i) => Math.round(9 + i * 11)).flatMap(
    (x, i) => pine(x, forestTop(x) + 8, 8 + ((i * 3) % 6), COLORS.forest),
  );

  return (
    <svg
      viewBox={`0 0 ${ART_W} ${ART_H}`}
      // "meet" en lugar de "slice": así entra el paisaje completo y no se
      // recorta por los lados en pantallas estrechas.
      preserveAspectRatio="xMidYMax meet"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        {/* El cielo arranca transparente para fundirse con el fondo de la
            página: sin esto la escena corta en un rectángulo a media altura. */}
        <linearGradient id="fuji-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.skyTop} stopOpacity="0" />
          <stop offset="35%" stopColor={COLORS.skyTop} stopOpacity="0.85" />
          <stop offset="75%" stopColor={COLORS.skyLow} />
          <stop offset="100%" stopColor={COLORS.skyGlow} />
        </linearGradient>

        {/* La falda se oscurece con un degradado sobre la propia silueta.
            Como banda a altura fija dejaba un canto recto cruzando la
            montaña, que se leía como una meseta y no como sombra. */}
        <linearGradient id="fuji-foot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="40%" stopColor={COLORS.slopeFoot} stopOpacity="0" />
          <stop offset="100%" stopColor={COLORS.slopeFoot} stopOpacity="0.85" />
        </linearGradient>

        {/* La niebla va en degradado, no en un rectángulo plano: a lo ancho
            de la escena un borde recto se lee como una línea dibujada. */}
        <linearGradient id="fuji-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.mist} stopOpacity="0" />
          <stop offset="50%" stopColor={COLORS.mist} stopOpacity="0.3" />
          <stop offset="100%" stopColor={COLORS.mist} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ---------------------------------------------------------- cielo */}
      <rect x={0} y={0} width={ART_W} height={BASE_Y} fill="url(#fuji-sky)" />

      {STARS.map(([x, y], i) => (
        <rect
          key={`st-${i}`}
          x={x}
          y={y}
          width={1}
          height={1}
          fill={i % 3 === 0 ? COLORS.starPale : COLORS.starDim}
          className={i % 4 === 0 ? "fuji-star" : undefined}
          style={i % 4 === 0 ? { animationDelay: `${(i % 7) * 0.9}s` } : undefined}
        />
      ))}

      {/* La estrella fugaz pasa una vez cada ciclo largo: si cruzara seguido
          dejaría de ser un detalle y se volvería ruido. */}
      <g className="fuji-shooting">
        <rect x={0} y={0} width={4} height={1} fill={COLORS.moon} />
        <rect x={4} y={1} width={3} height={1} fill={COLORS.starPale} />
        <rect x={7} y={2} width={2} height={1} fill={COLORS.starDim} />
      </g>

      {MOON.map((m, i) => (
        <rect key={`mo-${i}`} {...m} />
      ))}

      {/* --------------------------------------------------------- montañas */}
      <path d={ridgePath(0, 5, 50)} fill={COLORS.ridgeFar} />
      <path d={ridgePath(2.4, 4, 57)} fill={COLORS.ridge} />

      <path d={silhouettePath(fujiLit, BASE_Y)} fill={COLORS.slopeLit} />
      <path d={silhouettePath(fujiShade, BASE_Y)} fill={COLORS.slope} />
      <path d={silhouettePath(fuji, BASE_Y)} fill="url(#fuji-foot)" />

      <path
        d={bandPath(
          fujiLit,
          (c) => c.top,
          (c) => c.snowBottom,
        )}
        fill={COLORS.snow}
      />
      <path
        d={bandPath(
          fujiShade,
          (c) => c.top,
          (c) => c.snowBottom,
        )}
        fill={COLORS.snowWarm}
      />
      {/* Sombra bajo el borde de la nieve, pegada a la ladera con Math.max. */}
      <path
        d={bandPath(
          fujiShade,
          (c) => Math.max(c.top, c.snowBottom - 2),
          (c) => c.snowBottom,
        )}
        fill={COLORS.snowShade}
        opacity={0.6}
      />

      <rect x={0} y={46} width={ART_W} height={18} fill="url(#fuji-mist)" />

      {/* --------------------------------------------------- primer plano */}
      <path d={forestPath()} fill={COLORS.forestMid} />
      {pinesFar.map((r, i) => (
        <rect key={`pf-${i}`} {...r} />
      ))}
      {[...blossomMass(-8, 54, 22, 101), ...blossomMass(166, 228, 16, 211)].map(
        (r, i) => (
          <rect key={`bm-${i}`} {...r} />
        ),
      )}
      {pinesNear.map((r, i) => (
        <rect key={`pn-${i}`} {...r} />
      ))}
      {cherryTree(200, 92).map((r, i) => (
        <rect key={`ct-${i}`} {...r} />
      ))}

      {/* Nubes: dos capas a ritmos distintos. Cada grupo lleva su contenido
          duplicado 220 px más allá, de modo que el bucle encaja sin salto. */}
      <g className="fuji-clouds fuji-clouds--slow">
        {[...cloud(12, 30), ...cloud(70, 24, 1.4), ...cloud(165, 33)].map((r, i) => (
          <rect key={`c1-${i}`} {...r} />
        ))}
        {[...cloud(232, 30), ...cloud(290, 24, 1.4), ...cloud(385, 33)].map((r, i) => (
          <rect key={`c1b-${i}`} {...r} />
        ))}
      </g>
      <g className="fuji-clouds fuji-clouds--fast">
        {[...cloud(44, 42, 0.8), ...cloud(150, 45, 1.1)].map((r, i) => (
          <rect key={`c2-${i}`} {...r} />
        ))}
        {[...cloud(264, 42, 0.8), ...cloud(370, 45, 1.1)].map((r, i) => (
          <rect key={`c2b-${i}`} {...r} />
        ))}
      </g>
    </svg>
  );
}
