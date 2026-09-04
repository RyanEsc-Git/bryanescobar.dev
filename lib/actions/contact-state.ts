/**
 * El estado del formulario vive fuera de contact.ts porque un archivo
 * "use server" solo puede exportar funciones async.
 */
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
};

export const initialContactState: ContactState = { status: "idle" };
