"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { Rocket, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Particles from "@/components/ui/Particles";
import GlowOrbs from "@/components/ui/GlowOrbs";
import Marquee from "@/components/ui/Marquee";
import { siteConfig } from "@/lib/site";

const trust = [
  { value: "50+", label: "Clients satisfaits" },
  { value: "20+", label: "Projets réalisés" },
  { value: "24/7", label: "Support client" },
];

const expertise = [
  "Communication digitale",
  "Réseaux informatiques",
  "Installation Wi-Fi",
  "Énergie solaire",
  "Marketing digital",
  "Hébergement web",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(29,185,255,0.14), transparent 60%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section
      onMouseMove={onMove}
      className="noise relative flex min-h-screen items-center overflow-hidden bg-ink text-white"
    >
      {/* Halo conique rotatif */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <div className="conic-glow h-full w-full rounded-full opacity-30 blur-3xl" />
      </div>

      {/* Grille + halos + particules */}
      <div className="absolute inset-0 grid-bg opacity-50 mask-fade-b" aria-hidden />
      <GlowOrbs />
      <Particles />

      {/* Spotlight curseur */}
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden
      />

      <div className="container-x relative z-20 py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-brand-light" />
            {siteConfig.tagline}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-light" />
            </span>
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
          >
            Toujours plus
            <br />
            <span className="text-shimmer">proche de vous</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-lg text-white/70 sm:text-xl"
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
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm transition-colors hover:border-brand-light/40"
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

      {/* Bandeau d'expertise défilant */}
      <div className="absolute inset-x-0 bottom-16 z-20 border-y border-white/10 bg-white/[0.02] py-3 backdrop-blur-sm">
        <Marquee
          className="text-sm font-medium uppercase tracking-wider text-white/50"
          items={expertise}
        />
      </div>

      {/* Indicateur de scroll */}
      <a
        href="#services"
        aria-label="Voir les services"
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-white/50 transition-colors hover:text-white"
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
