"use server";

import { z } from "zod";
import { siteConfig } from "@/config/site";
import type { ContactState } from "./contact-state";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Escribe tu nombre (mínimo 2 caracteres).")
    .max(80, "El nombre es demasiado largo."),
  email: z.email("Escribe un correo electrónico válido."),
  subject: z
    .string()
    .trim()
    .min(3, "Escribe un asunto breve.")
    .max(120, "El asunto es demasiado largo."),
  message: z
    .string()
    .trim()
    .min(20, "Cuéntame un poco más: al menos 20 caracteres.")
    .max(3000, "El mensaje es demasiado largo."),
  // Campo trampa para bots. Debe llegar vacío.
  website: z.string().max(0).optional(),
});

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
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
      message: "Revisa los campos marcados.",
      errors,
    };
  }

  const { name, email, subject, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO ?? siteConfig.email;
  const from = process.env.CONTACT_EMAIL_FROM ?? "Portafolio <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      status: "error",
      message: `El envío por formulario aún no está configurado. Escríbeme directamente a ${siteConfig.email}.`,
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
        message: `No se pudo enviar el mensaje. Puedes escribirme a ${siteConfig.email}.`,
      };
    }

    return {
      status: "success",
      message: "Mensaje enviado. Te respondo lo antes posible.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: "error",
      message: `Ocurrió un error de red. Puedes escribirme a ${siteConfig.email}.`,
    };
  }
}
