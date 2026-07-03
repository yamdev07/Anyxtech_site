import type { Metadata } from "next";
import HeroV2 from "@/components/v2/HeroV2";
import ServicesV2 from "@/components/v2/ServicesV2";
import AboutV2 from "@/components/v2/AboutV2";
import CtaV2 from "@/components/v2/CtaV2";

export const metadata: Metadata = {
  title: "Variante de design — Design 2",
  description:
    "Deuxième proposition de maquette pour le site AnyxTech Bénin (même charte, style éditorial clair).",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroV2 />
      <ServicesV2 />
      <AboutV2 />
      <CtaV2 />
    </main>
  );
}
