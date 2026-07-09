"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createJob, updateJob } from "@/lib/dashboard-actions";

export interface JobFormValues {
  id: string;
  title?: string | null;
  location?: string | null;
  type?: string | null;
  department?: string | null;
  excerpt?: string | null;
  status?: string | null;
  descriptionText?: string | null;
}

export default function JobForm({ job }: { job?: JobFormValues }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = job ? await updateJob(job.id, formData) : await createJob(formData);
      if (result.ok) {
        router.push("/dashboard/offres");
        router.refresh();
      } else {
        setError(result.error || "Une erreur est survenue, réessayez.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Intitulé du poste</label>
        <input
          name="title"
          required
          defaultValue={job?.title ?? ""}
          placeholder="Développeur·se Next.js"
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Type de contrat</label>
          <select name="type" defaultValue={job?.type ?? "CDI"} className="form-input">
            {["CDI", "CDD", "Stage", "Alternance", "Freelance"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Statut</label>
          <select name="status" defaultValue={job?.status ?? "open"} className="form-input">
            <option value="open">Ouverte</option>
            <option value="closed">Fermée</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Lieu</label>
        <input name="location" defaultValue={job?.location ?? "Cotonou, Bénin"} className="form-input" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Département</label>
        <input name="department" defaultValue={job?.department ?? ""} placeholder="Technique, Commercial..." className="form-input" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Résumé (aperçu)</label>
        <textarea
          name="excerpt"
          defaultValue={job?.excerpt ?? ""}
          rows={3}
          placeholder="Affiché sur la liste des offres."
          className="form-input"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Description complète</label>
        <textarea
          name="description"
          defaultValue={job?.descriptionText ?? ""}
          rows={8}
          placeholder="Séparez les paragraphes par une ligne vide. Affichée sur la page détaillée de l'offre."
          className="form-input"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-primary text-sm disabled:opacity-60">
          {pending ? "Enregistrement..." : job ? "Enregistrer" : "Publier l'offre"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/offres")}
          className="btn-ghost text-sm"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
