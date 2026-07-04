import type { Metadata } from "next";
import HeroAgency from "@/components/agency/HeroAgency";
import ServicesAgency from "@/components/agency/ServicesAgency";
import StatsAgency from "@/components/agency/StatsAgency";
import AboutAgency from "@/components/agency/AboutAgency";
import CtaAgency from "@/components/agency/CtaAgency";

export const metadata: Metadata = {
  title: "Maquette agence — Design alternatif",
  description: "Proposition de maquette style agence digitale pour AnyxTech Bénin.",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroAgency />
      <ServicesAgency />
      <StatsAgency />
      <AboutAgency />
      <CtaAgency />
    </main>
  );
}
