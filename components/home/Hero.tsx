"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Rocket, ArrowRight, Star, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Counter from "@/components/ui/Counter";
import Spotlight from "@/components/ui/Spotlight";
import Particles from "@/components/ui/Particles";
import Magnetic from "@/components/ui/Magnetic";
import TextReveal from "@/components/ui/TextReveal";
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const float = (d = 0) => ({
  animate: { y: [0, -14, 0], rotate: [0, d > 0.5 ? 2 : -1, 0] },
  transition: { duration: 5 + d, repeat: Infinity, ease: "easeInOut" as const },
});

export default function Hero() {
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mx}% ${my}%, rgba(29,185,255,0.15), transparent 55%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Spotlight curseur */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-[1]"
      />
      {/* Fond anime multi-couche */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.10]" />
        <Particles />

        {/* Blobs de fond avec parallaxe differente */}
        <motion.div
          className="absolute -left-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-brand-light/20 blur-[100px]"
          animate={{ x: [0, 60, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 right-0 h-[40rem] w-[40rem] rounded-full bg-brand-blue/15 blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[40%] top-[20%] h-80 w-80 rounded-full bg-brand-cyan/15 blur-[80px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Lignes decoratives */}
        <div className="absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-light/10 to-transparent" />
        <div className="absolute right-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-blue/8 to-transparent" />

        {/* Particules legeres */}
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-brand-light/40"
            style={{ left: `${(i * 31) % 100}%`, top: `${(i * 47) % 100}%` }}
            animate={{
              y: [0, -(20 + (i % 4) * 8), 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      <div className="container-x relative z-10 grid w-full flex-1 items-center gap-12 py-24 lg:grid-cols-2 lg:gap-10">
        {/* Colonne texte */}
        <motion.div variants={container} initial="hidden" animate="visible" className="min-w-0">
          <motion.span variants={item} className="chip mb-6 glass-heavy">
            <Sparkles className="h-4 w-4 text-brand-light" />
            <span className="text-eyebrow">Vos besoins avant les nôtres</span>
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-light leading-[1.02] sm:text-6xl xl:text-7xl heading-tight"
          >
            <TextReveal as="span">
              Toujours plus proche de vous
            </TextReveal>
            <br />
            <span className="text-shimmer text-glow font-semibold">
              <TextReveal as="span">
                pour votre réussite digitale
              </TextReveal>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-elegant text-soft">
            AnyxTech accompagne les entreprises béninoises dans leur transformation
            numérique : communication digitale, réseaux, énergie et marketing.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <Link href="/devis" className="btn-primary">
                <Rocket className="h-5 w-5" />
                Démarrer un projet
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/services" className="btn-ghost">
                Nos services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
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
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="perspective relative w-full min-w-0"
        >
          {/* Halo conique rotatif derriere */}
          <div className="pointer-events-none absolute -inset-10 -z-10">
            <div className="conic-glow h-full w-full rounded-[3rem] opacity-50 blur-3xl" />
          </div>

          <Spotlight tilt={10} className="rounded-[2rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-brand">
              <Image
                src="/images/Business_tech.jpg"
                alt="Solutions technologiques AnyxTech au Bénin"
                width={720}
                height={720}
                priority
                className="h-[440px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[540px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/35 via-transparent to-transparent" />
              {/* Overlay brillant en haut */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-light/10 via-transparent to-transparent opacity-60" />
            </div>
          </Spotlight>

          {/* Carte flottante haut-gauche — glass heavy */}
          <motion.div
            {...float(0)}
            className="glass-heavy absolute -left-5 top-12 rounded-2xl p-4 shadow-card"
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
            className="glass-heavy absolute -right-4 top-1/2 rounded-2xl px-4 py-3 shadow-card"
          >
            <div className="flex items-center gap-2 text-brand-light">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold text-[var(--text)]">Sécurisé</span>
            </div>
          </motion.div>

          {/* Carte flottante bas */}
          <motion.div
            {...float(0.7)}
            className="glass-heavy absolute -bottom-6 left-8 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-card"
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

      {/* Bandeau d'expertise defilant en bas — glass heavy */}
      <div className="relative z-10 border-t border-[var(--border)] bg-soft/70 py-4 backdrop-blur-md">
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
