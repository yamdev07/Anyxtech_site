import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CtaBrutal() {
  return (
    <section className="bg-white pb-24 text-ink">
      <div className="container-x">
        <Reveal className="flex flex-col items-center gap-6 border-4 border-ink bg-brand-blue px-6 py-14 text-center text-white shadow-[10px_10px_0_0_#070b18]">
          <h2 className="max-w-3xl font-display text-3xl font-extrabold uppercase leading-tight sm:text-5xl">
            Vous avez un projet ? Parlons-en dès aujourd&apos;hui.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-ink bg-yellow-300 px-7 py-3.5 font-bold text-ink shadow-[5px_5px_0_0_#070b18] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#070b18]"
          >
            Nous contacter <ArrowRight className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
