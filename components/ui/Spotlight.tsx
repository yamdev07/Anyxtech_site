"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Carte interactive : halo lumineux qui suit le curseur + légère inclinaison 3D.
 * Le halo est en pointer-events-none, donc les liens/boutons enfants restent cliquables.
 */
export default function Spotlight({
  children,
  className = "",
  tilt = 6,
  glow = "rgba(29,185,255,0.20)",
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const sx = useSpring(mx, { stiffness: 200, damping: 22 });
  const sy = useSpring(my, { stiffness: 200, damping: 22 });

  const rotateX = useTransform(sy, [0, 1], [`${tilt}deg`, `-${tilt}deg`]);
  const rotateY = useTransform(sx, [0, 1], [`-${tilt}deg`, `${tilt}deg`]);

  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const background = useMotionTemplate`radial-gradient(240px circle at ${gx} ${gy}, ${glow}, transparent 65%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group/sp relative ${className}`}
    >
      <motion.span
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/sp:opacity-100"
      />
      {children}
    </motion.div>
  );
}
