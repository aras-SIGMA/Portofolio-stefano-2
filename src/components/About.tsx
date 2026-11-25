import { profile } from "../data/profile";
import { useI18n } from "../i18n";
import { Reveal, RevealItem, RevealStagger } from "./motion/Reveal";

export default function About() {
  const { lang, t } = useI18n();
  const paragraphs = lang === "en" ? [t("about.p1"), t("about.p2")] : profile.about;

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          About Me
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("about.title")}
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto]">
        <RevealStagger className="max-w-2xl space-y-5 text-lg leading-relaxed text-text-muted">
          {paragraphs.map((paragraph, i) => (
            <RevealItem key={i}>
              <p>{paragraph}</p>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.15}>
          <dl className="space-y-4 rounded-2xl border border-surface-border bg-surface-card p-6 text-sm">
            {[
              [t("about.name"), profile.name],
              [t("about.location"), profile.location],
              [t("about.status"), t("profile.statusFull")],
              [t("about.focus"), t("about.focusValue")],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  {label}
                </dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
