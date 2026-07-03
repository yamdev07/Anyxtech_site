"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Eye, Heart, Sparkles } from "lucide-react";
import Counter from "@/components/ui/Counter";

const chips = [
  { label: "Communication", href: "/services#communication" },
  { label: "Réseaux", href: "/services#reseau" },
  { label: "Wi-Fi", href: "/services#wifi" },
  { label: "Énergie solaire", href: "/services#energie" },
  { label: "Marketing", href: "/services#marketing" },
];

const stats = [
  { value: 50, suffix: "+", label: "Clients satisfaits" },
  { value: 20, suffix: "+", label: "Projets réalisés" },
  { value: 10, suffix: "+", label: "Experts techniques" },
  { value: 24, suffix: "/7", label: "Support client" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/** Réseau de points façon constellation (décoratif). */
function Constellation() {
  const nodes = [
    [12, 20], [28, 12], [40, 32], [22, 48], [60, 18], [72, 40],
    [88, 25], [55, 60], [80, 68], [35, 72], [15, 82], [68, 88],
  ];
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
      <g stroke="rgba(29,185,255,0.25)" strokeWidth="0.15">
        <line x1="12" y1="20" x2="28" y2="12" />
        <line x1="28" y1="12" x2="40" y2="32" />
        <line x1="40" y1="32" x2="22" y2="48" />
        <line x1="60" y1="18" x2="72" y2="40" />
        <line x1="72" y1="40" x2="88" y2="25" />
        <line x1="55" y1="60" x2="72" y2="40" />
        <line x1="55" y1="60" x2="80" y2="68" />
        <line x1="35" y1="72" x2="22" y2="48" />
        <line x1="15" y1="82" x2="35" y2="72" />
        <line x1="68" y1="88" x2="80" y2="68" />
      </g>
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="0.5"
          fill="rgba(29,185,255,0.7)"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </svg>
  );
}

/** Fenêtre navigateur factice pour les maquettes 3D. */
function BrowserCard({
  src,
  alt,
  title,
  tag,
  views,
  likes,
  className = "",
}: {
  src: string;
  alt: string;
  title: string;
  tag: string;
  views: number;
  likes: number;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-brand ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="relative h-32 w-full">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      <div className="p-3">
        <div className="font-display text-sm font-bold leading-tight">{title}</div>
        <div className="text-xs text-soft">{tag}</div>
        <div className="mt-2 flex items-center gap-3 text-xs text-soft">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" /> {likes}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="container-x flex min-h-screen flex-col justify-center py-8">
      {/* Grande carte hero */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-gradient-to-br from-brand-50 via-white to-brand-100/60 p-8 dark:from-ink-800 dark:via-ink-800 dark:to-ink md:p-14">
        {/* Fond décoratif */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/Business_tech.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.06]"
          />
          <div className="absolute inset-0 grid-bg opacity-[0.15]" />
          <Constellation />
          <motion.div
            className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          {/* Texte */}
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-blue dark:text-brand-light"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
              AnyxTech — Transformation numérique au Bénin
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl"
            >
              Toujours plus
              <br />
              proche de vous, <span className="text-gradient">accessible.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
              Des solutions numériques innovantes pour propulser votre entreprise :
              communication digitale, réseaux, énergie et marketing. Discutez avec un
              expert directement.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
              <Link href="/devis" className="btn-primary">
                <Rocket className="h-5 w-5" />
                Démarrer un projet
              </Link>
              <Link href="/services" className="btn-ghost">
                Nos services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="text-sm font-medium text-soft">Populaire :</span>
              {chips.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-1.5 text-sm text-soft transition-all hover:border-brand-light hover:text-brand-light"
                >
                  {c.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* Maquettes 3D */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="perspective hidden justify-center lg:flex"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "rotateY(-20deg) rotateX(8deg)" }}
              className="relative [transform-style:preserve-3d]"
            >
              <BrowserCard
                src="/images/smart-city.jpeg"
                alt="Solution ville connectée"
                title="Ville connectée"
                tag="Réseaux & IoT"
                views={4}
                likes={1}
                className="w-64"
              />
              <div className="absolute -right-16 top-16 [transform:translateZ(60px)]">
                <BrowserCard
                  src="/images/network.jpeg"
                  alt="Infrastructure réseau"
                  title="Infrastructure réseau"
                  tag="Connectivité"
                  views={4}
                  likes={0}
                  className="w-56"
                />
              </div>
              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute -bottom-6 -left-8 flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 shadow-card [transform:translateZ(80px)]"
              >
                <Sparkles className="h-4 w-4 text-brand-light" />
                <span className="text-xs font-semibold">Certifié AnyxTech</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bandeau de stats en dégradé */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 grid grid-cols-2 overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-dark via-brand-blue to-brand-light text-white md:grid-cols-4"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 py-8 text-center ${i > 0 ? "md:border-l md:border-white/15" : ""} ${
              i % 2 === 1 ? "border-l border-white/15 md:border-l" : ""
            } ${i >= 2 ? "border-t border-white/15 md:border-t-0" : ""}`}
          >
            <div className="font-display text-4xl font-bold sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-sm text-white/80">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
