import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Particles from "@/components/ui/Particles";
import Reveal from "@/components/ui/Reveal";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  image = "/images/Business_tech.jpg",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[55vh] items-center overflow-hidden text-white">
      {/* Fond photo + overlay (cohérent avec l'accueil) */}
      <Image src={image} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink/90" />
      <div className="absolute inset-0 grid-bg opacity-[0.15]" aria-hidden />
      <Particles />

      <div className="container-x relative z-10 py-24 text-center">
        <Reveal>
          <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-brand-light">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-brand-light">{breadcrumb}</span>
          </nav>

          {eyebrow && (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
              {eyebrow}
            </span>
          )}

          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">{subtitle}</p>
          )}
        </Reveal>
      </div>

      {/* Vague (comme l'accueil) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" aria-hidden>
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="h-[70px] w-full fill-[var(--bg)]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
        </svg>
      </div>
    </section>
  );
}
