import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const stats = [
  { value: 50, suffix: "+", label: "Clients satisfaits" },
  { value: 20, suffix: "+", label: "Projets réalisés" },
  { value: 10, suffix: "+", label: "Experts techniques" },
  { value: 24, suffix: "/7", label: "Support client" },
];

export default function StatsAgency() {
  return (
    <section className="bg-white pb-4 dark:bg-ink">
      <div className="container-x">
        <Reveal className="grid grid-cols-2 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-dark via-brand-blue to-brand-light text-white md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-8 text-center ${i > 0 ? "md:border-l md:border-white/15" : ""} ${
                i % 2 === 1 ? "border-l border-white/15" : ""
              } ${i >= 2 ? "border-t border-white/15 md:border-t-0" : ""}`}
            >
              <div className="font-display text-4xl font-bold sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
