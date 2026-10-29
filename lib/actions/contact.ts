"use server";

import { z } from "zod";
import { siteConfig } from "@/config/site";
import { getUI } from "@/content";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import type { ContactState } from "./contact-state";

/**
 * El idioma llega en un campo oculto del formulario: la acción corre en el
 * servidor, sin acceso al segmento de la URL, y los mensajes de error tienen
 * que volver en el idioma que está viendo la persona.
 */
function messagesFor(raw: FormDataEntryValue | null) {
  const value = typeof raw === "string" && isLocale(raw) ? raw : DEFAULT_LOCALE;
  return getUI(value).contact.form;
}

type Validation = ReturnType<typeof messagesFor>["validation"];

function schemaFor(t: Validation) {
  return z.object({
    name: z.string().trim().min(2, t.name).max(80, t.nameLong),
    email: z.email(t.email),
    subject: z.string().trim().min(3, t.subject).max(120, t.subjectLong),
    message: z.string().trim().min(20, t.message).max(3000, t.messageLong),
    // Campo trampa para bots. Debe llegar vacío.
    website: z.string().max(0).optional(),
  });
}

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const form = messagesFor(formData.get("locale"));
  const withEmail = (template: string) =>
    template.replace("{email}", siteConfig.email);

  const parsed = schemaFor(form.validation).safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === "name" ||
        field === "email" ||
        field === "subject" ||
        field === "message"
      ) {
        errors[field] ??= issue.message;
      }
    }
    return {
      status: "error",
      message: form.validation.review,
      errors,
    };
  }

  const { name, email, subject, message } = parsed.data;
  // Se usa || en lugar de ?? a propósito: una variable definida pero vacía
  // (habitual al importar el proyecto en Vercel) debe caer al valor por defecto.
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.trim() || siteConfig.email;
  const from =
    process.env.CONTACT_EMAIL_FROM?.trim() || "Portafolio <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      status: "error",
      message: withEmail(form.status.notConfigured),
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portafolio] ${subject}`,
        text: [
          `Nombre: ${name}`,
          `Correo: ${email}`,
          `Asunto: ${subject}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error:", response.status, detail);
      return {
        status: "error",
        message: withEmail(form.status.failed),
      };
    }

    return {
      status: "success",
      message: form.status.success,
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: "error",
      message: withEmail(form.status.network),
    };
  }
}
