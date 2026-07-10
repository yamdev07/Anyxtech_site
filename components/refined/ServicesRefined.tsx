import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Spotlight from "@/components/ui/Spotlight";
import AdminEdit from "@/components/admin/AdminEdit";
import { resolveIcon } from "@/lib/services";
import { getServices } from "@/lib/services-data";

const imageMap: Record<string, string> = {
  communication: "/images/team.png",
  reseau: "/images/network.jpeg",
  wifi: "/images/smart-city.jpeg",
  energie: "/images/numerique.jpeg",
  marketing: "/images/image_nouvelles-tech.jpeg",
  support: "/images/support.jpeg",
};

export default async function ServicesRefined() {
  const services = await getServices();
  return (
    <section id="services" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Nos domaines d'expertise"
          title={<>Nos <span className="text-gradient">domaines d&apos;expertise</span></>}
          subtitle="Solutions complètes pour votre transformation numérique et énergétique au Bénin."
        />
        <div className="mt-4 text-center">
          <AdminEdit href="/dashboard/services" label="Gérer les services" />
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => {
            const Icon = resolveIcon(s.icon);
            return (
              <Reveal key={s.slug} delay={i % 3} className="perspective h-full">
                <Spotlight tilt={6} className="h-full rounded-2xl">
                  <Link
                    href={`/services#${s.slug}`}
                    className="card-glow group relative flex h-full flex-col overflow-hidden p-0"
                  >
                    <span className={`absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-gradient-to-r ${s.color} transition-transform duration-500 group-hover:scale-x-100`} />
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={s.image ?? imageMap[s.slug] ?? "/images/Business_tech.jpg"}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className={`absolute -bottom-6 left-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 [transform:translateZ(35px)]`}>
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 pt-10">
                      <h3 className="font-display text-xl font-bold">{s.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-soft">{s.short}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-all group-hover:gap-2.5 dark:text-brand-light">
                        En savoir plus <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 text-center">
          <h3 className="mb-6 font-display text-2xl font-bold">
            Prêt à transformer votre entreprise au Bénin ?
          </h3>
          <Link href="/contact" className="btn-primary">
            Contactez-nous dès maintenant
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
