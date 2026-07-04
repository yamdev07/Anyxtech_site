import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function AboutAgency() {
  return (
    <section className="bg-soft py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-blue dark:text-brand-light">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Qui sommes-nous ?
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            AnyxTech, votre partenaire digital de confiance.
          </h2>
          <div className="mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-brand-blue to-brand-light" />
          <p className="mt-6 max-w-lg leading-relaxed text-soft">
            Nous sommes une équipe béninoise passionnée par la technologie et
            l&apos;innovation. Notre mission : aider les entreprises à se démarquer
            grâce à des solutions numériques sur mesure, simples, efficaces et
            évolutives.
          </p>
          <Link
            href="/societe"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 font-semibold transition-colors hover:border-brand-light hover:text-brand-light"
          >
            En savoir plus
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={1} className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-brand">
            <Image
              src="/images/entreprise.jpg"
              alt="Bureaux AnyxTech au Bénin"
              width={720}
              height={520}
              className="h-[360px] w-full object-cover sm:h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
            <span className="absolute bottom-6 left-6 font-display text-2xl font-bold tracking-tight text-white/90 sm:text-3xl">
              ANYX<span className="text-brand-light">TECH</span>
            </span>
          </div>
          {/* Badge flottant */}
          <div className="glass absolute -right-4 -top-5 animate-float rounded-2xl border border-[var(--border)] px-5 py-3 shadow-card sm:-right-6">
            <div className="font-display text-3xl font-bold text-brand-blue dark:text-brand-light">3+</div>
            <div className="text-xs text-soft">Ans d&apos;expérience</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
