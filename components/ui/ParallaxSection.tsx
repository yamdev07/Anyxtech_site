"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.15,
  direction = "y",
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "x" | "y";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const offset = speed * 100;
  const transform: MotionValue<string> =
    direction === "y"
      ? useTransform(scrollYProgress, [0, 1], [`${offset}px`, `${-offset}px`])
      : useTransform(scrollYProgress, [0, 1], [`${offset}px`, `${-offset}px`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ [direction]: transform }}>
        {children}
      </motion.div>
    </div>
  );
}
