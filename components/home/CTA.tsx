import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

export default function CTA() {
  return (
    <section className="container-x py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl">
        <div className="aurora-bg absolute inset-0" aria-hidden />
        <div className="absolute inset-0 bg-ink/30" aria-hidden />
        <div className="relative px-6 py-16 text-center text-white sm:px-12 md:py-20">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Voulez-vous démarrer votre projet au Bénin ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins en
            solutions digitales.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand-blue shadow-lg transition-transform hover:scale-105 sm:w-auto"
            >
              <Mail className="h-5 w-5" />
              Nous écrire
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto"
            >
              <Phone className="h-5 w-5" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
