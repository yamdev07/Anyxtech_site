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
      className={`rounded-2xl border backdrop-blur-xl overflow-hidden transition-all ${
        handled
          ? "border-[var(--border)] bg-[var(--card)] opacity-80"
          : "border-brand-light/30 bg-[var(--card)] shadow-lg shadow-brand-light/5"
      }`}
    >
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-[var(--text)]">{m.name || "Anonyme"}</h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                isDevis
                  ? "bg-violet-500/10 text-violet-400"
                  : "bg-brand-light/10 text-brand-light"
              }`}
            >
              {isDevis ? "Devis" : "Contact"}
            </span>
            {!handled && <span className="h-2 w-2 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />}
          </div>
          <div className="text-xs text-[var(--text-muted)]">{fmt(m.createdAt)}</div>
        </div>
      </div>

      <div className="px-6 py-4 space-y-3">
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[var(--text-soft)]">
          {m.email && (
            <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 hover:text-brand-light transition-colors">
              <Mail className="h-4 w-4" /> {m.email}
            </a>
          )}
          {m.phone && (
            <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-light transition-colors">
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
          <div className="text-sm">
            <span className="text-[var(--text-muted)]">Projet : </span>
            <span className="font-medium text-[var(--text)]">{m.subject}</span>
          </div>
        )}

        {m.message && (
          <p className="whitespace-pre-wrap rounded-xl bg-[var(--bg-soft)] p-4 text-sm leading-relaxed text-[var(--text-soft)]">
            {m.message}
          </p>
        )}

        {isDevis && m.meta && (
          <div className="flex flex-wrap gap-2 text-xs">
            {(m.meta.services ?? []).map((s) => (
              <span key={s} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[var(--text-soft)]">
                {s}
              </span>
            ))}
            {m.meta.budget ? (
              <span className="rounded-full bg-brand-light/10 px-2.5 py-1 font-medium text-brand-light">
                Budget : {new Intl.NumberFormat("fr-FR").format(m.meta.budget)} FCFA
              </span>
            ) : null}
            {m.meta.delai ? (
              <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[var(--text-soft)]">Délai : {m.meta.delai}</span>
            ) : null}
          </div>
        )}
      </div>

      <div className="px-6 py-3 flex flex-wrap items-center gap-2 border-t border-[var(--border)] bg-[var(--bg-soft)]/50">
        <button
          type="button"
          onClick={toggle}
          disabled={pending}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            handled
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-brand-light/10 text-brand-light hover:bg-brand-light/20"
          }`}
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          {handled ? "Traité" : "Marquer traité"}
        </button>
        {m.email && (
          <a
            href={`mailto:${m.email}?subject=Re: votre demande — AnyxTech`}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--text-soft)] transition-colors hover:bg-brand-light/10 hover:text-brand-light"
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
