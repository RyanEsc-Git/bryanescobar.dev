"use client";

import { useCallback, useEffect, useState } from "react";
import { Code2 } from "lucide-react";
import type { UIDictionary } from "@/content/es/ui";
import { cn } from "@/lib/utils";

type WindowLabels = UIDictionary["hero"]["window"];

/**
 * La ventana developer.ts del hero.
 *
 * Los tres círculos de la barra no son decoración: cierran, minimizan y
 * amplían de verdad. La razón es el paisaje que va detrás — quien quiera
 * verlo completo puede apartar la ventana en un clic, y volver a abrirla
 * desde la pastilla que queda en su lugar.
 */

const codeLines = [
  [
    { t: "const", c: "text-accent-light" },
    { t: " developer", c: "text-fg" },
    { t: " = {", c: "text-muted" },
  ],
  [
    { t: "  name: ", c: "text-muted" },
    { t: '"Bryan Escobar"', c: "text-emerald-400" },
    { t: ",", c: "text-muted" },
  ],
  [{ t: "  focus: [", c: "text-muted" }],
  [
    { t: '    "Software Development"', c: "text-emerald-400" },
    { t: ",", c: "text-muted" },
  ],
  [
    { t: '    "Web Applications"', c: "text-emerald-400" },
    { t: ",", c: "text-muted" },
  ],
  [
    { t: '    "Automation"', c: "text-emerald-400" },
    { t: ",", c: "text-muted" },
  ],
  [{ t: '    "Systems"', c: "text-emerald-400" }],
  [{ t: "  ],", c: "text-muted" }],
  [
    { t: "  location: ", c: "text-muted" },
    { t: '"El Salvador"', c: "text-emerald-400" },
    { t: ",", c: "text-muted" },
  ],
  [
    { t: "  status: ", c: "text-muted" },
    { t: '"Building..."', c: "text-emerald-400" },
  ],
  [{ t: "};", c: "text-muted" }],
];

type WindowState = "normal" | "minimized" | "zoomed" | "closed";

/** Los círculos de la barra de título. */
function TrafficLight({
  color,
  label,
  onClick,
}: {
  color: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="group/light relative size-2.5 rounded-full transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg focus-visible:ring-offset-2 focus-visible:ring-offset-surface-2"
      style={{ backgroundColor: color }}
    >
      {/* El área clicable real es mayor que el punto: 10 px es muy poco
          objetivo, sobre todo con el dedo. */}
      <span className="absolute -inset-2" />
    </button>
  );
}

export function CodeWindow({ labels }: { labels: WindowLabels }) {
  const [state, setState] = useState<WindowState>("normal");

  const restore = useCallback(() => setState("normal"), []);

  // Escape devuelve la ventana a su tamaño normal, como en cualquier escritorio.
  useEffect(() => {
    if (state === "normal" || state === "closed") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") restore();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, restore]);

  if (state === "closed") {
    // El padding derecho deja libre al avatar 8-bit, que va anclado a la
    // esquina de este mismo bloque: sin él, el muñeco tapa la pastilla.
    return (
      <div className="flex justify-end pr-[9rem]">
        <button
          type="button"
          onClick={restore}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/80 px-4 py-2.5 font-mono text-xs text-muted backdrop-blur-sm transition-colors hover:border-border-strong hover:text-fg"
        >
          <Code2 className="size-4 text-accent-light" aria-hidden />
          {labels.reopen}
        </button>
      </div>
    );
  }

  const minimized = state === "minimized";
  const zoomed = state === "zoomed";

  return (
    <div
      className={cn(
        "surface-card overflow-hidden shadow-2xl shadow-black/40 transition-[margin,box-shadow] duration-300",
        zoomed && "lg:-ml-12 lg:-mr-4 shadow-black/60",
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <TrafficLight
          color="#ff5f57"
          label={labels.close}
          onClick={() => setState("closed")}
        />
        <TrafficLight
          color="#febc2e"
          label={minimized ? labels.restore : labels.minimize}
          onClick={() => setState(minimized ? "normal" : "minimized")}
        />
        <TrafficLight
          color="#28c840"
          label={zoomed ? labels.restore : labels.zoom}
          onClick={() => setState(zoomed ? "normal" : "zoomed")}
        />
        <span className="ml-3 font-mono text-xs text-subtle">{labels.file}</span>
      </div>

      {/* Al minimizar se colapsa la altura en lugar de desmontarse: así la
          transición tiene a dónde ir y el contenido no salta al volver. */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none",
          minimized ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
        )}
        aria-hidden={minimized}
      >
        <div className="overflow-hidden">
          <pre
            className={cn(
              "overflow-x-auto p-6 font-mono leading-relaxed transition-[font-size] duration-300 motion-reduce:transition-none",
              zoomed ? "text-sm" : "text-[13px]",
            )}
          >
            <code>
              {codeLines.map((line, index) => (
                <span key={index} className="block">
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} className={token.c}>
                      {token.t}
                    </span>
                  ))}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
