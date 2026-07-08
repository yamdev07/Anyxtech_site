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
      accent: "from-cyan-500/15 to-cyan-500/5",
      iconBg: "bg-cyan-100 text-cyan-600",
      href: "/dashboard/analytics",
    },
    {
      icon: TrendingUp,
      label: "Cette semaine",
      value: weekVisits.totalDocs,
      delta: "7 derniers jours",
      deltaType: "up" as const,
      accent: "from-emerald-500/15 to-emerald-500/5",
      iconBg: "bg-emerald-100 text-emerald-600",
      href: "/dashboard/analytics",
    },
    {
      icon: Briefcase,
      label: "Offres d'emploi",
      value: totalJobs.totalDocs,
      delta: "publiées",
      deltaType: "up" as const,
      accent: "from-violet-500/15 to-violet-500/5",
      iconBg: "bg-violet-100 text-violet-600",
      href: "/dashboard/offres",
    },
    {
      icon: Handshake,
      label: "Partenaires",
      value: totalPartners.totalDocs,
      delta: "actifs",
      deltaType: "up" as const,
      accent: "from-amber-500/15 to-amber-500/5",
      iconBg: "bg-amber-100 text-amber-600",
      href: "/dashboard/partenaires",
    },
    {
      icon: Newspaper,
      label: "Actualités",
      value: totalNews.totalDocs,
      delta: "articles",
      deltaType: "up" as const,
      accent: "from-brand-light/15 to-brand-light/5",
      iconBg: "bg-blue-100 text-brand-blue",
      href: "/dashboard/actualites",
    },
    {
      icon: Inbox,
      label: "Messages",
      value: totalMessages.totalDocs,
      delta: unreadMessages.totalDocs > 0 ? `${unreadMessages.totalDocs} non lus` : "tous lus",
      deltaType: unreadMessages.totalDocs > 0 ? "down" as const : "up" as const,
      accent: "from-rose-500/15 to-rose-500/5",
      iconBg: "bg-rose-100 text-rose-600",
      href: "/dashboard/messages",
    },
  ];

  const quickActions = [
    { label: "Nouvelle offre", href: "/admin/collections/jobs/create", icon: Briefcase, color: "from-violet-500 to-violet-600" },
    { label: "Nouveau partenaire", href: "/admin/collections/partners/create", icon: Handshake, color: "from-amber-500 to-amber-600" },
    { label: "Nouvel article", href: "/admin/collections/news/create", icon: Newspaper, color: "from-brand-blue to-brand-light" },
    { label: "Contenu accueil", href: "/admin/globals/home-content", icon: FileText, color: "from-cyan-500 to-cyan-600" },
    { label: "Paramètres", href: "/admin/globals/site-settings", icon: Settings, color: "from-slate-400 to-slate-500" },
    { label: "Voir le site", href: "/", icon: ExternalLink, color: "from-emerald-500 to-emerald-600", external: true },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
      {/* Welcome header */}
      <header className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-light/10 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-brand-cyan/8 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-lg shadow-brand-light/25">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl text-[var(--text)]">
                Vue d&apos;ensemble
              </h1>
              <p className="mt-0.5 text-sm text-[var(--text-soft)]">
                Tableau de bord de votre site AnyxTech
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/analytics"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/70 px-4 py-2.5 text-sm font-medium text-[var(--text-soft)] transition-all hover:border-blue-300 hover:text-brand-blue"
            >
              <BarChart3 className="h-4 w-4" /> Analytique
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-light px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-light/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-light/40"
            >
              <ExternalLink className="h-4 w-4" /> Voir le site
            </Link>
          </div>
        </div>
      </header>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(29,185,255,0.15), transparent 50%)",
                  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl ${s.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div className="mt-4 font-display text-3xl font-extrabold text-[var(--text)] tabular-nums">
                  {s.value.toLocaleString("fr-FR")}
                </div>
                <div className="mt-1 text-sm text-[var(--text-soft)]">{s.label}</div>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
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
          <Plus className="h-4 w-4 text-brand-light" />
          <h2 className="font-display text-sm font-bold text-[var(--text)]">Actions rapides</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                href={a.href}
                {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/70 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-[var(--text-soft)] transition-all duration-300 hover:border-blue-300 hover:text-[var(--text)] hover:shadow-md hover:shadow-blue-100 hover:-translate-y-0.5"
              >
                <div className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br ${a.color} text-white shadow-md`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                {a.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Two-column: Top pages + Recent messages */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Top pages */}
        <section className="lg:col-span-3 rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-brand-blue" />
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
                      <span className="ml-2 shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-brand-blue tabular-nums">
                        {count}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg-soft)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-light transition-all duration-500"
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
        <section className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Inbox className="h-4 w-4 text-brand-blue" />
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
                    className="flex items-start gap-3 px-6 py-3 transition-colors hover:bg-blue-50/60"
                  >
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-100 text-brand-blue mt-0.5">
                      <Users className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-[var(--text)]">
                          {(m.name as string) || "Anonyme"}
                        </span>
                        {!m.handled && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-[var(--text-soft)]">
                        <span>{m.type === "devis" ? "Devis" : "Contact"}</span>
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
        <section className="lg:col-span-3 rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-blue" />
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
                  <div key={i} className="flex items-start gap-3 px-6 py-3 transition-colors hover:bg-brand-light/5">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-100 text-brand-blue mt-0.5">
                      <Eye className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-[var(--text)]">
                        {(v.path as string) || "/"}
                      </div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-[var(--text-soft)]">
                        {typeof v.ip === "string" && v.ip && <span>{v.ip}</span>}
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
        <section className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <Star className="h-4 w-4 text-brand-blue" />
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Résumé du site</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: "Services", value: totalServices.totalDocs, icon: Cog, max: 20 },
              { label: "Offres d'emploi", value: totalJobs.totalDocs, icon: Briefcase, max: 50 },
              { label: "Partenaires", value: totalPartners.totalDocs, icon: Handshake, max: 30 },
              { label: "Actualités", value: totalNews.totalDocs, icon: Newspaper, max: 100 },
              { label: "Témoignages", value: totalTestimonials.totalDocs, icon: Star, max: 50 },
              { label: "Messages", value: totalMessages.totalDocs, icon: Inbox, max: 200 },
            ].map((item) => {
              const Icon = item.icon;
              const pct = Math.min((item.value / item.max) * 100, 100);
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                      <span className="text-sm text-[var(--text-soft)]">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-[var(--text)] tabular-nums">{item.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--bg-soft)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-light transition-all duration-700"
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
