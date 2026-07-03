import type { Metadata } from "next";
import HeroDark from "@/components/variant/HeroDark";
import ServicesDark from "@/components/variant/ServicesDark";
import AboutDark from "@/components/variant/AboutDark";
import CtaDark from "@/components/variant/CtaDark";

export const metadata: Metadata = {
  title: "Maquette sombre — Design alternatif",
  description: "Proposition de maquette sombre premium pour AnyxTech Bénin.",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroDark />
      <ServicesDark />
      <AboutDark />
      <CtaDark />
    </main>
  );
}
