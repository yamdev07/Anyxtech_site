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
  const [services, jobs, partners, news, testimonials, messages, unread, recent] =
    await Promise.all([
      payload.count({ collection: "services" }),
      payload.count({ collection: "jobs" }),
      payload.count({ collection: "partners" }),
      payload.count({ collection: "news" }),
      payload.count({ collection: "testimonials" }),
      payload.count({ collection: "submissions" }),
      payload.count({ collection: "submissions", where: { handled: { not_equals: true } } }),
      payload.find({ collection: "submissions", sort: "-createdAt", limit: 6, depth: 0 }),
    ]);
  const recentMsgs = recent.docs as unknown as Submission[];

  const stats = [
    { icon: Cog, label: "Services", value: services.totalDocs, color: "from-sky-500 to-cyan-400", href: "/dashboard/services" },
    { icon: Briefcase, label: "Offres", value: jobs.totalDocs, color: "from-indigo-500 to-blue-500", href: "/dashboard/offres" },
    { icon: Handshake, label: "Partenaires", value: partners.totalDocs, color: "from-emerald-500 to-teal-400", href: "/dashboard/partenaires" },
    { icon: Newspaper, label: "Actualités", value: news.totalDocs, color: "from-fuchsia-500 to-pink-500", href: "/dashboard/actualites" },
    { icon: Star, label: "Témoignages", value: testimonials.totalDocs, color: "from-amber-500 to-orange-400", href: "/dashboard/temoignages" },
    { icon: Inbox, label: "Messages", value: messages.totalDocs, color: "from-violet-500 to-purple-500", href: "/dashboard/messages", badge: unread.totalDocs },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Vue d&apos;ensemble</h1>
        <p className="mt-1 text-soft">Bienvenue sur votre espace de gestion AnyxTech 👋</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                {s.badge ? (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white">
                    {s.badge}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 font-display text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-soft">{s.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Derniers messages */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Derniers messages</h2>
          <Link href="/dashboard/messages" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-light dark:text-brand-light">
            Tout voir <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {recentMsgs.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center text-sm text-soft sm:col-span-2">
              Aucun message pour le moment.
            </div>
          ) : (
            recentMsgs.map((m) => (
              <Link
                key={m.id}
                href="/dashboard/messages"
                className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all hover:border-brand-light/50"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-light/10 text-brand-light">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{m.name || "Anonyme"}</span>
                    {!m.handled && <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />}
                  </div>
                  <div className="truncate text-xs text-soft">
                    {m.type === "devis" ? "Devis" : "Contact"} · {m.email}
                  </div>
                  <div className="mt-0.5 text-xs text-soft">{fmt(m.createdAt)}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
