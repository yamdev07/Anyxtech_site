"use client";

import Link from "next/link";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";
import Counter from "@/components/ui/Counter";
import Particles from "@/components/ui/Particles";
import Magnetic from "@/components/ui/Magnetic";

const trust = [
  { value: 50, suffix: "+", label: "Clients satisfaits" },
  { value: 20, suffix: "+", label: "Projets réalisés" },
  { value: 24, suffix: "/7", label: "Support client" },
];

const expertise = [
  "Communication digitale",
  "Réseaux informatiques",
  "Installation Wi-Fi",
  "Énergie solaire",
  "Marketing digital",
  "Hébergement web",
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroDark() {
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mx}% ${my}%, rgba(29,185,255,0.18), transparent 60%)`;
  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section onMouseMove={onMove} className="noise relative flex min-h-screen flex-col overflow-hidden bg-ink text-white">
      {/* Décor néon */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.18] mask-fade-b" />
        <div className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2">
          <div className="conic-glow h-full w-full rounded-full opacity-40 blur-3xl" />
        </div>
        <div className="absolute -left-24 top-16 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-brand-light/25 blur-3xl" />
        <Particles />
      </div>
      <motion.div aria-hidden style={{ background: spotlight }} className="pointer-events-none absolute inset-0 z-[1]" />

      <div className="container-x relative z-10 flex flex-1 items-center py-24">
        <motion.div variants={container} initial="hidden" animate="visible" className="mx-auto max-w-4xl text-center">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-brand-light" />
            Vos besoins avant les nôtres
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
          >
            Toujours plus{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-cyan bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(29,185,255,0.55)]">
              proche de vous
            </span>
          </motion.h1>

          <motion.p variants={item} className="mx-auto mt-7 max-w-2xl text-lg text-white/65 sm:text-xl">
            Des solutions numériques innovantes pour propulser votre entreprise vers
            l&apos;excellence au Bénin — communication, réseaux, énergie et marketing.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-light px-8 py-4 font-semibold text-white shadow-[0_0_35px_rgba(29,185,255,0.55)] transition-shadow hover:shadow-[0_0_55px_rgba(29,185,255,0.85)]"
              >
                <Rocket className="h-5 w-5" /> Démarrer un projet
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:border-brand-light/60 hover:bg-white/10"
              >
                Nos services <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4">
            {trust.map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-sm transition-colors hover:border-brand-light/40"
              >
                <div className="font-display text-2xl font-bold text-brand-light drop-shadow-[0_0_20px_rgba(29,185,255,0.5)] sm:text-3xl">
                  <Counter value={t.value} suffix={t.suffix} />
                </div>
                <div className="mt-1 text-xs text-white/55 sm:text-sm">{t.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-t border-white/10 bg-white/[0.03] py-4 backdrop-blur-sm">
        <div className="group flex overflow-hidden">
          <div className="flex animate-marquee items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...expertise, ...expertise].map((e, i) => (
              <span key={i} className="mx-8 flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-white/45">
                {e}
                <span className="text-brand-light/70">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
