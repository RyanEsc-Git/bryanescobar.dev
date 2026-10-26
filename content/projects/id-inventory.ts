import type { Project } from "@/types";

export const idInventory: Project = {
  slug: "id-inventory",
  title: "ID Inventory — Operación sin conexión",
  summary:
    "Auditoría técnica y desarrollo de la capa offline de un sistema de inventario ya en producción, para que los bodegueros pudieran seguir trabajando en obras sin señal y nada se perdiera ni se duplicara al volver la conexión.",
  year: 2026,
  role: "Auditoría técnica y desarrollo de la operación sin conexión",
  client: "Cliente del sector construcción · El Salvador",
  stack: [
    "PWA",
    "Supabase",
    "PostgreSQL",
    "IndexedDB",
    "Service Worker",
    "Vercel",
  ],
  cover: "/projects/cover-id-inventory.png",
  coverAlt:
    "Portada del proyecto ID Inventory: operación sin conexión para control de inventario en obra",
  featured: true,
  order: 1,
  status: "En producción",
  links: {},
  metrics: [
    { label: "Auditoría", value: "27 tablas · 40 políticas" },
    { label: "Defectos corregidos", value: "6" },
    { label: "Operación", value: "Sin conexión" },
  ],
  overview: [
    "ID Inventory ya existía y estaba en producción: una aplicación web instalable para controlar compras, recepciones y despachos en bodegas de construcción. Yo no la construí. Llegué a un sistema en uso para resolver el problema que lo estaba frenando.",
    "El encargo tenía dos partes: auditar el sistema a fondo —base de datos, seguridad y lógica de negocio— y después desarrollar la operación sin conexión, para que un bodeguero en una obra sin señal pudiera seguir registrando movimientos con la certeza de que nada se perdería.",
  ],
  problem: [
    "Las bodegas de obra están donde está la construcción, no donde está la cobertura. La aplicación necesitaba red para cada operación, así que cuando la señal caía el trabajo se detenía o volvía al papel, que es justo lo que el sistema había venido a eliminar.",
    "El riesgo no era solo perder un registro. Un reintento mal resuelto es peor que un fallo: una recepción enviada dos veces duplica inventario que nadie recibió, y ese error se descubre semanas después en un conteo que no cuadra.",
  ],
  challenge: [
    "Trabajar sobre código que no escribí, en un sistema con usuarios reales. Cualquier cambio tenía que convivir con lo que ya existía sin romper la operación diaria.",
    "Entender primero el modelo de seguridad: 27 tablas con control de acceso por fila, 40 políticas y 31 funciones de base de datos que debía comprender antes de tocar nada.",
    "Garantizar que una operación encolada y reenviada varias veces produjera exactamente el mismo resultado que si se hubiera enviado una sola vez.",
    "Dejar el trabajo mantenible por otra persona, no solo funcionando.",
  ],
  solution: [
    "Empecé por la auditoría, no por el código: recorrí el esquema completo, las políticas de acceso y las funciones de negocio, documentando qué hacía cada pieza y dónde estaban los huecos. De ahí salieron seis defectos preexistentes que corregí y verifiqué en producción.",
    "Para la operación sin conexión implementé una cola local en IndexedDB: cuando no hay red, la operación se guarda en el dispositivo en lugar de fallar, y el usuario sigue trabajando con una señal visible de que está offline.",
    "Al recuperar la señal, la cola se sincroniza sola con reintentos escalonados —cada fallo espera un poco más que el anterior— para no golpear al servidor cuando la conexión vuelve inestable, que es como suele volver en una obra.",
    "La idempotencia es lo que hace seguro ese reenvío: cada operación viaja con una clave única que el servidor usa para reconocerla. Si una recepción llega dos veces, la segunda no duplica nada. Al confirmarse, el sistema emite y archiva el comprobante correspondiente.",
    "Cerré con documentación: manual de usuario, manual de administración y documentación técnica, para que el sistema no dependa de que yo esté disponible.",
  ],
  architecture: [
    "PWA instalable — Service Worker + app shell",
    "IndexedDB — cola local de operaciones pendientes",
    "Sincronización — reintentos escalonados al volver la red",
    "Supabase Auth + RLS — acceso por usuario y bodega",
    "PostgreSQL + funciones RPC — lógica de negocio",
    "Vercel — despliegue de la aplicación",
  ],
  technologies: [
    { name: "IndexedDB", role: "Cola de operaciones pendientes en el dispositivo" },
    { name: "Service Worker", role: "App shell disponible sin red y control de versión del cliente" },
    { name: "Supabase", role: "Autenticación, base de datos, funciones RPC y almacenamiento" },
    { name: "PostgreSQL + RLS", role: "Modelo relacional con control de acceso por fila" },
    { name: "Claves de idempotencia", role: "Cada operación se identifica para que un reenvío no la duplique" },
    { name: "Vercel", role: "Despliegue y entrega de la aplicación" },
  ],
  features: [
    {
      title: "Trabajo sin conexión",
      description:
        "Las operaciones se registran aunque no haya red, con indicación visible del estado de la conexión.",
    },
    {
      title: "Cola de pendientes",
      description:
        "Lo capturado sin señal queda en el dispositivo hasta confirmarse contra el servidor.",
    },
    {
      title: "Sincronización automática",
      description:
        "Al recuperar la conexión, la cola se envía sola con reintentos escalonados.",
    },
    {
      title: "Operaciones idempotentes",
      description:
        "Cada operación lleva una clave única: reenviarla no duplica inventario ni documentos.",
    },
    {
      title: "Comprobantes",
      description:
        "Al confirmarse la operación se emite y archiva su comprobante correspondiente.",
    },
    {
      title: "Documentación de entrega",
      description:
        "Manuales de usuario, de administración y documentación técnica del sistema.",
    },
  ],
  process: [
    "Auditoría — Recorrido completo del esquema, las políticas de acceso y las funciones de negocio antes de escribir una línea.",
    "Diagnóstico — Documentación de lo encontrado, incluidos los defectos preexistentes y su impacto real en la operación.",
    "Correcciones — Resolución de seis defectos, verificados contra el sistema en producción.",
    "Diseño de la capa offline — Qué operaciones se encolan, cómo se identifican y cuándo se consideran confirmadas.",
    "Implementación — Cola en IndexedDB, sincronización con reintentos escalonados e idempotencia de extremo a extremo.",
    "Verificación — Pruebas del ciclo completo: perder la señal, seguir operando, recuperar la red y comprobar que no hay duplicados.",
    "Entrega — Manuales de usuario, administración y documentación técnica.",
  ],
  decisions: [
    {
      title: "Auditar antes de programar",
      body: "La tentación en un sistema ajeno es ir directo a la funcionalidad pedida. Dedicar la primera etapa a entender 27 tablas, 40 políticas y 31 funciones parecía tiempo perdido, pero fue lo que permitió construir la capa offline sin romper el control de acceso existente, y de paso sacó a la luz seis defectos que nadie había reportado todavía.",
    },
    {
      title: "Encolar en vez de fallar",
      body: "La alternativa fácil era bloquear la interfaz cuando no hay red y pedir al usuario que reintente. En una obra eso equivale a volver al cuaderno. Guardar la operación en el dispositivo y sincronizar después mantiene al bodeguero trabajando, al costo de asumir toda la complejidad de la reconciliación posterior.",
    },
    {
      title: "Idempotencia en lugar de confiar en el reintento",
      body: "Un reintento sin protección es una duplicación esperando ocurrir: el servidor puede haber procesado la operación aunque la respuesta nunca llegara al dispositivo. Darle a cada operación una clave única traslada la responsabilidad al servidor, que reconoce lo ya procesado. Es la diferencia entre una cola que funciona y una que corrompe el inventario en silencio.",
    },
    {
      title: "Reintentos escalonados, no inmediatos",
      body: "La conectividad en obra no vuelve de golpe: aparece y desaparece. Reintentar de inmediato con varios dispositivos a la vez habría generado ráfagas contra el servidor justo en el momento más frágil. Espaciar progresivamente cada reintento reparte la carga y aprovecha mejor una señal intermitente.",
    },
    {
      title: "Integrarse en lugar de reescribir",
      body: "Proponer una reescritura habría sido más cómodo para mí y mucho peor para el cliente: su sistema ya estaba en producción y funcionaba. El valor estaba en sumar la capa que faltaba respetando las decisiones existentes, aunque no fueran las que yo habría tomado desde cero.",
    },
  ],
  results: [
    "Los bodegueros pueden operar en obras sin cobertura y el sistema sincroniza solo al recuperar la señal.",
    "Los reenvíos dejaron de ser un riesgo: una operación repetida no duplica inventario ni documentos.",
    "Seis defectos preexistentes detectados en la auditoría quedaron corregidos y verificados en producción.",
    "El sistema se entregó documentado en tres niveles —usuario, administración y técnico— para que su mantenimiento no dependa de una sola persona.",
  ],
  learned: [
    "Entrar a un sistema ajeno en producción exige una disciplina distinta a empezar de cero: primero entender por qué está hecho así, después proponer. La auditoría no fue el preámbulo del trabajo, fue parte del trabajo.",
    "«Sin conexión» no es una funcionalidad, es un modelo de consistencia. La parte difícil no es guardar datos en el dispositivo, sino decidir qué significa que una operación esté confirmada cuando el dispositivo y el servidor no se ponen de acuerdo.",
    "Los errores más caros son los que no fallan de forma visible. Un inventario duplicado no lanza ninguna alerta: aparece meses después como un faltante que nadie sabe explicar.",
  ],
};
