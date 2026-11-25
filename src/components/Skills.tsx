import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ApiIcon,
  CodeIcon,
  CloudIcon,
  Css3Icon,
  DartIcon,
  FigmaIcon,
  GitBranchIcon,
  Html5Icon,
  JavaScriptIcon,
  MobileProgramming01Icon,
  PythonIcon,
  ReactIcon,
  ServerCogIcon,
  ShieldKeyIcon,
  TailwindcssIcon,
  TerminalIcon,
  Typescript01Icon,
} from "@hugeicons/core-free-icons";
import { skillGroups } from "../data/skills";
import { Reveal } from "./motion/Reveal";

// Icon per skill; fallback CodeIcon untuk yang tidak punya brand icon di free set
const skillIcons: Record<string, typeof CodeIcon> = {
  HTML: Html5Icon,
  CSS: Css3Icon,
  JavaScript: JavaScriptIcon,
  React: ReactIcon,
  Svelte: CodeIcon,
  "Tailwind CSS": TailwindcssIcon,
  Flutter: MobileProgramming01Icon,
  Dart: DartIcon,
  "Node.js": TerminalIcon,
  Express: ServerCogIcon,
  "REST API": ApiIcon,
  "JWT Auth": ShieldKeyIcon,
  TypeScript: Typescript01Icon,
  Python: PythonIcon,
  Git: GitBranchIcon,
  Vercel: CloudIcon,
  Figma: FigmaIcon,
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Teks besar bergeser horizontal mengikuti scroll (marquee lambat)
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-12%"]);

  return (
    <section ref={ref} id="skills" className="relative overflow-hidden py-20">
      {/* Sticky headline besar di background */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none">
        <motion.p
          style={{ x }}
          aria-hidden="true"
          className="whitespace-nowrap font-display text-[18vw] font-bold leading-none text-text-main opacity-[0.04]"
        >
          SKILLS · TOOLS · SKILLS · TOOLS
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
            Skills &amp; Tools
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Keahlian
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: gi * 0.08, ease: "easeOut" }}
              className="rounded-2xl border border-surface-border bg-surface-card p-6"
            >
              <h3 className="font-display text-base font-semibold">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="flex cursor-default items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-text-main"
                  >
                    <HugeiconsIcon
                      icon={skillIcons[skill] ?? CodeIcon}
                      size={14}
                      strokeWidth={1.8}
                      className="shrink-0 text-text-muted"
                      aria-hidden
                    />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
