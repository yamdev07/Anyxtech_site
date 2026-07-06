"use client";

import { motion, type Variants, type Target, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "blur" | "rotate";

interface RevealState {
  hidden: Target;
  visible: TargetAndTransition;
}

const variantMap: Record<RevealVariant, RevealState> = {
  up: {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  left: {
    hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  right: {
    hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(16px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -4, y: 30, filter: "blur(4px)" },
    visible: { opacity: 1, rotate: 0, y: 0, filter: "blur(0px)" },
  },
};

function getVariants(variant: RevealVariant): Variants {
  const v = variantMap[variant];
  return {
    hidden: v.hidden,
    visible: (i: number = 0) => ({
      ...v.visible,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.08,
      },
    }),
  };
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  variant?: RevealVariant;
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={getVariants(variant)}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
