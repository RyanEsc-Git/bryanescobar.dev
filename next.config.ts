import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // El layout raíz vive en app/[locale], así que no hay un app/layout.tsx
    // desde el que componer el 404 de rutas que no existen. Esta es la vía
    // que documenta Next para ese caso.
    globalNotFound: true,
  },
};

export default nextConfig;
