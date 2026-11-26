import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

export const THEME_CHANGE_EVENT = "portfolio-theme-change";

export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const mm = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    const onMM = () => setIsDark(mm.matches);
    const onThemeEvent = () => flushSync(sync);

    sync();
    mm.addEventListener("change", onMM);
    window.addEventListener(THEME_CHANGE_EVENT, onThemeEvent);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mm.removeEventListener("change", onMM);
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeEvent);
      observer.disconnect();
    };
  }, []);

  return isDark;
}
