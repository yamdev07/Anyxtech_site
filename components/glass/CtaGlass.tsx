import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

export default function CtaGlass() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-brand-blue/25 blur-[100px]" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-cyan-400/25 blur-[100px]" />
      </div>
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/40 bg-white/30 px-6 py-16 text-center shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 sm:px-12">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Voulez-vous démarrer votre{" "}
            <span className="bg-gradient-to-r from-brand-blue via-cyan-500 to-violet-500 bg-clip-text text-transparent">
              projet au Bénin
            </span>{" "}
            ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-soft">
            Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins en
            solutions digitales.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              <Mail className="h-5 w-5" />
              Nous écrire
            </Link>
            <a href={siteConfig.phoneHref} className="btn-ghost bg-white/40 dark:bg-white/5">
              <Phone className="h-5 w-5" />
              {siteConfig.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
