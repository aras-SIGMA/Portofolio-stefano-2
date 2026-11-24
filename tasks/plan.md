# Implementation Plan: Portofolio Stefano

## Overview
Web portofolio one-page untuk Stefano (aras-SIGMA), siswa RPL yang akan masuk PKL. Tujuan utama: menampilkan profil profesional lengkap — project, skill, sertifikasi, training, kontribusi GitHub, dan kontak — dengan gaya minimalis terang, interaktif, dan mendukung dark mode.

## Architecture Decisions
- **React + Vite**: ringan, cepat, cocok untuk dikembangkan terus, deploy mudah ke Vercel.
- **One-page layout**: semua section dalam satu halaman dengan navigasi smooth scroll.
- **Data-driven content**: data project/skill/sertifikasi dipisah ke file `data/` agar mudah diupdate tanpa mengubah komponen.
- **GitHub live data**: fetch repo publik dari GitHub API untuk section Projects & kontribusi.
- **Styling**: Tailwind CSS untuk konsistensi dan kecepatan development.
- **Animasi**: Framer Motion untuk scroll reveal, hover, typing effect ringan.

## Target User
1. Pembimbing PKL / industri — menilai kesiapan dan kemampuan.
2. Rekruter / mentor — melihat project dan skill.
3. Komunitas developer — melihat kontribusi dan karya.

## Task List

### Phase 1: Foundation
- [ ] **Task 1: Setup project React + Vite + Tailwind**
  - Inisialisasi Vite React project.
  - Install Tailwind CSS, konfigurasi theme (warna, font).
  - Setup struktur folder: `src/components`, `src/data`, `src/assets`.
  - **Acceptance:** `npm run dev` jalan tanpa error, Tailwind aktif.
  - **Files:** `package.json`, `tailwind.config.js`, `src/index.css`, `src/main.jsx`

- [ ] **Task 2: Layout dasar + Navbar + Dark mode toggle**
  - Navbar sticky dengan link section (Home, About, Projects, Skills, Certification, Contact).
  - Dark mode toggle (class-based, simpan preferensi di localStorage).
  - Smooth scroll antar section.
  - **Acceptance:** Navbar tampil, toggle dark mode berfungsi, scroll halus.
  - **Files:** `src/components/Navbar.jsx`, `src/components/ThemeToggle.jsx`, `src/App.jsx`

### Checkpoint 1
- [ ] Dev server jalan, dark mode berfungsi, struktur folder rapi.

### Phase 2: Core Sections
- [ ] **Task 3: Hero section**
  - Foto profil, nama, tagline singkat, CTA (Lihat Project, Kontak).
  - Typing effect untuk role (mis. "Frontend Developer", "Flutter Enthusiast").
  - **Acceptance:** Hero tampil responsif, foto + nama + typing effect jalan.
  - **Files:** `src/components/Hero.jsx`, `src/data/profile.js`

- [ ] **Task 4: About Me section**
  - Ringkasan diri, fokus belajar, tujuan PKL.
  - Info singkat: lokasi (Depok), status siswa RPL, minat.
  - **Acceptance:** Konten about jelas dan responsif.
  - **Files:** `src/components/About.jsx`, `src/data/profile.js`

- [ ] **Task 5: Projects section (data dari GitHub)**
  - Fetch repo publik dari GitHub API (`users/aras-SIGMA/repos`).
  - Tampilkan sebagai card: nama, deskripsi, bahasa, link demo (homepage), link repo.
  - Highlight project unggulan (Cleano, Picflow, Dinely, Vivilia).
  - Fallback: kalau API gagal, tampilkan data statis dari `src/data/projects.js`.
  - **Acceptance:** Project card tampil, link jalan, responsif, ada fallback.
  - **Files:** `src/components/Projects.jsx`, `src/data/projects.js`, `src/hooks/useGithubRepos.js`

- [ ] **Task 6: Skills & Tools section**
  - Kategori: Frontend, Mobile, Backend, Tools.
  - Tampilkan sebagai badge/chip dengan icon.
  - **Acceptance:** Skill tampil rapi per kategori.
  - **Files:** `src/components/Skills.jsx`, `src/data/skills.js`

- [ ] **Task 7: Sertifikasi & Training section**
  - Timeline/list sertifikasi dan training.
  - Data awal dari `src/data/certifications.js` (bisa diisi manual dulu).
  - **Acceptance:** Section tampil, mudah diupdate.
  - **Files:** `src/components/Certifications.jsx`, `src/data/certifications.js`

- [ ] **Task 8: GitHub Contribution section**
  - Tampilkan statistik: jumlah repo, followers, kontribusi.
  - Link ke profile GitHub.
  - Opsional: contribution graph (gambar dari github-readme-stats).
  - **Acceptance:** Statistik tampil, link ke GitHub jalan.
  - **Files:** `src/components/GithubStats.jsx`

### Checkpoint 2
- [ ] Semua section utama tampil dan responsif.
- [ ] Data GitHub berhasil dimuat (atau fallback aktif).

### Phase 3: Contact & Polish
- [ ] **Task 9: Contact & Footer**
  - Email, GitHub, LinkedIn, WhatsApp (ikon + link).
  - Footer sederhana dengan copyright.
  - **Acceptance:** Semua link kontak jalan.
  - **Files:** `src/components/Contact.jsx`, `src/components/Footer.jsx`, `src/data/profile.js`

- [ ] **Task 10: Animasi & interaksi**
  - Scroll reveal (Framer Motion `whileInView`).
  - Hover effect pada card dan button.
  - Transisi dark mode halus.
  - **Acceptance:** Animasi jalan, tidak mengganggu performa.
  - **Files:** komponen yang sudah ada

- [ ] **Task 11: Responsive + SEO dasar**
  - Cek mobile/tablet/desktop.
  - Meta title, description, favicon, Open Graph.
  - **Acceptance:** Tampil bagus di semua ukuran layar; meta tag lengkap.
  - **Files:** `index.html`, semua komponen

- [ ] **Task 12: Build & deploy ke Vercel**
  - `npm run build` tanpa error.
  - Deploy ke Vercel, custom domain (opsional).
  - **Acceptance:** Web live dan bisa diakses.
  - **Files:** `vercel.json` (jika perlu)

### Checkpoint 3
- [ ] Web live di Vercel.
- [ ] Semua section berfungsi.
- [ ] Siap dipakai untuk keperluan PKL.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| GitHub API rate limit | Medium | Fallback ke data statis; cache hasil fetch |
| Foto profil belum ada | Low | Pakai placeholder dulu, ganti nanti |
| Konten sertifikasi belum lengkap | Low | Buat struktur data dulu, isi bertahap |
| Animasi berlebihan membuat lambat | Medium | Batasi animasi, gunakan lazy load |

## Open Questions
- Foto profil: pakai foto asli atau avatar ilustrasi? (sudah dijawab: pakai foto)
- Apakah perlu blog/artikel? (default: tidak untuk MVP)
- Sertifikasi apa saja yang sudah dimiliki? (perlu diisi user)
