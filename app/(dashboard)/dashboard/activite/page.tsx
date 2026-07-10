import { Eye, Globe, Monitor, Clock, ArrowLeft, User, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";
export const metadata = { title: "Activité des visiteurs" };

function fmt(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "à l'instant";
  if (mins < 60) return `il y a ${mins}min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days}j`;
}

function parseUA(ua?: string | null): { browser: string; os: string } {
  if (!ua) return { browser: "Inconnu", os: "Inconnu" };
  let browser = "Autre";
  if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";

  let os = "Autre";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  return { browser, os };
}

export default async function ActivitePage() {
  const payload = await getPayloadClient();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [totalToday, totalWeek, visits] = await Promise.all([
    payload.count({ collection: "visitors", where: { createdAt: { greater_than: todayStart.toISOString() } } }),
    payload.count({ collection: "visitors", where: { createdAt: { greater_than: weekAgo.toISOString() } } }),
    payload.find({ collection: "visitors", sort: "-createdAt", limit: 100, depth: 0 }),
  ]);

  const all = visits.docs as Record<string, unknown>[];

  const uniqueIps = new Set(all.map((v) => v.ip).filter(Boolean));

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
      <div className="dash-hero">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg shadow-black/10">
              <Eye className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl text-white drop-shadow-sm">
                Activité des visiteurs
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Journal complet des visites sur votre site
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: Eye, label: "Aujourd'hui", value: totalToday.totalDocs },
          { icon: Clock, label: "Cette semaine", value: totalWeek.totalDocs },
          { icon: Globe, label: "Total visites", value: all.length > 0 ? all.length : 0 },
          { icon: User, label: "Visiteurs uniques", value: uniqueIps.size },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="dash-stat">
              <div className="relative z-10">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 text-white shadow-lg shadow-indigo-500/30">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-3xl font-extrabold text-white tabular-nums tracking-tight">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-gray-400">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity log */}
      <section className="dash-card overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-400 text-white">
            <Eye className="h-3.5 w-3.5" />
          </div>
          <h2 className="font-display text-sm font-bold text-white">Journal des visites</h2>
          <span className="ml-auto text-xs text-gray-500">{all.length} entrées</span>
        </div>

        {all.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400">
            Aucune visite enregistrée pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3">Heure</th>
                  <th className="px-6 py-3">Page</th>
                  <th className="px-6 py-3">IP</th>
                  <th className="px-6 py-3">Pays</th>
                  <th className="px-6 py-3">Navigateur</th>
                  <th className="px-6 py-3">Système</th>
                  <th className="px-6 py-3">Référent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {all.map((v, i) => {
                  const ua = parseUA(v.userAgent as string);
                  return (
                    <tr key={i} className="transition-colors hover:bg-white/[0.02]">
                      <td className="px-6 py-3 whitespace-nowrap">
                        <div className="text-white font-medium">{fmt(v.createdAt as string)}</div>
                        <div className="text-xs text-gray-500">{timeAgo(v.createdAt as string)}</div>
                      </td>
                      <td className="px-6 py-3">
                        <Link
                          href={`/${(v.path as string)?.replace(/^\//, "") || ""}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        >
                          {v.path || "/"}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        {v.ip ? (
                          <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-xs text-gray-300">{v.ip as string}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-gray-300">
                        {v.country ? (
                          <span className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-gray-500" />
                            {v.country as string}
                          </span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium text-gray-300">
                          <Monitor className="h-3 w-3 text-gray-500" />
                          {ua.browser}
                        </span>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-400">
                        {ua.os}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-500 max-w-[150px] truncate">
                        {v.referrer ? (
                          <span title={v.referrer as string}>{(v.referrer as string).replace(/^https?:\/\//, "").split("/")[0]}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
