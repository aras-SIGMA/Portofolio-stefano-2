import { useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "../hooks/useTheme";
import { THEME_CHANGE_EVENT } from "../hooks/useIsDark";
import { useI18n } from "../i18n";

export default function ThemeToggle() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === "dark";

  const handleToggle = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startVT = (document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    }).startViewTransition;

    if (reduced || !startVT || !btnRef.current) {
      toggle();
      return;
    }

    const rect = btnRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const goingToLight = isDark;
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${endRadius}px`);
    root.classList.add("vt-active", goingToLight ? "vt-to-light" : "vt-to-dark");

    const transition = startVT.call(document, () => {
      flushSync(() => {
        toggle();
      });
      // Sinkronkan class .dark & komponen useIsDark() sebelum snapshot baru diambil
      root.classList.toggle("dark", !isDark);
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    });

    transition.finished.finally(() => {
      root.classList.remove("vt-active", "vt-to-light", "vt-to-dark");
      root.style.removeProperty("--vt-x");
      root.style.removeProperty("--vt-y");
      root.style.removeProperty("--vt-r");
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={handleToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={
        isDark
          ? t("theme.disableDark")
          : t("theme.enableDark")
      }
      className="relative inline-flex h-7 w-14 shrink-0 touch-manipulation cursor-pointer items-center rounded-full border border-surface-border bg-surface-card transition-colors duration-[250ms]"
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-contrast transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark ? "translate-x-8" : "translate-x-1"
        }`}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
