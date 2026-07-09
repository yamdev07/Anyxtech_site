import Link from "next/link";
import {
  Cog,
  Briefcase,
  Handshake,
  Newspaper,
  Star,
  Inbox,
  Mail,
  ArrowUpRight,
  Plus,
  BarChart3,
} from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import { getAnalyticsSummary } from "@/lib/analytics";
import TrafficChart from "@/components/dashboard/TrafficChart";

export const dynamic = "force-dynamic";

interface Submission {
  id: string | number;
  name?: string | null;
  email?: string | null;
  type?: string | null;
  handled?: boolean | null;
  createdAt?: string | null;
}

function fmt(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardHome() {
  const payload = await getPayloadClient();
  const [services, jobs, partners, news, testimonials, messages, unread, recent, analytics] =
    await Promise.all([
      payload.count({ collection: "services" }),
      payload.count({ collection: "jobs" }),
      payload.count({ collection: "partners" }),
      payload.count({ collection: "news" }),
      payload.count({ collection: "testimonials" }),
      payload.count({ collection: "submissions" }),
      payload.count({ collection: "submissions", where: { handled: { not_equals: true } } }),
      payload.find({ collection: "submissions", sort: "-createdAt", limit: 6, depth: 0 }),
      getAnalyticsSummary(30),
    ]);
  const recentMsgs = recent.docs as unknown as Submission[];

  // Une seule couleur de marque pour toutes les cartes : le dégradé bleu.
  // Le rouge reste réservé aux alertes (messages non lus).
  const stats = [
    { icon: Cog, label: "Services", value: services.totalDocs, href: "/dashboard/services" },
    { icon: Briefcase, label: "Offres", value: jobs.totalDocs, href: "/dashboard/offres" },
    { icon: Handshake, label: "Partenaires", value: partners.totalDocs, href: "/dashboard/partenaires" },
    { icon: Newspaper, label: "Actualités", value: news.totalDocs, href: "/dashboard/actualites" },
    { icon: Star, label: "Témoignages", value: testimonials.totalDocs, href: "/dashboard/temoignages" },
    { icon: Inbox, label: "Messages", value: messages.totalDocs, href: "/dashboard/messages", badge: unread.totalDocs },
  ];

  const quickAccess = [
    {
      icon: Plus,
      title: "Publier une offre d'emploi",
      desc: "Ajoutez un poste sans écrire une ligne de code.",
      href: "/dashboard/offres/nouvelle",
    },
    {
      icon: Handshake,
      title: "Ajouter un partenaire",
      desc: "Logo, nom et lien affichés automatiquement.",
      href: "/dashboard/partenaires/nouveau",
    },
    {
      icon: BarChart3,
      title: "Voir l'analytique détaillée",
      desc: "Historique complet des visites du site.",
      href: "/dashboard/analytique",
    },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Vue d&apos;ensemble</h1>
          <p className="mt-1 text-soft">Bienvenue sur votre espace de gestion AnyxTech 👋</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {analytics.onlineNow} visiteur{analytics.onlineNow > 1 ? "s" : ""} en ligne
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                {s.badge ? (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
                    {s.badge}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 font-display text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-soft">{s.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Trafic + appareils / pages populaires */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Trafic du site</h2>
            <Link href="/dashboard/analytique" className="text-sm font-semibold text-brand-blue dark:text-brand-light">
              Analytique complète →
            </Link>
          </div>
          <TrafficChart data={analytics.dailySeries} />
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Appareils</h2>
          {(["mobile", "desktop", "tablette"] as const).map((k) => (
            <div key={k} className="mb-3 flex items-center gap-3 text-sm">
              <span className="w-16 shrink-0 capitalize">{k}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-light"
                  style={{ width: `${analytics.deviceBreakdown[k]}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-soft">{analytics.deviceBreakdown[k]}%</span>
            </div>
          ))}

          <h2 className="mb-2 mt-5 font-display text-sm font-bold">Pages populaires</h2>
          {analytics.topPages.length === 0 ? (
            <p className="text-sm text-soft">Pas encore de données.</p>
          ) : (
            analytics.topPages.map((p) => (
              <div key={p.path} className="flex items-center justify-between py-1.5 text-sm">
                <span className="truncate text-brand-blue dark:text-brand-light">{p.path}</span>
                <span className="shrink-0 text-soft">{p.count} vues</span>
              </div>
            ))
          )}
        </section>
      </div>

      {/* Accès rapides + Derniers messages */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Accès rapides</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickAccess.map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.title}
                  href={q.href}
                  className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-soft p-4 transition-all hover:-translate-y-0.5 hover:border-brand-light/50"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-light text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{q.title}</div>
                    <div className="mt-0.5 text-xs text-soft">{q.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Derniers messages</h2>
            <Link href="/dashboard/messages" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-light dark:text-brand-light">
              Tout voir <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          {recentMsgs.length === 0 ? (
            <div className="p-6 text-center text-sm text-soft">Aucun message pour le moment.</div>
          ) : (
            <div className="space-y-1">
              {recentMsgs.map((m) => (
                <Link
                  key={m.id}
                  href="/dashboard/messages"
                  className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-soft"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-light/10 text-brand-light">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium">{m.name || "Anonyme"}</span>
                      {!m.handled && <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />}
                    </div>
                    <div className="truncate text-xs text-soft">
                      {m.type === "devis" ? "Devis" : "Contact"} · {m.email}
                    </div>
                    <div className="mt-0.5 text-xs text-soft">{fmt(m.createdAt)}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
