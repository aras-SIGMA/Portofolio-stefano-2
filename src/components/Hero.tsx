import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const ref = useRef<HTMLElement>(null);

  // Parallax: konten hero naik & memudar saat discroll ke bawah
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      {/* Background parallax: lingkaran tonal mengikuti scroll */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-soft opacity-60 blur-3xl"
      />

      <motion.div style={{ y, opacity }} className="relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto w-fit"
        >
          <img
            src="/favicon.svg"
            alt={`Foto ${profile.name}`}
            className="h-28 w-28 rounded-full border border-surface-border bg-surface-card object-cover"
          />
          <motion.span
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-surface-border bg-surface-card px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-text-muted"
          >
            Open to PKL
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-3 h-7 font-mono text-base text-text-muted"
        >
          {typed}
          <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-text-main align-middle" />
        </motion.p>

        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-contrast transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(42,37,41,0.15)]"
          >
            Lihat Project
          </a>
          <a
            href="#contact"
            className="rounded-full border border-surface-border px-6 py-3 text-sm font-medium text-text-main transition-colors duration-200 hover:bg-accent-soft"
          >
            Hubungi Saya
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 font-mono text-xs uppercase tracking-[0.08em] text-text-muted"
        >
          {profile.location} · {profile.status}
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
