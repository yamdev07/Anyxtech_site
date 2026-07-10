import { getPayloadClient } from "./payload";

interface VisitDoc {
  id: string | number;
  path?: string | null;
  device?: string | null;
  createdAt?: string | null;
}

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function getAnalyticsSummary(days = 30) {
  const payload = await getPayloadClient();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { docs, totalDocs } = await payload.find({
    collection: "visits",
    where: { createdAt: { greater_than: since.toISOString() } },
    sort: "-createdAt",
    limit: 5000,
    depth: 0,
  });
  const visits = docs as unknown as VisitDoc[];

  // Série quotidienne (visites par jour)
  const buckets = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    buckets.set(dayKey(d), 0);
  }
  for (const v of visits) {
    if (!v.createdAt) continue;
    const key = dayKey(new Date(v.createdAt));
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) || 0) + 1);
  }
  const dailySeries = Array.from(buckets.entries()).map(([date, count]) => ({ date, count }));

  // Répartition par appareil
  const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0, tablette: 0 };
  for (const v of visits) {
    const key = (v.device as string) || "desktop";
    deviceCounts[key] = (deviceCounts[key] || 0) + 1;
  }
  const totalForDevices = Math.max(1, visits.length);
  const deviceBreakdown = {
    mobile: Math.round((deviceCounts.mobile / totalForDevices) * 100),
    desktop: Math.round((deviceCounts.desktop / totalForDevices) * 100),
    tablette: Math.round((deviceCounts.tablette / totalForDevices) * 100),
  };

  // Pages les plus visitées
  const pageCounts = new Map<string, number>();
  for (const v of visits) {
    const p = v.path || "/";
    pageCounts.set(p, (pageCounts.get(p) || 0) + 1);
  }
  const topPages = Array.from(pageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, count]) => ({ path, count }));

  // Visiteurs "en ligne" : visites enregistrées dans les 5 dernières minutes
  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  const onlineVisits = visits.filter(
    (v) => v.createdAt && new Date(v.createdAt).getTime() > fiveMinAgo
  );

  return {
    totalVisits: totalDocs,
    dailySeries,
    deviceBreakdown,
    topPages,
    onlineNow: onlineVisits.length,
    recentOnline: onlineVisits.slice(0, 6).map((v) => ({
      path: v.path || "/",
      createdAt: v.createdAt || null,
    })),
  };
}
