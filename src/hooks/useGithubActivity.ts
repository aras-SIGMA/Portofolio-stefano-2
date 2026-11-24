import { useEffect, useState } from "react";
import type { ActivityDatum } from "../components/ui/activity-heatmap";

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
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        if (cancelled || !json?.contributions) return;
        const mapped: ActivityDatum[] = json.contributions.map(
          (c: { date: string; count: number }) => ({ date: c.date, value: c.count }),
        );
        setData(mapped);
        setLive(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, live };
}
