/**
 * Contenido del CV en los dos idiomas. Editar aquí y volver a ejecutar:
 *   npm run cv
 *
 * Los PDF se escriben en:
 *   public/resume/CV-Bryan-Escobar.pdf      (español)
 *   public/resume/CV-Bryan-Escobar-EN.pdf   (inglés)
 *
 * Las dos versiones comparten la misma estructura: el generador no sabe de
 * idiomas, solo recibe uno de estos objetos.
 */

const contacto = {
  ubicacion: "El Salvador",
  email: "bryan79escobar@gmail.com",
  // Dejar en null para omitir el teléfono del CV.
  telefono: "+503 6428-9413",
  // Mientras no esté comprado bryanescobar.dev, aquí va la URL que sí abre.
  web: "bryanescobar-dev.vercel.app",
  github: "github.com/RyanEsc-Git",
  linkedin: "linkedin.com/in/bryan-escobar-6a275b179",
};

const es = {
  archivo: "CV-Bryan-Escobar.pdf",
  nombre: "BRYAN ESCOBAR",
  titulo: "Desarrollador de Software · Aplicaciones Web y Automatización",

  meta: {
    title: "CV — Bryan Escobar",
    subject: "Desarrollador de Software · Aplicaciones Web y Automatización",
    keywords:
      "desarrollador de software, full stack, React, Next.js, Node.js, SQL, El Salvador",
  },

  secciones: {
    perfil: "Perfil profesional",
    experiencia: "Experiencia y proyectos",
    educacion: "Educación",
    habilidades: "Habilidades técnicas",
    idiomas: "Idiomas",
    stack: "Stack:  ",
  },

  contacto,

  perfil:
    "Estudiante de último año de Ingeniería en Sistemas y Redes Informáticas y desarrollador de software full stack. Construyo aplicaciones web que digitalizan la operación de negocios reales —órdenes de trabajo, inventarios, facturación y cuentas por cobrar— y me hago cargo del ciclo completo: análisis del proceso, desarrollo, despliegue en servidor y mantenimiento. Dos de mis sistemas están hoy en producción y en uso diario.",

  experiencia: [
    {
      titulo: "SGTT — Sistema de Gestión para Taller",
      contexto: "Taller Tony · Proyecto propio",
      periodo: "2026 — En producción",
      logros: [
        "Análisis del proceso operativo del taller y modelado completo de la base de datos.",
        "Desarrollo del frontend en React y de la API REST en Node.js/Express sobre SQLite.",
        "Despliegue en servidor Linux (VPS) con nginx como reverse proxy, HTTPS, PM2 y respaldos automáticos diarios.",
        "Sistema de anulación con auditoría (usuario, fecha y motivo) en lugar de borrado, para conservar la trazabilidad contable.",
      ],
      stack: "React · Node.js · Express · SQLite · JWT · nginx · PM2 · Linux",
    },
    {
      titulo: "Distribuidora de Huevos Escobar — Sistema de ventas e inventario",
      contexto: "Proyecto propio",
      periodo: "2025 — En producción",
      logros: [
        "Sistema de ventas, control de inventario y cuentas por cobrar que reemplazó el registro manual diario del negocio.",
        "Diseño de la operación para que venta, inventario y saldo del cliente se actualicen de forma consistente.",
        "Autenticación con JWT y contraseñas cifradas, con roles separados para administración y operación.",
      ],
      stack: "JavaScript (ES Modules) · Node.js · Express · SQLite · JWT · CSS",
    },
    {
      titulo: "Desarrollo web y automatización de procesos",
      contexto: "Proyectos independientes",
      periodo: "2024 — presente",
      logros: [
        "Desarrollo de soluciones web a la medida para negocios pequeños, enfocadas en digitalizar procesos manuales y reducir errores de registro.",
        "Análisis de requisitos con los usuarios, desarrollo full stack, despliegue en producción y capacitación.",
      ],
      stack: "JavaScript · Node.js · SQL · Git · Linux",
    },
  ],

  educacion: [
    {
      institucion: "Universidad Gerardo Barrios",
      titulo: "Ingeniería en Sistemas y Redes Informáticas",
      detalle: "5.º año — próximo a egresar",
    },
    {
      institucion: "Instituto Capitán de Navío DEM César Yanes Urías",
      titulo: "Bachillerato Técnico en Electrónica y Electricidad",
      detalle: "",
    },
  ],

  habilidades: [
    {
      area: "Frontend",
      items: "React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML, CSS",
    },
    {
      area: "Backend",
      items: "Node.js, Express, REST APIs, Server Actions, JWT, bcrypt",
    },
    { area: "Bases de datos", items: "PostgreSQL, MySQL, SQLite" },
    {
      area: "Infraestructura y herramientas",
      items: "Linux (VPS), nginx, PM2, Git, GitHub, Vercel, VS Code, Postman",
    },
  ],

  idiomas: "Español (nativo) · Inglés intermedio (B1–B2)",
};

