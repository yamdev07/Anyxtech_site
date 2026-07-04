"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, Info, ChevronDown } from "lucide-react";
import Particles from "@/components/ui/Particles";
import Magnetic from "@/components/ui/Magnetic";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function HeroRefined() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
      {/* Image de fond + overlay (comme l'original) */}
      <Image
        src="/images/Business_tech.jpg"
        alt="AnyxTech — solutions numériques au Bénin"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/85" />
      <Particles />

      {/* Formes flottantes */}
      <div className="absolute left-16 top-24 h-32 w-32 animate-float rounded-full bg-white/5" />
      <div className="absolute bottom-32 right-16 h-48 w-48 animate-float rounded-full bg-white/5" style={{ animationDelay: "-2s" }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-lg font-semibold backdrop-blur-sm"
        >
          <span className="h-3 w-3 animate-pulse rounded-full bg-brand-light" />
          Vos besoins avant les nôtres
        </motion.span>

        <motion.h1 variants={item} className="mt-8 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
          Toujours plus <span className="text-shimmer">proche de vous</span>
          <br />
          pour une meilleure satisfaction
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-8 max-w-2xl text-xl text-white/85">
          Des solutions numériques innovantes pour propulser votre entreprise vers
          l&apos;excellence au Bénin.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-light to-brand-blue px-8 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105">
              <Rocket className="h-5 w-5" /> J&apos;ai une idée de projet
            </Link>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link href="/societe" className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-brand-blue shadow-lg transition-transform hover:scale-105">
              <Info className="h-5 w-5" /> En savoir plus
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Indicateur scroll */}
      <a href="#services" aria-label="Voir les services" className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 text-white/70 hover:text-white">
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="block">
          <ChevronDown className="h-7 w-7" />
        </motion.span>
      </a>

      {/* Vague (comme l'original) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" aria-hidden>
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="h-[80px] w-full fill-[var(--bg)]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
        </svg>
      </div>
    </section>
  );
}
