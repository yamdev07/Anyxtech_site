import type { Metadata } from "next";
import { Handshake } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdminEdit from "@/components/admin/AdminEdit";
import PartenairesList from "@/components/PartenairesList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partenaires — AnyxTech Bénin",
  description:
    "Découvrez les partenaires d'AnyxTech Bénin qui nous font confiance pour leurs solutions digitales à Cotonou.",
  alternates: { canonical: "/partenaires" },
};

export default async function PartenairesPage() {
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
        <PartenairesList />
      </section>
    </main>
  );
}
