import {
  SPRITE_HEIGHT,
  SPRITE_IDLE,
  SPRITE_JUMP,
  SPRITE_WIDTH,
  spriteToRuns,
} from "./sprite-data";
import { cn } from "@/lib/utils";

type PixelAvatarProps = {
  /** Lado del píxel en px. El sprite mide 18 × 27 píxeles. */
  scale?: number;
  pose?: "idle" | "jump";
  className?: string;
  /** Flotación suave. Se desactiva sola con prefers-reduced-motion. */
  floating?: boolean;
  title?: string;
};

/**
 * Avatar 8-bit dibujado como SVG desde el mapa de píxeles compartido.
 * Se renderiza en el servidor: no manda JavaScript al cliente.
 */
export function PixelAvatar({
  scale = 6,
  pose = "idle",
  className,
  floating = false,
  title = "Bryan Escobar en 8 bits",
}: PixelAvatarProps) {
  const runs = spriteToRuns(pose === "jump" ? SPRITE_JUMP : SPRITE_IDLE);

  return (
    <svg
      width={SPRITE_WIDTH * scale}
      height={SPRITE_HEIGHT * scale}
      viewBox={`0 0 ${SPRITE_WIDTH} ${SPRITE_HEIGHT}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={title}
      className={cn(floating && "pixel-float", className)}
    >
      {runs.map((run) => (
        <rect
          key={`${run.x}-${run.y}`}
          x={run.x}
          y={run.y}
          width={run.width}
          height={1}
          fill={run.color}
        />
      ))}
    </svg>
  );
}
