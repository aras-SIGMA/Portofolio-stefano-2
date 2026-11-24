import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
        Skills &amp; Tools
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Keahlian
      </h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-surface-border bg-surface-card p-6"
          >
            <h3 className="font-display text-base font-semibold">
              {group.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-text-main"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
