"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Star, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Counter from "@/components/ui/Counter";
import { siteConfig } from "@/lib/site";

const trust = [
  { value: 50, suffix: "+", label: "Clients" },
  { value: 20, suffix: "+", label: "Projets" },
  { value: 3, suffix: "+", label: "Ans" },
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

const float = (d = 0) => ({
  animate: { y: [0, -12, 0] },
  transition: { duration: 5 + d, repeat: Infinity, ease: "easeInOut" as const },
});

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Fond animé */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.12]" />
        <motion.div
          className="absolute -left-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-brand-light/25 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 right-0 h-[34rem] w-[34rem] rounded-full bg-brand-blue/20 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/4 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Particules légères */}
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-brand-light/50"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -22, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="container-x relative z-10 grid w-full flex-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-10">
        {/* Colonne texte */}
        <motion.div variants={container} initial="hidden" animate="visible" className="min-w-0">
          <motion.span variants={item} className="chip mb-6">
            <Sparkles className="h-4 w-4 text-brand-light" />
            Vos besoins avant les nôtres
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl xl:text-7xl"
          >
            Toujours plus{" "}
            <span className="text-shimmer">proche de vous</span>
            <br />
            pour votre réussite digitale
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
            AnyxTech accompagne les entreprises béninoises dans leur transformation
            numérique : communication digitale, réseaux, énergie et marketing.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link href="/devis" className="btn-primary">
              <Rocket className="h-5 w-5" />
              Démarrer un projet
            </Link>
            <Link href="/services" className="btn-ghost">
              Nos services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-y-4 divide-x divide-[var(--border)]">
            {trust.map((t) => (
              <div key={t.label} className="px-6 first:pl-0">
                <div className="font-display text-3xl font-bold text-brand-blue dark:text-brand-light">
                  <Counter value={t.value} suffix={t.suffix} />
                </div>
                <div className="text-sm text-soft">{t.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.p variants={item} className="mt-8 flex items-center gap-3 text-sm text-soft">
            <span className="flex -space-x-2">
              {["#1f429b", "#1db9ff", "#22d3ee"].map((c) => (
                <span
                  key={c}
                  className="h-7 w-7 rounded-full border-2 border-[var(--bg)]"
                  style={{ background: c }}
                />
              ))}
            </span>
            Déjà <b className="text-[var(--text)]">50+ entreprises</b> accompagnées au Bénin
          </motion.p>
        </motion.div>

        {/* Colonne visuelle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full min-w-0"
        >
          {/* Halo conique rotatif derrière */}
          <div className="pointer-events-none absolute -inset-8 -z-10">
            <div className="conic-glow h-full w-full rounded-[3rem] opacity-40 blur-2xl" />
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-brand">
            <Image
              src="/images/Business_tech.jpg"
              alt="Solutions technologiques AnyxTech au Bénin"
              width={720}
              height={720}
              priority
              className="h-[440px] w-full object-cover sm:h-[540px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/30 to-transparent" />
          </div>

          {/* Carte flottante haut-gauche */}
          <motion.div
            {...float(0)}
            className="glass absolute -left-5 top-12 rounded-2xl border border-[var(--border)] p-4 shadow-card"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light/15 text-brand-light">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-bold leading-none">98%</div>
                <div className="text-xs text-soft">Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Carte flottante droite */}
          <motion.div
            {...float(1.4)}
            className="glass absolute -right-4 top-1/2 rounded-2xl border border-[var(--border)] px-4 py-3 shadow-card"
          >
            <div className="flex items-center gap-2 text-brand-light">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold text-[var(--text)]">Sécurisé</span>
            </div>
          </motion.div>

          {/* Carte flottante bas */}
          <motion.div
            {...float(0.7)}
            className="glass absolute -bottom-6 left-8 flex items-center gap-3 rounded-2xl border border-[var(--border)] px-4 py-3 shadow-card"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-light text-white">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold leading-none">24/7</div>
              <div className="text-xs text-soft">Support technique</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bandeau d'expertise défilant en bas */}
      <div className="relative z-10 border-t border-[var(--border)] bg-soft/70 py-4 backdrop-blur-sm">
        <div className="group flex overflow-hidden">
          <div className="flex animate-marquee items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...expertise, ...expertise].map((e, i) => (
              <span key={i} className="mx-8 flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-soft">
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
