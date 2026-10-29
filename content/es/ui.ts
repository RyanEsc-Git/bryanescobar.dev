/**
 * Textos de interfaz en español.
 *
 * Es la referencia del idioma: el diccionario en inglés debe tener
 * exactamente las mismas claves, y TypeScript lo exige en content/index.ts.
 */

export const ui = {
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    projects: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
    resume: "Descargar CV",
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mainNav: "Navegación principal",
    home_aria: "inicio",
  },

  hero: {
    viewProjects: "Ver mis proyectos",
    contactMe: "Contactarme",
    resume: "CV",
  },

  home: {
    selectedWork: {
      eyebrow: "Selected Work",
      title: "Proyectos que resuelven algo real",
      description:
        "Cada uno nació de un proceso manual que costaba tiempo o dinero. Entra al caso de estudio para ver el problema, la arquitectura y las decisiones detrás.",
      allProjects: "Todos los proyectos",
    },
    about: {
      eyebrow: "Sobre mí",
      more: "Conoce más sobre mí",
    },
    whatIDo: {
      eyebrow: "What I Do",
      title: "Cuatro formas de resolver el mismo tipo de problema",
      description:
        "Todo lo que construyo apunta a lo mismo: convertir un proceso manual, disperso o propenso a errores en un sistema que se pueda medir y mantener.",
    },
    stack: {
      eyebrow: "Tech Stack",
      title: "Herramientas que uso y puedo explicar",
      description:
        "No es una lista de todo lo que existe: son las tecnologías con las que he construido y desplegado sistemas en uso real.",
    },
    process: {
      eyebrow: "Cómo trabajo",
      title: "Del problema a producción",
      description:
        "Un método corto y repetible. La mayor parte del valor aparece antes de escribir la primera línea de código.",
    },
  },

  cta: {
    eyebrow: "Contacto",
    title: "¿Construimos algo?",
    description:
      "Estoy abierto a oportunidades profesionales, colaboraciones y proyectos donde la tecnología resuelva una necesidad concreta.",
    contact: "Contactarme",
  },

  projects: {
    eyebrow: "Proyectos",
    title: "Casos de estudio, no capturas sueltas",
    description:
      "Cada proyecto documenta el problema que resolvía, la arquitectura elegida, los compromisos que asumí y lo que aprendí en el camino.",
    viewCaseStudy: "Ver caso de estudio",
    metaTitle: "Proyectos",
    metaDescription:
      "Casos de estudio de sistemas y aplicaciones web construidos para negocios reales: problema, arquitectura, decisiones técnicas y resultados.",
  },

  projectStatus: {
    production: "En producción",
    development: "En desarrollo",
    finished: "Finalizado",
  },

  caseStudy: {
    label: "Case Study",
    backToProjects: "Todos los proyectos",
    liveDemo: "Ver en vivo",
    sourceCode: "Código",
    client: "Cliente",
    year: "Año",
    role: "Rol",
    stack: "Stack",
    nextProject: "Siguiente proyecto",
    sections: {
      overview: "Overview",
      problem: "El problema",
      challenge: "El reto",
      solution: "La solución",
      architecture: "Arquitectura",
      technologies: "Tecnologías",
      features: "Funcionalidades",
      process: "Proceso de desarrollo",
      decisions: "Decisiones y trade-offs",
      results: "Resultados",
      learned: "Qué aprendí",
    },
    table: {
      technology: "Tecnología",
      role: "Función",
    },
    notFound: {
      title: "Proyecto no encontrado",
      description: "El caso de estudio solicitado no existe.",
    },
  },

  about: {
    eyebrow: "Sobre mí",
    title: "Construyo sistemas que alguien usa todos los días",
    principles: {
      eyebrow: "Principios",
      title: "Cómo decido",
      description:
        "Cuatro reglas que aplico en cada proyecto, desde la primera reunión hasta el despliegue.",
    },
    education: {
      eyebrow: "Educación",
      title: "Formación académica",
    },
    photoAlt: "Fotografía profesional de Bryan Escobar",
    avatarAlt: "Bryan Escobar en 8 bits",
    metaTitle: "Sobre mí",
    metaDescription:
      "Estudiante de Ingeniería en Sistemas y desarrollador de software en El Salvador. Construyo aplicaciones web y sistemas que digitalizan la operación de negocios reales.",
  },

  experience: {
    eyebrow: "Experiencia",
    title: "Trayectoria y proyectos",
    description:
      "Un recorrido por lo que he construido, con el contexto, las responsabilidades y las tecnologías de cada etapa.",
    education: {
      eyebrow: "Educación",
      title: "Formación y certificaciones",
    },
    metaTitle: "Experiencia",
    metaDescription:
      "Trayectoria profesional de Bryan Escobar: proyectos de desarrollo de software, sistemas de gestión y automatización para negocios reales.",
  },

  contact: {
    eyebrow: "Contacto",
    title: "¿Construimos algo?",
    description:
      "Cuéntame qué necesitas resolver. Respondo a oportunidades profesionales, colaboraciones y proyectos donde el software haga una diferencia concreta.",
    channels: {
      email: "Correo",
      linkedin: "LinkedIn",
      linkedinValue: "Conectemos",
      github: "GitHub",
      githubValue: "Mi código",
      instagram: "Instagram",
      instagramValue: "Sígueme",
      location: "Ubicación",
    },
    note: "Suelo responder en menos de 24 horas. Si tu mensaje es sobre un proyecto, incluir el problema que quieres resolver ayuda mucho a darte una respuesta útil desde el primer correo.",
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      emailPlaceholder: "tucorreo@ejemplo.com",
      subject: "Asunto",
      subjectPlaceholder: "Oportunidad, proyecto o consulta",
      message: "Mensaje",
      messagePlaceholder: "Cuéntame en qué estás pensando.",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      honeypot: "No llenar este campo",
      validation: {
        name: "Escribe tu nombre (mínimo 2 caracteres).",
        nameLong: "El nombre es demasiado largo.",
        email: "Escribe un correo electrónico válido.",
        subject: "Escribe un asunto breve.",
        subjectLong: "El asunto es demasiado largo.",
        message: "Cuéntame un poco más: al menos 20 caracteres.",
        messageLong: "El mensaje es demasiado largo.",
        review: "Revisa los campos marcados.",
      },
      status: {
        notConfigured:
          "El envío por formulario aún no está configurado. Escríbeme directamente a {email}.",
        failed: "No se pudo enviar el mensaje. Puedes escribirme a {email}.",
        network: "Ocurrió un error de red. Puedes escribirme a {email}.",
        success: "Mensaje enviado. Te respondo lo antes posible.",
      },
    },
    metaTitle: "Contacto",
    metaDescription:
      "Escríbeme para oportunidades profesionales, colaboraciones o proyectos de desarrollo de software y automatización.",
  },

  notFound: {
    title: "Esta página no existe",
    description:
      "El enlace puede estar roto o la página pudo haber cambiado de dirección. Desde el inicio puedes llegar a todo lo demás.",
    backHome: "Volver al inicio",
    viewProjects: "Ver proyectos",
    game: {
      title: "404 Runner",
      start: "¿Jugamos?",
      gameOver: "Fin",
      points: "puntos",
      pressToStart: "Espacio o clic para empezar",
      pressToRetry: "Espacio o clic para reintentar",
      jump: "Saltar",
      startAria: "Empezar el juego: salta los obstáculos",
      caption:
        "Hecho con el mismo sprite del avatar, dibujado píxel a píxel en canvas.",
    },
  },

  footer: {
    tagline: "Software Development",
    availability:
      "Disponible para oportunidades profesionales, colaboraciones y proyectos tecnológicos.",
    navigation: "Navegación",
    contact: "Contacto",
    email: "Email",
    siteLinks: "Enlaces del sitio",
    builtBy: "Diseñado y construido por Bryan Escobar",
  },

  language: {
    label: "Idioma",
    switchTo: "Ver en inglés",
  },
};

export type UIDictionary = typeof ui;
