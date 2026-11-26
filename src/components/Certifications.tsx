import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { certifications, type CertificationCategory } from "../data/certifications";
import { useI18n } from "../i18n";
import { useIsDark } from "../hooks/useIsDark";
import { useIsMobile } from "../hooks/useIsMobile";
import LangTitle from "./LangTitle";
import { Reveal } from "./motion/Reveal";
import GlassFolder, { type FolderFile } from "./ui/glass-folder-cards";

const certImages = import.meta.glob("../assets/sertifikat_*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const certImage = (file?: string) =>
  file ? certImages[`../assets/${file}`] : undefined;

const CATEGORIES: CertificationCategory[] = [
  "Data & AI",
  "Software Engineering",
  "Professional Skills",
];

/** Satu folder glass per kategori; isinya file-file sertifikat. */
function CategoryFolder({
  category,
  index,
  folderWidth,
}: {
  category: CertificationCategory;
  index: number;
  folderWidth: number;
}) {
  const isDark = useIsDark();
  const items = useMemo(
    () =>
      certifications
        .filter((c) => c.category === category)
        .map<FolderFile>((c) => ({
          name: c.title,
          meta: `${c.issuer} · ${c.year}`,
          image: certImage(c.image),
          href: c.link,
        })),
    [category],
  );

  const art = (["glacier", "dusk", "verdant"] as const)[index % 3];

  return (
    <GlassFolder
      label={category}
      tone={isDark ? "dark" : "light"}
      art={art}
      seed={index * 7 + 3}
      files={items}
      action="none"
      width={folderWidth}
      className="max-w-full"
    />
  );
}

export default function Certifications() {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  // Progress line timeline: tumbuh mengikuti scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section ref={ref} id="certifications" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          Certification &amp; Training
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          <LangTitle k="certs.title" />
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-text-muted">
          {t("certs.subtitle")}
        </p>
      </Reveal>

      <div className="relative mt-8 pl-4 sm:mt-10 sm:pl-6">
        {/* Track + progress line */}
        <div className="absolute left-0 top-0 h-full w-px bg-surface-border" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-primary"
        />

        <div className="flex flex-wrap items-end justify-center gap-x-10 gap-y-10 py-4 sm:gap-y-16 sm:py-6">
          {CATEGORIES.map((category, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            >
              <CategoryFolder
                category={category}
                index={i}
                folderWidth={isMobile ? 268 : 340}
              />
            </motion.div>
          ))}
        </div>

        <ol className="sr-only">
          {certifications.map((c) => (
            <li key={c.title}>
              {c.title} — {c.issuer} {c.year}
              {c.link ? (
                <a href={c.link} target="_blank" rel="noreferrer">
                  {t("certs.verify")}
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
