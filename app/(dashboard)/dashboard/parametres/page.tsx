import { Pencil, Phone, Mail, MapPin, Clock, MessageCircle, Globe } from "lucide-react";
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
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Paramètres du site</h1>
          <p className="mt-1 text-soft">Coordonnées, réseaux sociaux et informations affichées sur le site.</p>
        </div>
        <a href="/admin/globals/site-settings" className="btn-primary text-sm">
          <Pencil className="h-4 w-4" /> Modifier
        </a>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="font-display text-lg font-bold">Coordonnées</h2>
          <ul className="mt-4 space-y-3">
            {coords.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.label} className="flex items-start gap-3 text-sm">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-light/10 text-brand-light">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-soft">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h2 className="font-display text-lg font-bold">Réseaux sociaux</h2>
          <ul className="mt-4 space-y-3">
            {socials.map((c) => (
              <li key={c.label} className="flex items-start gap-3 text-sm">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-light/10 text-brand-light">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-soft">{c.label}</div>
                  <div className="truncate font-medium">{c.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
