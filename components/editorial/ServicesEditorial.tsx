import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/services";

export default function ServicesEditorial() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="flex items-end justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-soft">
              (01) — Nos expertises
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Ce que nous faisons
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-blue hover:gap-2 sm:inline-flex dark:text-brand-light"
          >
            Tout voir <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-14 border-t border-[var(--border)]">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i % 4}>
              <Link
                href={`/services#${s.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[var(--border)] py-7 transition-colors hover:bg-soft md:gap-8 md:py-9"
              >
                <span className="font-display text-sm tabular-nums text-soft">
                  0{i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-bold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-brand-blue dark:group-hover:text-brand-light sm:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-1 hidden max-w-2xl text-sm text-soft md:block">
                    {s.short}
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-soft transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-blue dark:group-hover:text-brand-light" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
