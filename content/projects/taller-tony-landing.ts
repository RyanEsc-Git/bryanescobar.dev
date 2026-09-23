import type { Project } from "@/types";

export const tallerTonyLanding: Project = {
  slug: "taller-tony-landing",
  title: "Taller Tony — Landing Page",
  summary:
    "Sitio web para un taller eléctrico y automotriz, con una animación de scroll construida sobre canvas: 240 fotogramas pintados cuadro a cuadro, sin un solo elemento de video.",
  year: 2026,
  role: "Diseño y desarrollo frontend (proyecto individual)",
  client: "Taller Tony · La Unión, El Salvador",
  stack: ["Astro", "TypeScript", "CSS", "Canvas API", "WebP"],
  cover: "/projects/taller-tony-landing-cover.png",
  coverAlt:
    "Portada de la landing page de Taller Tony con el hero a pantalla completa y el nombre del taller sobre una fila de vehículos",
  featured: true,
  order: 2,
  status: "Finalizado",
  links: {},
  metrics: [
    { label: "Hero", value: "240 fotogramas" },
    { label: "Dependencias", value: "Solo Astro" },
    { label: "Framework UI", value: "Ninguno" },
  ],
  overview: [
    "Taller Tony es un taller eléctrico, automotriz y de torno en La Unión. Su presencia digital se reducía a redes sociales, así que quien buscaba el taller no encontraba qué servicios ofrecía, dónde estaba ni cómo contactarlo.",
    "El encargo fue un sitio que se viera a la altura de un taller serio y que llevara al visitante a un solo lugar: escribir por WhatsApp. Es un proyecto de frontend puro, sin backend ni panel administrativo.",
  ],
  problem: [
    "Un taller se elige por confianza, y la confianza entra por los ojos antes que por el texto. Una página genérica con una lista de servicios transmite exactamente lo mismo que la competencia.",
    "Al mismo tiempo, el visitante típico llega desde el teléfono y con datos móviles: cualquier cosa que tarde en cargar se pierde antes de mostrarse.",
  ],
  challenge: [
    "Conseguir un hero con impacto real sin recurrir a un video incrustado, que en móvil pesa, se reproduce solo a veces y no se puede controlar con el scroll.",
    "Presentar seis servicios sin construir una pared de tarjetas que nadie lee.",
    "Mantener el sitio ligero y mantenible por una sola persona, sin arrastrar un framework de interfaz para lo que es, en esencia, una página.",
  ],
  solution: [
    "Construí el sitio con Astro, que envía HTML estático y solo el JavaScript estrictamente necesario, y escribí todo el CSS a mano en lugar de usar un framework de estilos.",
    "Para el hero desarrollé un componente de animación por scroll al estilo de las páginas de producto de Apple: 240 fotogramas en WebP extraídos de un video de 10 segundos, precargados y pintados en un elemento canvas que avanza según la posición del scroll. No hay ningún elemento de video en la página.",
    "Los servicios se recorren en horizontal en lugar de apilarse, y las marcas atendidas pasan en un marquee continuo de logos vectoriales. El resto —quiénes son, por qué elegirlos, preguntas frecuentes, ubicación y horarios— baja en secciones cortas hasta el contacto.",
  ],
  architecture: [
    "Astro — HTML estático, cero JavaScript por defecto",
    "Componentes .astro — una sección, un archivo",
    "ScrollVideo — canvas + 240 fotogramas WebP",
    "CSS propio — sin framework de estilos",
    "Google Fonts y Google Maps embebido",
    "Salida estática lista para cualquier hosting",
  ],
  technologies: [
    { name: "Astro", role: "Framework del sitio: HTML estático y JavaScript mínimo" },
    { name: "TypeScript", role: "Tipado de las props de los componentes, como el de la animación" },
    { name: "CSS", role: "Todo el diseño escrito a mano, sin framework de estilos" },
    { name: "Canvas API", role: "Pintado de los fotogramas del hero sincronizado con el scroll" },
    { name: "WebP", role: "Formato de los 240 fotogramas, mucho más liviano que PNG o JPEG" },
    { name: "Bebas Neue + Inter", role: "Titulares condensados y texto legible" },
    { name: "Google Maps", role: "Ubicación del taller embebida en la página" },
  ],
  features: [
    {
      title: "Hero animado por scroll",
      description:
        "240 fotogramas pintados en canvas que avanzan con el scroll, con barra de progreso mientras precargan.",
    },
    {
      title: "Servicios en scroll horizontal",
      description:
        "Seis servicios —diagnóstico, aceite y filtros, frenos, sistema eléctrico, aire acondicionado y alineación— recorribles en horizontal.",
    },
    {
      title: "Marquee de marcas",
      description:
        "Doce logos vectoriales de marcas atendidas en un desplazamiento continuo e infinito.",
    },
    {
      title: "Preguntas frecuentes",
      description:
        "Acordeón que resuelve las dudas habituales antes de que el cliente tenga que preguntarlas.",
    },
    {
      title: "Ubicación y horarios",
      description:
        "Mapa de Google embebido, horarios de atención y canales de contacto en el pie de página.",
    },
    {
      title: "WhatsApp como destino",
      description:
        "Cada llamada a la acción abre WhatsApp con un mensaje ya escrito para agendar una cita.",
    },
  ],
  process: [
    "Understanding — Definí qué necesita saber alguien antes de llevar su carro a un taller que no conoce.",
    "Structure — Ordené la página como una conversación: qué hacemos, quiénes somos, por qué confiar, dudas, dónde estamos.",
    "UI Design — Titulares condensados en mayúsculas sobre fondo oscuro, para que el sitio se sienta cercano al mundo automotriz.",
    "Development — Un componente por sección en Astro, con CSS propio y sin dependencias de interfaz.",
    "Hero animation — Extracción de los fotogramas del video, conversión a WebP y desarrollo del componente de canvas.",
    "Responsive — Ajuste del recorte del canvas y de las secciones horizontales para pantallas de teléfono.",
    "Testing — Revisión de la carga de fotogramas, la navegación y el comportamiento del scroll en distintos tamaños.",
  ],
  decisions: [
    {
      title: "Canvas con fotogramas en vez de un elemento de video",
      body: "Un video incrustado no se puede recorrer con el scroll de forma fiable: los navegadores móviles bloquean la reproducción automática, el buscado por posición va a saltos y el archivo se descarga entero aunque nadie baje. Con fotogramas en WebP dibujados en canvas, la animación responde exactamente al scroll, se puede mostrar el progreso de carga y el hero se comporta igual en todos los dispositivos. El costo es el peso de los fotogramas, que asumí a cambio de control total.",
    },
    {
      title: "Astro en lugar de React o Next.js",
      body: "La página no tiene estado, ni sesión, ni datos que cambien: es contenido. Astro entrega HTML estático y solo envía JavaScript donde de verdad hace falta, que aquí es el hero, el acordeón y el marquee. Traer un framework completo habría multiplicado el peso sin añadir nada.",
    },
    {
      title: "CSS propio, sin framework de estilos",
      body: "El sitio tiene una identidad visual muy marcada —tipografía condensada, fondo negro, acento rojo— que no viene de ningún sistema de diseño existente. Escribir el CSS a mano resultó más corto y más claro que pelear contra los valores por defecto de un framework.",
    },
    {
      title: "Scroll horizontal en los servicios",
      body: "Seis tarjetas apiladas obligan a un scroll largo en el que todo se ve igual. En horizontal, cada servicio ocupa el foco por turno y el recorrido invita a seguir. En pantallas pequeñas se convierte en un carrusel táctil.",
    },
    {
      title: "Componente de animación parametrizable",
      body: "El componente del hero recibe el número de fotogramas, las dimensiones del video original y la altura del recorrido de scroll. Cambiar la animación es cambiar los archivos y un parámetro, no reescribir el componente.",
    },
  ],
  results: [
    "El taller pasó de no tener sitio web a una página que explica sus servicios, su ubicación y sus horarios, y que empuja al visitante hacia WhatsApp.",
    "El hero logra el efecto de una animación de video manteniendo el control total del scroll y sin depender de la reproducción automática del navegador.",
    "El proyecto se mantiene con una sola dependencia, así que actualizarlo no implica arrastrar el peso de un ecosistema entero.",
  ],
  learned: [
    "La forma de presentar la información pesa tanto como la información misma: los mismos seis servicios comunican distinto apilados que recorridos en horizontal.",
    "Recrear un efecto que normalmente se resuelve con una librería obliga a entender cómo funciona por dentro. Sincronizar canvas y scroll me enseñó más que cualquier plugin de animación.",
    "Elegir la herramienta por el problema y no por costumbre: para una página de contenido, un framework de aplicación habría sido peso muerto.",
  ],
};
