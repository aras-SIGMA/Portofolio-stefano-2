import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useI18n, type TKey } from "../i18n";

const EASE = [0.65, 0.05, 0, 1] as const;

export default function MobileNav({
  open,
  onClose,
  links,
  active,
}: {
  open: boolean;
  onClose: () => void;
  links: { href: string; key: TKey }[];
  active: string;
}) {
  const { t } = useI18n();

  // Kunci scroll halaman saat menu terbuka
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("nav.openMenu")}
        >
          {/* Panel latar bergeser masuk berurutan */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.575, delay: i * 0.12, ease: EASE }}
              className={
                i === 2
                  ? "absolute inset-0 bg-bg-base"
                  : "absolute inset-0 bg-surface-card"
              }
            />
          ))}

          {/* Bentuk ambient mengikuti hover tiap link */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
            <div className="absolute -right-16 top-1/4 h-64 w-64 rounded-full bg-accent-soft blur-3xl" />
            <div className="absolute -left-20 bottom-1/4 h-72 w-72 rounded-full bg-accent-soft blur-3xl" />
          </div>

          <button
            onClick={onClose}
            aria-label={t("nav.openMenu")}
            className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-bg-base/80 backdrop-blur"
          >
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ rotate: 0 }}
              animate={{ rotate: 45 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <path d="M12 5v14M5 12h14" />
            </motion.svg>
          </button>

          <nav className="relative flex h-full flex-col justify-center px-8">
            <ul className="space-y-1">
              {links.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "140%", rotate: 10, opacity: 0 }}
                    animate={{ y: "0%", rotate: 0, opacity: 1 }}
                    exit={{ y: "140%", opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.35 + i * 0.05,
                      ease: EASE,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={onClose}
                      className={`block py-1.5 font-display text-3xl font-semibold tracking-tight transition-colors ${
                        active === link.href
                          ? "text-text-main"
                          : "text-text-muted"
                      }`}
                    >
                      {t(link.key)}
                    </a>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
