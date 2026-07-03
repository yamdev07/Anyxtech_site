import type { ReactNode } from "react";

/**
 * Bandeau défilant infini. Duplique le contenu pour un défilement continu.
 */
export default function Marquee({
  items,
  className = "",
  separator = "•",
}: {
  items: ReactNode[];
  className?: string;
  separator?: ReactNode;
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          {item}
          <span className="text-brand-light/60" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      role="marquee"
      aria-label="Domaines d'expertise AnyxTech"
    >
      <div className="flex animate-marquee items-center group-hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
