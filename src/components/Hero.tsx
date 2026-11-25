import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/profile";
import { useI18n } from "../i18n";
import { useIsDark } from "../hooks/useIsDark";
import { useTypewriter } from "../hooks/useTypewriter";
import ProfileCard from "./ui/ProfileCard";
import { InteractiveGrid } from "./ui/interactive-grid";

export default function Hero() {
  const { t } = useI18n();
  const typed = useTypewriter(profile.roles);
  const ref = useRef<HTMLElement>(null);
  const isDark = useIsDark();

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
      className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center overflow-hidden px-6 py-20"
    >
      {/* Background: grid interaktif mengikuti pointer */}
      <InteractiveGrid
        cellSize={44}
        className="text-text-main opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_45%,white,transparent)]"
      />

      {/* Background parallax: lingkaran tonal mengikuti scroll */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-soft opacity-60 blur-3xl"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative grid w-full grid-cols-1 items-center gap-16 text-center lg:grid-cols-2 lg:gap-24 lg:text-left"
      >
        {/* Kolom kiri: identitas */}
        <div>
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mx-auto w-fit rounded-full border border-surface-border bg-surface-card px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-text-muted lg:mx-0"
          >
            {t("hero.badge")}
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
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted lg:mx-0"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="#projects"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-contrast transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(42,37,41,0.15)]"
            >
              {t("hero.viewProjects")}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-surface-border px-6 py-3 text-sm font-medium text-text-main transition-colors duration-200 hover:bg-accent-soft"
            >
              {t("hero.contactMe")}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 font-mono text-xs uppercase tracking-[0.08em] text-text-muted"
          >
            {profile.location} · {t("profile.statusFull")}
          </motion.p>
        </div>

        {/* Kolom kanan: kartu identitas interaktif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          <ProfileCard
            avatarUrl="/profile.jpg"
            name={profile.name}
            title={profile.roles[0]}
            handle={profile.username}
            status={t("profile.statusShort")}
            statusColor="#7a9b76"
            contactText="Contact"
            theme={isDark ? "dark" : "light"}
            holo={0.8}
            glare={0.5}
            tiltStrength={12}
            parallax={8}
            radius={16}
            enableTilt
            intro
            showUserInfo
            enableMobileTilt={false}
            onContactClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </motion.div>
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
