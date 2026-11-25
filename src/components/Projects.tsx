import { motion } from "framer-motion";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { useI18n } from "../i18n";
import { Reveal } from "./motion/Reveal";
import { GlowCard, GlowCardGrid } from "./ui/glow-card-grid";

// ponytail: thumbnail stok Unsplash, diputar per kartu — ganti dengan screenshot
// repo asli saat tersedia.
const THUMBS = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop",
];

export default function Projects() {
  const { t } = useI18n();
  const { projects, loading } = useGithubRepos();

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
        <GlowCardGrid className="mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-52 w-full animate-pulse rounded-2xl bg-surface-card"
            />
          ))}
        </GlowCardGrid>
      ) : (
        <GlowCardGrid className="mt-10">
          {projects.map((p, i) => (
            <motion.a
              key={p.repo}
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: Math.min(i * 0.06, 0.3),
                ease: "easeOut",
              }}
            >
              <GlowCard
                name={p.name}
                handle={
                  p.featured
                    ? `${t("projects.featured")} · ${p.language}`
                    : p.language
                }
                avatar={THUMBS[i % THUMBS.length]}
              />
            </motion.a>
          ))}
        </GlowCardGrid>
      )}
    </section>
  );
}
