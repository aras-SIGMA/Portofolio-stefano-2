import { useEffect, useState } from "react";
import { fallbackProjects, type Project } from "../data/projects";
import { safeHttpUrl } from "../lib/safeUrl";

const GITHUB_USER = "aras-SIGMA";
const FETCH_TIMEOUT_MS = 8000;

export function useGithubRepos() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}/repos?sort=updated&per_page=30`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const repos: unknown = await res.json();
        if (!Array.isArray(repos)) throw new Error("Invalid GitHub API payload");

        // ponytail: filter manual — exclude profile README & ujian/laporan repo
        const skip = new Set([
          `${GITHUB_USER.toLowerCase()}`,
          "ujian_github1",
          "ujian_github-1",
          "crud-data-siswa-xi-rpl-2",
          "menghitung-data-nilai-siswa",
          "picflow-mobileapp",
          "portofolio-stefano",
        ]);

        const mapped: Project[] = [];
        for (const r of repos) {
          if (!r || typeof r !== "object") continue;
          const rec = r as Record<string, unknown>;
          const rawName = typeof rec.name === "string" ? rec.name : "";
          const repoUrl = safeHttpUrl(rec.html_url);
          if (!rawName || !repoUrl || rec.fork === true || skip.has(rawName.toLowerCase())) {
            continue;
          }
          mapped.push({
            name: rawName.replace(/[-_]/g, " ").trim(),
            description:
              typeof rec.description === "string" && rec.description.trim()
                ? rec.description.trim()
                : "Project pribadi — lihat repo untuk detail.",
            language: typeof rec.language === "string" && rec.language ? rec.language : "Lainnya",
            demo: safeHttpUrl(rec.homepage),
            repo: repoUrl,
          });
        }

        // gabungkan: featured statis dulu, lalu sisanya dari API
        const featured = fallbackProjects.filter((p) => p.featured);
        const featuredNames = new Set(featured.map((p) => p.name.toLowerCase()));
        const seen = new Set(featured.map((p) => p.repo));
        const extra = mapped.filter((p) => {
          if (featuredNames.has(p.name.toLowerCase()) || seen.has(p.repo)) return false;
          seen.add(p.repo);
          return true;
        });

        if (!cancelled) {
          setProjects([...featured, ...extra]);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setProjects(fallbackProjects);
          setLoading(false);
        }
      } finally {
        window.clearTimeout(timer);
      }
    }

    load();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return { projects, loading };
}
