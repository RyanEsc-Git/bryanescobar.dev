# bryanescobar.dev

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Versión](https://img.shields.io/badge/versión-1.1.0-2563EB?style=flat)
![Contenido](https://img.shields.io/badge/contenido-©%20Bryan%20Escobar-27272A?style=flat)

Portafolio web profesional de **Bryan Escobar** — Software Development · Web Applications · Automation.

No es un CV en línea: es una demostración de criterio de producto, capacidad técnica y resolución de problemas, con casos de estudio que explican el problema, la arquitectura y las decisiones detrás de cada sistema.

---

## Índice

- [Stack](#stack)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación local](#instalación-local)
- [Variables de entorno](#variables-de-entorno)
- [Cómo editar el contenido](#cómo-editar-el-contenido)
- [El CV](#el-cv)
- [Sistema de diseño](#sistema-de-diseño)
- [SEO y accesibilidad](#seo-y-accesibilidad)
- [Imágenes del proyecto](#imágenes-del-proyecto)
- [Uso del código](#uso-del-código)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Troubleshooting](#troubleshooting)
- [Historial de versiones](#historial-de-versiones)

---

## Stack

| Área | Tecnología | Rol |
|---|---|---|
| Framework | Next.js 16 (App Router) | Routing, SSG, metadata, Server Components |
| UI | React 19 | Componentes y composición |
| Lenguaje | TypeScript 5 | Tipado y mantenibilidad |
| Estilos | Tailwind CSS 4 | Design tokens y responsive |
| Iconos | lucide-react + SVG propios | Iconografía consistente |
| Validación | Zod | Validación del formulario en el servidor |
| Email | Resend (vía fetch) | Recepción de mensajes de contacto |
| Analítica | Vercel Analytics + Speed Insights | Métricas esenciales |
| Deploy | Vercel | CI/CD y hosting |

**Decisiones deliberadas:**

- **Sin librería de animación.** El efecto de entrada usa `IntersectionObserver` + CSS (`components/ui/reveal.tsx`), respeta `prefers-reduced-motion` y no agrega peso al bundle.
- **Contenido en TypeScript, no MDX.** Los casos de estudio son objetos tipados en `content/`. Se editan como texto, pero el compilador avisa si falta un campo. MDX entra cuando llegue el blog.
- **Sin base de datos.** V1 no la necesita; agregarla sin un requisito real solo suma complejidad.

---

## Estructura del proyecto

```
bryanescobar.dev/
│
├── app/
│   ├── page.tsx                    Home
│   ├── layout.tsx                  Layout global, metadata y JSON-LD
│   ├── globals.css                 Design tokens y utilidades
│   ├── not-found.tsx               404 personalizada
│   ├── opengraph-image.tsx         Card social generada
│   ├── sitemap.ts / robots.ts      SEO técnico
│   ├── about/ · experience/ · contact/
│   └── projects/
│       ├── page.tsx                Listado
│       └── [slug]/                 Case Study + su Open Graph
│
├── components/
│   ├── layout/                     Navbar y Footer
│   ├── sections/                   Secciones de la Home
│   ├── projects/                   Tarjetas y bloques de Case Study
│   └── ui/                         Botones, secciones, reveal, iconos
│
├── content/
│   ├── profile.ts                  Hero, About, stack, proceso, experiencia
│   └── projects/                   Un archivo por caso de estudio
│
├── config/site.ts                  Nombre, enlaces, correo, navegación
├── lib/                            Metadata, utils y Server Action
├── types/                          Modelos de datos
└── public/                         Imágenes, portadas y CV
```

---

## Instalación local

```bash
npm install
```

```bash
npm run dev
```

Luego abre <http://localhost:3000>.

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build |
| `npm run lint` | ESLint |
| `npm run cv` | Regenera el CV en PDF |

---

## Variables de entorno

Copia `.env.example` a `.env.local` y completa lo que necesites. Todas son **opcionales**: sin ellas el sitio funciona igual, pero el formulario de contacto responde pidiendo que te escriban al correo directamente.

| Variable | Para qué sirve |
|---|---|
| `RESEND_API_KEY` | Habilita el envío real del formulario |
| `CONTACT_EMAIL_TO` | Correo donde llegan los mensajes |
| `CONTACT_EMAIL_FROM` | Remitente que aparece en el correo |

---

## Cómo editar el contenido

Todo el texto del sitio vive en dos lugares. **No hace falta tocar los componentes.**

| Quiero cambiar... | Archivo |
|---|---|
| Nombre, correo, GitHub, LinkedIn, enlaces del menú | `config/site.ts` |
| Titular del Hero, About, stack, proceso, experiencia, educación | `content/profile.ts` |
| Un caso de estudio | `content/projects/<proyecto>.ts` |
| Agregar un proyecto nuevo | Crear el archivo y registrarlo en `content/projects/index.ts` |

<details>
<summary><strong>Agregar un proyecto nuevo, paso a paso</strong></summary>

1. Copia `content/projects/sgtt.ts` como `content/projects/mi-proyecto.ts`.
2. Cambia `slug`, `title`, y el resto de campos. TypeScript avisa si falta alguno.
3. Pon la portada en `public/projects/cover-mi-proyecto.png` y la captura en `shot-mi-proyecto.png`; apunta `cover` y `screenshot` a esas rutas.
4. Regístralo en `content/projects/index.ts`:

```ts
import { miProyecto } from "./mi-proyecto";

export const projects: Project[] = [idInventory, tallerTonyLanding, sgtt, distribuidoraHuevos, miProyecto].sort(
  (a, b) => a.order - b.order,
);
```

5. Listo: aparece en la Home, en `/projects`, en el sitemap y con su propia card social.

</details>

---

## El CV

El CV en PDF se **genera desde código**, no se edita a mano. Así siempre coincide con lo que dice el portafolio.

```bash
npm run cv
```

| Archivo | Qué contiene |
|---|---|
| `scripts/cv-data.js` | El contenido: perfil, experiencia, educación, habilidades, idiomas |
| `scripts/generate-cv.js` | La maquetación (tipografía, márgenes, colores) |
| `public/resume/CV-Bryan-Escobar.pdf` | El resultado, enlazado desde el botón "Descargar CV" |

**Para actualizarlo:** edita `scripts/cv-data.js`, ejecuta `npm run cv` y listo. Poniendo `telefono: null` se omite el teléfono del documento.

Diseño pensado para leerse e imprimirse: una página, fondo blanco, texto seleccionable (lo leen los sistemas ATS de las empresas) y el mismo azul de acento del sitio.

---

## Sistema de diseño

Los tokens viven en `app/globals.css` dentro del bloque `@theme`. Cambiar un color ahí lo cambia en todo el sitio.

| Uso | Token | Hex |
|---|---|---|
| Fondo principal | `--color-bg` | `#09090B` |
| Superficies | `--color-surface` | `#111113` |
| Texto principal | `--color-fg` | `#FAFAFA` |
| Texto secundario | `--color-muted` | `#A1A1AA` |
| Bordes | `--color-border` | `#27272A` |
| Acento | `--color-accent` | `#2563EB` |

Tipografía: **Geist** para interfaz y **Geist Mono** para código, etiquetas y datos.

Utilidades propias: `container-page`, `label-mono`, `surface-card`, `hero-glow`, `grid-lines`.

---

## SEO y accesibilidad

- Metadata única por ruta con canonical, Open Graph y Twitter Card.
- Imágenes Open Graph generadas en build (`opengraph-image.tsx`), una general y una por proyecto.
- JSON-LD: `Person`, `WebSite` y `CreativeWork` en cada caso de estudio.
- `sitemap.xml` y `robots.txt` generados desde el contenido real.
- HTML semántico, `H1` único por página, skip link, navegación completa por teclado y focus visible.
- `prefers-reduced-motion` respetado en todas las animaciones.

---

## Imágenes del proyecto

Cada proyecto usa dos imágenes, ambas en `public/projects/`:

| Archivo | Dónde aparece |
|---|---|
| `cover-<proyecto>.png` | Portada de marca en la tarjeta (listado y Home) |
| `shot-<proyecto>.png` | Captura real del producto, dentro del caso de estudio |

Se referencian desde los campos `cover` y `screenshot` del archivo de contenido. Si un proyecto no tiene `screenshot`, el caso de estudio usa su portada.

> **Al reemplazar una imagen, cámbiale el nombre.** Si mantienes el mismo nombre, los navegadores siguen mostrando la versión anterior desde su caché. Renombrar el archivo (`cover-sgtt.png` → `cover-sgtt-v2.png`) fuerza la descarga de la nueva.

El material sin procesar —capturas originales, videos, fotos— vive en `material/`, que está fuera del control de versiones.

---

## Uso del código

Este repositorio es público para que se pueda revisar cómo está construido el portafolio.

El **código** está disponible como referencia: úsalo para aprender, inspirarte o resolver un problema parecido.

El **contenido** no: textos, casos de estudio, imágenes, fotografías, el CV y la identidad visual son personales y no están licenciados para su reutilización. Si te sirve la estructura, quédate con ella y pon lo tuyo dentro.

---

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En <https://vercel.com> → **Add New → Project** → importa el repositorio.
3. Vercel detecta Next.js solo; no hay que configurar el build.
4. Agrega las variables de entorno si vas a usar el formulario.
5. **Deploy**.
6. En **Settings → Domains**, conecta `bryanescobar.dev` y sigue las instrucciones de DNS.

Después de conectar el dominio, verifica que `siteConfig.url` en `config/site.ts` coincida con él: de ahí salen el canonical, el sitemap y las cards sociales.

---

## Troubleshooting

<details>
<summary><strong>El formulario dice "aún no está configurado"</strong></summary>

Falta `RESEND_API_KEY`. Es el comportamiento esperado sin la clave. Agrégala en `.env.local` para desarrollo y en las variables de entorno de Vercel para producción.

</details>

<details>
<summary><strong>Cambié un texto y no se ve en el navegador</strong></summary>

Si el servidor de desarrollo está corriendo, guarda el archivo y recarga. Si sigue igual, `Ctrl + Shift + R` para forzar el refresco ignorando la caché.

</details>

<details>
<summary><strong>Error de TypeScript al agregar un proyecto</strong></summary>

El tipo `Project` en `types/index.ts` exige todos los campos del caso de estudio. El error dice exactamente cuál falta. Es intencional: evita publicar casos de estudio a medias.

</details>

<details>
<summary><strong>Error al generar la imagen Open Graph</strong></summary>

El generador (Satori) exige que cada `div` con más de un hijo tenga `display: flex` explícito, y no acepta varios nodos de texto sueltos. Si agregas texto mezclado con variables, únelo en un solo template string.

</details>

<details>
<summary><strong>El build falla por un icono de lucide</strong></summary>

`lucide-react` v1 eliminó los iconos de marca. Los logos de GitHub y LinkedIn viven en `components/ui/icons.tsx` como SVG propios. Cualquier otro logo de marca hay que agregarlo ahí.

</details>

---

## Historial de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| 1.1.0 | Septiembre 2026 | Cuatro casos de estudio (ID Inventory, Taller Tony, SGTT, Distribuidora Escobar), portadas de marca + capturas reales, Instagram, CV generado desde código y repositorio público |
| 1.0.0 | Agosto 2026 | V1 Portfolio Core: Home, About, Projects, Case Studies, Experience, Contact, SEO, Open Graph, accesibilidad y build estático |

---

<div align="center">

**© 2026 Bryan Escobar** · Diseñado y construido por Bryan Escobar

</div>
