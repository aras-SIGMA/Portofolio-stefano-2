import { certifications } from "../data/certifications";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
        Certification &amp; Training
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Sertifikasi &amp; Training
      </h2>

      <ol className="mt-10 space-y-0 border-l border-surface-border pl-6">
        {certifications.map((c) => (
          <li key={c.title} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border border-surface-border bg-primary" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              <span className="font-mono text-xs text-text-muted">
                {c.year}
              </span>
            </div>
            <p className="mt-1 text-sm text-text-muted">
              {c.issuer}
              {c.link && (
                <>
                  {" · "}
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-main underline-offset-4 hover:underline"
                  >
                    lihat sertifikat
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
