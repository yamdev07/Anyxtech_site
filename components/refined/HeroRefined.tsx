"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Rocket, Info, ChevronDown, Star, ShieldCheck, Headset } from "lucide-react";
import Particles from "@/components/ui/Particles";
import Magnetic from "@/components/ui/Magnetic";
import type { HomeContent } from "@/lib/home-content";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function HeroRefined({ hero }: { hero: HomeContent["hero"] }) {
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mx}% ${my}%, rgba(29,185,255,0.18), transparent 60%)`;
  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section onMouseMove={onMove} className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
      {/* Image de fond avec zoom lent (Ken Burns) */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <Image src={hero.image} alt="AnyxTech — solutions numériques au Bénin" fill priority className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink/90" />
      <div className="absolute inset-0 grid-bg opacity-[0.15]" />
      <Particles />

      {/* Orbes animés */}
      <motion.div className="absolute -left-10 top-24 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl" animate={{ x: [0, 40, 0], y: [0, 25, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute -right-10 bottom-24 h-80 w-80 rounded-full bg-brand-light/20 blur-3xl" animate={{ x: [0, -30, 0], y: [0, -25, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }} />

      {/* Spotlight curseur */}
      <motion.div aria-hidden style={{ background: spotlight }} className="pointer-events-none absolute inset-0 z-[1]" />

      <motion.div variants={container} initial="hidden" animate="visible" className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span variants={item} className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-lg font-semibold backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-light opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-light" />
          </span>
          {hero.badge}
        </motion.span>

        <motion.h1 variants={item} className="mt-8 font-display text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
          {hero.titlePrefix} <span className="text-shimmer">{hero.titleHighlight}</span>
          <br />
          {hero.titleSuffix}
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-8 max-w-2xl text-xl text-white/85">
          {hero.subtitle}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-light to-brand-blue px-8 py-4 font-semibold text-white shadow-[0_0_30px_rgba(29,185,255,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(29,185,255,0.8)]">
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

      {/* Cartes flottantes en verre */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.6 }} className="absolute left-6 top-1/3 z-10 hidden lg:block xl:left-16">
        <div className="glass flex animate-float items-center gap-3 rounded-2xl border border-white/15 p-3.5 shadow-card">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light/20 text-brand-light"><Star className="h-5 w-5" /></div>
          <div><div className="font-display text-lg font-bold leading-none">98%</div><div className="text-xs text-white/60">Satisfaction</div></div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.6 }} className="absolute right-6 top-1/2 z-10 hidden lg:block xl:right-16">
        <div className="glass flex animate-float items-center gap-2 rounded-2xl border border-white/15 px-4 py-3 shadow-card" style={{ animationDelay: "-2s" }}>
          <ShieldCheck className="h-5 w-5 text-brand-light" /><span className="text-sm font-semibold">Sécurisé</span>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }} className="absolute bottom-40 right-24 z-10 hidden lg:block">
        <div className="glass flex animate-float items-center gap-3 rounded-2xl border border-white/15 p-3.5 shadow-card" style={{ animationDelay: "-1s" }}>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light/20 text-brand-light"><Headset className="h-5 w-5" /></div>
          <div><div className="font-display text-lg font-bold leading-none">24/7</div><div className="text-xs text-white/60">Support</div></div>
        </div>
      </motion.div>

      {/* Indicateur scroll */}
      <a href="#services" aria-label="Voir les services" className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 text-white/70 hover:text-white">
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="block"><ChevronDown className="h-7 w-7" /></motion.span>
      </a>

      {/* Vague */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" aria-hidden>
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="h-[80px] w-full fill-[var(--bg)]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
        </svg>
      </div>
    </section>
  );
}
