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
      className={`dash-card transition-all ${
        handled ? "opacity-70" : "shadow-lg shadow-indigo-500/10"
      }`}
    >
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 text-white shadow-md">
              {isDevis ? "💼" : "✉️"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white">{m.name || "Anonyme"}</h3>
                {!handled && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-bold text-indigo-400">
                  {isDevis ? "Devis" : "Contact"}
                </span>
                <span className="text-xs text-gray-500">{fmt(m.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 space-y-3">
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-gray-400">
          {m.email && (
            <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
              <Mail className="h-4 w-4" /> {m.email}
            </a>
          )}
          {m.phone && (
            <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
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
            <span className="text-gray-500">Projet : </span>
            <span className="font-medium text-white">{m.subject}</span>
          </div>
        )}

        {m.message && (
          <p className="whitespace-pre-wrap rounded-xl bg-white/5 p-4 text-sm leading-relaxed text-gray-400 border border-white/5">
            {m.message}
          </p>
        )}

        {isDevis && m.meta && (
          <div className="flex flex-wrap gap-2 text-xs">
            {(m.meta.services ?? []).map((s) => (
              <span key={s} className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-indigo-400 font-bold">
                {s}
              </span>
            ))}
            {m.meta.budget ? (
              <span className="rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 px-3 py-1 font-bold text-white shadow-sm">
                Budget : {new Intl.NumberFormat("fr-FR").format(m.meta.budget)} FCFA
              </span>
            ) : null}
            {m.meta.delai ? (
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white font-medium">Délai : {m.meta.delai}</span>
            ) : null}
          </div>
        )}
      </div>

      <div className="px-6 py-3 flex flex-wrap items-center gap-2 border-t border-white/10 bg-white/[0.02]">
        <button
          type="button"
          onClick={toggle}
          disabled={pending}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
            handled
              ? "bg-indigo-500/15 text-indigo-400"
              : "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30"
          }`}
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          {handled ? "Traité" : "Marquer traité"}
        </button>
        {m.email && (
          <a
            href={`mailto:${m.email}?subject=Re: votre demande — AnyxTech`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
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
