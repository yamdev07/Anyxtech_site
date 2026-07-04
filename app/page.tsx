import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";
import About from "@/components/home/About";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Services />
      <Process />
      <About />
      <CTA />
    </main>
  );
}
