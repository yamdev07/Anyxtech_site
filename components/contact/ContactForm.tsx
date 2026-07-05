"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitContact } from "@/lib/actions";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const params = useSearchParams();
  const service = params.get("service");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (service) {
      setMessage(
        `Bonjour, je suis intéressé(e) par le service : ${service}.\n\n`
      );
    }
  }, [service]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setErrorMsg("");
    const result = await submitContact({
      nom: String(data.get("nom") ?? ""),
      email: String(data.get("email") ?? ""),
      telephone: String(data.get("telephone") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    });
    if (result.ok) {
      setStatus("success");
      form.reset();
      setMessage("");
      setTimeout(() => setStatus("idle"), 15000);
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Une erreur est survenue. Merci de réessayer.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center shadow-card">
        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
        <h3 className="mt-4 font-display text-2xl font-semibold">
          Message envoyé avec succès !
        </h3>
        <p className="mt-2 text-soft">Nous vous répondrons dans les plus brefs délais.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5">
        {/* Honeypot anti-spam (masqué) */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <Field label="Nom complet" required>
          <input
            name="nom"
            type="text"
            required
            placeholder="Votre nom complet"
            className="form-input"
          />
        </Field>
        <Field label="Adresse email" required>
          <input
            name="email"
            type="email"
            required
            placeholder="votre@email.com"
            className="form-input"
          />
        </Field>
        <Field label="Téléphone (optionnel)">
          <input
            name="telephone"
            type="tel"
            placeholder="Votre numéro de téléphone"
            className="form-input"
          />
        </Field>
        <Field label="Message" required>
          <textarea
            name="message"
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Décrivez votre projet ou posez votre question"
            className="form-input resize-y"
          />
        </Field>

        {status === "error" && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Envoi en cours...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" /> Envoyer le message
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label} {required && <span className="text-brand-light">*</span>}
      </span>
      {children}
    </label>
  );
}
