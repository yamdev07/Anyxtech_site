import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CtaEditorial() {
  return (
    <section className="border-t border-[var(--border)] py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-soft">
            (02) — Contact
          </span>
          <Link href="/contact" className="group mt-6 block">
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tighter transition-colors group-hover:text-brand-blue dark:group-hover:text-brand-light sm:text-7xl xl:text-8xl">
              Un projet ?<br />
              Parlons-en
              <ArrowUpRight className="ml-2 inline h-12 w-12 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2 sm:h-20 sm:w-20" />
            </h2>
          </Link>
          <p className="mt-8 max-w-md text-lg text-soft">
            Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins en
            solutions digitales au Bénin.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
