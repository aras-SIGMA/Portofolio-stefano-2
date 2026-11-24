import { useGithubRepos } from "../hooks/useGithubRepos";

export default function Projects() {
  const { projects, loading } = useGithubRepos();

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
        Projects
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Project &amp; Karya
      </h2>
      <p className="mt-4 max-w-xl text-text-muted">
        Project pribadi dan eksperimen — sebagian live di Vercel, semua
        open-source di GitHub.
      </p>

      {loading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl border border-surface-border bg-surface-card"
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.repo}
              className="group flex flex-col rounded-2xl border border-surface-border bg-surface-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(42,37,41,0.10)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold capitalize">
                  {p.name}
                </h3>
                {p.featured && (
                  <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    Featured
                  </span>
                )}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                {p.description}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-surface-border pt-4">
                <span className="font-mono text-xs text-text-muted">
                  {p.language}
                </span>
                <div className="flex gap-3 text-sm font-medium">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text-main underline-offset-4 hover:underline"
                    >
                      Demo
                    </a>
                  )}
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-main underline-offset-4 hover:underline"
                  >
                    Repo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
