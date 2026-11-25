import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Lang = "id" | "en";

const id = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.skills": "Skills",
  "nav.certifications": "Certification",
  "nav.github": "GitHub",
  "nav.contact": "Contact",
  "nav.openMenu": "Buka menu",
  "nav.toggleLang": "Ganti bahasa ke Inggris",

  "hero.badge": "Open to PKL",
  "hero.tagline":
    "Siswa RPL yang membangun produk web & mobile — dari ide, desain, sampai deploy.",
  "hero.viewProjects": "Lihat Project",
  "hero.contactMe": "Hubungi Saya",

  "about.title": "Tentang Saya",
  "about.p1":
    "Halo, saya Stefano — siswa Rekayasa Perangkat Lunak dari Depok. Saya suka mengubah ide menjadi aplikasi yang benar-benar bisa dipakai, dari web hingga mobile.",
  "about.p2":
    "Saya fokus di frontend (React, Flutter) namun juga membangun backend sendiri (Node.js/Express) untuk project pribadi. Saat ini saya sedang mencari kesempatan PKL untuk belajar langsung di lingkungan industri, berkontribusi pada produk nyata, dan mempercepat pertumbuhan saya sebagai developer.",
  "about.name": "Nama",
  "about.location": "Lokasi",
  "about.status": "Status",
  "about.focus": "Fokus",
  "about.focusValue": "Web · Mobile · Full-stack",

  "projects.title": "Project & Karya",
  "projects.subtitle":
    "Project pribadi dan eksperimen — geser untuk melihat semua karya.",
  "projects.featured": "Featured",
  "projects.demo": "Demo",
  "projects.repo": "Repo",
  "projects.scrollLeft": "Geser ke kiri",
  "projects.scrollRight": "Geser ke kanan",
  "projects.fallbackDesc": "Project pribadi — lihat repo untuk detail.",
  "projects.otherLang": "Lainnya",

  "skills.title": "Keahlian",
  "skills.frontend": "Frontend",
  "skills.mobile": "Mobile",
  "skills.backend": "Backend",
  "skills.other": "Bahasa & Lainnya",

  "certs.title": "Sertifikasi & Training",
  "certs.subtitle":
    "Semua sertifikat dikelompokkan per kategori. Arahkan kursor untuk membuka map, klik untuk melihat isinya, lalu klik salah satu sertifikat untuk memverifikasi di Dicoding.",
  "certs.verify": "verifikasi",

  "github.title": "Kontribusi & Statistik",
  "github.repos": "Public Repos",
  "github.followers": "Followers",
  "github.focus": "Fokus",
  "github.status": "Status",
  "github.focusValue": "Web & Mobile",
  "github.statusValue": "Open to PKL",
  "github.lastYear": "kontribusi setahun terakhir",
  "github.sample": "contoh data — menunggu GitHub",

  "contact.title": "Mari Terhubung",
  "contact.subtitle":
    "Terbuka untuk kesempatan PKL, kolaborasi project, atau sekadar diskusi seputar web & mobile development.",

  "footer.work": "Work",
  "footer.social": "Social",
  "footer.contact": "Contact",
  "footer.backToTop": "Back to top ↑",

  "loader.aria": "Memuat portofolio",

  "theme.disableDark": "Matikan dark mode",
  "theme.enableDark": "Aktifkan dark mode",

  "profile.statusFull": "Siswa Rekayasa Perangkat Lunak · Siap PKL",
  "profile.statusShort": "Siap PKL",
} as const;

export type TKey = keyof typeof id;

const en: Record<TKey, string> = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.skills": "Skills",
  "nav.certifications": "Certification",
  "nav.github": "GitHub",
  "nav.contact": "Contact",
  "nav.openMenu": "Open menu",
  "nav.toggleLang": "Switch language to Indonesian",

  "hero.badge": "Open to PKL",
  "hero.tagline":
    "A software engineering student building web & mobile products — from idea, design, to deployment.",
  "hero.viewProjects": "View Projects",
  "hero.contactMe": "Contact Me",

  "about.title": "About Me",
  "about.p1":
    "Hi, I'm Stefano — a software engineering student from Depok. I love turning ideas into applications people can actually use, from web to mobile.",
  "about.p2":
    "I focus on frontend (React, Flutter) while also building my own backends (Node.js/Express) for personal projects. Right now I'm looking for an internship (PKL) to learn directly in a real industry environment, contribute to real products, and accelerate my growth as a developer.",
  "about.name": "Name",
  "about.location": "Location",
  "about.status": "Status",
  "about.focus": "Focus",
  "about.focusValue": "Web · Mobile · Full-stack",

  "projects.title": "Projects & Work",
  "projects.subtitle":
    "Personal projects and experiments — swipe to see all of my work.",
  "projects.featured": "Featured",
  "projects.demo": "Demo",
  "projects.repo": "Repo",
  "projects.scrollLeft": "Scroll left",
  "projects.scrollRight": "Scroll right",
  "projects.fallbackDesc": "Personal project — see the repo for details.",
  "projects.otherLang": "Other",

  "skills.title": "Skills",
  "skills.frontend": "Frontend",
  "skills.mobile": "Mobile",
  "skills.backend": "Backend",
  "skills.other": "Languages & Others",

  "certs.title": "Certifications & Training",
  "certs.subtitle":
    "All certificates are grouped by category. Hover to open the folder, click to view its contents, then click a certificate to verify it on Dicoding.",
  "certs.verify": "verify",

  "github.title": "Contributions & Stats",
  "github.repos": "Public Repos",
  "github.followers": "Followers",
  "github.focus": "Focus",
  "github.status": "Status",
  "github.focusValue": "Web & Mobile",
  "github.statusValue": "Open to PKL",
  "github.lastYear": "contributions in the last year",
  "github.sample": "sample data — waiting for GitHub",

  "contact.title": "Let's Connect",
  "contact.subtitle":
    "Open to internship (PKL) opportunities, project collaboration, or just a chat about web & mobile development.",

  "footer.work": "Work",
  "footer.social": "Social",
  "footer.contact": "Contact",
  "footer.backToTop": "Back to top ↑",

  "loader.aria": "Loading portfolio",

  "theme.disableDark": "Turn off dark mode",
  "theme.enableDark": "Turn on dark mode",

  "profile.statusFull": "Software Engineering Student · Open to PKL",
  "profile.statusShort": "Open to PKL",
};

const dict: Record<Lang, Record<TKey, string>> = { id, en };

function initialLang(): Lang {
  const stored = localStorage.getItem("lang");
  return stored === "en" || stored === "id" ? stored : "id";
}

const LangCtx = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
}>({ lang: "id", setLang: () => {}, t: (k) => id[k] });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const mounted = useRef(false);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    // Animasi teks tiap bahasa berganti (tanpa remount), lewati mount pertama.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const root = document.documentElement;
    root.classList.remove("lang-swap");
    void root.offsetWidth;
    root.classList.add("lang-swap");
    const timer = window.setTimeout(
      () => root.classList.remove("lang-swap"),
      400,
    );
    return () => window.clearTimeout(timer);
  }, [lang]);

  const t = (k: TKey) => dict[lang][k];
  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useI18n() {
  return useContext(LangCtx);
}
