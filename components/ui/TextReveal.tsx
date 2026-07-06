"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TextReveal({
  children,
  className = "",
  as: Tag = "span",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
  delay?: number;
}) {
  const MotionTag = motion[Tag] as typeof motion.div;

  const text = typeof children === "string" ? children : null;

  if (!text) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </MotionTag>
    );
  }

  const words = text.split(" ");

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
