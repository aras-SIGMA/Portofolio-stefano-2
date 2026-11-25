import { profile } from "../data/profile";
import { useI18n } from "../i18n";
import { Reveal, RevealItem, RevealStagger } from "./motion/Reveal";
import { useGithubActivity } from "../hooks/useGithubActivity";
import ActivityHeatmap from "./ui/activity-heatmap";

export default function GithubStats() {
  const { t } = useI18n();
  const { data, live } = useGithubActivity(profile.username);
  const stats = [
    { label: t("github.repos"), value: "22" },
    { label: t("github.followers"), value: "9" },
    { label: t("github.focus"), value: t("github.focusValue") },
    { label: t("github.status"), value: t("github.statusValue") },
  ];

  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          GitHub
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("github.title")}
        </h2>
      </Reveal>

      <RevealStagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <RevealItem
            key={item.label}
            className="rounded-2xl border border-surface-border bg-surface-card p-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              {item.label}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold">
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
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-surface-border px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-accent-soft"
        >
          <GithubIcon />
          github.com/{profile.username}
        </a>
      </Reveal>

      <Reveal delay={0.25} className="mt-8">
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6">
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
