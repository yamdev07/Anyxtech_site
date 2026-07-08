import { Pencil, Phone, Mail, MapPin, Clock, MessageCircle, Globe, Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Paramètres du site" };

export default async function ParametresPage() {
  const s = await getSiteSettings();

  const coords = [
    { icon: Phone, label: "Téléphone", value: s.phone, gradient: "from-brand-blue to-brand-light" },
    { icon: Mail, label: "Email", value: s.email, gradient: "from-cyan-400 to-cyan-600" },
    { icon: MapPin, label: "Adresse", value: s.address, gradient: "from-rose-400 to-rose-600" },
    { icon: Clock, label: "Horaires", value: s.hours, gradient: "from-amber-400 to-amber-600" },
    { icon: MessageCircle, label: "WhatsApp", value: s.whatsapp, gradient: "from-emerald-400 to-emerald-600" },
  ];
  const socials = [
    { label: "Facebook", value: s.socials.facebook, gradient: "from-blue-500 to-blue-700" },
    { label: "Twitter / X", value: s.socials.twitter, gradient: "from-slate-600 to-slate-800" },
    { label: "LinkedIn", value: s.socials.linkedin, gradient: "from-blue-600 to-blue-800" },
    { label: "Instagram", value: s.socials.instagram, gradient: "from-pink-500 to-purple-600" },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
      {/* Hero banner */}
      <div className="dash-hero">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg shadow-black/10">
              <Settings className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl text-white drop-shadow-sm">
                Paramètres du site
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Coordonnées, réseaux sociaux et informations affichées sur le site.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/admin/globals/site-settings"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-blue shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Pencil className="h-4 w-4" /> Modifier
            </a>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:border-white/40"
            >
              <ArrowLeft className="h-4 w-4" /> Retour
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Coordonnées */}
        <section className="dash-card overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-blue to-brand-light text-white">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Coordonnées</h2>
          </div>
          <div className="p-6 space-y-5">
            {coords.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-start gap-4 group">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow-md transition-shadow group-hover:shadow-lg`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{c.label}</div>
                    <div className="text-sm font-medium text-[var(--text)]">{c.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Réseaux sociaux */}
        <section className="dash-card overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 text-white">
              <Globe className="h-3.5 w-3.5" />
            </div>
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Réseaux sociaux</h2>
          </div>
          <div className="p-6 space-y-5">
            {socials.map((c) => {
              const Icon = Globe;
              return (
                <div key={c.label} className="flex items-start gap-4 group">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow-md transition-shadow group-hover:shadow-lg`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{c.label}</div>
                    <div className="truncate text-sm font-medium text-[var(--text)]">{c.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
