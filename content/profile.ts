import type { EducationEntry, ExperienceEntry } from "@/types";

export const heroContent = {
  eyebrow: "El Salvador · Disponible para proyectos",
  name: "Bryan Escobar",
  headline: "Desarrollo software para resolver problemas reales.",
  subheadline:
    "Software Development · Web Applications · Automation · Systems",
  intro:
    "Construyo aplicaciones web y sistemas que digitalizan la operación de negocios reales: menos papel, menos errores y decisiones basadas en datos que existen.",
} as const;

export const aboutPreview = [
  { label: "Ubicación", value: "El Salvador" },
  { label: "Enfoque", value: "Software Engineering / Systems" },
  { label: "Intereses", value: "Software · Automatización · Sistemas · IA" },
] as const;

export const aboutContent = {
  lead:
    "Soy estudiante de Ingeniería en Sistemas y Redes Informáticas, y desarrollador de software con una forma de trabajar bastante concreta: elegir un problema que le cuesta dinero o tiempo a alguien, y construir la solución completa hasta que esté funcionando en producción.",
  paragraphs: [
    "Mi formación empezó en el área técnica —electrónica y electricidad— antes de pasar a sistemas, y esa mezcla dejó una marca en cómo trabajo: me interesa entender cómo funciona algo por dentro antes de intentar mejorarlo.",
    "La mayor parte de lo que he construido nació de necesidades reales de negocios pequeños: un taller que llevaba sus órdenes en cuadernos, una distribuidora que cuadraba las cuentas de memoria cada noche. En ambos casos el reto no fue solo escribir el código, sino entender la operación, modelarla y lograr que el sistema se usara todos los días.",
    "Trabajo con Node.js, React, JavaScript y TypeScript, bases de datos SQL, y me encargo del ciclo completo: análisis, desarrollo, despliegue en servidor, HTTPS, respaldos y mantenimiento. Prefiero arquitecturas simples que pueda sostener y explicar antes que infraestructura impresionante que nadie necesita.",
  ],
  principles: [
    {
      title: "Primero el problema",
      description:
        "Antes de elegir tecnología, entiendo el proceso que se quiere resolver. La herramienta correcta depende de eso, no al revés.",
    },
    {
      title: "Simple hasta que deje de serlo",
      description:
        "No agrego infraestructura ni abstracciones antes de necesitarlas. La complejidad se justifica con un requisito, no con una moda.",
    },
    {
      title: "Que llegue a producción",
      description:
        "Un proyecto no está terminado cuando corre en mi máquina, sino cuando alguien lo usa en su trabajo diario y sigue funcionando sin mí.",
    },
    {
      title: "Dejar rastro",
      description:
        "Documentación, historial de versiones y auditoría en los datos. El código que no se puede explicar no se puede mantener.",
    },
  ],
} as const;

export const whatIDo = [
  {
    title: "Software Development",
    description:
      "Aplicaciones y sistemas construidos alrededor de una necesidad concreta, desde el modelo de datos hasta la interfaz.",
  },
  {
    title: "Web Applications",
    description:
      "Experiencias web modernas, rápidas, responsivas y mantenibles, pensadas para usarse a diario.",
  },
  {
    title: "Business Automation",
    description:
      "Digitalización de procesos operativos: registros, inventarios, cobros y reportes que antes vivían en papel.",
  },
  {
    title: "Systems & Technology",
    description:
      "Análisis, arquitectura, despliegue en servidor e integración de las piezas que hacen funcionar un sistema.",
  },
] as const;

export const techStack = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Server Actions", "JWT"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "SQLite"],
  },
  {
    category: "Tools & Deploy",
    items: ["Git", "GitHub", "VS Code", "Vercel", "nginx", "PM2", "Linux VPS"],
  },
] as const;

export const workProcess = [
  { step: "01", title: "Discover", description: "Entender el problema y a quién le duele." },
  { step: "02", title: "Analyze", description: "Identificar requisitos, datos y procesos existentes." },
  { step: "03", title: "Design", description: "Diseñar arquitectura, modelo de datos y experiencia." },
  { step: "04", title: "Build", description: "Desarrollar la solución en iteraciones cortas." },
  { step: "05", title: "Test", description: "Validar el funcionamiento con casos y datos reales." },
  { step: "06", title: "Deploy", description: "Implementar en producción, medir y mejorar." },
] as const;

export const experience: ExperienceEntry[] = [
  {
    period: "2026",
    title: "SGTT — Sistema de Gestión para Taller",
    context: "Proyecto propio · Taller Tony",
    description:
      "Diseño, desarrollo y despliegue de un sistema web de gestión operativa para un taller mecánico, hoy en producción sobre un servidor propio.",
    responsibilities: [
      "Análisis del proceso operativo y modelado de la base de datos",
      "Desarrollo del frontend en React y de la API REST en Node.js",
      "Despliegue en VPS con nginx, HTTPS, PM2 y respaldos automáticos",
      "Mantenimiento, versionado y documentación del sistema",
    ],
    stack: ["React", "Node.js", "Express", "SQLite", "nginx", "PM2"],
  },
  {
    period: "2025",
    title: "Distribuidora de Huevos Escobar",
    context: "Proyecto propio · Negocio familiar",
    description:
      "Sistema de ventas, inventario y cuentas por cobrar que reemplazó el registro manual del día a día de una distribuidora.",
    responsibilities: [
      "Levantamiento de requisitos con los usuarios del negocio",
      "Desarrollo del backend, la base de datos y la interfaz web",
      "Implementación de autenticación por roles y control de accesos",
      "Puesta en marcha y acompañamiento en la adopción del sistema",
    ],
    stack: ["JavaScript", "Node.js", "Express", "SQLite", "JWT"],
  },
  {
    period: "2024 — presente",
    title: "Desarrollo web y automatización",
    context: "Proyectos independientes",
    description:
      "Desarrollo de soluciones web a la medida para negocios pequeños, con enfoque en digitalizar procesos manuales y reducir errores de registro.",
    responsibilities: [
      "Análisis de procesos y propuesta de solución técnica",
      "Desarrollo full stack y despliegue en producción",
      "Documentación técnica y capacitación de usuarios",
    ],
    stack: ["JavaScript", "Node.js", "SQL", "Linux"],
  },
];

export const education: EducationEntry[] = [
  {
    period: "En curso",
    institution: "Universidad Gerardo Barrios",
    degree: "Ingeniería en Sistemas y Redes Informáticas",
    detail: "Formación en desarrollo de software, bases de datos, redes y arquitectura de sistemas.",
  },
  {
    period: "Bachillerato",
    institution: "Instituto Capitán de Navío DEM César Yanes Urías",
    degree: "Bachillerato Técnico en Electrónica y Electricidad",
    detail: "Base técnica en electrónica, circuitos y resolución de problemas de hardware.",
  },
];
