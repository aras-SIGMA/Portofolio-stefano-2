import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-end px-6 py-4">
        <ThemeToggle />
      </header>

      <section className="flex flex-col items-center px-6 pt-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          Portofolio Stefano
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">
          Setup OK — Tailwind aktif
        </h1>
        <p className="mt-4 max-w-md text-text-muted">
          Charcoal #2A2529 · Pale Ivory #F3F0E7 — coba toggle di kanan atas
          untuk dark mode.
        </p>

        <div className="mt-8 rounded-2xl border border-surface-border bg-surface-card px-6 py-4">
          <p className="text-sm text-text-muted">
            Card surface (40%) di atas kanvas (60%), aksen teks (10%)
          </p>
        </div>
      </section>
    </main>
  );
}
