export interface Certification {
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

/** TODO: isi dengan sertifikasi & training asli milik Stefano. */
export const certifications: Certification[] = [
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    year: "2025",
  },
  {
    title: "Memulai Pemrograman dengan Flutter",
    issuer: "Dicoding",
    year: "2025",
  },
  {
    title: "Training GitHub — Version Control & Kolaborasi",
    issuer: "Self-paced / Sekolah",
    year: "2025",
  },
];
