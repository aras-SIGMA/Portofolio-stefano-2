import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
        About Me
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Tentang Saya
      </h2>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto]">
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-text-muted">
          {profile.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <dl className="space-y-4 rounded-2xl border border-surface-border bg-surface-card p-6 text-sm">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Nama
            </dt>
            <dd className="mt-1 font-medium">{profile.name}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Lokasi
            </dt>
            <dd className="mt-1 font-medium">{profile.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Status
            </dt>
            <dd className="mt-1 font-medium">{profile.status}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Fokus
            </dt>
            <dd className="mt-1 font-medium">Web · Mobile · Full-stack</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
