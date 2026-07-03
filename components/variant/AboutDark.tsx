import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function AboutDark() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="container-x relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-blue/40 to-brand-light/40 blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <Image src="/images/team.png" alt="Équipe AnyxTech au Bénin" width={720} height={540} className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Qui sommes-nous ?
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Une entreprise béninoise, une ambition{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-cyan bg-clip-text text-transparent">panafricaine</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            ANYXTECH est spécialisée dans le numérique, les solutions digitales et les
            télécommunications. Nous regroupons des professionnels passionnés par les
            technologies modernes et l&apos;innovation.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/65">
            En mettant vos besoins avant les nôtres, nous construisons un partenariat
            durable pour votre réussite digitale en Afrique de l&apos;Ouest.
          </p>
          <Link
            href="/societe"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-light px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(29,185,255,0.5)] transition-shadow hover:shadow-[0_0_50px_rgba(29,185,255,0.8)]"
          >
            <Users className="h-5 w-5" /> Découvrir notre équipe
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
