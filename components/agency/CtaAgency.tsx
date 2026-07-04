import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CtaAgency() {
  return (
    <section className="bg-white pb-24 pt-4 dark:bg-ink">
      <div className="container-x">
        <Reveal className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-7 py-8 shadow-card sm:flex-row sm:px-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-light text-white sm:grid">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">Vous avez un projet ?</h3>
              <p className="text-soft">Parlons-en dès aujourd&apos;hui.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-brand-light hover:shadow-glow"
          >
            Nous contacter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
