export type CertificationCategory =
  | "Data & AI"
  | "Software Engineering"
  | "Professional Skills";

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  category: CertificationCategory;
  link?: string;
  image?: string;
}

/** Data asli — diekstrak dari sertifikat Dicoding milik Stefano. */
export const certifications: Certification[] = [
  {
    title: "Belajar Fundamental Deep Learning",
    issuer: "Dicoding",
    year: "2026",
    category: "Data & AI",
    link: "https://dicoding.com/certificates/RVZKMEWLEXD5",
  },
  {
    title: "Belajar Machine Learning untuk Pemula",
    issuer: "Dicoding",
    year: "2026",
    category: "Data & AI",
    link: "https://dicoding.com/certificates/NVP7W8OD4ZR0",
    image: "sertifikat_course_Belajar_Machine_Learning_untuk_Pemulapdf_pages-to-jpg-0001.webp",
  },
  {
    title: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding",
    year: "2026",
    category: "Software Engineering",
    link: "https://dicoding.com/certificates/07Z6QV66MZQR",
    image: "sertifikat_course_Memulai_Pemograman_dengan_Python_pages-to-jpg-0001.webp",
  },
  {
    title: "Belajar Dasar Structured Query Language (SQL)",
    issuer: "Dicoding",
    year: "2026",
    category: "Data & AI",
    link: "https://dicoding.com/certificates/4EXGJ6D0QXRL",
    image: "sertifikat_course_Belajar_Dasar_SQL_pages-to-jpg-0001.webp",
  },
  {
    title: "Belajar Dasar Data Science",
    issuer: "Dicoding",
    year: "2026",
    category: "Data & AI",
    link: "https://dicoding.com/certificates/MEPJM5GR6P3V",
    image: "sertifikat_course_Belajar_Dasar_Data_Science_pages-to-jpg-0001.webp",
  },
  {
    title: "Belajar Dasar Visualisasi Data",
    issuer: "Dicoding",
    year: "2026",
    category: "Data & AI",
    link: "https://dicoding.com/certificates/81P2K248QXOY",
    image: "sertifikat_course_Belajar_Dasar_Visualisai_Data_pages-to-jpg-0001.webp",
  },
  {
    title: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding",
    year: "2026",
    category: "Software Engineering",
    link: "https://dicoding.com/certificates/JLX1K129GP72",
    image: "sertifikat_course_Belajar_Prinsip_pemograman_SOLID_pages-to-jpg-0001.webp",
  },
  {
    title: "Prompt Engineering untuk Software Developer",
    issuer: "Dicoding",
    year: "2026",
    category: "Software Engineering",
    link: "https://dicoding.com/certificates/NVP7W1MRVZR0",
    image: "sertifikat_course_Prompt_Engineering_untuk_Software_Developer_pages-to-jpg-0001.webp",
  },
  {
    title: "Belajar Dasar Manajemen Proyek",
    issuer: "Dicoding",
    year: "2026",
    category: "Professional Skills",
    link: "https://dicoding.com/certificates/72ZDMQR7JZYW",
    image: "sertifikat_course_Belajar_Dasar_Manajemen_Proyek_page-0001.webp",
  },
  {
    title: "Belajar Strategi Pengembangan Diri",
    issuer: "Dicoding",
    year: "2026",
    category: "Professional Skills",
    link: "https://dicoding.com/certificates/0LZ0J3RY0X65",
    image: "sertifikat_course_Belajar_Strategi_Pengembangan_Diri_page-0001.webp",
  },
  {
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding",
    year: "2026",
    category: "Professional Skills",
    link: "https://dicoding.com/certificates/KEXLM3Y7RZG2",
    image: "sertifikat_course_Introduction_to_Financial_Literacy_page-0001.webp",
  },
];
