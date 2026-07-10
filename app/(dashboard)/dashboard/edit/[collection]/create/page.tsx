import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EditForm from "@/components/dashboard/EditForm";

export const dynamic = "force-dynamic";

const titles: Record<string, string> = {
  services: "Nouveau service",
  jobs: "Nouvelle offre",
  partners: "Nouveau partenaire",
  news: "Nouvel article",
  testimonials: "Nouveau témoignage",
};

export default async function CreateItemPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const title = titles[collection] || "Nouvel élément";

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
      <div className="dash-hero">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl text-white drop-shadow-sm">{title}</h1>
            <p className="mt-1 text-sm text-white/80">Créer un nouvel élément</p>
          </div>
          <Link
            href={`/dashboard/edit/${collection}`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:bg-white/30 hover:border-white/50"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à la liste
          </Link>
        </div>
      </div>

      <EditForm collection={collection} id={null} />
    </div>
  );
}
