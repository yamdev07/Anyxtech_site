import { Pencil, Phone, Mail, MapPin, Clock, MessageCircle, Globe, Settings } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Paramètres du site" };

export default async function ParametresPage() {
  const s = await getSiteSettings();

  const coords = [
    { icon: Phone, label: "Téléphone", value: s.phone },
    { icon: Mail, label: "Email", value: s.email },
    { icon: MapPin, label: "Adresse", value: s.address },
    { icon: Clock, label: "Horaires", value: s.hours },
    { icon: MessageCircle, label: "WhatsApp", value: s.whatsapp },
  ];
  const socials = [
    { label: "Facebook", value: s.socials.facebook },
    { label: "Twitter / X", value: s.socials.twitter },
    { label: "LinkedIn", value: s.socials.linkedin },
    { label: "Instagram", value: s.socials.instagram },
  ];

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-lg shadow-brand-blue/20">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl text-[var(--text)]">Paramètres du site</h1>
            <p className="mt-0.5 text-sm text-[var(--text-soft)]">Coordonnées, réseaux sociaux et informations affichées sur le site.</p>
          </div>
        </div>
        <a
          href="/admin/globals/site-settings"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-light px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-blue/30"
        >
          <Pencil className="h-4 w-4" /> Modifier
        </a>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <Phone className="h-4 w-4 text-brand-blue" />
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Coordonnées</h2>
          </div>
          <div className="p-6 space-y-4">
            {coords.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-100 text-brand-blue">
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

        <section className="rounded-2xl border border-[var(--border)] bg-white/70 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <Globe className="h-4 w-4 text-brand-blue" />
            <h2 className="font-display text-sm font-bold text-[var(--text)]">Réseaux sociaux</h2>
          </div>
          <div className="p-6 space-y-4">
            {socials.map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-100 text-brand-blue">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{c.label}</div>
                  <div className="truncate text-sm font-medium text-[var(--text)]">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
