import Link from "next/link";
import { ChevronRight } from "lucide-react";
import GlowOrbs from "./GlowOrbs";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 grid-bg opacity-50 mask-fade-b" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(29,185,255,0.2),transparent_55%)]" aria-hidden />
      <GlowOrbs />
      <div className="container-x relative z-10 py-20 text-center md:py-28">
        <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-brand-light">{breadcrumb}</span>
        </nav>
        {eyebrow && (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            {eyebrow}
          </span>
        )}
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
