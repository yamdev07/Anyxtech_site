import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import Partners from "@/components/home/Partners";
import CTA from "@/components/home/CTA";

// Contenu piloté par le CMS (témoignages, partenaires) → rendu à la demande
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Services />
      <Process />
      <About />
      <Testimonials />
      <Partners />
      <CTA />
    </main>
  );
}
