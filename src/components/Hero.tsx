import { profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="home"
      className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center"
    >
      {/* 10% aksen: foto + nama + CTA */}
      <div className="relative">
        <img
          src="/favicon.svg"
          alt={`Foto ${profile.name}`}
          className="h-28 w-28 rounded-full border border-surface-border bg-surface-card object-cover"
        />
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-surface-border bg-surface-card px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          Open to PKL
        </span>
      </div>

      <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
        {profile.name}
      </h1>

      <p className="mt-3 h-7 font-mono text-base text-text-muted">
        {typed}
        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-text-main align-middle [&]:h-4" />
      </p>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
        {profile.tagline}
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-contrast transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(42,37,41,0.15)]"
        >
          Lihat Project
        </a>
        <a
          href="#contact"
          className="rounded-full border border-surface-border px-6 py-3 text-sm font-medium text-text-main transition-colors duration-200 hover:bg-accent-soft"
        >
          Hubungi Saya
        </a>
      </div>

      <p className="mt-12 font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
        {profile.location} · {profile.status}
      </p>
    </section>
  );
}
