"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "@/lib/dashboard-actions";

export interface TestimonialFormValues {
  id: string;
  author?: string | null;
  role?: string | null;
  company?: string | null;
  quote?: string | null;
  rating?: number | null;
  featured?: boolean | null;
  avatarUrl?: string | null;
}

export default function TestimonialForm({ testimonial }: { testimonial?: TestimonialFormValues }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = testimonial
      ? await updateTestimonial(testimonial.id, formData)
      : await createTestimonial(formData);
    setPending(false);
    if (result.ok) {
      router.push("/dashboard/temoignages");
      router.refresh();
    } else {
      setError(result.error || "Une erreur est survenue.");
    }
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Auteur</label>
          <input name="author" required defaultValue={testimonial?.author ?? ""} className="form-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Fonction</label>
          <input name="role" defaultValue={testimonial?.role ?? ""} className="form-input" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Entreprise</label>
        <input name="company" defaultValue={testimonial?.company ?? ""} className="form-input" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Témoignage</label>
        <textarea name="quote" required defaultValue={testimonial?.quote ?? ""} rows={4} className="form-input" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Note (1-5)</label>
          <input name="rating" type="number" min={1} max={5} defaultValue={testimonial?.rating ?? 5} className="form-input" />
        </div>
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input name="featured" type="checkbox" defaultChecked={testimonial?.featured ?? false} className="h-4 w-4 rounded" />
            Mis en avant sur l&apos;accueil
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Photo</label>
        {testimonial?.avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={testimonial.avatarUrl} alt="" className="mb-2 h-16 w-16 rounded-full border border-[var(--border)] object-cover" />
        )}
        <input name="avatar" type="file" accept="image/*" className="form-input file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light/10 file:px-3 file:py-1.5 file:text-brand-blue dark:file:text-brand-light" />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-primary text-sm disabled:opacity-60">
          {pending ? "Enregistrement..." : testimonial ? "Enregistrer" : "Ajouter le témoignage"}
        </button>
        <button type="button" onClick={() => router.push("/dashboard/temoignages")} className="btn-ghost text-sm">
          Annuler
        </button>
      </div>
    </form>
  );
}
