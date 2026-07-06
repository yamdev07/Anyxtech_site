import HeroRefined from "@/components/refined/HeroRefined";
import ServicesRefined from "@/components/refined/ServicesRefined";
import MarqueeRefined from "@/components/refined/MarqueeRefined";
import AboutRefined from "@/components/refined/AboutRefined";
import Testimonials from "@/components/home/Testimonials";
import Partners from "@/components/home/Partners";
import CtaRefined from "@/components/refined/CtaRefined";
import { getHomeContent } from "@/lib/home-content";

// Contenu piloté par le CMS → rendu à la demande
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getHomeContent();
  return (
    <main id="main">
      <HeroRefined hero={content.hero} />
      <ServicesRefined />
      <MarqueeRefined items={content.marquee} />
      <AboutRefined about={content.about} />
      <Testimonials />
      <Partners />
      <CtaRefined title={content.cta.title} subtitle={content.cta.subtitle} />
    </main>
  );
}
