"use client";

import Link from "next/link";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";
import Counter from "@/components/ui/Counter";
import Particles from "@/components/ui/Particles";
import Magnetic from "@/components/ui/Magnetic";
import OrbitSystem from "./OrbitSystem";

const trust = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 20, suffix: "+", label: "Projets" },
  { value: 24, suffix: "/7", label: "Support" },
];

const expertise = ["Communication", "Réseaux", "Wi-Fi", "Énergie solaire", "Marketing", "Hébergement"];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const words = "Toujours plus proche de vous.".split(" ");

export default function HeroTech() {
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mx}% ${my}%, rgba(29,185,255,0.16), transparent 60%)`;
  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section onMouseMove={onMove} className="noise relative flex min-h-screen flex-col overflow-hidden bg-ink text-white">
      {/* Fond */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.18] mask-fade-b" />
        <div className="aurora-bg absolute -top-1/3 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl" />
        <Particles />
      </div>
      <motion.div aria-hidden style={{ background: spotlight }} className="pointer-events-none absolute inset-0 z-[1]" />

      <div className="container-x relative z-10 grid flex-1 items-center gap-12 py-24 lg:grid-cols-2">
        {/* Texte */}
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-brand-light" />
            Ingénierie numérique · Bénin
          </motion.span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
            {words.map((w, i) => (
              <motion.span key={i} variants={item} className="mr-[0.25em] inline-block">
                {w === "proche" ? <span className="text-shimmer">{w}</span> : w}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-lg text-white/65">
            Nous connectons vos ambitions au numérique : communication, réseaux,
            énergie et marketing — pensés, conçus et déployés au Bénin.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-light px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(29,185,255,0.5)] transition-shadow hover:shadow-[0_0_55px_rgba(29,185,255,0.85)]">
                <Rocket className="h-5 w-5" /> Démarrer un projet
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                Nos services <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex gap-8 border-t border-white/10 pt-8">
            {trust.map((t) => (
              <div key={t.label}>
                <div className="font-display text-3xl font-bold text-brand-light drop-shadow-[0_0_20px_rgba(29,185,255,0.5)]">
                  <Counter value={t.value} suffix={t.suffix} />
                </div>
                <div className="text-xs uppercase tracking-widest text-white/50">{t.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Orbite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <OrbitSystem />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 border-t border-white/10 bg-white/[0.03] py-4 backdrop-blur-sm">
        <div className="group flex overflow-hidden">
          <div className="flex animate-marquee items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...expertise, ...expertise, ...expertise].map((e, i) => (
              <span key={i} className="mx-8 flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-white/45">
                {e} <span className="text-brand-light/70">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
