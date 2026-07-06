"use client";

import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import ScrollParallax from "@/components/ui/ScrollParallax";
import Counter from "@/components/ui/Counter";

const stats = [
  { value: 50, suffix: "+", label: "Clients satisfaits" },
  { value: 20, suffix: "+", label: "Projets réalisés" },
  { value: 10, suffix: "+", label: "Experts techniques" },
  { value: 24, suffix: "/7", label: "Support client" },
];

export default function About() {
  return (
    <section className="py-12 md:py-16">
      {/* Bandeau de stats */}
      <div className="container-x">
        <Reveal variant="scale" className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-soft px-8 py-10">
          {/* Glow background with parallax */}
          <ScrollParallax y={15} className="pointer-events-none absolute -left-16 -top-16">
            <div className="h-48 w-48 rounded-full bg-brand-light/10 blur-[60px]" />
          </ScrollParallax>
          <ScrollParallax y={-15} className="pointer-events-none absolute -bottom-16 -right-16">
            <div className="h-48 w-48 rounded-full bg-brand-cyan/10 blur-[60px]" />
          </ScrollParallax>

          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-[var(--border)]">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center md:px-4"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-display text-4xl font-bold text-brand-blue dark:text-brand-light md:text-5xl heading-tight">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-soft">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Histoire */}
      <div className="container-x mt-14 grid items-center gap-12 lg:grid-cols-2">
        <Reveal delay={1} variant="right" className="order-2 lg:order-1">
          <ScrollParallax y={20}>
            <div className="group relative overflow-hidden rounded-3xl border border-[var(--border)] shadow-brand">
              <Image
                src="/images/team.png"
                alt="Équipe AnyxTech au Bénin"
                width={720}
                height={540}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
            </div>
          </ScrollParallax>
        </Reveal>

        <Reveal variant="left" className="order-1 lg:order-2">
          <span className="chip mb-4 glass-heavy">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Qui sommes-nous ?
          </span>
          <h2 className="section-title heading-tight">
            Une entreprise béninoise, une ambition{" "}
            <span className="text-gradient">panafricaine</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-soft text-elegant">
            ANYXTECH est spécialisée dans le numérique, les solutions digitales et
            les télécommunications. Nous regroupons des professionnels passionnés
            par les technologies modernes et l&apos;innovation.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-soft text-elegant">
            En mettant vos besoins avant les nôtres, nous construisons un
            partenariat durable pour votre réussite digitale en Afrique de
            l&apos;Ouest.
          </p>
          <Link href="/societe" className="btn-primary mt-8 group">
            <Users className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            Découvrir notre équipe
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
