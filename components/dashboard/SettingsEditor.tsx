"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";
import { saveGlobal } from "@/lib/dashboard-actions";

interface SettingsData {
  tagline?: string;
  description?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  addressShort?: string;
  hours?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export default function SettingsEditor({ initial }: { initial: SettingsData }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(initial);

  function set(name: string, value: string) {
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    const res = await saveGlobal("site-settings", data, "/dashboard/settings");
    if (res.ok) {
      router.refresh();
      setPending(false);
    } else {
      setError(res.error || "Erreur lors de la sauvegarde.");
      setPending(false);
    }
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Identité */}
        <section className="dash-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-400 text-white">
              <Settings className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-display text-sm font-bold text-white">Identité</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Slogan</label>
            <input type="text" value={data.tagline || ""} onChange={(e) => set("tagline", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description (pied de page)</label>
            <textarea value={data.description || ""} onChange={(e) => set("description", e.target.value)} rows={3} className={inputClass + " resize-y"} />
          </div>
        </section>

        {/* Coordonnées */}
        <section className="dash-card p-6 space-y-5">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-400 text-white">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <h3 className="font-display text-sm font-bold text-white">Coordonnées</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone</label>
              <input type="text" value={data.phone || ""} onChange={(e) => set("phone", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lien tel:</label>
              <input type="text" value={data.phoneHref || ""} onChange={(e) => set("phoneHref", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input type="email" value={data.email || ""} onChange={(e) => set("email", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
            <input type="text" value={data.whatsapp || ""} onChange={(e) => set("whatsapp", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Adresse</label>
            <textarea value={data.address || ""} onChange={(e) => set("address", e.target.value)} rows={2} className={inputClass + " resize-y"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Horaires</label>
            <input type="text" value={data.hours || ""} onChange={(e) => set("hours", e.target.value)} className={inputClass} />
          </div>
        </section>

        {/* Réseaux sociaux */}
        <section className="dash-card p-6 space-y-5 lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-400 text-white">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </div>
            <h3 className="font-display text-sm font-bold text-white">Réseaux sociaux</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
              <input type="text" value={data.facebook || ""} onChange={(e) => set("facebook", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Twitter / X</label>
              <input type="text" value={data.twitter || ""} onChange={(e) => set("twitter", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
              <input type="text" value={data.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
              <input type="text" value={data.instagram || ""} onChange={(e) => set("instagram", e.target.value)} className={inputClass} />
            </div>
          </div>
        </section>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {pending ? "Sauvegarde..." : "Sauvegarder"}
        </button>
        <Link
          href="/dashboard"
          className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-gray-400 transition-all hover:border-white/20 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 inline mr-1" /> Annuler
        </Link>
      </div>
    </form>
  );
}
