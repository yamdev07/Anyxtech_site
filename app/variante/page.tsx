import type { Metadata } from "next";
import HeroEditorial from "@/components/editorial/HeroEditorial";
import ServicesEditorial from "@/components/editorial/ServicesEditorial";
import CtaEditorial from "@/components/editorial/CtaEditorial";

export const metadata: Metadata = {
  title: "Maquette éditoriale — Design alternatif",
  description: "Proposition de maquette éditoriale (typographie XXL) pour AnyxTech Bénin.",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroEditorial />
      <ServicesEditorial />
      <CtaEditorial />
    </main>
  );
}
