import { getPayloadClient } from "@/lib/payload";
import Link from "next/link";
import { Plus, Pencil, ArrowLeft, Inbox } from "lucide-react";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const collectionMeta: Record<string, { label: string; titleField: string; subtitleField?: string; gradient: string; icon: React.ReactNode }> = {
  services: { label: "Services", titleField: "title", subtitleField: "short", gradient: "from-indigo-500 to-indigo-400", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  jobs: { label: "Offres d'emploi", titleField: "title", subtitleField: "location", gradient: "from-violet-500 to-violet-400", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg> },
  partners: { label: "Partenaires", titleField: "name", subtitleField: "website", gradient: "from-amber-500 to-amber-400", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> },
  news: { label: "Actualités", titleField: "title", subtitleField: "excerpt", gradient: "from-cyan-500 to-cyan-400", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg> },
  testimonials: { label: "Témoignages", titleField: "author", subtitleField: "company", gradient: "from-rose-500 to-rose-400", icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
};

export default async function EditCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const meta = collectionMeta[collection];
  if (!meta) notFound();

  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: collection as "services", sort: "-createdAt", limit: 200, depth: 0 });
  const items = docs as Record<string, unknown>[];

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-8">
      <div className="dash-hero">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg shadow-black/10`}>
              {meta.icon}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl text-white drop-shadow-sm">{meta.label}</h1>
              <p className="mt-1 text-sm text-white/80">{items.length} élément{items.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/edit/${collection}/create`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Plus className="h-4 w-4" /> Ajouter
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:border-white/40"
            >
              <ArrowLeft className="h-4 w-4" /> Retour
            </Link>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="dash-card p-12 text-center">
          <div className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-lg`}>
            <Inbox className="h-8 w-8" />
          </div>
          <p className="mt-4 text-sm font-medium text-gray-400">Aucun élément pour le moment.</p>
          <Link
            href={`/dashboard/edit/${collection}/create`}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Plus className="h-4 w-4" /> Ajouter le premier
          </Link>
        </div>
      ) : (
        <div className="dash-card overflow-hidden">
          <ul className="divide-y divide-white/10">
            {items.map((item) => (
              <li key={String(item.id)} className="flex flex-wrap items-center gap-4 px-6 py-4 transition-all hover:bg-white/5">
                <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${meta.gradient} text-white shadow-md`}>
                  {meta.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block truncate font-display font-semibold text-white">
                    {String(item[meta.titleField] || "Sans titre")}
                  </span>
                  {meta.subtitleField && item[meta.subtitleField] && (
                    <p className="mt-0.5 line-clamp-1 text-sm text-gray-400">{String(item[meta.subtitleField])}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/dashboard/edit/${collection}/${item.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-400 transition-all hover:border-indigo-400/40 hover:text-indigo-400 hover:bg-white/10"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Modifier
                  </Link>
                  <DeleteButton collection={collection as "services"} id={String(item.id)} path={`/dashboard/edit/${collection}`} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
