import { Eye, Globe, Monitor, Clock, TrendingUp } from "lucide-react";
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
      payload.count({
        collection: "visitors",
        where: { createdAt: { greater_than: todayStart.toISOString() } },
      }),
      payload.count({
        collection: "visitors",
        where: { createdAt: { greater_than: weekAgo.toISOString() } },
      }),
      payload.count({
        collection: "visitors",
        where: { createdAt: { greater_than: monthAgo.toISOString() } },
      }),
      payload.find({
        collection: "visitors",
        sort: "-createdAt",
        limit: 50,
        depth: 0,
      }),
    ]);

  const visits = recentVisits.docs as Record<string, unknown>[];

  const stats = [
    { icon: Eye, label: "Total visites", value: totalVisits.totalDocs, color: "from-sky-500 to-cyan-400" },
    { icon: TrendingUp, label: "Aujourd'hui", value: todayVisits.totalDocs, color: "from-emerald-500 to-teal-400" },
    { icon: Globe, label: "Cette semaine", value: weekVisits.totalDocs, color: "from-indigo-500 to-blue-500" },
    { icon: Clock, label: "Ce mois", value: monthVisits.totalDocs, color: "from-amber-500 to-orange-400" },
  ];

  const pageCounts: Record<string, number> = {};
  for (const v of visits) {
    const p = (v.path as string) || "/";
    pageCounts[p] = (pageCounts[p] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Analytique du site</h1>
        <p className="mt-1 text-soft">Suivi des visiteurs et des pages consultées.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
            >
              <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-display text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-soft">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="font-display text-lg font-bold">Pages les plus visitées</h2>
          <ul className="mt-4 space-y-3">
            {topPages.length === 0 ? (
              <li className="text-sm text-soft">Aucune donnée pour le moment.</li>
            ) : (
              topPages.map(([page, count]) => (
                <li key={page} className="flex items-center justify-between text-sm">
                  <span className="truncate font-medium">{page}</span>
                  <span className="ml-2 shrink-0 rounded-full bg-brand-light/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue dark:text-brand-light">
                    {count}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="font-display text-lg font-bold">Dernières visites</h2>
          <div className="mt-4 max-h-80 overflow-y-auto">
            <ul className="divide-y divide-[var(--border)]">
              {visits.length === 0 ? (
                <li className="py-4 text-center text-sm text-soft">Aucune visite enregistrée.</li>
              ) : (
                visits.slice(0, 20).map((v, i) => (
                  <li key={i} className="flex items-start gap-3 py-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-light/10 text-brand-light">
                      <Monitor className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{(v.path as string) || "/"}</div>
                      <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-soft">
                        {typeof v.ip === "string" && v.ip && <span>{v.ip}</span>}
                        {typeof v.country === "string" && v.country && <span>{v.country}</span>}
                        <span>{fmt(v.createdAt as string)}</span>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
