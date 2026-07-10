import type { Metadata } from "next";
import Image from "next/image";
import { Handshake } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import AdminEdit from "@/components/admin/AdminEdit";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nos partenaires — AnyxTech",
  description:
    "Découvrez les entreprises et organisations qui font confiance à AnyxTech au Bénin et en Afrique de l'Ouest.",
  alternates: { canonical: "/partenaires" },
};

interface PartnerDoc {
  id: string | number;
  name: string;
  website?: string | null;
  description?: string | null;
  logo?: { url?: string | null } | string | null;
}

export default async function PartenairesPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "partners",
    sort: "order",
    limit: 100,
    depth: 1,
  });
  const partners = docs as unknown as PartnerDoc[];

  return (
    <main id="main">
      <PageHero
        breadcrumb="Partenaires"
        eyebrow="Ils nous font confiance"
        title="Nos partenaires"
        subtitle="Les entreprises et organisations qui grandissent avec nous, au Bénin et en Afrique de l'Ouest."
      />

      <section className="container-x py-16 md:py-24">
        <div className="mb-8 text-center">
          <AdminEdit href="/dashboard/partenaires" label="Gérer les partenaires" />
        </div>

        {partners.length === 0 ? (
          <Reveal className="mx-auto max-w-xl rounded-3xl border border-[var(--border)] bg-soft p-10 text-center">
            <Handshake className="mx-auto h-10 w-10 text-brand-light" />
            <h2 className="mt-4 font-display text-2xl font-bold">Aucun partenaire pour le moment</h2>
            <p className="mt-3 text-soft">
              Nos partenariats seront bientôt affichés ici.
            </p>
          </Reveal>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p, i) => {
              const logoUrl = typeof p.logo === "object" && p.logo ? p.logo.url : null;
              const card = (
                <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 text-center transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card">
                  <div className="grid h-16 w-full place-items-center">
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={p.name}
                        width={160}
                        height={64}
                        className="h-14 w-auto object-contain"
                      />
                    ) : (
                      <span className="font-display text-xl font-bold text-brand-blue dark:text-brand-light">
                        {p.name}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  {p.description && (
                    <p className="line-clamp-3 text-sm text-soft">{p.description}</p>
                  )}
                </div>
              );

              return (
                <Reveal key={p.id} delay={i % 6}>
                  {p.website ? (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={p.name}
                      className="block h-full"
                    >
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
