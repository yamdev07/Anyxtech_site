import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

export default function CtaDark() {
  return (
    <section className="bg-ink pb-24 pt-4 text-white">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 px-6 py-16 text-center backdrop-blur-sm sm:px-12 md:py-20">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-blue/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-brand-light/30 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Voulez-vous démarrer votre projet au Bénin ?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65">
              Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins en solutions digitales.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-light px-8 py-4 font-semibold text-white shadow-[0_0_35px_rgba(29,185,255,0.6)] transition-shadow hover:shadow-[0_0_55px_rgba(29,185,255,0.9)]"
              >
                <Mail className="h-5 w-5" /> Nous écrire
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-colors hover:border-brand-light/60 hover:bg-white/10"
              >
                <Phone className="h-5 w-5" /> {siteConfig.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