const en = {
  archivo: "CV-Bryan-Escobar-EN.pdf",
  nombre: "BRYAN ESCOBAR",
  titulo: "Software Developer · Web Applications & Automation",

  meta: {
    title: "CV — Bryan Escobar",
    subject: "Software Developer · Web Applications & Automation",
    keywords:
      "software developer, full stack, React, Next.js, Node.js, SQL, El Salvador",
  },

  secciones: {
    perfil: "Professional profile",
    experiencia: "Experience and projects",
    educacion: "Education",
    habilidades: "Technical skills",
    idiomas: "Languages",
    stack: "Stack:  ",
  },

  contacto,

  perfil:
    "Final-year Computer Systems and Networks Engineering student and full stack software developer. I build web applications that digitise how real businesses operate —work orders, inventory, invoicing and accounts receivable— and I own the whole cycle: process analysis, development, server deployment and maintenance. Two of my systems are in production and in daily use today.",

  experiencia: [
    {
      titulo: "SGTT — Workshop Management System",
      contexto: "Taller Tony · Personal project",
      periodo: "2026 — In production",
      logros: [
        "Analysed the workshop's operating process and modelled the complete database.",
        "Built the React frontend and the Node.js/Express REST API on top of SQLite.",
        "Deployed to a Linux VPS with nginx as a reverse proxy, HTTPS, PM2 and automated daily backups.",
        "Records are voided with an audit trail (user, date and reason) instead of deleted, so the accounting history stays intact.",
      ],
      stack: "React · Node.js · Express · SQLite · JWT · nginx · PM2 · Linux",
    },
    {
      titulo: "Distribuidora de Huevos Escobar — Sales and inventory system",
      contexto: "Personal project",
      periodo: "2025 — In production",
      logros: [
        "Sales, inventory control and accounts receivable system that replaced the business's daily paper records.",
        "Designed the flow so a sale, the stock and the customer's balance always stay consistent with each other.",
        "JWT authentication with hashed passwords, and separate roles for administration and day-to-day operation.",
      ],
      stack: "JavaScript (ES Modules) · Node.js · Express · SQLite · JWT · CSS",
    },
    {
      titulo: "Web development and process automation",
      contexto: "Independent projects",
      periodo: "2024 — present",
      logros: [
        "Custom web solutions for small businesses, aimed at digitising manual processes and cutting data-entry errors.",
        "Requirements gathering with the users, full stack development, production deployment and training.",
      ],
      stack: "JavaScript · Node.js · SQL · Git · Linux",
    },
  ],

  educacion: [
    {
      institucion: "Universidad Gerardo Barrios",
      titulo: "B.Eng. in Computer Systems and Networks Engineering",
      detalle: "5th year — graduating soon",
    },
    {
      institucion: "Instituto Capitán de Navío DEM César Yanes Urías",
      titulo: "Technical Baccalaureate in Electronics and Electricity",
      detalle: "",
    },
  ],

  habilidades: [
    {
      area: "Frontend",
      items: "React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML, CSS",
    },
    {
      area: "Backend",
      items: "Node.js, Express, REST APIs, Server Actions, JWT, bcrypt",
    },
    { area: "Databases", items: "PostgreSQL, MySQL, SQLite" },
    {
      area: "Infrastructure and tools",
      items: "Linux (VPS), nginx, PM2, Git, GitHub, Vercel, VS Code, Postman",
    },
  ],

  idiomas: "Spanish (native) · English, intermediate (B1–B2)",
};

module.exports = { es, en };
