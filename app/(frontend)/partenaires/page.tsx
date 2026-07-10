import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, ArrowRight, Globe } from "lucide-react";
import { getPayloadClient } from "@/lib/payload";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import AdminEdit from "@/components/admin/AdminEdit";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partenaires — AnyxTech Bénin",
  description:
    "Découvrez les partenaires d'AnyxTech Bénin qui nous font confiance pour leurs solutions digitales à Cotonou.",
  alternates: { canonical: "/partenaires" },
};

interface PartnerDoc {
  id: string | number;
  name: string;
  website?: string | null;
  description?: string | null;
}

export default async function PartenairesPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "partners",
    where: { showOnSite: { not_equals: false } },
    sort: "order",
    limit: 50,
    depth: 0,
  });
  const partners = docs as unknown as PartnerDoc[];

  return (
    <main id="main">
      <PageHero
        breadcrumb="Partenaires"
        eyebrow="Ils nous font confiance"
        title="Nos partenaires de confiance"
        subtitle="AnyxTech collabore avec des entreprises et organisations de premier plan au Bénin et en Afrique de l'Ouest."
      />

      <section className="container-x py-16 md:py-24">
        <div className="mb-8 text-center">
          <AdminEdit href="/dashboard/edit/partners" label="Gérer les partenaires" />
        </div>
        {partners.length === 0 ? (
          <Reveal className="mx-auto max-w-xl rounded-3xl border border-[var(--border)] bg-soft p-10 text-center">
            <Handshake className="mx-auto h-10 w-10 text-brand-light" />
            <h2 className="mt-4 font-display text-2xl font-bold">Aucun partenaire pour le moment</h2>
            <p className="mt-3 text-soft">
              Nous collaborons avec de nombreuses entreprises. Revenez bientôt pour découvrir nos partenaires.
            </p>
          </Reveal>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, i) => (
              <Reveal key={partner.id} delay={i % 4}>
                {partner.website ? (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light/10 text-brand-light">
                        <Handshake className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-bold">{partner.name}</h3>
                        {partner.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-soft">{partner.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-all group-hover:gap-2.5 dark:text-brand-light">
                      <Globe className="h-4 w-4" /> {partner.website}
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </div>
                  </a>
                ) : (
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:-translate-y-1 hover:border-brand-light/50 hover:shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light/10 text-brand-light">
                        <Handshake className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-lg font-bold">{partner.name}</h3>
                        {partner.description && (
                          <p className="mt-1 line-clamp-2 text-sm text-soft">{partner.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
