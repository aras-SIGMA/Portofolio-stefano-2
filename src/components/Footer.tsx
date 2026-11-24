import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="font-mono text-xs">
          Built with React + Vite · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
