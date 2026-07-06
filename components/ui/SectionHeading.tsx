import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  centered?: boolean;
}) {
  return (
    <Reveal className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <span className="chip mb-5 glass-heavy">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
          <span className="text-eyebrow">{eyebrow}</span>
        </span>
      )}
      <h2 className="section-title heading-display">{title}</h2>
      {subtitle && (
        <p className="mt-5 text-subtitle text-soft max-w-2xl mx-auto">{subtitle}</p>
      )}
    </Reveal>
  );
}
