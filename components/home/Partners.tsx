import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import AdminEdit from "@/components/admin/AdminEdit";

interface PartnerDoc {
  id: string | number;
  name: string;
  website?: string | null;
  logo?: { url?: string | null; alt?: string | null } | string | null;
}

export default async function Partners() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "partners",
    sort: "order",
    limit: 50,
    depth: 1,
  });
  const partners = docs as unknown as PartnerDoc[];
  if (partners.length === 0) return null;

  return (
    <section className="border-y border-[var(--border)] bg-soft py-14">
      <div className="container-x">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-soft">
          Ils nous font confiance
        </p>
        <div className="mt-3 text-center">
          <AdminEdit href="/dashboard/partenaires" label="Gérer les partenaires" />
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {partners.map((p) => {
            const logoUrl = typeof p.logo === "object" && p.logo ? p.logo.url : null;
            const content = logoUrl ? (
              <Image
                src={logoUrl}
                alt={p.name}
                width={220}
                height={88}
                className="h-16 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-20"
              />
            ) : (
              <span className="font-display text-xl font-bold text-soft transition-colors hover:text-brand-light">
                {p.name}
              </span>
            );
            return p.website ? (
              <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                {content}
              </a>
            ) : (
              <div key={p.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
