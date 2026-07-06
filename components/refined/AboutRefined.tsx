import Link from "next/link";
import Image from "next/image";
import { Users, Cog } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Spotlight from "@/components/ui/Spotlight";
import type { HomeContent } from "@/lib/home-content";

export default function AboutRefined({ about }: { about: HomeContent["about"] }) {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={about.badge}
          title={
            <>
              {about.titlePrefix}{" "}
              <span className="text-gradient">{about.titleHighlight}</span>
            </>
          }
          subtitle="ANYXTECH est une entreprise béninoise spécialisée dans le numérique, les solutions digitales et les télécommunications."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-soft">{about.text1}</p>
            <p className="mt-4 text-lg leading-relaxed text-soft">{about.text2}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/societe" className="btn-primary">
                <Users className="h-5 w-5" /> Découvrir notre équipe
              </Link>
              <Link href="/services" className="btn-ghost">
                <Cog className="h-5 w-5" /> Nos services
              </Link>
            </div>
          </Reveal>

          <Reveal delay={1} className="perspective relative">
            <Spotlight tilt={7} className="rounded-3xl">
              <div className="overflow-hidden rounded-3xl border border-[var(--border)] shadow-brand">
                <Image src={about.image} alt="Équipe AnyxTech au Bénin" width={720} height={540} className="h-full w-full object-cover" />
              </div>
            </Spotlight>
            <div className="absolute -bottom-6 -right-4 z-20 animate-float rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-4 shadow-card sm:-right-6">
              <div className="font-display text-4xl font-bold text-brand-light">{about.badgeValue}</div>
              <div className="text-sm text-soft">{about.badgeLabel}</div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-4">
          {about.stats.map((s, i) => (
            <Reveal key={i} delay={i}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 text-center shadow-card">
                <div className="font-display text-4xl font-bold text-brand-light md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-soft">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
