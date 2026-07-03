import Link from "next/link";
import Image from "next/image";
import { Users, Cog } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const stats = [
  { value: 50, suffix: "+", label: "Clients satisfaits" },
  { value: 20, suffix: "+", label: "Projets réalisés" },
  { value: 10, suffix: "+", label: "Experts techniques" },
  { value: 24, suffix: "/7", label: "Support client" },
];

export default function About() {
  return (
    <section className="bg-soft py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="chip mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
              Qui sommes-nous ?
            </span>
            <h2 className="section-title">
              Une équipe béninoise passionnée par{" "}
              <span className="text-gradient">l&apos;innovation</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-soft">
              ANYXTECH est une entreprise béninoise spécialisée dans le numérique,
              les solutions digitales et les télécommunications. Nous regroupons des
              professionnels passionnés par les technologies modernes et
              l&apos;innovation.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-soft">
              En mettant vos besoins avant les nôtres, nous construisons un
              partenariat durable pour votre réussite digitale en Afrique de
              l&apos;Ouest.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/societe" className="btn-primary">
                <Users className="h-5 w-5" />
                Découvrir notre équipe
              </Link>
              <Link href="/services" className="btn-ghost">
                <Cog className="h-5 w-5" />
                Nos services
              </Link>
            </div>
          </Reveal>

          <Reveal delay={1} className="relative">
            <div className="overflow-hidden rounded-3xl border border-[var(--border)] shadow-brand">
              <Image
                src="/images/team.png"
                alt="Équipe AnyxTech au travail au Bénin"
                width={720}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-4 shadow-card sm:-right-6">
              <div className="font-display text-4xl font-bold text-brand-light">
                <Counter value={3} suffix="+" />
              </div>
              <div className="text-sm text-soft">Ans d&apos;expérience</div>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i}>
              <div className="card-glow flex flex-col items-center p-7 text-center">
                <div className="font-display text-4xl font-bold text-brand-light md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-soft">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
