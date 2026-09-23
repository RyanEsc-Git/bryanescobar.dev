import type { Project } from "@/types";

export const distribuidoraHuevos: Project = {
  slug: "distribuidora-huevos-escobar",
  title: "Distribuidora de Huevos Escobar",
  summary:
    "Sistema de ventas, inventario y cuentas por cobrar para una distribuidora con reparto en ruta, donde el registro diario dependía de anotaciones a mano.",
  year: 2025,
  role: "Análisis, desarrollo y despliegue (proyecto individual)",
  client: "Distribuidora de Huevos Escobar",
  stack: ["JavaScript", "Node.js", "Express", "SQLite", "JWT"],
  cover: "/projects/distribuidora-cover.png",
  coverAlt:
    "Captura de la pantalla de ventas del sistema de distribuidora mostrando productos, clientes y saldos",
  featured: true,
  order: 4,
  status: "En producción",
  links: {},
  metrics: [
    { label: "Operación", value: "Diaria" },
    { label: "Módulos", value: "Ventas · Inventario · Cobros" },
    { label: "Usuarios", value: "Multi-rol" },
  ],
  overview: [
    "Un negocio de distribución vive de dos números: qué salió y qué se cobró. En esta distribuidora ambos se anotaban a mano al final del día, y cuadrarlos era un ejercicio de memoria que se hacía cada noche.",
    "El sistema registra ventas por cliente, descuenta inventario, lleva el saldo de quienes compran al crédito y permite consultar el histórico sin depender de un cuaderno.",
  ],
  problem: [
    "El producto salía en ruta y volvía como efectivo, producto no vendido o deuda, sin un registro que uniera las tres cosas.",
    "Las cuentas por cobrar eran el punto más débil: los saldos vivían en notas dispersas, y una deuda olvidada era dinero perdido sin que nadie lo notara.",
  ],
  challenge: [
    "El sistema debía ser más rápido que el papel. Si registrar una venta tomaba más tiempo que anotarla, nadie lo iba a usar.",
    "Los usuarios no eran técnicos: la interfaz tenía que funcionar con el vocabulario del negocio y con la menor cantidad de pasos posible.",
    "El inventario y las ventas debían mantenerse consistentes incluso cuando se corrigiera un registro anterior.",
  ],
  solution: [
    "Desarrollé una aplicación web con backend en Node.js/Express y SQLite, y un frontend en JavaScript modular sin framework, priorizando una carga inmediata y un flujo de captura corto.",
    "El registro de una venta descuenta inventario y actualiza el saldo del cliente en la misma operación, de forma que las tres vistas del negocio siempre coincidan.",
    "La autenticación con JWT y contraseñas cifradas permite separar lo que puede hacer la administración de lo que puede hacer el personal de ruta.",
  ],
  architecture: [
    "Navegador — JavaScript modular (ES Modules)",
    "API REST — Node.js + Express",
    "Autenticación JWT + bcrypt",
    "Lógica de ventas, inventario y cobros",
    "SQLite (better-sqlite3)",
  ],
  technologies: [
    { name: "JavaScript (ES Modules)", role: "Interfaz sin framework, con carga mínima" },
    { name: "Node.js + Express", role: "API REST y reglas de negocio" },
    { name: "SQLite (better-sqlite3)", role: "Base de datos embebida, respaldable como un archivo" },
    { name: "JWT + bcrypt", role: "Sesiones y credenciales seguras" },
    { name: "CSS", role: "Interfaz responsiva construida desde cero, sin dependencias" },
  ],
  features: [
    {
      title: "Registro de ventas",
      description: "Captura rápida por cliente y producto, con cálculo automático del total.",
    },
    {
      title: "Control de inventario",
      description: "Entradas de producto y descuento automático al vender, con existencias siempre visibles.",
    },
    {
      title: "Cuentas por cobrar",
      description: "Saldo por cliente, registro de abonos y consulta del histórico de deuda.",
    },
    {
      title: "Clientes",
      description: "Ficha con datos de contacto, historial de compras y estado de cuenta.",
    },
    {
      title: "Reportes del período",
      description: "Consulta de ventas y cobros por rango de fechas para cerrar el día o el mes.",
    },
    {
      title: "Usuarios y accesos",
      description: "Roles separados para administración y operación diaria.",
    },
  ],
  process: [
    "Research — Observé el ciclo real de un día de reparto antes de escribir código.",
    "Requirements — Reduje el registro de una venta al mínimo de campos posibles.",
    "Architecture — Backend y base de datos ligeros, pensados para correr en una sola máquina.",
    "UI/UX — Interfaz sin framework para mantener la carga y la complejidad bajas.",
    "Development — Construcción por módulos: primero ventas, luego inventario, después cobros.",
    "Testing — Validación con datos reales del negocio antes de reemplazar el cuaderno.",
    "Deployment — Puesta en marcha con respaldo del archivo de base de datos.",
  ],
  decisions: [
    {
      title: "JavaScript sin framework en el frontend",
      body: "Para un panel administrativo de este tamaño, un framework habría añadido peso y proceso de build sin resolver un problema real. ES Modules y CSS propio dieron una interfaz rápida y fácil de mantener por una sola persona.",
    },
    {
      title: "Consistencia en la misma operación",
      body: "Venta, inventario y saldo se actualizan juntos. Separarlos habría sido más flexible, pero abría la puerta a estados inconsistentes: producto descontado sin venta registrada, o venta sin deuda asociada.",
    },
    {
      title: "SQLite como archivo respaldable",
      body: "Que toda la base de datos sea un archivo hace que el respaldo sea una copia, no un procedimiento. Para un negocio sin personal técnico, eso es la diferencia entre tener respaldos y hablar de ellos.",
    },
  ],
  results: [
    "El cierre del día dejó de depender de reconstruir la jornada de memoria.",
    "Las deudas de clientes quedaron visibles y consultables en cualquier momento, no solo cuando el cliente regresaba.",
    "El inventario refleja las ventas del día sin necesidad de un conteo manual para saber qué queda.",
  ],
  learned: [
    "Cuando el sistema compite contra el papel, la velocidad de captura importa más que la cantidad de funciones.",
    "Modelar bien el negocio al inicio —qué es una venta, qué es un abono, qué es una deuda— ahorra semanas de correcciones después.",
    "Empezar por el módulo que más duele (las cuentas por cobrar) hace que el sistema se gane la confianza del usuario desde el primer día.",
  ],
};
