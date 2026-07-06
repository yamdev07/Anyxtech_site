"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

export default function ScrollParallax({
  children,
  className = "",
  y = 40,
  x = 0,
  rotate = 0,
  scale = 1,
  springConfig = { stiffness: 100, damping: 30, mass: 1 },
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  rotate?: number;
  scale?: number;
  springConfig?: { stiffness: number; damping: number; mass: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [y, -y]);
  const rawX = useTransform(scrollYProgress, [0, 1], [x, -x]);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [rotate, -rotate]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale]);

  const smoothY = useSpring(rawY, springConfig);
  const smoothX = useSpring(rawX, springConfig);
  const smoothRotate = useSpring(rawRotate, springConfig);
  const smoothScale = useSpring(rawScale, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{
        y: smoothY,
        x: smoothX,
        rotate: smoothRotate,
        scale: smoothScale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
