import type { Metadata } from "next";
import HeroGlass from "@/components/glass/HeroGlass";
import ServicesGlass from "@/components/glass/ServicesGlass";
import CtaGlass from "@/components/glass/CtaGlass";

export const metadata: Metadata = {
  title: "Maquette verre — Design alternatif",
  description: "Proposition de maquette glassmorphism / dégradés mesh pour AnyxTech Bénin.",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroGlass />
      <ServicesGlass />
      <CtaGlass />
    </main>
  );
}
