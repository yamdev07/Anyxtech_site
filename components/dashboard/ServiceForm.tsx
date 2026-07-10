"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { createService, updateService } from "@/lib/dashboard-actions";
import { iconNames, colorPresets } from "@/lib/services";

export interface ServiceFormValues {
  id: string;
  title?: string | null;
  category?: string | null;
  icon?: string | null;
  color?: string | null;
  short?: string | null;
  features?: { feature: string }[] | null;
  order?: number | null;
  imageUrl?: string | null;
}

const categories = [
  { label: "Communication Digitale", value: "communication" },
  { label: "Infrastructure & Réseaux", value: "infrastructure" },
  { label: "Support & Accompagnement", value: "support" },
  { label: "Hébergement & Domaine", value: "hosting" },
];

export default function ServiceForm({ service }: { service?: ServiceFormValues }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [features, setFeatures] = useState<{ feature: string }[]>(service?.features ?? []);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    formData.set("features", JSON.stringify(features));
    const result = service ? await updateService(service.id, formData) : await createService(formData);
    setPending(false);
    if (result.ok) {
      router.push("/dashboard/services");
      router.refresh();
    } else {
      setError(result.error || "Une erreur est survenue.");
    }
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Titre</label>
        <input name="title" required defaultValue={service?.title ?? ""} className="form-input" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Catégorie</label>
          <select name="category" defaultValue={service?.category ?? "communication"} className="form-input">
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Ordre d&apos;affichage</label>
          <input name="order" type="number" defaultValue={service?.order ?? ""} className="form-input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Icône</label>
          <select name="icon" defaultValue={service?.icon ?? "Sparkles"} className="form-input">
            {iconNames.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Couleur</label>
          <select name="color" defaultValue={service?.color ?? colorPresets[0].value} className="form-input">
            {colorPresets.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Image (accueil)</label>
        {service?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={service.imageUrl} alt="" className="mb-2 h-24 w-auto rounded-lg border border-[var(--border)] object-cover" />
        )}
        <input name="image" type="file" accept="image/*" className="form-input file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light/10 file:px-3 file:py-1.5 file:text-brand-blue dark:file:text-brand-light" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Description courte</label>
        <textarea name="short" defaultValue={service?.short ?? ""} rows={3} className="form-input" />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Prestations</p>
        {features.map((f, i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <input
              value={f.feature}
              onChange={(e) => setFeatures(features.map((x, j) => (j === i ? { feature: e.target.value } : x)))}
              className="form-input"
            />
            <button type="button" onClick={() => setFeatures(features.filter((_, j) => j !== i))} className="rounded-lg p-2.5 text-red-500 hover:bg-red-500/10">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setFeatures([...features, { feature: "" }])} className="btn-ghost text-xs">
          <Plus className="h-3.5 w-3.5" /> Ajouter une prestation
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-primary text-sm disabled:opacity-60">
          {pending ? "Enregistrement..." : service ? "Enregistrer" : "Créer le service"}
        </button>
        <button type="button" onClick={() => router.push("/dashboard/services")} className="btn-ghost text-sm">
          Annuler
        </button>
      </div>
    </form>
  );
}
