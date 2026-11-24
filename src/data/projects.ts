export interface Project {
  name: string;
  description: string;
  language: string;
  demo?: string;
  repo: string;
  featured?: boolean;
}

/** Fallback statis — dipakai jika GitHub API gagal / rate-limited. */
export const fallbackProjects: Project[] = [
  {
    name: "Cleano",
    description:
      "Aplikasi mobile berbasis Flutter untuk layanan kebersihan — booking, jadwal, dan manajemen pesanan.",
    language: "Flutter / Dart",
    demo: "https://cleano-chi.vercel.app",
    repo: "https://github.com/aras-SIGMA/Cleano-",
    featured: true,
  },
  {
    name: "Picflow",
    description:
      "Web app pengelolaan foto dengan alur kerja yang ringkas — upload, kelola, dan bagikan galeri.",
    language: "JavaScript",
    demo: "https://picflow-eta.vercel.app",
    repo: "https://github.com/aras-SIGMA/Picflow",
    featured: true,
  },
  {
    name: "Dinely",
    description:
      "Aplikasi pemesanan makanan berbasis Svelte — menu, keranjang, dan checkout yang sederhana.",
    language: "Svelte",
    demo: "https://dinely-blush.vercel.app",
    repo: "https://github.com/aras-SIGMA/Dinely",
    featured: true,
  },
  {
    name: "Vivilia Blog App",
    description:
      "Blog management full-stack: Flutter + Node.js Express, JWT auth, CRUD artikel, kategori, dan pencarian.",
    language: "Flutter / Node.js",
    repo: "https://github.com/aras-SIGMA/Vivilia-Blog-App_mobileApp-",
    featured: true,
  },
  {
    name: "AI Rock Paper Scissors",
    description: "Permainan suit melawan AI berbasis web dengan JavaScript.",
    language: "JavaScript",
    demo: "https://ai-rps-ten.vercel.app",
    repo: "https://github.com/aras-SIGMA/AI_RPS",
  },
  {
    name: "QR Code Generator",
    description: "Web generator QR code menggunakan JavaScript murni.",
    language: "CSS / JS",
    repo: "https://github.com/aras-SIGMA/QR-Code-Generator",
  },
  {
    name: "Crud Produk",
    description: "Aplikasi CRUD produk sederhana dengan JavaScript.",
    language: "JavaScript",
    demo: "https://crud-produk.vercel.app",
    repo: "https://github.com/aras-SIGMA/Crud-Produk",
  },
  {
    name: "Notespace",
    description: "Aplikasi pencatatan catatan dengan JavaScript.",
    language: "JavaScript",
    repo: "https://github.com/aras-SIGMA/Notespace",
  },
  {
    name: "ShutterCycle",
    description: "Website bertema fotografi dengan CSS responsif.",
    language: "CSS",
    demo: "https://shutter-cycle.vercel.app",
    repo: "https://github.com/aras-SIGMA/ShutterCycle-",
  },
];
