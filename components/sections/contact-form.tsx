"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { sendContactMessage } from "@/lib/actions/contact";
import { initialContactState } from "@/lib/actions/contact-state";
import type { UIDictionary } from "@/content/es/ui";
import { cn } from "@/lib/utils";

import type { Locale } from "@/lib/i18n";

type FormLabels = UIDictionary["contact"]["form"];

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors focus:border-accent-light focus:outline-none";

function SubmitButton({ labels }: { labels: FormLabels }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-light disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? labels.sending : labels.submit}
      <Send className="size-4" aria-hidden />
    </button>
  );
}

export function ContactForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: FormLabels;
}) {
  const [state, formAction] = useActionState(
    sendContactMessage,
    initialContactState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/* La acción corre en el servidor y no ve la URL: el idioma viaja en el
          formulario para que los errores vuelvan traducidos. */}
      <input type="hidden" name="locale" value={locale} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-fg">
            {labels.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={state.errors?.name ? true : undefined}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={cn(fieldClass, state.errors?.name && "border-red-500/70")}
            placeholder={labels.namePlaceholder}
          />
          {state.errors?.name ? (
            <p id="name-error" className="mt-2 text-xs text-red-400">
              {state.errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-fg">
            {labels.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={cn(fieldClass, state.errors?.email && "border-red-500/70")}
            placeholder={labels.emailPlaceholder}
          />
          {state.errors?.email ? (
            <p id="email-error" className="mt-2 text-xs text-red-400">
              {state.errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm text-fg">
          {labels.subject}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          aria-invalid={state.errors?.subject ? true : undefined}
          aria-describedby={state.errors?.subject ? "subject-error" : undefined}
          className={cn(fieldClass, state.errors?.subject && "border-red-500/70")}
          placeholder={labels.subjectPlaceholder}
        />
        {state.errors?.subject ? (
          <p id="subject-error" className="mt-2 text-xs text-red-400">
            {state.errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-fg">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={cn(
            fieldClass,
            "resize-y",
            state.errors?.message && "border-red-500/70",
          )}
          placeholder={labels.messagePlaceholder}
        />
        {state.errors?.message ? (
          <p id="message-error" className="mt-2 text-xs text-red-400">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: invisible para personas, tentador para bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">{labels.honeypot}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton labels={labels} />

        {state.status !== "idle" && state.message ? (
          <p
            role="status"
            aria-live="polite"
            className={cn(
              "inline-flex items-start gap-2 text-sm",
              state.status === "success" ? "text-emerald-400" : "text-red-400",
            )}
          >
            {state.status === "success" ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
            ) : (
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            )}
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
