import { Eye, Globe, Monitor, Clock, TrendingUp, BarChart3 } from "lucide-react";
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
    { icon: Eye, label: "Total visites", value: totalVisits.totalDocs, accent: "text-cyan-600", bg: "bg-cyan-100" },
    { icon: TrendingUp, label: "Aujourd'hui", value: todayVisits.totalDocs, accent: "text-emerald-600", bg: "bg-emerald-100" },
    { icon: Globe, label: "Cette semaine", value: weekVisits.totalDocs, accent: "text-indigo-600", bg: "bg-indigo-100" },
    { icon: Clock, label: "Ce mois", value: monthVisits.totalDocs, accent: "text-amber-600", bg: "bg-amber-100" },
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
      <header>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-lg shadow-brand-light/20">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl text-[var(--text)]">Analytique du site</h1>
            <p className="mt-0.5 text-sm text-[var(--text-soft)]">Suivi des visiteurs et des pages consultées</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white/70 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.bg} ${s.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-3xl font-extrabold text-[var(--text)]">{s.value}</div>
                <div className="mt-1 text-sm text-[var(--text-soft)]">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-3 rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <Globe className="h-4 w-4 text-brand-blue" />
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
                      <span className="ml-2 shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-brand-blue">
                        {count}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg-soft)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-light transition-all"
                        style={{ width: `${(count / maxPageCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <Monitor className="h-4 w-4 text-brand-blue" />
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Dernières visites</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="divide-y divide-[var(--border)]">
              {visits.length === 0 ? (
                <div className="p-8 text-center text-sm text-[var(--text-soft)]">Aucune visite enregistrée.</div>
              ) : (
                visits.slice(0, 20).map((v, i) => (
                  <div key={i} className="flex items-start gap-3 px-6 py-3 transition-colors hover:bg-blue-50/60">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-100 text-brand-blue mt-0.5">
                      <Monitor className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-[var(--text)]">{(v.path as string) || "/"}</div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-[var(--text-soft)]">
                        {typeof v.ip === "string" && v.ip && <span>{v.ip}</span>}
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
