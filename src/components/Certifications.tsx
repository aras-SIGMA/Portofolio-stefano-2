import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { certifications } from "../data/certifications";
import { Reveal } from "./motion/Reveal";

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  // Progress line timeline: tumbuh mengikuti scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section ref={ref} id="certifications" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          Certification &amp; Training
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Sertifikasi &amp; Training
        </h2>
      </Reveal>

      <div className="relative mt-10 pl-6">
        {/* Track + progress line */}
        <div className="absolute left-0 top-0 h-full w-px bg-surface-border" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-text-main"
        />

        <ol className="space-y-0">
          {certifications.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border border-surface-border bg-primary" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <span className="font-mono text-xs text-text-muted">
                  {c.year}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-muted">
                {c.issuer}
                {c.link && (
                  <>
                    {" · "}
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text-main underline-offset-4 hover:underline"
                    >
                      lihat sertifikat
                    </a>
                  </>
                )}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
