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
    <div className="p-5 md:p-8 lg:p-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Messages reçus</h1>
          <p className="mt-1 text-soft">
            Soumissions des formulaires Contact et Devis.
            {unread.totalDocs > 0 && (
              <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                {unread.totalDocs} non lu{unread.totalDocs > 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
      </header>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <Inbox className="mx-auto h-10 w-10 text-brand-light" />
          <p className="mt-3 text-soft">Aucun message pour le moment.</p>
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
