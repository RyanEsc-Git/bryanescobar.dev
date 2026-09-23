/**
 * Contenido del CV. Editar aquí y volver a ejecutar:
 *   node scripts/generate-cv.js
 *
 * El PDF se escribe en public/resume/CV-Bryan-Escobar.pdf
 */

module.exports = {
  nombre: "BRYAN ESCOBAR",
  titulo: "Desarrollador de Software · Aplicaciones Web y Automatización",

  contacto: {
    ubicacion: "El Salvador",
    email: "bryan79escobar@gmail.com",
    // Dejar en null para omitir el teléfono del CV.
    telefono: "+503 6428-9413",
    web: "bryanescobar.dev",
    github: "github.com/RyanEsc-Git",
    linkedin: "linkedin.com/in/bryan-escobar-6a275b179",
  },

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
