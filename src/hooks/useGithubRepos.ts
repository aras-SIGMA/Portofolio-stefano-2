import { useEffect, useState } from "react";
import { fallbackProjects, type Project } from "../data/projects";

const GITHUB_USER = "aras-SIGMA";

export function useGithubRepos() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`,
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const repos = await res.json();

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

        const mapped: Project[] = repos
          .filter((r: any) => !r.fork && !skip.has(r.name.toLowerCase()))
          .map((r: any) => ({
            name: r.name.replace(/[-_]/g, " ").trim(),
            description: r.description ?? "Project pribadi — lihat repo untuk detail.",
            language: r.language ?? "Lainnya",
            demo: r.homepage || undefined,
            repo: r.html_url,
          }));

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
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading };
}
