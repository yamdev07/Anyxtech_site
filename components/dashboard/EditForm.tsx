"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { saveDoc } from "@/lib/dashboard-actions";

type FieldType = "text" | "email" | "textarea" | "number" | "select" | "checkbox" | "date";

interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: string | number | boolean;
  sidebar?: boolean;
}

const collectionFields: Record<string, { main: Field[]; sidebar: Field[] }> = {
  services: {
    main: [
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "category", label: "Catégorie", type: "select", options: [
        { label: "Communication Digitale", value: "communication" },
        { label: "Infrastructure & Réseaux", value: "infrastructure" },
        { label: "Support & Accompagnement", value: "support" },
        { label: "Hébergement & Domaine", value: "hosting" },
      ], defaultValue: "communication" },
      { name: "short", label: "Description courte", type: "textarea" },
    ],
    sidebar: [
      { name: "slug", label: "Slug", type: "text" },
      { name: "order", label: "Ordre", type: "number", defaultValue: 0 },
    ],
  },
  jobs: {
    main: [
      { name: "title", label: "Intitulé du poste", type: "text", required: true },
      { name: "location", label: "Lieu", type: "text", defaultValue: "Cotonou, Bénin" },
      { name: "department", label: "Département", type: "text" },
      { name: "excerpt", label: "Résumé", type: "textarea" },
    ],
    sidebar: [
      { name: "slug", label: "Slug", type: "text" },
      { name: "type", label: "Type de contrat", type: "select", options: [
        { label: "CDI", value: "CDI" },
        { label: "CDD", value: "CDD" },
        { label: "Stage", value: "Stage" },
        { label: "Alternance", value: "Alternance" },
        { label: "Freelance", value: "Freelance" },
      ], defaultValue: "CDI" },
      { name: "status", label: "Statut", type: "select", options: [
        { label: "Ouverte", value: "open" },
        { label: "Fermée", value: "closed" },
      ], defaultValue: "open" },
      { name: "publishedAt", label: "Date de publication", type: "date" },
    ],
  },
  partners: {
    main: [
      { name: "name", label: "Nom", type: "text", required: true },
      { name: "website", label: "Site web", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
    sidebar: [
      { name: "order", label: "Ordre", type: "number", defaultValue: 0 },
    ],
  },
  news: {
    main: [
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "excerpt", label: "Chapô / résumé", type: "textarea" },
    ],
    sidebar: [
      { name: "slug", label: "Slug", type: "text" },
      { name: "status", label: "Statut", type: "select", options: [
        { label: "Brouillon", value: "draft" },
        { label: "Publié", value: "published" },
      ], defaultValue: "draft" },
      { name: "publishedAt", label: "Date de publication", type: "date" },
    ],
  },
  testimonials: {
    main: [
      { name: "author", label: "Auteur", type: "text", required: true },
      { name: "role", label: "Fonction", type: "text" },
      { name: "company", label: "Entreprise", type: "text" },
      { name: "quote", label: "Témoignage", type: "textarea", required: true },
      { name: "rating", label: "Note (1-5)", type: "number", defaultValue: 5 },
    ],
    sidebar: [
      { name: "featured", label: "Mis en avant", type: "checkbox" },
    ],
  },
};

const gradientMap: Record<string, string> = {
  services: "from-indigo-500 to-indigo-400",
  jobs: "from-violet-500 to-violet-400",
  partners: "from-amber-500 to-amber-400",
  news: "from-cyan-500 to-cyan-400",
  testimonials: "from-rose-500 to-rose-400",
};

export default function EditForm({
  collection,
  id,
  initialData,
}: {
  collection: string;
  id: string | null;
  initialData?: Record<string, unknown>;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const fields = collectionFields[collection];

  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    if (!fields) return {};
    const all = [...fields.main, ...fields.sidebar];
    const data: Record<string, unknown> = {};
    for (const f of all) {
      if (initialData && initialData[f.name] !== undefined) {
        data[f.name] = initialData[f.name];
      } else if (f.defaultValue !== undefined) {
        data[f.name] = f.defaultValue;
      } else if (f.type === "checkbox") {
        data[f.name] = false;
      } else {
        data[f.name] = "";
      }
    }
    return data;
  });

  if (!fields) return <div className="p-10 text-center text-gray-400">Collection non supportée.</div>;

  function set(name: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    const res = await saveDoc(collection as "services", id, formData, `/dashboard/edit/${collection}`);
    if (res.ok) {
      router.push(`/dashboard/edit/${collection}`);
      router.refresh();
    } else {
      setError(res.error || "Erreur lors de la sauvegarde.");
      setPending(false);
    }
  }

  function renderField(f: Field) {
    const baseClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/20 outline-none transition-all";

    switch (f.type) {
      case "textarea":
        return (
          <textarea
            value={String(formData[f.name] || "")}
            onChange={(e) => set(f.name, e.target.value)}
            required={f.required}
            rows={4}
            className={baseClass + " resize-y"}
            placeholder={f.placeholder}
          />
        );
      case "select":
        return (
          <select
            value={String(formData[f.name] || "")}
            onChange={(e) => set(f.name, e.target.value)}
            className={baseClass}
          >
            {f.options?.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(formData[f.name])}
              onChange={(e) => set(f.name, e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-400/20"
            />
            <span className="text-sm text-gray-300">{f.label}</span>
          </label>
        );
      case "number":
        return (
          <input
            type="number"
            value={formData[f.name] !== undefined ? String(formData[f.name]) : ""}
            onChange={(e) => set(f.name, e.target.value ? Number(e.target.value) : "")}
            required={f.required}
            className={baseClass}
            placeholder={f.placeholder}
          />
        );
      case "date":
        return (
          <input
            type="datetime-local"
            value={formData[f.name] ? String(formData[f.name]).slice(0, 16) : ""}
            onChange={(e) => set(f.name, e.target.value)}
            className={baseClass}
          />
        );
      default:
        return (
          <input
            type={f.type}
            value={String(formData[f.name] || "")}
            onChange={(e) => set(f.name, e.target.value)}
            required={f.required}
            className={baseClass}
            placeholder={f.placeholder}
          />
        );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="dash-card p-6 space-y-5">
            <h3 className="font-display text-sm font-bold text-white">Informations principales</h3>
            {fields.main.map((f) => (
              <div key={f.name}>
                {f.type !== "checkbox" && (
                  <label className="block text-sm font-medium text-gray-300 mb-2">{f.label}</label>
                )}
                {renderField(f)}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar fields */}
        <div className="space-y-5">
          <div className="dash-card p-6 space-y-5">
            <h3 className="font-display text-sm font-bold text-white">Paramètres</h3>
            {fields.sidebar.map((f) => (
              <div key={f.name}>
                {f.type !== "checkbox" ? (
                  <>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{f.label}</label>
                    {renderField(f)}
                  </>
                ) : (
                  renderField(f)
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="dash-card p-6 space-y-3">
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {pending ? "Sauvegarde..." : "Sauvegarder"}
            </button>
            <Link
              href={`/dashboard/edit/${collection}`}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-400 transition-all hover:border-white/20 hover:text-white flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Annuler
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
