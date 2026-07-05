import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Cog,
  Briefcase,
  Handshake,
  Newspaper,
  Star,
  Inbox,
  Settings,
  ArrowUpRight,
  ExternalLink,
  Mail,
  FileText,
} from "lucide-react";
import { getAdminUser } from "@/lib/admin";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tableau de bord",
  robots: { index: false, follow: false },
};

interface Submission {
  id: string | number;
  name?: string | null;
  email?: string | null;
  type?: string | null;
  subject?: string | null;
  handled?: boolean | null;
  createdAt?: string | null;
}

function timeAgo(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin");

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
      payload.find({ collection: "submissions", sort: "-createdAt", limit: 5, depth: 0 }),
    ]);

  const recentMsgs = recent.docs as unknown as Submission[];

  const stats = [
    { icon: Cog, label: "Services", value: services.totalDocs, color: "from-sky-500 to-cyan-400", href: "/admin/collections/services" },
    { icon: Briefcase, label: "Offres d'emploi", value: jobs.totalDocs, color: "from-indigo-500 to-blue-500", href: "/admin/collections/jobs" },
    { icon: Handshake, label: "Partenaires", value: partners.totalDocs, color: "from-emerald-500 to-teal-400", href: "/admin/collections/partners" },
    { icon: Newspaper, label: "Actualités", value: news.totalDocs, color: "from-fuchsia-500 to-pink-500", href: "/admin/collections/news" },
    { icon: Star, label: "Témoignages", value: testimonials.totalDocs, color: "from-amber-500 to-orange-400", href: "/admin/collections/testimonials" },
    { icon: Inbox, label: "Messages", value: messages.totalDocs, color: "from-violet-500 to-purple-500", href: "/admin/collections/submissions", badge: unread.totalDocs },
  ];

  const manage = [
    { icon: Cog, title: "Services", desc: "Modifier les domaines d'expertise affichés sur le site.", href: "/admin/collections/services" },
    { icon: Briefcase, title: "Offres d'emploi", desc: "Publier et gérer les postes de la page Carrières.", href: "/admin/collections/jobs" },
    { icon: Handshake, title: "Partenaires", desc: "Ajouter les partenaires affichés sur l'accueil.", href: "/admin/collections/partners" },
    { icon: Newspaper, title: "Actualités", desc: "Rédiger les articles du blog.", href: "/admin/collections/news" },
    { icon: Star, title: "Témoignages", desc: "Gérer les avis clients.", href: "/admin/collections/testimonials" },
    { icon: Settings, title: "Paramètres du site", desc: "Coordonnées, réseaux sociaux, horaires.", href: "/admin/globals/site-settings" },
  ];

  return (
    <main id="main" className="container-x py-12 md:py-16">
      {/* En-tête */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-brand-light p-8 text-white shadow-brand md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-white/80">
              Espace administration
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Bonjour 👋
            </h1>
            <p className="mt-2 text-white/85">
              Bienvenue sur le tableau de bord AnyxTech. Gérez le contenu de votre site.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue transition-transform hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" /> Voir le site
            </Link>
            <a
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <FileText className="h-4 w-4" /> Éditeur complet
            </a>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.label}
              href={s.href}
              className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                {s.badge ? (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    {s.badge} non lu{s.badge > 1 ? "s" : ""}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 font-display text-3xl font-bold">{s.value}</div>
              <div className="text-sm text-soft">{s.label}</div>
            </a>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Gestion du contenu */}
        <section className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold">Gérer le contenu</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {manage.map((m) => {
              const Icon = m.icon;
              return (
                <a
                  key={m.title}
                  href={m.href}
                  className="group flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-light/10 text-brand-light">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 font-display font-semibold">
                      {m.title}
                      <ArrowUpRight className="h-4 w-4 text-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-light" />
                    </div>
                    <p className="mt-1 text-sm text-soft">{m.desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Derniers messages */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Derniers messages</h2>
            <a href="/admin/collections/submissions" className="text-sm font-semibold text-brand-blue hover:text-brand-light dark:text-brand-light">
              Tout voir
            </a>
          </div>
          <div className="mt-4 space-y-3">
            {recentMsgs.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border)] bg-soft p-6 text-center text-sm text-soft">
                Aucun message pour le moment.
              </div>
            ) : (
              recentMsgs.map((m) => (
                <a
                  key={m.id}
                  href={`/admin/collections/submissions/${m.id}`}
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
                    <div className="mt-0.5 text-xs text-soft">{timeAgo(m.createdAt)}</div>
                  </div>
                </a>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
