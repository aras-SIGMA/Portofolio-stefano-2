import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import { RandomLetterSwap } from "./ui/random-letter-swap";
import { profile } from "../data/profile";
import { useI18n, type TKey } from "../i18n";

const links: { href: string; key: TKey }[] = [
  { href: "#home", key: "nav.home" },
  { href: "#about", key: "nav.about" },
  { href: "#projects", key: "nav.projects" },
  { href: "#skills", key: "nav.skills" },
  { href: "#certifications", key: "nav.certifications" },
  { href: "#github", key: "nav.github" },
  { href: "#contact", key: "nav.contact" },
];

export default function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sembunyikan navbar saat scroll turun, muncul saat scroll naik
  useEffect(() => {
    return scrollY.on("change", (y) => {
      const prev = (scrollY as any).prev ?? 0;
      setHidden(y > prev && y > 120);
      (scrollY as any).prev = y;
    });
  }, [scrollY]);

  // Scroll spy: tandai section yang sedang dilihat
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Tutup menu mobile dengan tombol Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? -72 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          style={{ scaleX: progress }}
          className="h-0.5 origin-left bg-text-main"
          aria-hidden="true"
        />
        <nav
          className={`border-b transition-all duration-300 ${
            scrolled || open
              ? "border-surface-border bg-bg-base/95 backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#home"
            className="font-display text-lg font-semibold tracking-tight"
          >
            {profile.name}
            <span className="text-text-muted">.</span>
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative text-sm transition-colors duration-200 ${
                    active === link.href
                      ? "text-text-main"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  <RandomLetterSwap
                    label={t(link.key)}
                    staggerDuration={0.025}
                    className="text-sm"
                  />
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-text-main"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              aria-label={t("nav.toggleLang")}
              className="flex h-7 items-center rounded-full border border-surface-border px-2 font-mono text-[10px] uppercase tracking-widest text-text-muted transition-colors duration-200 hover:text-text-main"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                >
                  {lang === "id" ? "ID" : "EN"}
                </motion.span>
              </AnimatePresence>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={t("nav.openMenu")}
              aria-expanded={open}
              className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-surface-border transition-transform active:scale-95 md:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      </motion.header>

      {/* Mobile menu: fullscreen overlay ala Sterling Gate */}
      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        links={links}
        active={active}
      />
    </>
  );
}
