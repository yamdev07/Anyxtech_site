"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, ChevronDown } from "lucide-react";
import Particles from "@/components/ui/Particles";
import GlowOrbs from "@/components/ui/GlowOrbs";
import { siteConfig } from "@/lib/site";

const trust = [
  { value: "50+", label: "Clients satisfaits" },
  { value: "20+", label: "Projets réalisés" },
  { value: "24/7", label: "Support client" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink text-white">
      {/* Fonds décoratifs */}
      <div className="absolute inset-0 grid-bg opacity-60 mask-fade-b" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(29,185,255,0.22),transparent_55%)]" aria-hidden />
      <GlowOrbs />
      <Particles />

      <div className="container-x relative z-10 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-light" />
            </span>
            {siteConfig.tagline}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            Toujours plus{" "}
            <span className="text-gradient">proche de vous</span>
            <br className="hidden sm:block" /> pour une meilleure satisfaction
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl"
          >
            Des solutions numériques innovantes pour propulser votre entreprise
            vers l&apos;excellence au Bénin — communication digitale, réseaux,
            énergie et marketing.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/devis" className="btn-primary w-full sm:w-auto">
              <Rocket className="h-5 w-5" />
              J&apos;ai une idée de projet
            </Link>
            <Link
              href="/societe"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Bandeau de confiance */}
          <motion.div
            variants={item}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4"
          >
            {trust.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm"
              >
                <div className="font-display text-2xl font-bold text-brand-light sm:text-3xl">
                  {t.value}
                </div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">{t.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <a
        href="#services"
        aria-label="Voir les services"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </a>
    </section>
  );
}
