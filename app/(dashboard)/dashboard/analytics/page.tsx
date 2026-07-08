import { Eye, Globe, Monitor, Clock, TrendingUp, BarChart3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";
export const metadata = { title: "Analytique du site" };

function fmt(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AnalyticsPage() {
  const payload = await getPayloadClient();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalVisits, todayVisits, weekVisits, monthVisits, recentVisits] =
    await Promise.all([
      payload.count({ collection: "visitors" }),
      payload.count({ collection: "visitors", where: { createdAt: { greater_than: todayStart.toISOString() } } }),
      payload.count({ collection: "visitors", where: { createdAt: { greater_than: weekAgo.toISOString() } } }),
      payload.count({ collection: "visitors", where: { createdAt: { greater_than: monthAgo.toISOString() } } }),
      payload.find({ collection: "visitors", sort: "-createdAt", limit: 50, depth: 0 }),
    ]);

  const visits = recentVisits.docs as Record<string, unknown>[];

  const stats = [
    { icon: Eye, label: "Total visites", value: totalVisits.totalDocs, gradient: "from-cyan-400 to-cyan-600", glow: "rgba(34, 211, 238, 0.3)" },
    { icon: TrendingUp, label: "Aujourd'hui", value: todayVisits.totalDocs, gradient: "from-emerald-400 to-emerald-600", glow: "rgba(52, 211, 153, 0.3)" },
    { icon: Globe, label: "Cette semaine", value: weekVisits.totalDocs, gradient: "from-brand-blue to-brand-light", glow: "rgba(29, 185, 255, 0.3)" },
    { icon: Clock, label: "Ce mois", value: monthVisits.totalDocs, gradient: "from-amber-400 to-amber-600", glow: "rgba(251, 191, 36, 0.3)" },
  ];

  const pageCounts: Record<string, number> = {};
  for (const v of visits) {
    const p = (v.path as string) || "/";
    pageCounts[p] = (pageCounts[p] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const maxPageCount = topPages.length > 0 ? topPages[0][1] : 1;

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
                Analytique du site
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Suivi des visiteurs et des pages consultées
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:border-white/40"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="dash-stat group">
              <div className="relative z-10">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-lg`}
                  style={{ boxShadow: `0 8px 20px -4px ${s.glow}` }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-3xl font-extrabold text-[var(--text)] tabular-nums tracking-tight">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-[var(--text-soft)]">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="dash-card lg:col-span-3">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-100 text-cyan-600">
              <Globe className="h-3.5 w-3.5" />
            </div>
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Pages les plus visitées</h2>
          </div>
          <div className="p-6">
            {topPages.length === 0 ? (
              <div className="py-8 text-center text-sm text-[var(--text-soft)]">Aucune donnée pour le moment.</div>
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

        <section className="dash-card lg:col-span-2">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-violet-100 text-violet-600">
              <Monitor className="h-3.5 w-3.5" />
            </div>
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Dernières visites</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="divide-y divide-[var(--border)]">
              {visits.length === 0 ? (
                <div className="p-8 text-center text-sm text-[var(--text-soft)]">Aucune visite enregistrée.</div>
              ) : (
                visits.slice(0, 20).map((v, i) => (
                  <div key={i} className="flex items-start gap-3 px-6 py-3 transition-all hover:bg-brand-light/5">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 text-violet-600 mt-0.5">
                      <Monitor className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-[var(--text)]">{(v.path as string) || "/"}</div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-[var(--text-soft)]">
                        {typeof v.ip === "string" && v.ip && <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[10px]">{v.ip}</span>}
                        {typeof v.country === "string" && v.country && <span>{v.country}</span>}
                        <span>{fmt(v.createdAt as string)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
