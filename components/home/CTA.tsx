"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import ScrollParallax from "@/components/ui/ScrollParallax";
import { siteConfig } from "@/lib/site";

export default function CTA() {
  return (
    <section className="container-x pb-24">
      <Reveal variant="scale" className="relative overflow-hidden rounded-3xl bg-brand-blue px-6 py-16 text-center text-white sm:px-12 md:py-20">
        {/* Multi-layer aurora background with parallax */}
        <div className="pointer-events-none absolute inset-0">
          <ScrollParallax y={20}>
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-light/25 blur-[80px]" />
          </ScrollParallax>
          <ScrollParallax y={-25}>
            <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-brand-cyan/20 blur-[100px]" />
          </ScrollParallax>
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[60px]" />
          <div className="noise absolute inset-0" />
        </div>

        <div className="relative">
          <motion.h2
            className="mx-auto max-w-3xl font-display text-3xl font-light heading-tight sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Voulez-vous démarrer votre projet au Bénin ?
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-subtitle text-white/80"
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins en
            solutions digitales.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand-blue shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-glow sm:w-auto"
            >
              <Mail className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
              Nous écrire
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 hover:shadow-glow sm:w-auto"
            >
              <Phone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              {siteConfig.phone}
            </a>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
