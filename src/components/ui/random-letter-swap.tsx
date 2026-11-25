import { useState } from "react";
import { motion, type Transition } from "framer-motion";

import { cn } from "../../lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** Huruf acak berganti saat hover (React Bits RandomLetterSwap). */
export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: "spring" },
}: {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: Transition;
}) {
  const [hovered, setHovered] = useState(false);
  const [glyphs, setGlyphs] = useState<string[]>([]);

  const enter = () => {
    setGlyphs(
      Array.from(label, (c) =>
        c === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      ),
    );
    setHovered(true);
  };

  return (
    <span
      onMouseEnter={enter}
      onMouseLeave={() => setHovered(false)}
      className={cn("inline-flex overflow-hidden align-bottom", className)}
      aria-label={label}
    >
      {Array.from(label).map((char, i) => (
        <span key={i} className="relative inline-block overflow-hidden">
          <motion.span
            className="block"
            animate={{ y: hovered ? "-100%" : "0%" }}
            transition={{ ...transition, delay: i * staggerDuration }}
          >
            {char}
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 block"
            animate={{ y: hovered ? "0%" : "100%" }}
            transition={{ ...transition, delay: i * staggerDuration }}
          >
            {glyphs[i] ?? char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
