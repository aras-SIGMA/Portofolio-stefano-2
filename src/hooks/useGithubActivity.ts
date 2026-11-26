import { useEffect, useState } from "react";
import type { ActivityDatum } from "../components/ui/activity-heatmap";

const FETCH_TIMEOUT_MS = 8000;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Kontribusi GitHub untuk heatmap. Sumber: jogruber v4 (publik, tanpa
 * token) — sama seperti ContributionGraph sebelumnya. Gagal → pola
 * deterministik supaya UI tetap terisi.
 *
 * ponytail: fallback dummy; upgrade path = cache localStorage + SWR.
 */
function fallbackYear(): ActivityDatum[] {
  const days: ActivityDatum[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const seed = (d.getDate() * 7 + d.getMonth() * 13 + d.getDay()) % 11;
    const count = seed < 3 ? 0 : seed < 6 ? 1 + (seed % 2) : seed < 9 ? 3 + (seed % 3) : 8 + (seed % 5);
    days.push({ date: d.toISOString().slice(0, 10), value: count });
  }
  return days;
}

export function useGithubActivity(username: string) {
  const [data, setData] = useState<ActivityDatum[]>(fallbackYear);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { signal: controller.signal, cache: "no-store" },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json: unknown) => {
        if (cancelled || !json || typeof json !== "object") return;
        const contribs = (json as Record<string, unknown>).contributions;
        if (!Array.isArray(contribs)) return;

        const mapped: ActivityDatum[] = [];
        for (const item of contribs) {
          if (!item || typeof item !== "object") continue;
          const rec = item as Record<string, unknown>;
          if (
            typeof rec.date === "string" &&
            ISO_DATE_RE.test(rec.date) &&
            typeof rec.count === "number" &&
            Number.isFinite(rec.count) &&
            rec.count >= 0
          ) {
            mapped.push({ date: rec.date, value: rec.count });
          }
        }
        if (mapped.length > 0) {
          setData(mapped);
          setLive(true);
        }
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timer));

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [username]);

  return { data, live };
}
