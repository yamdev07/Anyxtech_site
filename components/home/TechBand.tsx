import Marquee from "@/components/ui/Marquee";

const techs = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Laravel",
  "Docker",
  "AWS",
  "PostgreSQL",
  "Fibre optique",
  "Énergie solaire",
  "Cybersécurité",
  "Cloud",
];

export default function TechBand() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] bg-soft py-10">
      <p className="container-x mb-6 text-center text-sm font-medium uppercase tracking-widest text-soft">
        Les technologies qui propulsent vos projets
      </p>
      <Marquee
        className="text-2xl font-display font-semibold text-soft sm:text-3xl"
        items={techs}
      />
      {/* Dégradés de fondu sur les bords */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-soft)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-soft)] to-transparent" />
    </section>
  );
}
