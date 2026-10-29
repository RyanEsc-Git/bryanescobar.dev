"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  PALETTE,
  SPRITE_HEIGHT,
  SPRITE_IDLE,
  SPRITE_JUMP,
  SPRITE_RUN_A,
  SPRITE_RUN_B,
  SPRITE_WIDTH,
} from "./sprite-data";
import type { UIDictionary } from "@/content/es/ui";

type GameLabels = UIDictionary["notFound"]["game"];

/**
 * Mini-juego de la página 404: el avatar corre y salta obstáculos.
 *
 * Dibuja el mismo sprite del avatar sobre un canvas. No arranca solo: espera
 * a que la persona pulse algo, para que la página de error siga siendo una
 * página de error y no una animación que se mueve sin permiso.
 *
 * El marcador se escribe directamente en el DOM desde el bucle de dibujo. Si
 * viviera en el estado de React, cada cuadro provocaría un render: sesenta por
 * segundo para actualizar un número.
 */

const GAME_W = 640;
const GAME_H = 200;
const PIXEL = 2;
/** Línea del suelo. El personaje apoya los pies justo encima. */
const FLOOR_Y = 180;
const CHAR_W = SPRITE_WIDTH * PIXEL;
const CHAR_H = SPRITE_HEIGHT * PIXEL;
const CHAR_X = 56;
const GROUND_Y = FLOOR_Y - SPRITE_HEIGHT * PIXEL;

const GRAVITY = 0.45;
const JUMP_V = -8.6;
const START_SPEED = 4.2;
const MAX_SPEED = 9;

type Obstacle = { x: number; w: number; h: number };
type Phase = "ready" | "playing" | "over";

/* ---------------------------------------------------------------- récord
   Pequeño store externo: evita leer localStorage dentro de un efecto y
   mantiene el valor estable entre montajes. En el servidor vale 0, así que
   el HTML inicial coincide con el del cliente. */

const RECORD_KEY = "pixel-runner-record";
let recordCache: number | null = null;
const listeners = new Set<() => void>();

function readRecord(): number {
  if (recordCache === null) {
    try {
      const saved = Number(localStorage.getItem(RECORD_KEY));
      recordCache = Number.isFinite(saved) && saved > 0 ? saved : 0;
    } catch {
      recordCache = 0; // Modo privado o almacenamiento bloqueado.
    }
  }
  return recordCache;
}

function saveRecord(value: number) {
  if (value <= readRecord()) return;
  recordCache = value;
  try {
    localStorage.setItem(RECORD_KEY, String(value));
  } catch {
    // Sin almacenamiento, el récord dura lo que la pestaña.
  }
  listeners.forEach((listener) => listener());
}

function subscribeRecord(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/* ---------------------------------------------------------------- juego */

export function PixelRunner({ labels }: { labels: GameLabels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("ready");
  const [finalScore, setFinalScore] = useState(0);
  const record = useSyncExternalStore(subscribeRecord, readRecord, () => 0);

  const state = useRef({
    y: 0,
    vy: 0,
    speed: START_SPEED,
    obstacles: [] as Obstacle[],
    distance: 0,
    frame: 0,
    running: false,
  });

  const start = useCallback(() => {
    const s = state.current;
    s.y = 0;
    s.vy = 0;
    s.speed = START_SPEED;
    s.obstacles = [];
    s.distance = 0;
    s.frame = 0;
    s.running = true;
    setPhase("playing");
  }, []);

  const jump = useCallback(() => {
    const s = state.current;
    if (s.running) {
      if (s.y === 0) s.vy = JUMP_V;
    } else {
      start();
    }
  }, [start]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const drawSprite = (sprite: readonly string[], y: number) => {
      sprite.forEach((row, ry) => {
        for (let rx = 0; rx < row.length; rx++) {
          const color = PALETTE[row[rx]];
          if (!color) continue;
          ctx.fillStyle = color;
          ctx.fillRect(CHAR_X + rx * PIXEL, y + ry * PIXEL, PIXEL, PIXEL);
        }
      });
    };

    const render = () => {
      const s = state.current;
      ctx.clearRect(0, 0, GAME_W, GAME_H);

      ctx.fillStyle = "#27272a";
      ctx.fillRect(0, GROUND_Y + CHAR_H, GAME_W, 2);

      if (s.running) {
        s.frame += 1;
        s.distance += s.speed;
        s.speed = Math.min(MAX_SPEED, START_SPEED + s.distance / 2600);

        s.vy += GRAVITY;
        s.y = Math.min(0, s.y + s.vy);
        if (s.y === 0) s.vy = 0;

        // La separación se mide en tiempo, no en píxeles: el salto dura unos
        // 38 cuadros, así que a cualquier velocidad debe quedar margen para
        // aterrizar y volver a saltar. Con una distancia fija, el juego se
        // volvía imposible al acelerar.
        const last = s.obstacles[s.obstacles.length - 1];
        const gap = s.speed * (55 + Math.random() * 35);
        if (!last || GAME_W - last.x > gap) {
          s.obstacles.push({
            x: GAME_W,
            w: 12 + Math.floor(Math.random() * 10),
            h: 16 + Math.floor(Math.random() * 23),
          });
        }

        s.obstacles = s.obstacles.filter((o) => {
          o.x -= s.speed;
          return o.x + o.w > -20;
        });

        const charBottom = GROUND_Y + s.y + CHAR_H;
        const hit = s.obstacles.some(
          (o) =>
            CHAR_X + CHAR_W - 12 > o.x &&
            CHAR_X + 12 < o.x + o.w &&
            charBottom > GROUND_Y + CHAR_H - o.h,
        );

        const points = Math.floor(s.distance / 10);
        if (scoreRef.current) {
          scoreRef.current.textContent = String(points).padStart(5, "0");
        }

        if (hit) {
          s.running = false;
          saveRecord(points);
          setFinalScore(points);
          setPhase("over");
        }
      }

      ctx.fillStyle = "#2563eb";
      for (const o of s.obstacles) {
        ctx.fillRect(o.x, GROUND_Y + CHAR_H - o.h, o.w, o.h);
      }

      const sprite =
        s.y < 0
          ? SPRITE_JUMP
          : s.running
            ? Math.floor(s.frame / 6) % 2 === 0
              ? SPRITE_RUN_A
              : SPRITE_RUN_B
            : SPRITE_IDLE;
      drawSprite(sprite, GROUND_Y + s.y);

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="surface-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5">
          <span className="label-mono">{labels.title}</span>
          <span className="font-mono text-xs text-muted">
            <span ref={scoreRef}>00000</span>
            {record > 0 ? (
              <span className="ml-3 text-subtle">
                HI {String(record).padStart(5, "0")}
              </span>
            ) : null}
          </span>
        </div>

        <button
          type="button"
          onClick={jump}
          aria-label={
            phase === "playing" ? labels.jump : labels.startAria
          }
          className="relative block w-full cursor-pointer bg-bg"
        >
          <canvas
            ref={canvasRef}
            width={GAME_W}
            height={GAME_H}
            className="block h-auto w-full"
          />

          {phase !== "playing" ? (
            <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 bg-bg/70 text-center">
              <span className="font-mono text-sm text-fg">
                {phase === "ready"
                  ? labels.start
                  : `${labels.gameOver} · ${finalScore} ${labels.points}`}
              </span>
              <span className="font-mono text-xs text-muted">
                {phase === "ready" ? labels.pressToStart : labels.pressToRetry}
              </span>
            </span>
          ) : null}
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-subtle">
        {labels.caption}
      </p>
    </div>
  );
}
