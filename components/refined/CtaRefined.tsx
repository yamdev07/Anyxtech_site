import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

export default function CtaRefined({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="aurora-bg relative overflow-hidden py-20 text-center text-white md:py-28">
      <div className="absolute inset-0 bg-ink/20" aria-hidden />
      <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 animate-float rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-10 h-80 w-80 animate-float rounded-full bg-white/10 blur-3xl" style={{ animationDelay: "-2s" }} />
      <Reveal className="container-x relative">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-white/90">
          {subtitle}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-brand-blue shadow-lg transition-transform hover:scale-105">
            <Mail className="h-5 w-5" /> Nous écrire
          </Link>
          <a href={siteConfig.phoneHref} className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-black/20 px-8 py-4 font-semibold text-white transition-colors hover:bg-black/30">
            <Phone className="h-5 w-5" /> {siteConfig.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
