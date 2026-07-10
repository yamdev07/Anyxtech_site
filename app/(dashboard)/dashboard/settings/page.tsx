import { Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import SettingsEditor from "@/components/dashboard/SettingsEditor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Paramètres du site" };

export default async function SettingsPage() {
  const payload = await getPayloadClient();
  const data = await payload.findGlobal({ slug: "site-settings" });

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
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:border-white/40"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
        </div>
      </div>

      <SettingsEditor initial={data as unknown as Record<string, unknown>} />
    </div>
  );
}
