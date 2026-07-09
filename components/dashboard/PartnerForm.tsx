"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPartner, updatePartner } from "@/lib/dashboard-actions";

export interface PartnerFormValues {
  id: string;
  name?: string | null;
  website?: string | null;
  description?: string | null;
  logoUrl?: string | null;
}

export default function PartnerForm({ partner }: { partner?: PartnerFormValues }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = partner
        ? await updatePartner(partner.id, formData)
        : await createPartner(formData);
      if (result.ok) {
        router.push("/dashboard/partenaires");
        router.refresh();
      } else {
        setError(result.error || "Une erreur est survenue, réessayez.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Nom du partenaire</label>
        <input
          name="name"
          required
          defaultValue={partner?.name ?? ""}
          placeholder="Orange Bénin"
          className="form-input"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Site web</label>
        <input
          name="website"
          defaultValue={partner?.website ?? ""}
          placeholder="https://orange.bj"
          className="form-input"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Logo</label>
        {partner?.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={partner.logoUrl} alt="" className="mb-2 h-12 w-auto rounded-lg border border-[var(--border)] bg-white p-1.5" />
        )}
        <input name="logo" type="file" accept="image/*" className="form-input file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light/10 file:px-3 file:py-1.5 file:text-brand-blue dark:file:text-brand-light" />
        <p className="mt-1 text-xs text-soft">
          {partner ? "Laissez vide pour conserver le logo actuel." : "Affiché automatiquement dans le bandeau partenaires du site."}
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Description</label>
        <textarea
          name="description"
          defaultValue={partner?.description ?? ""}
          rows={3}
          className="form-input"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-primary text-sm disabled:opacity-60">
          {pending ? "Enregistrement..." : partner ? "Enregistrer" : "Ajouter le partenaire"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard/partenaires")}
          className="btn-ghost text-sm"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
