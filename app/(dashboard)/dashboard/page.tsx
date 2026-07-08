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
  Eye,
  TrendingUp,
  Users,
  FileText,
  ExternalLink,
  Activity,
} from "lucide-react";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

interface Submission {
  id: string | number;
  name?: string | null;
  email?: string | null;
  type?: string | null;
  handled?: boolean | null;
  createdAt?: string | null;
  message?: string | null;
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

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [services, jobs, partners, news, testimonials, messages, unread, recent, totalVisits, todayVisits, weekVisits] =
    await Promise.all([
      payload.count({ collection: "services" }),
      payload.count({ collection: "jobs" }),
      payload.count({ collection: "partners" }),
      payload.count({ collection: "news" }),
      payload.count({ collection: "testimonials" }),
      payload.count({ collection: "submissions" }),
      payload.count({ collection: "submissions", where: { handled: { not_equals: true } } }),
      payload.find({ collection: "submissions", sort: "-createdAt", limit: 5, depth: 0 }),
      payload.count({ collection: "visitors" }),
      payload.count({ collection: "visitors", where: { createdAt: { greater_than: todayStart.toISOString() } } }),
      payload.count({ collection: "visitors", where: { createdAt: { greater_than: weekAgo.toISOString() } } }),
    ]);
  const recentMsgs = recent.docs as unknown as Submission[];

  const primaryStats = [
    { icon: Eye, label: "Visites totales", value: totalVisits.totalDocs, accent: "text-cyan-400", bg: "bg-cyan-500/10", href: "/dashboard/analytics" },
    { icon: TrendingUp, label: "Aujourd'hui", value: todayVisits.totalDocs, accent: "text-emerald-400", bg: "bg-emerald-500/10", href: "/dashboard/analytics" },
    { icon: Users, label: "Cette semaine", value: weekVisits.totalDocs, accent: "text-indigo-400", bg: "bg-indigo-500/10", href: "/dashboard/analytics" },
  ];

  const contentStats = [
    { icon: Cog, label: "Services", value: services.totalDocs, href: "/dashboard/services", color: "from-sky-500 to-cyan-400" },
    { icon: Briefcase, label: "Offres", value: jobs.totalDocs, href: "/dashboard/offres", color: "from-indigo-500 to-blue-500" },
    { icon: Handshake, label: "Partenaires", value: partners.totalDocs, href: "/dashboard/partenaires", color: "from-emerald-500 to-teal-400" },
    { icon: Newspaper, label: "Actualités", value: news.totalDocs, href: "/dashboard/actualites", color: "from-fuchsia-500 to-pink-500" },
    { icon: Star, label: "Témoignages", value: testimonials.totalDocs, href: "/dashboard/temoignages", color: "from-amber-500 to-orange-400" },
    { icon: Inbox, label: "Messages", value: messages.totalDocs, href: "/dashboard/messages", color: "from-violet-500 to-purple-500", badge: unread.totalDocs },
  ];

  const quickLinks = [
    { icon: FileText, label: "Modifier l'accueil", href: "/admin/globals/home-content", color: "from-brand-blue to-brand-light" },
    { icon: Briefcase, label: "Publier une offre", href: "/admin/collections/jobs/create", color: "from-indigo-500 to-blue-500" },
    { icon: Handshake, label: "Ajouter un partenaire", href: "/admin/collections/partners/create", color: "from-emerald-500 to-teal-400" },
    { icon: ExternalLink, label: "Voir le site", href: "/", color: "from-gray-500 to-gray-400" },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
      <header>
        <h1 className="font-display text-2xl font-bold sm:text-3xl text-[var(--text)]">Vue d&apos;ensemble</h1>
        <p className="mt-1 text-sm text-[var(--text-soft)]">Tableau de bord de votre espace AnyxTech</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {primaryStats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-brand-light/30 hover:shadow-lg hover:shadow-brand-light/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.bg} ${s.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative mt-4">
                <div className="font-display text-3xl font-extrabold text-[var(--text)]">{s.value}</div>
                <div className="mt-1 text-sm text-[var(--text-soft)]">{s.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-[var(--text)]">Contenu du site</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {contentStats.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.label}
                href={s.href}
                className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-brand-light/30 hover:shadow-lg hover:shadow-brand-light/5"
              >
                <div className="flex items-center justify-between">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-md`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {s.badge ? (
                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      {s.badge}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 font-display text-2xl font-extrabold text-[var(--text)]">{s.value}</div>
                <div className="mt-0.5 text-xs text-[var(--text-soft)]">{s.label}</div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-brand-light" />
              <h2 className="font-display text-sm font-bold text-[var(--text)]">Derniers messages</h2>
            </div>
            <Link href="/dashboard/messages" className="text-xs font-semibold text-brand-light hover:text-cyan-300 transition-colors">
              Tout voir
            </Link>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentMsgs.length === 0 ? (
              <div className="p-8 text-center text-sm text-[var(--text-soft)]">Aucun message pour le moment.</div>
            ) : (
              recentMsgs.map((m) => (
                <Link
                  key={m.id}
                  href="/dashboard/messages"
                  className="flex items-start gap-3 px-6 py-4 transition-colors hover:bg-brand-light/5"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-light/10 text-brand-light">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-[var(--text)]">{m.name || "Anonyme"}</span>
                      {!m.handled && <span className="h-2 w-2 shrink-0 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />}
                    </div>
                    <div className="truncate text-xs text-[var(--text-soft)]">
                      {m.type === "devis" ? "Devis" : "Contact"} · {m.email}
                    </div>
                    <div className="mt-1 text-xs text-[var(--text-muted)]">{fmt(m.createdAt)}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <Cog className="h-4 w-4 text-brand-light" />
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Accès rapides</h2>
          </div>
          <div className="p-4 space-y-2">
            {quickLinks.map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.label}
                  href={q.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-soft)] transition-all hover:bg-brand-light/5 hover:text-[var(--text)] group"
                >
                  <div className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${q.color} text-white shadow-md text-xs`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {q.label}
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
