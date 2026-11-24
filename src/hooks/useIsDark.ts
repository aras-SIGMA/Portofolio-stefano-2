import { useEffect, useState } from "react";

export function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const mm = window.matchMedia("(prefers-color-scheme: dark)");
    const onMM = () => setIsDark(mm.matches);
    const onClass = () => setIsDark(document.documentElement.classList.contains("dark"));

    onClass();
    mm.addEventListener("change", onMM);
    const observer = new MutationObserver(onClass);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mm.removeEventListener("change", onMM);
      observer.disconnect();
    };
  }, []);

  return isDark;
}
