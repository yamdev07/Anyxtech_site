import type { Metadata } from "next";
import HeroTech from "@/components/tech/HeroTech";
import ServicesTech from "@/components/tech/ServicesTech";
import CtaTech from "@/components/tech/CtaTech";

export const metadata: Metadata = {
  title: "Maquette tech — Design alternatif",
  description: "Maquette tech immersive (système orbital, animations) pour AnyxTech Bénin.",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroTech />
      <ServicesTech />
      <CtaTech />
    </main>
  );
}
