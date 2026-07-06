"use client";

import { MessageSquare, PenTool, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    icon: MessageSquare,
    color: "from-sky-500 to-cyan-400",
    glow: "rgba(56, 189, 248, 0.3)",
    title: "Échangeons",
    text: "Parlez-nous de votre projet et de vos objectifs. Premier échange gratuit et sans engagement.",
  },
  {
    n: "02",
    icon: PenTool,
    color: "from-indigo-500 to-blue-500",
    glow: "rgba(99, 102, 241, 0.3)",
    title: "Concevons",
    text: "Nous élaborons une solution sur mesure, adaptée à votre contexte et à votre budget au Bénin.",
  },
  {
    n: "03",
    icon: Rocket,
    color: "from-fuchsia-500 to-pink-500",
    glow: "rgba(217, 70, 239, 0.3)",
    title: "Déployons",
    text: "Mise en œuvre, formation et accompagnement continu jusqu'à votre entière satisfaction.",
  },
];

export default function Process() {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Comment ça marche"
          title={
            <>
              Trois étapes, <span className="text-shimmer">zéro friction</span>
            </>
          }
        />

        <div className="relative mt-14 grid gap-5 md:grid-cols-3">
          {/* Timeline connector - desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px md:block">
            <motion.div
              className="line-glow h-full w-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.n} delay={i} className="h-full">
                <div className="group glass-heavy gradient-border-animated relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 hover-glow">
                  {/* Step number — animated */}
                  <motion.span
                    className="pointer-events-none absolute -top-2 right-4 font-display text-6xl font-bold text-[var(--border)] transition-colors duration-500 group-hover:text-brand-light/20"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  >
                    {s.n}
                  </motion.span>

                  {/* Icon with glow on hover */}
                  <div
                    className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    style={{
                      boxShadow: `0 8px 25px -5px ${s.glow}`,
                    }}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="relative mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-soft">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
