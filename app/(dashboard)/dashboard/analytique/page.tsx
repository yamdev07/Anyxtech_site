import { getAnalyticsSummary } from "@/lib/analytics";
import TrafficChart from "@/components/dashboard/TrafficChart";

export const dynamic = "force-dynamic";
export const metadata = { title: "Analytique" };

function fmtTime(d?: string | null) {
  if (!d) return "";
  const diffMin = Math.max(0, Math.round((Date.now() - new Date(d).getTime()) / 60000));
  return diffMin <= 0 ? "à l'instant" : `il y a ${diffMin} min`;
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsSummary(30);

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Analytique</h1>
          <p className="mt-1 text-soft">Suivi en temps réel des visiteurs de votre site.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {data.onlineNow} visiteur{data.onlineNow > 1 ? "s" : ""} en ligne
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="font-display text-2xl font-bold">{data.totalVisits}</div>
          <div className="text-sm text-soft">Visites (30 jours)</div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="font-display text-2xl font-bold">{data.topPages.length}</div>
          <div className="text-sm text-soft">Pages suivies</div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="font-display text-2xl font-bold">{data.deviceBreakdown.mobile}%</div>
          <div className="text-sm text-soft">Trafic mobile</div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="font-display text-2xl font-bold">{data.onlineNow}</div>
          <div className="text-sm text-soft">En ligne (5 min)</div>
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="mb-4 font-display text-lg font-bold">Visiteurs par jour</h2>
        <TrafficChart data={data.dailySeries} />
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Pages populaires</h2>
          {data.topPages.length === 0 ? (
            <p className="text-sm text-soft">Aucune donnée pour le moment.</p>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {data.topPages.map((p) => (
                <div key={p.path} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-brand-blue dark:text-brand-light">{p.path}</span>
                  <span className="text-soft">{p.count} vues</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Répartition par appareil</h2>
          {(["mobile", "desktop", "tablette"] as const).map((k) => (
            <div key={k} className="mb-3 flex items-center gap-3 text-sm">
              <span className="w-16 shrink-0 capitalize">{k}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-light"
                  style={{ width: `${data.deviceBreakdown[k]}%` }}
                />
              </div>
              <span className="w-9 shrink-0 text-right text-soft">{data.deviceBreakdown[k]}%</span>
            </div>
          ))}

          <h2 className="mb-3 mt-6 font-display text-lg font-bold">Visiteurs en ligne</h2>
          {data.recentOnline.length === 0 ? (
            <p className="text-sm text-soft">Personne en ce moment.</p>
          ) : (
            <div className="space-y-2.5">
              {data.recentOnline.map((v, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{v.path}</span>
                  <span className="text-soft">{fmtTime(v.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
