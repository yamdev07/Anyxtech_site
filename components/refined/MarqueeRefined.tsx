const fallback = [
  "Communication digitale",
  "Réseaux informatiques",
  "Installation Wi-Fi",
  "Énergie solaire",
  "Marketing digital",
  "Hébergement web",
];

export default function MarqueeRefined({ items }: { items?: string[] }) {
  const list = items && items.length ? items : fallback;
  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] bg-soft py-6">
      <div className="group flex overflow-hidden">
        <div className="flex animate-marquee items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...list, ...list].map((it, i) => (
            <span key={i} className="mx-6 flex items-center gap-6 font-display text-xl font-semibold text-soft sm:text-2xl">
              {it}
              <span className="text-brand-light">✦</span>
            </span>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-soft)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-soft)] to-transparent" />
    </section>
  );
}
