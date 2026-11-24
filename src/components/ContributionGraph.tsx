import { useEffect, useState } from "react";

/**
 * Contribution heatmap dari GitHub contributions API (GraphQL tidak dipakai
 * agar tanpa token — pakai endpoint publik github-contributions via
 * api.github.com/banana? Tidak ada; jadi pakai layanan publik
 * gh-calendar atau fallback data dummy deterministik).
 *
 * ponytail: pakai https://github-contributions-api.jogruber.de/v4/{user}
 * (publik, tanpa key). Kalau gagal → generate pola deterministik dari
 * tanggal supaya UI tetap terisi.
 */

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const LEVELS: Day["level"][] = [0, 1, 2, 3, 4];

function levelFromCount(count: number): Day["level"] {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function dummyYear(): Day[] {
  // pola deterministik: lebih ramai menjelang akhir tahun
  const days: Day[] = [];
  const now = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const seed = (d.getDate() * 7 + d.getMonth() * 13 + d.getDay()) % 11;
    const count = seed < 3 ? 0 : seed < 6 ? 1 + (seed % 2) : seed < 9 ? 3 + (seed % 3) : 8 + (seed % 5);
    days.push({
      date: d.toISOString().slice(0, 10),
      count,
      level: levelFromCount(count),
    });
  }
  return days;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function ContributionGraph({ username }: { username: string }) {
  const [days, setDays] = useState<Day[]>(dummyYear);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled || !data?.contributions) return;
        const mapped: Day[] = data.contributions.map((c: any) => ({
          date: c.date,
          count: c.count,
          level: LEVELS[Math.min(c.level ?? levelFromCount(c.count), 4)] as Day["level"],
        }));
        setDays(mapped);
        setTotal(mapped.reduce((s, d) => s + d.count, 0));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [username]);

  // susun jadi kolom-minggu (7 baris per kolom, mulai Minggu)
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-base font-semibold">
          Contribution Graph
        </h3>
        <p className="font-mono text-xs text-text-muted">
          {total !== null ? `${total} contributions in the last year` : "loading…"}
        </p>
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <div className="inline-flex min-w-full flex-col gap-1">
          {/* label bulan */}
          <div className="flex gap-[3px] pl-8">
            {weeks.map((week, wi) => {
              const first = week[0] ?? days[wi * 7];
              const prev = wi > 0 ? days[(wi - 1) * 7] : null;
              const showMonth = first && (!prev || prev.date.slice(5, 7) !== first.date.slice(5, 7));
              return (
                <div key={wi} className="w-[13px] shrink-0 text-[9px] text-text-muted">
                  {showMonth ? MONTHS[Number(first.date.slice(5, 7)) - 1] : ""}
                </div>
              );
            })}
          </div>

          <div className="flex gap-[3px]">
            {/* label hari */}
            <div className="flex w-8 shrink-0 flex-col gap-[3px] text-right text-[9px] text-text-muted">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="h-[13px] leading-[13px]">{label}</div>
              ))}
            </div>

            {/* grid mingguan */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex shrink-0 flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week[di];
                  if (!day) return <div key={di} className="h-[13px] w-[13px]" />;
                  return (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} contributions`}
                      className={`h-[13px] w-[13px] rounded-[3px] contrib-${day.level}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-text-muted">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`h-[11px] w-[11px] rounded-[3px] contrib-${l}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
