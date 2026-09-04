import type { Project } from "@/types";

export const sgtt: Project = {
  slug: "sgtt-sistema-gestion-taller",
  title: "SGTT — Sistema de Gestión para Taller",
  summary:
    "Aplicación web que digitaliza la operación completa de un taller mecánico: órdenes de trabajo, inventario de repuestos, facturación y cuentas por cobrar, con control de usuarios y auditoría.",
  year: 2026,
  role: "Diseño, desarrollo y despliegue (proyecto individual)",
  client: "Taller Tony",
  stack: ["React", "Node.js", "Express", "SQLite", "JWT", "nginx", "PM2"],
  cover: "/projects/sgtt-cover.png",
  coverAlt:
    "Captura del panel principal del sistema de gestión de taller mostrando órdenes de trabajo e inventario",
  featured: true,
  order: 1,
  status: "En producción",
  links: {},
  metrics: [
    { label: "Estado", value: "En producción" },
    { label: "Módulos", value: "8+" },
    { label: "Respaldos", value: "Diarios" },
  ],
  overview: [
    "SGTT es un sistema web de gestión operativa construido para un taller mecánico que administraba su trabajo diario en cuadernos y hojas sueltas. El objetivo no era «hacer una app»: era ordenar la operación real del negocio sin obligar al equipo a cambiar su forma de trabajar de un día para otro.",
    "El sistema cubre el ciclo completo de una orden de trabajo —recepción del vehículo, diagnóstico, repuestos utilizados, mano de obra, cierre y cobro— y mantiene el inventario y las cuentas por cobrar sincronizados con cada movimiento.",
  ],
  problem: [
    "La información del taller vivía en papel y en la memoria del dueño. No existía forma confiable de saber cuánto se había facturado en el mes, qué repuestos quedaban en bodega o qué clientes tenían saldo pendiente.",
    "Los errores más costosos no eran técnicos, sino de registro: repuestos entregados que nunca se cobraron, trabajos cerrados sin registrar y deudas que se olvidaban hasta que el cliente volvía meses después.",
  ],
  challenge: [
    "El personal no tenía experiencia previa con software administrativo, así que cada pantalla debía ser autoexplicativa y tolerar errores de captura.",
    "El negocio necesitaba disponibilidad real: si el sistema se caía, el taller se detenía. Eso obligaba a un despliegue estable y con respaldos automáticos, no a una demo.",
    "Había que permitir correcciones sin destruir el historial: en un negocio real las facturas se equivocan, pero borrar registros elimina la evidencia de lo ocurrido.",
  ],
  solution: [
    "Construí una aplicación web con un frontend en React y una API REST en Node.js/Express sobre SQLite, desplegada en un VPS propio con nginx como reverse proxy, HTTPS y PM2 para mantener el proceso vivo.",
    "En lugar de permitir eliminaciones, el sistema usa anulación con auditoría: cada documento anulado conserva quién lo anuló, cuándo y por qué motivo. El historial nunca se pierde.",
    "El comportamiento del sistema se ajusta con banderas de configuración en base de datos (por ejemplo, si se controla stock o si un trabajador puede anular documentos), de modo que el mismo código sirve para distintas reglas del negocio sin reprogramar.",
  ],
  architecture: [
    "Navegador — React SPA",
    "nginx — reverse proxy + HTTPS",
    "API REST — Node.js + Express (PM2)",
    "Lógica de negocio y validación",
    "SQLite (better-sqlite3) en disco persistente",
    "Respaldo automático nocturno vía cron",
  ],
  technologies: [
    { name: "React", role: "Interfaz del panel administrativo y del flujo de órdenes" },
    { name: "Node.js + Express", role: "API REST, reglas de negocio y control de acceso" },
    { name: "SQLite (better-sqlite3)", role: "Persistencia local, rápida y sin servidor adicional" },
    { name: "JWT + bcrypt", role: "Autenticación por roles y almacenamiento seguro de contraseñas" },
    { name: "nginx + Certbot", role: "Reverse proxy, HTTPS y exposición del dominio" },
    { name: "PM2 + cron", role: "Proceso siempre activo, arranque en boot y respaldos nocturnos" },
  ],
  features: [
    {
      title: "Órdenes de trabajo",
      description:
        "Registro del vehículo, diagnóstico, repuestos, mano de obra y cierre, con historial por cliente.",
    },
    {
      title: "Inventario de repuestos",
      description:
        "Entradas, salidas y descuento automático de stock al facturar, con control opcional por configuración.",
    },
    {
      title: "Facturación y cuentas por cobrar",
      description:
        "Documentos de venta, abonos parciales y seguimiento de saldos pendientes por cliente.",
    },
    {
      title: "Usuarios y roles",
      description:
        "Accesos diferenciados para administración y personal operativo, con permisos por acción.",
    },
    {
      title: "Auditoría de anulaciones",
      description:
        "Ningún registro con historial se elimina: se marca como anulado guardando usuario, fecha y motivo.",
    },
    {
      title: "Respaldos automáticos",
      description:
        "Copia nocturna de la base de datos con rotación automática de las versiones más antiguas.",
    },
  ],
  process: [
    "Research — Acompañé la operación del taller para entender el flujo real de una orden, no el flujo ideal.",
    "Requirements — Definí qué debía registrarse obligatoriamente y qué podía quedar opcional para no frenar al usuario.",
    "Architecture — Elegí un stack simple y autocontenido, priorizando que el sistema pudiera vivir en un solo servidor sin dependencias externas.",
    "UI/UX — Pantallas con el vocabulario del taller, no el del programador: «orden», «repuesto», «abono».",
    "Development — Iteraciones cortas con migraciones de base de datos no destructivas e idempotentes.",
    "Testing — Scripts que firman un token válido y golpean la API real, verificando funciones completas y limpiando los datos de prueba al terminar.",
    "Deployment — VPS con nginx, HTTPS, PM2 y respaldos programados; actualizaciones por git pull y reinicio controlado.",
  ],
  decisions: [
    {
      title: "SQLite en lugar de PostgreSQL",
      body: "Para un negocio de un solo local, con escrituras moderadas y un único servidor, SQLite elimina toda una capa de infraestructura sin costo funcional. El archivo vive en disco persistente y se respalda con un comando. Si el negocio creciera a varias sucursales concurrentes, migrar a PostgreSQL sería el siguiente paso natural.",
    },
    {
      title: "Anular en vez de eliminar",
      body: "Permitir borrado directo habría sido más rápido de implementar, pero destruye la trazabilidad contable. La anulación con motivo y responsable conserva la evidencia y hace que los errores sean auditables en lugar de invisibles.",
    },
    {
      title: "Migraciones idempotentes en el código",
      body: "En vez de una herramienta de migraciones externa, cada arranque verifica y agrega las columnas faltantes. Es una decisión deliberada de simplicidad: el despliegue se reduce a actualizar el repositorio y reiniciar, sin pasos manuales que se puedan olvidar.",
    },
    {
      title: "Banderas de configuración en base de datos",
      body: "Reglas como el control de stock o los permisos de anulación cambian según cómo trabaje el negocio. Guardarlas como configuración evita ramas de código paralelas y permite ajustar el comportamiento sin un nuevo despliegue.",
    },
  ],
  results: [
    "El taller pasó de registros en papel a un sistema consultable: facturación, inventario y saldos pendientes dejaron de depender de la memoria.",
    "Las correcciones dejaron de ser un riesgo: toda anulación queda registrada con responsable y motivo.",
    "El sistema opera en un servidor propio con HTTPS, arranque automático y respaldo diario de la base de datos.",
  ],
  learned: [
    "El mayor obstáculo de un sistema para un negocio real no es técnico, es de adopción. Las pantallas que hablan el idioma del usuario se usan; las que hablan el idioma del programador se abandonan.",
    "La infraestructura simple gana cuando el equipo de mantenimiento es una sola persona: menos piezas significa menos formas de fallar a las 8 de la mañana.",
    "Probar contra la API real con scripts fue más rentable que montar una suite de pruebas de interfaz: encontró errores de lógica de negocio con una fracción del esfuerzo.",
  ],
};
