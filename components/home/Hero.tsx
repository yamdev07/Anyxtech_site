"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Star, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Counter from "@/components/ui/Counter";

const stats = [
  { value: 50, suffix: "+", label: "Clients satisfaits" },
  { value: 20, suffix: "+", label: "Projets réalisés" },
  { value: 10, suffix: "+", label: "Experts techniques" },
  { value: 24, suffix: "/7", label: "Support client" },
];

const badges = [
  { icon: Star, text: "98% de satisfaction" },
  { icon: ShieldCheck, text: "Solutions sécurisées" },
  { icon: Zap, text: "Support 24/7" },
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
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Fond animé */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.12]" />
        <motion.div
          className="absolute -left-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-brand-light/25 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-16 h-[36rem] w-[36rem] rounded-full bg-brand-blue/20 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(16)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-brand-light/50"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Contenu pleine largeur, aligné à gauche */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-center py-24">
        <motion.div variants={container} initial="hidden" animate="visible" className="w-full">
          <motion.span variants={item} className="chip mb-7">
            <Sparkles className="h-4 w-4 text-brand-light" />
            Vos besoins avant les nôtres
          </motion.span>

          <motion.h1
            variants={item}
            className="max-w-6xl font-display text-6xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
          >
            Toujours plus <span className="text-shimmer">proche de vous</span>{" "}
            pour votre réussite digitale au Bénin
          </motion.h1>

          <motion.p variants={item} className="mt-8 max-w-3xl text-xl leading-relaxed text-soft">
            AnyxTech accompagne les entreprises béninoises dans leur transformation
            numérique : communication digitale, réseaux, énergie et marketing.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <Link href="/devis" className="btn-primary text-base">
              <Rocket className="h-5 w-5" />
              Démarrer un projet
            </Link>
            <Link href="/services" className="btn-ghost text-base">
              Nos services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Badges de réassurance pleine largeur */}
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            {badges.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium"
              >
                <Icon className="h-4 w-4 text-brand-light" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* Stats pleine largeur */}
          <motion.div
            variants={item}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-[var(--bg)] px-6 py-8">
                <div className="font-display text-4xl font-bold text-brand-blue dark:text-brand-light md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-soft">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bandeau d'expertise défilant en bas */}
      <div className="relative z-10 border-t border-[var(--border)] bg-soft/70 py-4 backdrop-blur-sm">
        <div className="group flex overflow-hidden">
          <div className="flex animate-marquee items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...expertise, ...expertise].map((e, i) => (
              <span
                key={i}
                className="mx-8 flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-soft"
              >
                {e}
                <span className="text-brand-light/60">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
