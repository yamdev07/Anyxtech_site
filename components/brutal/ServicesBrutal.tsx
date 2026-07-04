import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/services";

const blocks = ["bg-brand-blue", "bg-cyan-400", "bg-violet-500", "bg-amber-400", "bg-pink-500", "bg-emerald-500"];

export default function ServicesBrutal() {
  return (
    <section id="services" className="bg-white py-20 text-ink md:py-28">
      <div className="container-x">
        <Reveal>
          <span className="inline-block border-2 border-ink bg-yellow-300 px-4 py-1.5 text-sm font-bold uppercase shadow-[3px_3px_0_0_#070b18]">
            Nos expertises
          </span>
          <h2 className="mt-5 font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl">
            Ce que nous faisons
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group flex h-full flex-col border-2 border-ink bg-white p-6 shadow-[6px_6px_0_0_#070b18] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_0_#070b18]"
                >
                  <div className={`flex h-14 w-14 items-center justify-center border-2 border-ink text-white ${blocks[i % blocks.length]}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-extrabold uppercase">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-medium text-ink/70">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-brand-blue">
                    En savoir plus <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
