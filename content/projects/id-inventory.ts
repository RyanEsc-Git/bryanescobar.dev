import type { Project } from "@/types";

export const idInventory: Project = {
  slug: "id-inventory",
  title: "ID Inventory",
  summary:
    "Aplicación web instalable para el control de compras, recepciones y despachos en bodegas de construcción, con evidencia fotográfica, trazabilidad por lote y un entorno local que replica producción.",
  year: 2026,
  role: "Análisis, arquitectura y desarrollo (proyecto individual)",
  client: "ID Arquitectos",
  stack: ["JavaScript", "Supabase", "PostgreSQL", "PWA", "esbuild", "jsPDF"],
  cover: "/projects/cover-id-inventory.png",
  coverAlt:
    "Portada del sistema ID Inventory: control de compras, recepciones y despachos para bodegas",
  featured: true,
  order: 1,
  status: "En producción",
  links: {},
  metrics: [
    { label: "Versión", value: "2.6.1" },
    { label: "Modelo de datos", value: "20+ tablas" },
    { label: "Instalable", value: "PWA" },
  ],
  overview: [
    "ID Inventory controla el ciclo completo de materiales en bodegas de obra: qué se ordenó a un proveedor, qué llegó realmente, en qué estado llegó y a dónde salió después. Es el tipo de operación donde una caja mal registrada se convierte semanas después en una discusión sin evidencia.",
    "La aplicación se instala como PWA en el dispositivo del bodeguero, guarda evidencia fotográfica de cada operación y genera comprobantes en PDF y exportaciones a Excel para administración.",
  ],
  problem: [
    "En una bodega de construcción, el material se mueve más rápido de lo que se documenta. Lo ordenado, lo recibido y lo despachado se registraban por separado, así que las diferencias solo aparecían al final, cuando ya nadie recordaba el detalle.",
    "Las recepciones parciales eran el punto más frágil: cuando de una orden llegan 80 de 100 unidades y 5 vienen dañadas, un registro plano no puede representar lo ocurrido ni sustentar un reclamo al proveedor.",
  ],
  challenge: [
    "La conectividad en obra no es confiable. La aplicación tenía que abrir y seguir siendo usable aunque la red fallara en medio de una jornada.",
    "Cada operación necesitaba evidencia: fotos del material recibido o despachado, asociadas al documento correspondiente y conservadas de forma íntegra.",
    "Un mismo sistema debía servir a varias bodegas con usuarios distintos, sin que una pudiera ver ni alterar los datos de otra.",
    "Necesitaba poder desarrollar y probar cambios sin arriesgar los datos reales del cliente en producción.",
  ],
  solution: [
    "Construí la aplicación como PWA en JavaScript, empaquetada con esbuild, sobre Supabase: autenticación, base de datos PostgreSQL, llamadas RPC para la lógica de negocio y storage para las evidencias fotográficas.",
    "El modelo de datos separa explícitamente intención y realidad: la orden de compra guarda lo solicitado, y la recepción registra por separado cantidad aceptada, dañada y rechazada, con referencia de lote. Así la diferencia entre lo pedido y lo recibido es un dato consultable, no una nota al margen.",
    "Cada operación relevante genera un comprobante y queda ligada a sus evidencias; las cancelaciones conservan una instantánea completa del documento anulado en formato JSON antes de cerrarlo.",
    "Para desarrollar sin tocar producción, construí un entorno local que replica la API de Supabase contra un PostgreSQL propio en 127.0.0.1: mismo esquema, misma forma de consultas, mismo storage, pero con datos de prueba.",
  ],
  architecture: [
    "PWA instalable — JavaScript + esbuild",
    "Service Worker — app shell en caché",
    "Supabase Auth — sesiones y perfiles",
    "PostgreSQL + RPC — lógica de negocio",
    "Supabase Storage — evidencias fotográficas",
    "jsPDF / XLSX — comprobantes y exportaciones",
  ],
  technologies: [
    { name: "JavaScript", role: "Aplicación completa, sin framework de interfaz" },
    { name: "Supabase", role: "Autenticación, base de datos, funciones RPC y almacenamiento" },
    { name: "PostgreSQL", role: "Modelo relacional con más de veinte tablas y restricciones de integridad" },
    { name: "Service Worker + Manifest", role: "Instalación como PWA y disponibilidad del shell sin red" },
    { name: "esbuild", role: "Empaquetado rápido del bundle de la aplicación" },
    { name: "jsPDF y SheetJS (xlsx)", role: "Comprobantes en PDF y exportaciones a Excel" },
    { name: "Node.js + pg", role: "Entorno local que replica la API de producción para desarrollo y pruebas" },
  ],
  features: [
    {
      title: "Órdenes de compra",
      description:
        "Registro por proveedor y bodega, con control de cantidades y cancelación que conserva el documento original.",
    },
    {
      title: "Recepciones con estado",
      description:
        "Cada partida se recibe distinguiendo cantidad aceptada, dañada y rechazada, con referencia de lote.",
    },
    {
      title: "Despachos",
      description:
        "Salidas de material por producto y lote, descontando el saldo de la bodega correspondiente.",
    },
    {
      title: "Evidencia fotográfica",
      description:
        "Fotos asociadas a cada operación, almacenadas con verificación de integridad por hash.",
    },
    {
      title: "Incidencias y alertas",
      description:
        "Registro de problemas detectados en la operación, con alertas marcables como leídas.",
    },
    {
      title: "Comprobantes y exportaciones",
      description:
        "Generación de comprobantes en PDF por operación y exportación de información a Excel.",
    },
    {
      title: "Multi-bodega",
      description:
        "Bodegas independientes con usuarios asignados, de modo que cada quien opera solo donde le corresponde.",
    },
    {
      title: "Historial de precios",
      description:
        "Cada cambio de precio de un producto queda registrado con su valor anterior y el nuevo.",
    },
  ],
  process: [
    "Research — Entendí el recorrido real del material: qué se pide, quién lo recibe, qué pasa cuando llega incompleto.",
    "Requirements — Definí qué operaciones debían dejar evidencia obligatoria y cuáles podían ser opcionales.",
    "Architecture — Modelé la base de datos primero: si el modelo no representa la realidad de la bodega, ninguna interfaz lo arregla después.",
    "Development — Aplicación en JavaScript empaquetada con esbuild, con la lógica sensible en funciones RPC del lado de la base de datos.",
    "Local environment — Construí una réplica local de la API de producción para desarrollar sin riesgo sobre datos reales.",
    "Testing — Pruebas automatizadas con el runner nativo de Node contra ese entorno local.",
    "Deployment — Publicación como PWA instalable, con versionado explícito del app shell en el Service Worker.",
  ],
  decisions: [
    {
      title: "PWA en vez de aplicación nativa",
      body: "Una app nativa habría exigido tiendas, firmas y un ciclo de actualización lento para un equipo pequeño. La PWA se instala desde el navegador, se actualiza al publicar y funciona en cualquier dispositivo de la bodega. El Service Worker versiona el app shell para que una publicación nueva no deje a nadie con una versión vieja en caché.",
    },
    {
      title: "Separar aceptado, dañado y rechazado",
      body: "Era más simple registrar solo la cantidad recibida, pero eso borra justo la información que sustenta un reclamo. Modelarlo como tres cantidades distintas hace que la diferencia entre lo ordenado y lo aprovechable sea consultable desde el primer día.",
    },
    {
      title: "Lógica de negocio en funciones RPC",
      body: "Las operaciones que tocan varias tablas —recibir, despachar, cancelar— viven como funciones en la base de datos en lugar de en el cliente. Así una operación se completa entera o no se completa, y el navegador no puede dejar el inventario a medio actualizar.",
    },
    {
      title: "Cancelar guardando una instantánea",
      body: "Al cancelar una orden se conserva una copia completa del documento en JSON junto con el motivo y el responsable. Mantiene la trazabilidad sin ensuciar las tablas operativas con registros muertos.",
    },
    {
      title: "Entorno local que replica producción",
      body: "En vez de desarrollar contra la base real o contra datos falsos que se comportan distinto, levanté un PostgreSQL local que expone la misma API que usa la aplicación. Probar un cambio no implica arriesgar información del cliente, y los errores aparecen en mi máquina y no en la bodega.",
    },
  ],
  results: [
    "La bodega registra en un solo lugar lo que se ordenó, lo que llegó, en qué estado llegó y a dónde salió.",
    "Las diferencias con el proveedor dejaron de ser una discusión de memoria: cada recepción conserva cantidades por estado, lote y evidencia fotográfica.",
    "Administración obtiene comprobantes en PDF y exportaciones a Excel sin pedirle nada al personal de bodega.",
  ],
  learned: [
    "El modelo de datos es la decisión más cara de revertir. Las horas invertidas en representar bien una recepción parcial se devolvieron completas cuando llegaron los casos raros.",
    "Poner las operaciones de varias tablas del lado de la base de datos evita toda una familia de errores que, desde el cliente, son casi imposibles de reproducir.",
    "Montar un entorno local fiel a producción cambió mi forma de trabajar: pasé de probar con miedo a probar sin consecuencias.",
  ],
};
