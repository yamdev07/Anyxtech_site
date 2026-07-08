import { Inbox } from "lucide-react";
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
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light text-white shadow-lg shadow-brand-light/20">
            <Inbox className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl text-[var(--text)]">Messages reçus</h1>
            <p className="mt-0.5 text-sm text-[var(--text-soft)]">
              Soumissions des formulaires Contact et Devis.
              {unread.totalDocs > 0 && (
                <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm shadow-red-500/30">
                  {unread.totalDocs} non lu{unread.totalDocs > 1 ? "s" : ""}
                </span>
              )}
            </p>
          </div>
        </div>
      </header>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] backdrop-blur-xl p-12 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-light/10 text-brand-light">
            <Inbox className="h-7 w-7" />
          </div>
          <p className="mt-4 text-sm text-[var(--text-soft)]">Aucun message pour le moment.</p>
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
