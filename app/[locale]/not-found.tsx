import { NotFoundContent } from "@/components/sections/not-found-content";

/**
 * Cubre los notFound() que se lanzan dentro de /es y /en, como un caso de
 * estudio que no existe. Las rutas que no coinciden con nada las atiende
 * app/global-not-found.tsx.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
