import Link from "next/link";
import Reveal from "./Reveal";

type CtaLink = {
  href: string;
  label: string;
  variant?: "solid" | "outline";
  external?: boolean;
};

export default function CtaBand({
  title,
  subtitle,
  links,
}: {
  title: string;
  subtitle?: string;
  links: CtaLink[];
}) {
  return (
    <section className="container-x py-20 md:py-24">
      <Reveal className="relative overflow-hidden rounded-3xl">
        <div className="aurora-bg absolute inset-0" aria-hidden />
        <div className="absolute inset-0 bg-ink/30" aria-hidden />
        <div className="relative px-6 py-14 text-center text-white sm:px-12 md:py-16">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {links.map((l) => {
              const cls =
                l.variant === "outline"
                  ? "border border-white/30 bg-white/10 text-white hover:bg-white/20"
                  : "bg-white text-brand-blue hover:scale-105";
              const classes = `inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold shadow-lg transition-all sm:w-auto ${cls}`;
              return l.external ? (
                <a key={l.label} href={l.href} className={classes}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href} className={classes}>
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
