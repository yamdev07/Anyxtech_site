import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div className="absolute inset-0 bg-brand-radial opacity-70" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-light/15 blur-3xl" aria-hidden />
      <div className="container-x relative z-10 py-16 text-center md:py-24">
        <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-soft">
          <Link href="/" className="transition-colors hover:text-brand-light">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-brand-blue dark:text-brand-light">
            {breadcrumb}
          </span>
        </nav>
        {eyebrow && (
          <span className="chip mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            {eyebrow}
          </span>
        )}
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-soft">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
