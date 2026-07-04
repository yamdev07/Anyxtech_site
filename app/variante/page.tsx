import type { Metadata } from "next";
import HeroRefined from "@/components/refined/HeroRefined";
import ServicesRefined from "@/components/refined/ServicesRefined";
import MarqueeRefined from "@/components/refined/MarqueeRefined";
import AboutRefined from "@/components/refined/AboutRefined";
import CtaRefined from "@/components/refined/CtaRefined";

export const metadata: Metadata = {
  title: "Version améliorée — AnyxTech",
  description: "Version améliorée du site AnyxTech, fidèle à son identité d'origine.",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroRefined />
      <ServicesRefined />
      <MarqueeRefined />
      <AboutRefined />
      <CtaRefined />
    </main>
  );
}
