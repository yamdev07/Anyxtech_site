"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { updateHomeContent } from "@/lib/dashboard-actions";

interface Stat { value: number; suffix: string; label: string }
interface Step { title: string; text: string }
interface MarqueeItem { item: string }

export interface HomeContentInitial {
  heroBadge: string; heroTitlePrefix: string; heroTitleHighlight: string; heroTitleSuffix: string;
  heroSubtitle: string; heroImageUrl?: string;
  aboutBadge: string; aboutTitlePrefix: string; aboutTitleHighlight: string;
  aboutText1: string; aboutText2: string; aboutImageUrl?: string;
  aboutBadgeValue: string; aboutBadgeLabel: string; stats: Stat[];
  processTitlePrefix: string; processTitleHighlight: string; steps: Step[];
  marquee: MarqueeItem[]; ctaTitle: string; ctaSubtitle: string;
}

const TABS = ["Hero", "Qui sommes-nous", "Comment ça marche", "Bandeau & CTA"] as const;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

export default function HomeContentForm({ initial }: { initial: HomeContentInitial }) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Hero");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [stats, setStats] = useState<Stat[]>(initial.stats?.length ? initial.stats : []);
  const [steps, setSteps] = useState<Step[]>(initial.steps?.length ? initial.steps : []);
  const [marquee, setMarquee] = useState<MarqueeItem[]>(initial.marquee?.length ? initial.marquee : []);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    setSaved(false);
    formData.set("stats", JSON.stringify(stats.slice(0, 4)));
    formData.set("steps", JSON.stringify(steps.slice(0, 3)));
    formData.set("marquee", JSON.stringify(marquee));

    const result = await updateHomeContent(formData);
    setPending(false);
    if (result.ok) {
      setSaved(true);
      router.refresh();
    } else {
      setError(result.error || "Une erreur est survenue.");
    }
  }

  return (
    <form action={handleSubmit}>
      {/* Onglets */}
      <div className="mb-6 flex flex-wrap gap-1 border-b border-[var(--border)]">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t
                ? "border-brand-light text-brand-blue dark:text-brand-light"
                : "border-transparent text-soft hover:text-[var(--text)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* HERO */}
      <div className={tab === "Hero" ? "block" : "hidden"}>
        <div className="max-w-2xl">
          <Field label="Badge">
            <input name="heroBadge" defaultValue={initial.heroBadge} className="form-input" />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Titre — début">
              <input name="heroTitlePrefix" defaultValue={initial.heroTitlePrefix} className="form-input" />
            </Field>
            <Field label="Titre — mot en couleur">
              <input name="heroTitleHighlight" defaultValue={initial.heroTitleHighlight} className="form-input" />
            </Field>
            <Field label="Titre — fin">
              <input name="heroTitleSuffix" defaultValue={initial.heroTitleSuffix} className="form-input" />
            </Field>
          </div>
          <Field label="Sous-titre">
            <textarea name="heroSubtitle" defaultValue={initial.heroSubtitle} rows={3} className="form-input" />
          </Field>
          <Field label="Image de fond">
            {initial.heroImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={initial.heroImageUrl} alt="" className="mb-2 h-28 w-auto rounded-lg border border-[var(--border)] object-cover" />
            )}
            <input name="heroImage" type="file" accept="image/*" className="form-input file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light/10 file:px-3 file:py-1.5 file:text-brand-blue dark:file:text-brand-light" />
            <p className="mt-1 text-xs text-soft">Laissez vide pour conserver l&apos;image actuelle.</p>
          </Field>
        </div>
      </div>

      {/* QUI SOMMES-NOUS */}
      <div className={tab === "Qui sommes-nous" ? "block" : "hidden"}>
        <div className="max-w-2xl">
          <Field label="Badge">
            <input name="aboutBadge" defaultValue={initial.aboutBadge} className="form-input" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Titre — début">
              <input name="aboutTitlePrefix" defaultValue={initial.aboutTitlePrefix} className="form-input" />
            </Field>
            <Field label="Titre — mot en couleur">
              <input name="aboutTitleHighlight" defaultValue={initial.aboutTitleHighlight} className="form-input" />
            </Field>
          </div>
          <Field label="Paragraphe 1">
            <textarea name="aboutText1" defaultValue={initial.aboutText1} rows={3} className="form-input" />
          </Field>
          <Field label="Paragraphe 2">
            <textarea name="aboutText2" defaultValue={initial.aboutText2} rows={3} className="form-input" />
          </Field>
          <Field label="Image">
            {initial.aboutImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={initial.aboutImageUrl} alt="" className="mb-2 h-28 w-auto rounded-lg border border-[var(--border)] object-cover" />
            )}
            <input name="aboutImage" type="file" accept="image/*" className="form-input file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light/10 file:px-3 file:py-1.5 file:text-brand-blue dark:file:text-brand-light" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Badge — valeur">
              <input name="aboutBadgeValue" defaultValue={initial.aboutBadgeValue} className="form-input" />
            </Field>
            <Field label="Badge — libellé">
              <input name="aboutBadgeLabel" defaultValue={initial.aboutBadgeLabel} className="form-input" />
            </Field>
          </div>

          <p className="mb-2 mt-5 text-sm font-semibold">Statistiques (4 maximum)</p>
          {stats.map((s, i) => (
            <div key={i} className="mb-2 flex items-end gap-2">
              <div className="w-24">
                <label className="mb-1 block text-xs text-soft">Valeur</label>
                <input
                  type="number"
                  value={s.value}
                  onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, value: Number(e.target.value) } : x)))}
                  className="form-input"
                />
              </div>
              <div className="w-20">
                <label className="mb-1 block text-xs text-soft">Suffixe</label>
                <input
                  value={s.suffix}
                  onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, suffix: e.target.value } : x)))}
                  className="form-input"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-xs text-soft">Libellé</label>
                <input
                  value={s.label}
                  onChange={(e) => setStats(stats.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                  className="form-input"
                />
              </div>
              <button type="button" onClick={() => setStats(stats.filter((_, j) => j !== i))} className="rounded-lg p-2.5 text-red-500 hover:bg-red-500/10">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {stats.length < 4 && (
            <button
              type="button"
              onClick={() => setStats([...stats, { value: 0, suffix: "+", label: "" }])}
              className="btn-ghost mt-1 text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Ajouter une statistique
            </button>
          )}
        </div>
      </div>

      {/* COMMENT ÇA MARCHE */}
      <div className={tab === "Comment ça marche" ? "block" : "hidden"}>
        <div className="max-w-2xl">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Titre — début">
              <input name="processTitlePrefix" defaultValue={initial.processTitlePrefix} className="form-input" />
            </Field>
            <Field label="Titre — mot en couleur">
              <input name="processTitleHighlight" defaultValue={initial.processTitleHighlight} className="form-input" />
            </Field>
          </div>

          <p className="mb-2 mt-5 text-sm font-semibold">Étapes (3 maximum)</p>
          {steps.map((s, i) => (
            <div key={i} className="mb-3 rounded-xl border border-[var(--border)] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-soft">Étape {i + 1}</span>
                <button type="button" onClick={() => setSteps(steps.filter((_, j) => j !== i))} className="rounded-lg p-1.5 text-red-500 hover:bg-red-500/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <input
                value={s.title}
                onChange={(e) => setSteps(steps.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))}
                placeholder="Titre"
                className="form-input mb-2"
              />
              <textarea
                value={s.text}
                onChange={(e) => setSteps(steps.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                placeholder="Description"
                rows={2}
                className="form-input"
              />
            </div>
          ))}
          {steps.length < 3 && (
            <button
              type="button"
              onClick={() => setSteps([...steps, { title: "", text: "" }])}
              className="btn-ghost text-xs"
            >
              <Plus className="h-3.5 w-3.5" /> Ajouter une étape
            </button>
          )}
        </div>
      </div>

      {/* BANDEAU & CTA */}
      <div className={tab === "Bandeau & CTA" ? "block" : "hidden"}>
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold">Bandeau défilant</p>
          {marquee.map((m, i) => (
            <div key={i} className="mb-2 flex items-center gap-2">
              <input
                value={m.item}
                onChange={(e) => setMarquee(marquee.map((x, j) => (j === i ? { item: e.target.value } : x)))}
                className="form-input"
              />
              <button type="button" onClick={() => setMarquee(marquee.filter((_, j) => j !== i))} className="rounded-lg p-2.5 text-red-500 hover:bg-red-500/10">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setMarquee([...marquee, { item: "" }])}
            className="btn-ghost mb-6 text-xs"
          >
            <Plus className="h-3.5 w-3.5" /> Ajouter un élément
          </button>

          <Field label="CTA — titre">
            <input name="ctaTitle" defaultValue={initial.ctaTitle} className="form-input" />
          </Field>
          <Field label="CTA — sous-titre">
            <textarea name="ctaSubtitle" defaultValue={initial.ctaSubtitle} rows={2} className="form-input" />
          </Field>
        </div>
      </div>

      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
      {saved && !pending && <p className="mb-3 text-sm text-emerald-500">Modifications enregistrées ✓</p>}

      <div className="mt-4 flex gap-3 border-t border-[var(--border)] pt-5">
        <button type="submit" disabled={pending} className="btn-primary text-sm disabled:opacity-60">
          {pending ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
