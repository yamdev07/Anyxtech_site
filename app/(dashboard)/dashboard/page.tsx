import {
  Eye,
  Briefcase,
  Handshake,
  Newspaper,
  Inbox,
  Cog,
  TrendingUp,
  ArrowUpRight,
  Users,
  Star,
  BarChart3,
  Plus,
  ExternalLink,
  Clock,
  FileText,
  Settings,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vue d'ensemble" };

function fmt(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardOverview() {
  const payload = await getPayloadClient();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalVisits,
    todayVisits,
    weekVisits,
    totalJobs,
    totalPartners,
    totalNews,
    totalMessages,
    unreadMessages,
    totalServices,
    totalTestimonials,
    recentVisits,
    recentSubmissions,
    recentJobs,
  ] = await Promise.all([
    payload.count({ collection: "visitors" }),
    payload.count({ collection: "visitors", where: { createdAt: { greater_than: todayStart.toISOString() } } }),
    payload.count({ collection: "visitors", where: { createdAt: { greater_than: weekAgo.toISOString() } } }),
    payload.count({ collection: "jobs" }),
    payload.count({ collection: "partners" }),
    payload.count({ collection: "news" }),
    payload.count({ collection: "submissions" }),
    payload.count({ collection: "submissions", where: { handled: { not_equals: true } } }),
    payload.count({ collection: "services" }),
    payload.count({ collection: "testimonials" }),
    payload.find({ collection: "visitors", sort: "-createdAt", limit: 8, depth: 0 }),
    payload.find({ collection: "submissions", sort: "-createdAt", limit: 5, depth: 0 }),
    payload.find({ collection: "jobs", sort: "-createdAt", limit: 5, depth: 0 }),
  ]);

  const visits = recentVisits.docs as Record<string, unknown>[];
  const submissions = recentSubmissions.docs as Record<string, unknown>[];
  const jobs = recentJobs.docs as Record<string, unknown>[];

  const pageCounts: Record<string, number> = {};
  const allVisits = await payload.find({ collection: "visitors", limit: 200, depth: 0 });
  for (const v of allVisits.docs as Record<string, unknown>[]) {
    const p = (v.path as string) || "/";
    pageCounts[p] = (pageCounts[p] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxPageCount = topPages.length > 0 ? topPages[0][1] : 1;

  const statCards = [
    {
      icon: Eye,
      label: "Total visites",
      value: totalVisits.totalDocs,
      delta: `+${todayVisits.totalDocs} aujourd'hui`,
      deltaType: "up" as const,
      gradient: "from-cyan-400 to-cyan-600",
      glow: "rgba(34, 211, 238, 0.3)",
      href: "/dashboard/analytics",
    },
    {
      icon: TrendingUp,
      label: "Cette semaine",
      value: weekVisits.totalDocs,
      delta: "7 derniers jours",
      deltaType: "up" as const,
      gradient: "from-emerald-400 to-emerald-600",
      glow: "rgba(52, 211, 153, 0.3)",
      href: "/dashboard/analytics",
    },
    {
      icon: Briefcase,
      label: "Offres d'emploi",
      value: totalJobs.totalDocs,
      delta: "publiées",
      deltaType: "up" as const,
      gradient: "from-violet-400 to-violet-600",
      glow: "rgba(167, 139, 250, 0.3)",
      href: "/dashboard/offres",
    },
    {
      icon: Handshake,
      label: "Partenaires",
      value: totalPartners.totalDocs,
      delta: "actifs",
      deltaType: "up" as const,
      gradient: "from-amber-400 to-amber-600",
      glow: "rgba(251, 191, 36, 0.3)",
      href: "/dashboard/partenaires",
    },
    {
      icon: Newspaper,
      label: "Actualités",
      value: totalNews.totalDocs,
      delta: "articles",
      deltaType: "up" as const,
      gradient: "from-brand-blue to-brand-light",
      glow: "rgba(29, 185, 255, 0.3)",
      href: "/dashboard/actualites",
    },
    {
      icon: Inbox,
      label: "Messages",
      value: totalMessages.totalDocs,
      delta: unreadMessages.totalDocs > 0 ? `${unreadMessages.totalDocs} non lus` : "tous lus",
      deltaType: unreadMessages.totalDocs > 0 ? "down" as const : "up" as const,
      gradient: "from-rose-400 to-rose-600",
      glow: "rgba(251, 113, 133, 0.3)",
      href: "/dashboard/messages",
    },
  ];

  const quickActions = [
    { label: "Nouvelle offre", href: "/admin/collections/jobs/create", icon: Briefcase, gradient: "from-violet-500 to-violet-700" },
    { label: "Nouveau partenaire", href: "/admin/collections/partners/create", icon: Handshake, gradient: "from-amber-500 to-amber-700" },
    { label: "Nouvel article", href: "/admin/collections/news/create", icon: Newspaper, gradient: "from-brand-blue to-brand-light" },
    { label: "Contenu accueil", href: "/admin/globals/home-content", icon: FileText, gradient: "from-cyan-500 to-cyan-700" },
    { label: "Paramètres", href: "/admin/globals/site-settings", icon: Settings, gradient: "from-slate-400 to-slate-600" },
    { label: "Voir le site", href: "/", icon: ExternalLink, gradient: "from-emerald-500 to-emerald-700", external: true },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
      {/* Hero banner */}
      <div className="dash-hero">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg shadow-black/10">
              <BarChart3 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl text-white drop-shadow-sm">
                Vue d&apos;ensemble
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Tableau de bord de votre site AnyxTech
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/analytics"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:border-white/40"
            >
              <BarChart3 className="h-4 w-4" /> Analytique
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-blue shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ExternalLink className="h-4 w-4" /> Voir le site
            </Link>
          </div>
        </div>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="dash-stat group"
              style={{
                ["--glow-color" as string]: s.glow,
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-lg`}
                    style={{ boxShadow: `0 8px 20px -4px ${s.glow}` }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-5 font-display text-4xl font-extrabold text-[var(--text)] tabular-nums tracking-tight">
                  {s.value.toLocaleString("fr-FR")}
                </div>
                <div className="mt-1 text-sm font-medium text-[var(--text-soft)]">{s.label}</div>
                <div className="mt-2.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      s.deltaType === "up"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {s.deltaType === "up" && <TrendingUp className="h-3 w-3" />}
                    {s.delta}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-light text-white">
            <Plus className="h-3.5 w-3.5" />
          </div>
          <h2 className="font-display text-sm font-bold text-[var(--text)]">Actions rapides</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                href={a.href}
                {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`dash-action bg-gradient-to-br ${a.gradient} shadow-lg`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{a.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Two-column: Top pages + Recent messages */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Top pages */}
        <section className="dash-card lg:col-span-3">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-100 text-cyan-600">
                <Eye className="h-3.5 w-3.5" />
              </div>
              <h2 className="font-display text-sm font-bold text-[var(--text)]">Pages les plus visitées</h2>
            </div>
            <Link
              href="/dashboard/analytics"
              className="text-xs font-medium text-brand-blue hover:underline"
            >
              Tout voir
            </Link>
          </div>
          <div className="p-6">
            {topPages.length === 0 ? (
              <div className="py-8 text-center text-sm text-[var(--text-soft)]">
                Aucune donnée pour le moment.
              </div>
            ) : (
              <div className="space-y-4">
                {topPages.map(([page, count]) => (
                  <div key={page}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="truncate text-sm font-medium text-[var(--text)]">{page}</span>
                      <span className="ml-2 shrink-0 rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-light/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue tabular-nums border border-brand-light/20">
                        {count}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[var(--bg-soft)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-blue via-brand-light to-brand-cyan transition-all duration-700 ease-out"
                        style={{ width: `${(count / maxPageCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent messages */}
        <section className="dash-card lg:col-span-2">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-rose-100 text-rose-600">
                <Inbox className="h-3.5 w-3.5" />
              </div>
              <h2 className="font-display text-sm font-bold text-[var(--text)]">Messages récents</h2>
            </div>
            <Link
              href="/dashboard/messages"
              className="text-xs font-medium text-brand-blue hover:underline"
            >
              Tout voir
            </Link>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {submissions.length === 0 ? (
              <div className="p-8 text-center text-sm text-[var(--text-soft)]">Aucun message.</div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {submissions.map((m, i) => (
                  <Link
                    key={i}
                    href="/dashboard/messages"
                    className="flex items-start gap-3 px-6 py-3 transition-all hover:bg-brand-light/5"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 mt-0.5">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-[var(--text)]">
                          {(m.name as string) || "Anonyme"}
                        </span>
                        {!m.handled && (
                          <span className="relative flex h-2 w-2 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-[var(--text-soft)]">
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-brand-blue font-medium">{m.type === "devis" ? "Devis" : "Contact"}</span>
                        <span>{fmt(m.createdAt as string)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Bottom row: Recent visits + Stats summary */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent visits */}
        <section className="dash-card lg:col-span-3">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-violet-100 text-violet-600">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <h2 className="font-display text-sm font-bold text-[var(--text)]">Dernières visites</h2>
            </div>
            <Link
              href="/dashboard/analytics"
              className="text-xs font-medium text-brand-blue hover:underline"
            >
              Tout voir
            </Link>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {visits.length === 0 ? (
              <div className="p-8 text-center text-sm text-[var(--text-soft)]">Aucune visite enregistrée.</div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {visits.map((v, i) => (
                  <div key={i} className="flex items-start gap-3 px-6 py-3 transition-all hover:bg-brand-light/5">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 text-violet-600 mt-0.5">
                      <Eye className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-[var(--text)]">
                        {(v.path as string) || "/"}
                      </div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-[var(--text-soft)]">
                        {typeof v.ip === "string" && v.ip && <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[10px]">{v.ip}</span>}
                        {typeof v.country === "string" && v.country && <span>{v.country}</span>}
                        <span>{fmt(v.createdAt as string)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Site summary */}
        <section className="dash-card lg:col-span-2">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-amber-600">
              <Star className="h-3.5 w-3.5" />
            </div>
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Résumé du site</h2>
          </div>
          <div className="p-6 space-y-5">
            {[
              { label: "Services", value: totalServices.totalDocs, icon: Cog, max: 20, gradient: "from-cyan-400 to-cyan-600" },
              { label: "Offres d'emploi", value: totalJobs.totalDocs, icon: Briefcase, max: 50, gradient: "from-violet-400 to-violet-600" },
              { label: "Partenaires", value: totalPartners.totalDocs, icon: Handshake, max: 30, gradient: "from-amber-400 to-amber-600" },
              { label: "Actualités", value: totalNews.totalDocs, icon: Newspaper, max: 100, gradient: "from-brand-blue to-brand-light" },
              { label: "Témoignages", value: totalTestimonials.totalDocs, icon: Star, max: 50, gradient: "from-rose-400 to-rose-600" },
              { label: "Messages", value: totalMessages.totalDocs, icon: Inbox, max: 200, gradient: "from-emerald-400 to-emerald-600" },
            ].map((item) => {
              const Icon = item.icon;
              const pct = Math.min((item.value / item.max) * 100, 100);
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-sm`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm font-medium text-[var(--text-soft)]">{item.label}</span>
                    </div>
                    <span className="text-lg font-extrabold text-[var(--text)] tabular-nums">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-soft)] overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-1000 ease-out`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
