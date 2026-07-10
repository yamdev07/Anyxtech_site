import { Eye, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import ActiviteList from "@/components/dashboard/ActiviteList";

export const dynamic = "force-dynamic";
export const metadata = { title: "Activité des visiteurs" };

export default async function ActivitePage() {
  const payload = await getPayloadClient();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [totalToday, totalWeek] = await Promise.all([
    payload.count({ collection: "visitors", where: { createdAt: { greater_than: todayStart.toISOString() } } }),
    payload.count({ collection: "visitors", where: { createdAt: { greater_than: weekAgo.toISOString() } } }),
  ]);

  const stats = [
    { icon: Eye, label: "Aujourd'hui", value: totalToday.totalDocs },
    { icon: Clock, label: "Cette semaine", value: totalWeek.totalDocs },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
      <div className="dash-hero">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg shadow-black/10">
              <Eye className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl text-white drop-shadow-sm">Activité des visiteurs</h1>
              <p className="mt-1 text-sm text-white/80">Journal complet des visites sur votre site</p>
            </div>
          </div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((s) => {
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

      <section className="dash-card overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-400 text-white">
            <Eye className="h-3.5 w-3.5" />
          </div>
          <h2 className="font-display text-sm font-bold text-white">Journal des visites</h2>
        </div>
        <ActiviteList />
      </section>
    </div>
  );
}
