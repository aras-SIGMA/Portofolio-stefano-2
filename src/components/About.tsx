import { profile } from "../data/profile";
import { Reveal, RevealItem, RevealStagger } from "./motion/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          About Me
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Tentang Saya
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto]">
        <RevealStagger className="max-w-2xl space-y-5 text-lg leading-relaxed text-text-muted">
          {profile.about.map((paragraph, i) => (
            <RevealItem key={i}>
              <p>{paragraph}</p>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.15}>
          <dl className="space-y-4 rounded-2xl border border-surface-border bg-surface-card p-6 text-sm">
            {[
              ["Nama", profile.name],
              ["Lokasi", profile.location],
              ["Status", profile.status],
              ["Fokus", "Web · Mobile · Full-stack"],
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
