import { Pencil, Phone, Mail, MapPin, Clock, MessageCircle, Globe, Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
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
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
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
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Pencil className="h-4 w-4" /> Modifier
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ArrowLeft className="h-4 w-4" /> Retour
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="dash-card overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-400 text-white">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <h2 className="font-display text-sm font-bold text-white">Coordonnées</h2>
          </div>
          <div className="p-6 space-y-5">
            {coords.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-start gap-4 group">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 text-white shadow-md transition-shadow group-hover:shadow-lg">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{c.label}</div>
                    <div className="text-sm font-medium text-white">{c.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="dash-card overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-400 text-white">
              <Globe className="h-3.5 w-3.5" />
            </div>
            <h2 className="font-display text-sm font-bold text-white">Réseaux sociaux</h2>
          </div>
          <div className="p-6 space-y-5">
            {socials.map((c) => (
              <div key={c.label} className="flex items-start gap-4 group">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-400 text-white shadow-md transition-shadow group-hover:shadow-lg">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{c.label}</div>
                  <div className="truncate text-sm font-medium text-white">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
