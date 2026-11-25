import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { useI18n } from "../i18n";
import { Reveal } from "./motion/Reveal";

export default function Projects() {
  const { t } = useI18n();
  const { projects, loading } = useGithubRepos();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  function scrollBy(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const step = card ? card.clientWidth + 24 : 320;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  function updateArrows() {
    const track = trackRef.current;
    if (!track) return;
    setCanLeft(track.scrollLeft > 8);
    setCanRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 8,
    );
  }

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          Projects
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Project &amp; Karya
        </h2>
        <p className="mt-4 max-w-xl text-text-muted">
          {t("projects.subtitle")}
        </p>
      </Reveal>

      {loading ? (
        <div className="mt-10 flex gap-6 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-64 w-[320px] shrink-0 animate-pulse rounded-2xl border border-surface-border bg-surface-card"
            />
          ))}
        </div>
      ) : (
        <div className="relative mt-10">
          {/* Tombol navigasi carousel */}
          <div className="absolute -top-16 right-0 flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canLeft}
              aria-label={t("projects.scrollLeft")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface-card transition-all duration-200 enabled:hover:bg-accent-soft disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canRight}
              aria-label={t("projects.scrollRight")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface-card transition-all duration-200 enabled:hover:bg-accent-soft disabled:opacity-30"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((p, i) => (
              <motion.article
                key={p.repo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.3), ease: "easeOut" }}
                className="group flex w-[320px] shrink-0 snap-start flex-col rounded-2xl border border-surface-border bg-surface-card p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(42,37,41,0.10)] sm:w-[360px]"
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
                  {p.description || t("projects.fallbackDesc")}
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
                        {t("projects.demo")}
                      </a>
                    )}
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-text-main underline-offset-4 hover:underline"
                    >
                      {t("projects.repo")}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
