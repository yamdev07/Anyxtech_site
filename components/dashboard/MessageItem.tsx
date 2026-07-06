"use client";

import { useState, useTransition } from "react";
import { Mail, Phone, Building2, Check, Reply, Loader2 } from "lucide-react";
import { setHandled } from "@/lib/dashboard-actions";
import DeleteButton from "./DeleteButton";

export interface Message {
  id: string;
  type?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message?: string | null;
  handled?: boolean | null;
  createdAt?: string | null;
  meta?: {
    services?: string[];
    budget?: number;
    delai?: string;
  } | null;
}

function fmt(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessageItem({ m }: { m: Message }) {
  const [handled, setH] = useState(Boolean(m.handled));
  const [pending, start] = useTransition();
  const isDevis = m.type === "devis";

  function toggle() {
    start(async () => {
      const r = await setHandled(m.id, !handled);
      if (r.ok) setH(!handled);
    });
  }

  return (
    <article
      className={`rounded-2xl border bg-[var(--card)] p-5 transition-colors sm:p-6 ${
        handled ? "border-[var(--border)] opacity-80" : "border-brand-light/40"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold">{m.name || "Anonyme"}</h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isDevis
                  ? "bg-violet-500/10 text-violet-600 dark:text-violet-300"
                  : "bg-brand-light/10 text-brand-blue dark:text-brand-light"
              }`}
            >
              {isDevis ? "Devis" : "Contact"}
            </span>
            {!handled && <span className="h-2 w-2 rounded-full bg-red-500" />}
          </div>
          <div className="mt-1 text-xs text-soft">{fmt(m.createdAt)}</div>
        </div>
      </div>

      {/* Coordonnées */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-soft">
        {m.email && (
          <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 hover:text-brand-light">
            <Mail className="h-4 w-4" /> {m.email}
          </a>
        )}
        {m.phone && (
          <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-light">
            <Phone className="h-4 w-4" /> {m.phone}
          </a>
        )}
        {m.company && (
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-4 w-4" /> {m.company}
          </span>
        )}
      </div>

      {m.subject && (
        <div className="mt-3 text-sm">
          <span className="text-soft">Projet : </span>
          <span className="font-medium">{m.subject}</span>
        </div>
      )}

      {m.message && (
        <p className="mt-3 whitespace-pre-wrap rounded-xl bg-soft p-4 text-sm leading-relaxed">
          {m.message}
        </p>
      )}

      {/* Détails devis */}
      {isDevis && m.meta && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {(m.meta.services ?? []).map((s) => (
            <span key={s} className="rounded-full border border-[var(--border)] px-2.5 py-1">
              {s}
            </span>
          ))}
          {m.meta.budget ? (
            <span className="rounded-full bg-brand-light/10 px-2.5 py-1 font-medium text-brand-blue dark:text-brand-light">
              Budget : {new Intl.NumberFormat("fr-FR").format(m.meta.budget)} FCFA
            </span>
          ) : null}
          {m.meta.delai ? (
            <span className="rounded-full border border-[var(--border)] px-2.5 py-1">Délai : {m.meta.delai}</span>
          ) : null}
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
        <button
          type="button"
          onClick={toggle}
          disabled={pending}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            handled
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-brand-light/10 text-brand-blue dark:text-brand-light hover:bg-brand-light/20"
          }`}
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          {handled ? "Traité" : "Marquer traité"}
        </button>
        {m.email && (
          <a
            href={`mailto:${m.email}?subject=Re: votre demande — AnyxTech`}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-soft transition-colors hover:bg-brand-light/10 hover:text-brand-light"
          >
            <Reply className="h-3.5 w-3.5" /> Répondre
          </a>
        )}
        <div className="ml-auto">
          <DeleteButton collection="submissions" id={m.id} path="/dashboard/messages" />
        </div>
      </div>
    </article>
  );
}
