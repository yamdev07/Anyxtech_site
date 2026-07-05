import HeroRefined from "@/components/refined/HeroRefined";
import ServicesRefined from "@/components/refined/ServicesRefined";
import MarqueeRefined from "@/components/refined/MarqueeRefined";
import AboutRefined from "@/components/refined/AboutRefined";
import Testimonials from "@/components/home/Testimonials";
import Partners from "@/components/home/Partners";
import CtaRefined from "@/components/refined/CtaRefined";

// Contenu piloté par le CMS (témoignages, partenaires) → rendu à la demande
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main id="main">
      <HeroRefined />
      <ServicesRefined />
      <MarqueeRefined />
      <AboutRefined />
      <Testimonials />
      <Partners />
      <CtaRefined />
    </main>
  );
}
