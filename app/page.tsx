import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import TechBand from "@/components/home/TechBand";
import About from "@/components/home/About";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Services />
      <TechBand />
      <About />
      <CTA />
    </main>
  );
}
