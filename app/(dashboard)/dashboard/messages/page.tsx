import { Inbox, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import MessageItem, { type Message } from "@/components/dashboard/MessageItem";

export const dynamic = "force-dynamic";
export const metadata = { title: "Messages reçus" };

export default async function MessagesPage() {
  const payload = await getPayloadClient();
  const [{ docs }, unread] = await Promise.all([
    payload.find({ collection: "submissions", sort: "-createdAt", limit: 200, depth: 0 }),
    payload.count({ collection: "submissions", where: { handled: { not_equals: true } } }),
  ]);
  const messages = docs.map((d) => ({ ...(d as unknown as Message), id: String((d as { id: unknown }).id) }));

  return (
    <div className="p-5 md:p-8 lg:p-10 space-y-6">
      {/* Hero banner */}
      <div className="dash-hero">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-lg shadow-black/10">
              <Inbox className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl text-white drop-shadow-sm">
                Messages reçus
              </h1>
              <p className="mt-1 text-sm text-white/80">
                Soumissions des formulaires Contact et Devis.
                {unread.totalDocs > 0 && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                    {unread.totalDocs} non lu{unread.totalDocs > 1 ? "s" : ""}
                  </span>
                )}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="dash-card p-12 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-400/10 text-indigo-400">
            <Inbox className="h-8 w-8" />
          </div>
          <p className="mt-4 text-sm font-medium text-gray-400">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((m) => (
            <MessageItem key={m.id} m={m} />
          ))}
        </div>
      )}
    </div>
  );
}
