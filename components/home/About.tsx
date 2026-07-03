import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal delay={1} className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] shadow-brand">
            <Image
              src="/images/team.png"
              alt="Équipe AnyxTech au Bénin"
              width={720}
              height={540}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <span className="chip mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Qui sommes-nous ?
          </span>
          <h2 className="section-title">
            Une entreprise béninoise, une ambition{" "}
            <span className="text-gradient">panafricaine</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-soft">
            ANYXTECH est spécialisée dans le numérique, les solutions digitales et
            les télécommunications. Nous regroupons des professionnels passionnés
            par les technologies modernes et l&apos;innovation.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-soft">
            En mettant vos besoins avant les nôtres, nous construisons un
            partenariat durable pour votre réussite digitale en Afrique de
            l&apos;Ouest.
          </p>
          <Link href="/societe" className="btn-primary mt-8">
            <Users className="h-5 w-5" />
            Découvrir notre équipe
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
