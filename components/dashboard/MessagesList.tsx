"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Phone, Building2, Check, Reply, Loader2, ChevronDown } from "lucide-react";

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
}

function fmt(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function MessageCard({ m, onHandled }: { m: Message; onHandled: () => void }) {
  const [handled, setH] = useState(Boolean(m.handled));
  const [pending, start] = useTransition();
  const isDevis = m.type === "devis";

  async function toggle() {
    start(async () => {
      const res = await fetch("/api/messages/handled", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: m.id, handled: !handled }) });
      const data = await res.json();
      if (data.ok) { setH(!handled); onHandled(); }
    });
  }

  return (
    <article className={`dash-card transition-all ${handled ? "opacity-70" : "shadow-lg shadow-indigo-500/10"}`}>
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 text-white shadow-md">
            {isDevis ? "💼" : "✉️"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-white">{m.name || "Anonyme"}</h3>
              {!handled && <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" /></span>}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-bold text-indigo-400">{isDevis ? "Devis" : "Contact"}</span>
              <span className="text-xs text-gray-500">{fmt(m.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 space-y-3">
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-gray-400">
          {m.email && <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition-colors"><Mail className="h-4 w-4" /> {m.email}</a>}
          {m.phone && <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1.5 hover:text-indigo-400 transition-colors"><Phone className="h-4 w-4" /> {m.phone}</a>}
          {m.company && <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {m.company}</span>}
        </div>
        {m.subject && <div className="text-sm"><span className="text-gray-500">Projet : </span><span className="font-medium text-white">{m.subject}</span></div>}
        {m.message && <p className="whitespace-pre-wrap rounded-xl bg-white/5 p-4 text-sm leading-relaxed text-gray-400 border border-white/5">{m.message}</p>}
      </div>
      <div className="px-6 py-3 flex flex-wrap items-center gap-2 border-t border-white/10 bg-white/[0.02]">
        <button type="button" onClick={toggle} disabled={pending} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${handled ? "bg-indigo-500/15 text-indigo-400" : "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30"}`}>
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          {handled ? "Traité" : "Marquer traité"}
        </button>
        {m.email && (
          <a href={`mailto:${m.email}?subject=Re: votre demande — AnyxTech`} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-indigo-600 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <Reply className="h-3.5 w-3.5" /> Répondre
          </a>
        )}
      </div>
    </article>
  );
}

export default function MessagesList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const LIMIT = 10;

  const fetchData = useCallback(async (p: number, append: boolean) => {
    setLoading(true);
    const res = await fetch(`/api/collections/submissions?page=${p}&limit=${LIMIT}`);
    const data = await res.json();
    setMessages((prev) => (append ? [...prev, ...data.docs] : data.docs));
    setHasMore(data.hasNextPage ?? false);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(1, false); }, [fetchData]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchData(next, true);
  }

  if (messages.length === 0 && !loading) {
    return <div className="dash-card p-12 text-center text-sm text-gray-400">Aucun message pour le moment.</div>;
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <MessageCard key={m.id} m={m} onHandled={() => {}} />
      ))}
      {hasMore && (
        <div className="text-center py-4">
          <button onClick={loadMore} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className="h-4 w-4" />}
            {loading ? "Chargement..." : "Charger plus"}
          </button>
        </div>
      )}
    </div>
  );
}
