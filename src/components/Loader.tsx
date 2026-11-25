import { useEffect, useRef, useState } from "react";

const CMD = "stefano@rpl:~$ npm run portofolio";
const TYPE_MS = 28;
const PROGRESS_MS = 550;
const EXIT_MS = 550;

/**
 * Loading screen saat pertama kali masuk: terminal boot singkat.
 * Typing perintah → progress 0-100% → tirai naik, halaman di-mount di baliknya.
 * prefers-reduced-motion: skip typing/progress, fade singkat.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [chars, setChars] = useState(() => (reduced.current ? CMD.length : 0));
  const [pct, setPct] = useState(() => (reduced.current ? 100 : 0));
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  // Typing perintah
  useEffect(() => {
    if (reduced.current) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= CMD.length) window.clearInterval(id);
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, []);

  // Progress bar setelah typing selesai
  useEffect(() => {
    if (chars < CMD.length) return;
    if (reduced.current) {
      setPct(100);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / PROGRESS_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [chars]);

  // Exit: mount halaman di balik tirai, lalu tirai naik
  useEffect(() => {
    if (pct < 100) return;
    const hold = reduced.current ? 150 : 250;
    const t1 = window.setTimeout(() => {
      setExiting(true);
      onDoneRef.current();
    }, hold);
    const t2 = window.setTimeout(() => setGone(true), hold + EXIT_MS + 50);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pct]);

  if (gone) return null;

  return (
    <div
      role="status"
      aria-label="Memuat portofolio"
      className={
        reduced.current
          ? `fixed inset-0 z-[100] flex items-center justify-center bg-bg-base transition-opacity duration-300 ${
              exiting ? "opacity-0" : "opacity-100"
            }`
          : `fixed inset-0 z-[100] flex items-center justify-center bg-bg-base transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] ${
              exiting ? "-translate-y-full" : "translate-y-0"
            }`
      }
    >
      <div className="w-full max-w-xs px-6 font-mono text-[13px] leading-relaxed">
        <p className="whitespace-pre text-text-main">
          {CMD.slice(0, chars)}
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[3px] animate-pulse bg-text-main"
          />
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-surface-border">
            <div
              className="h-full rounded-full bg-success"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-10 text-right tabular-nums text-text-muted">
            {String(pct).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
