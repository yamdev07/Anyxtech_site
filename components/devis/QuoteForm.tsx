"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, UserCircle, Lightbulb } from "lucide-react";
import { submitQuote } from "@/lib/actions";

type Status = "idle" | "loading" | "success" | "error";

const serviceOptions = [
  { value: "communication", label: "Communication digitale" },
  { value: "reseau", label: "Réseaux informatiques" },
  { value: "wifi", label: "Installation Wi-Fi" },
  { value: "energie", label: "Solutions énergétiques" },
  { value: "marketing", label: "Marketing digital" },
  { value: "autre", label: "Autre service" },
];

const delais = [
  { value: "urgent", label: "Urgent (moins d'1 mois)" },
  { value: "1-3", label: "1 à 3 mois" },
  { value: "3-6", label: "3 à 6 mois" },
  { value: "6+", label: "Plus de 6 mois" },
];

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [budget, setBudget] = useState(0);

  const budgetLabel = new Intl.NumberFormat("fr-FR").format(budget) + " FCFA";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setErrorMsg("");
    const result = await submitQuote({
      nom: String(data.get("nom") ?? ""),
      entreprise: String(data.get("entreprise") ?? ""),
      email: String(data.get("email") ?? ""),
      telephone: String(data.get("telephone") ?? ""),
      projet: String(data.get("projet") ?? ""),
      description: String(data.get("description") ?? ""),
      services: data.getAll("services").map(String),
      budget: String(data.get("budget") ?? ""),
      delai: String(data.get("delai") ?? ""),
      website: String(data.get("website") ?? ""),
    });
    if (result.ok) {
      setStatus("success");
      form.reset();
      setBudget(0);
      setTimeout(() => setStatus("idle"), 15000);
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Une erreur est survenue. Veuillez réessayer.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center shadow-card">
        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
        <h3 className="mt-4 font-display text-2xl font-semibold">
          Demande envoyée avec succès !
        </h3>
        <p className="mt-2 text-soft">
          Nous vous contacterons dans les plus brefs délais avec une estimation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-card sm:p-8"
    >
      {/* Honeypot anti-spam (masqué) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* Informations personnelles */}
      <fieldset className="border-0 p-0">
        <legend className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
          <UserCircle className="h-5 w-5 text-brand-light" />
          Informations personnelles
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nom complet" required>
            <input name="nom" type="text" required className="form-input" />
          </Field>
          <Field label="Entreprise">
            <input name="entreprise" type="text" className="form-input" />
          </Field>
          <Field label="Email" required>
            <input name="email" type="email" required className="form-input" />
          </Field>
          <Field label="Téléphone" required>
            <input name="telephone" type="tel" required className="form-input" />
          </Field>
        </div>
      </fieldset>

      {/* Détails du projet */}
      <fieldset className="mt-8 border-0 p-0">
        <legend className="mb-5 flex items-center gap-2 font-display text-lg font-semibold">
          <Lightbulb className="h-5 w-5 text-brand-light" />
          Détails du projet
        </legend>

        <div className="grid gap-5">
          <Field label="Nom du projet" required>
            <input name="projet" type="text" required className="form-input" />
          </Field>

          <div>
            <span className="mb-2 block text-sm font-medium">
              Services souhaités <span className="text-brand-light">*</span>
            </span>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {serviceOptions.map((s) => (
                <label
                  key={s.value}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-sm transition-all hover:border-brand-light/50"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={s.value}
                    className="h-4 w-4 accent-brand-light"
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          <Field label="Description détaillée" required>
            <textarea
              name="description"
              required
              rows={5}
              placeholder="Décrivez votre projet en détail, vos objectifs, vos besoins spécifiques..."
              className="form-input resize-y"
            />
          </Field>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Budget estimé</span>
              <span className="rounded-full bg-brand-light/10 px-3 py-1 text-sm font-semibold text-brand-light">
                {budgetLabel}
              </span>
            </div>
            <input
              type="range"
              name="budget"
              min={0}
              max={10000000}
              step={50000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-brand-light"
            />
            <div className="mt-1 flex justify-between text-xs text-soft">
              <span>0 FCFA</span>
              <span>10 000 000 FCFA</span>
            </div>
          </div>

          <Field label="Délai souhaité">
            <select name="delai" className="form-input" defaultValue="">
              <option value="" disabled>
                Sélectionnez un délai
              </option>
              {delais.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Fichiers joints (optionnel)">
            <input
              name="fichiers"
              type="file"
              multiple
              className="form-input file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-light"
            />
            <span className="mt-1 block text-xs text-soft">
              Formats acceptés : PDF, DOC, JPG, PNG (max 5MB)
            </span>
          </Field>
        </div>
      </fieldset>

      {status === "error" && (
        <p className="mt-5 text-sm text-red-500">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-8 w-full disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Envoi en cours...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" /> Envoyer la demande
          </>
        )}
      </button>
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
