import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { useI18n } from "../i18n";
import LangTitle from "./LangTitle";
import { Reveal, RevealItem, RevealStagger } from "./motion/Reveal";
import { useGithubActivity } from "../hooks/useGithubActivity";
import ActivityHeatmap from "./ui/activity-heatmap";

export default function GithubStats() {
  const { t } = useI18n();
  const { data, live } = useGithubActivity(profile.username);
  const [counts, setCounts] = useState({ repos: "22", followers: "9" });

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${encodeURIComponent(profile.username)}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((u: unknown) => {
        if (!u || typeof u !== "object") return;
        const rec = u as Record<string, unknown>;
        const repos = typeof rec.public_repos === "number" ? String(rec.public_repos) : null;
        const followers = typeof rec.followers === "number" ? String(rec.followers) : null;
        if (repos || followers) {
          setCounts((prev) => ({
            repos: repos ?? prev.repos,
            followers: followers ?? prev.followers,
          }));
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const stats = [
    { label: t("github.repos"), value: counts.repos },
    { label: t("github.followers"), value: counts.followers },
    { label: t("github.focus"), value: t("github.focusValue") },
    { label: t("github.status"), value: t("github.statusValue") },
  ];

  return (
    <section id="github" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          GitHub
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          <LangTitle k="github.title" />
        </h2>
      </Reveal>

      <RevealStagger className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-4">
        {stats.map((item) => (
          <RevealItem
            key={item.label}
            className="rounded-2xl border border-surface-border bg-surface-card p-4 sm:p-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {item.label}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              {item.value}
            </p>
          </RevealItem>
        ))}
      </RevealStagger>

      <Reveal delay={0.2}>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex touch-manipulation items-center gap-2 rounded-full border border-surface-border px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent-soft active:scale-[0.98] sm:mt-8"
        >
          <GithubIcon />
          github.com/{profile.username}
        </a>
      </Reveal>

      <Reveal delay={0.25} className="mt-6 sm:mt-8">
        <div className="rounded-2xl border border-surface-border bg-surface-card p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-base font-semibold">
              Contribution Graph
            </h3>
            <p className="font-mono text-xs text-text-muted">
              {live
                ? t("github.lastYear")
                : t("github.sample")}
            </p>
          </div>
          <ActivityHeatmap
            data={data}
            days={365}
            unit=""
            defaultView="calendar"
          />
        </div>
      </Reveal>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
