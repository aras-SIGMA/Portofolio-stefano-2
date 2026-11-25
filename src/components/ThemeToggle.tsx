import { useTheme } from "../hooks/useTheme";
import { useI18n } from "../i18n";

export default function ThemeToggle() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={
        isDark
          ? t("theme.disableDark")
          : t("theme.enableDark")
      }
      className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border border-surface-border bg-surface-card transition-colors duration-[250ms]"
    >
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-contrast transition-transform duration-200 ${
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
