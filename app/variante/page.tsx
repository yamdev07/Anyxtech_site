import type { Metadata } from "next";
import HeroBrutal from "@/components/brutal/HeroBrutal";
import ServicesBrutal from "@/components/brutal/ServicesBrutal";
import CtaBrutal from "@/components/brutal/CtaBrutal";

export const metadata: Metadata = {
  title: "Maquette brutaliste — Design alternatif",
  description: "Proposition de maquette néo-brutaliste pour AnyxTech Bénin.",
  robots: { index: false, follow: false },
};

export default function VariantePage() {
  return (
    <main id="main">
      <HeroBrutal />
      <ServicesBrutal />
      <CtaBrutal />
    </main>
  );
}
