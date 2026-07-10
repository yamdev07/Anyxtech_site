import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import AdminEdit from "@/components/admin/AdminEdit";
import CarrieresList from "@/components/CarrieresList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Carrières — Rejoignez AnyxTech",
  description:
    "Découvrez les offres d'emploi d'AnyxTech Bénin et rejoignez une équipe passionnée par le numérique à Cotonou.",
  alternates: { canonical: "/carrieres" },
};

export default async function CarrieresPage() {
  return (
    <main id="main">
      <PageHero
        breadcrumb="Carrières"
        eyebrow="Rejoignez-nous"
        title="Construisons ensemble le numérique de demain"
        subtitle="AnyxTech recrute des talents passionnés au Bénin. Découvrez nos offres et postulez."
      />

      <section className="container-x py-16 md:py-24">
        <div className="mb-8 text-center">
          <AdminEdit href="/dashboard/edit/jobs" label="Gérer les offres" />
        </div>
        <CarrieresList />
      </section>
    </main>
  );
}
