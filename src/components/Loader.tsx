import { useEffect, useRef, useState } from "react";

import { useI18n } from "../i18n";

const CMD = "stefano@rpl:~$ npm run portofolio";
const LOGS = [
  "vite v8.3.8 building...",
  "✓ 6542 modules transformed.",
  "✓ built in 218ms",
];
const TYPE_MS = 28;
const LINE_MS = 260;
const PROGRESS_MS = 700;
const EXIT_MS = 600;

/**
 * Loading screen saat pertama kali masuk: terminal boot.
 * Typing perintah → log build → progress 0-100% → tirai naik, halaman di-mount di baliknya.
 * prefers-reduced-motion: skip typing/progress, fade singkat.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const reduced = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [chars, setChars] = useState(() => (reduced.current ? CMD.length : 0));
  const [line, setLine] = useState(() => (reduced.current ? LOGS.length : 0));
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

  // Log build muncul satu per satu setelah typing selesai
  useEffect(() => {
    if (chars < CMD.length || reduced.current) return;
    const id = window.setInterval(() => {
      setLine((l) => {
        if (l >= LOGS.length) {
          window.clearInterval(id);
          return l;
        }
        return l + 1;
      });
    }, LINE_MS);
    return () => window.clearInterval(id);
  }, [chars]);

  // Progress bar setelah log selesai
  useEffect(() => {
    if (line < LOGS.length) return;
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
  }, [line]);

  // Exit: mount halaman di balik tirai, lalu tirai naik
  useEffect(() => {
    if (pct < 100) return;
    const hold = reduced.current ? 150 : 400;
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
      aria-label={t("loader.aria")}
      className={
        reduced.current
          ? `fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg-base transition-opacity duration-300 ${
              exiting ? "opacity-0" : "opacity-100"
            }`
          : `fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg-base transition-transform duration-[600ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
              exiting ? "-translate-y-full" : "translate-y-0"
            }`
      }
    >
      {/* Hiasan: dot grid halus di background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-text-muted opacity-[0.16] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* Hiasan: meta kecil di sudut */}
      <p
        aria-hidden="true"
        className="absolute bottom-4 left-5 font-mono text-[11px] text-text-muted"
      >
        stefano@rpl:~
      </p>
      <p
        aria-hidden="true"
        className="absolute bottom-4 right-5 font-mono text-[11px] text-text-muted"
      >
        RPL · 2026
      </p>

      <div className="relative w-full max-w-xs px-6 font-mono text-[13px] leading-relaxed">
        <p className="whitespace-pre text-text-main">
          {CMD.slice(0, chars)}
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[3px] animate-pulse bg-text-main"
          />
        </p>
        <div className="mt-3 min-h-[3.9rem] space-y-1">
          {LOGS.slice(0, line).map((log) => (
            <p
              key={log}
              className={`animate-[pc-log-in_200ms_ease-out_both] ${
                log.startsWith("✓") ? "text-success" : "text-text-muted"
              }`}
            >
              {log}
            </p>
          ))}
        </div>
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
