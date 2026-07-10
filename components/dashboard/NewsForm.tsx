"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNews, updateNews } from "@/lib/dashboard-actions";

export interface NewsFormValues {
  id: string;
  title?: string | null;
  excerpt?: string | null;
  status?: string | null;
  contentText?: string | null;
  coverUrl?: string | null;
}

export default function NewsForm({ news }: { news?: NewsFormValues }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = news ? await updateNews(news.id, formData) : await createNews(formData);
    setPending(false);
    if (result.ok) {
      router.push("/dashboard/actualites");
      router.refresh();
    } else {
      setError(result.error || "Une erreur est survenue.");
    }
  }

  return (
    <form action={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium">Titre</label>
        <input name="title" required defaultValue={news?.title ?? ""} className="form-input" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Statut</label>
        <select name="status" defaultValue={news?.status ?? "draft"} className="form-input">
          <option value="draft">Brouillon</option>
          <option value="published">Publié</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Image de couverture</label>
        {news?.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={news.coverUrl} alt="" className="mb-2 h-24 w-auto rounded-lg border border-[var(--border)] object-cover" />
        )}
        <input name="cover" type="file" accept="image/*" className="form-input file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light/10 file:px-3 file:py-1.5 file:text-brand-blue dark:file:text-brand-light" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Chapô / résumé</label>
        <textarea name="excerpt" defaultValue={news?.excerpt ?? ""} rows={2} className="form-input" />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Contenu</label>
        <textarea
          name="content"
          defaultValue={news?.contentText ?? ""}
          rows={10}
          placeholder="Séparez les paragraphes par une ligne vide."
          className="form-input"
        />
        <p className="mt-1 text-xs text-soft">
          Texte simple par paragraphes. Pour une mise en forme avancée (gras, liens...), utilisez l&apos;éditeur complet sur /admin.
        </p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-primary text-sm disabled:opacity-60">
          {pending ? "Enregistrement..." : news ? "Enregistrer" : "Publier l'article"}
        </button>
        <button type="button" onClick={() => router.push("/dashboard/actualites")} className="btn-ghost text-sm">
          Annuler
        </button>
      </div>
    </form>
  );
}
