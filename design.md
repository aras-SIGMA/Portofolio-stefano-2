# Design System Specification — Portofolio Stefano

## 1. Overview and Aesthetic Direction
- **Style Archetype**: Clean Minimalist, editorial-leaning portfolio
- **Core Mood**: Calm, professional, warm-minimal (bukan steril putih)
- **Primary Viewport & Density**: Desktop spacious, turun ke mobile compact
- **Theme**: Dual mode — Light (default) dan Dark, via toggle

## 2. Color Palette (Semantic Tokens)

Palet inti dari referensi: **Charcoal `#2A2529`** dan **Pale Ivory `#F3F0E7`**.
Sistem ini *monokrom hangat*: ivory sebagai kanvas terang, charcoal sebagai tinta. Dark mode cukup membalik peran keduanya.

### Light Mode (default)
| Token Name | Value | Role / Usage |
| :--- | :--- | :--- |
| `color-bg-base` | `#F3F0E7` | Background utama halaman |
| `color-surface-card` | `#FAF8F2` | Card, panel, area terangkat |
| `color-surface-border` | `#E3DED2` | Border card, divider, input |
| `color-text-main` | `#2A2529` | Heading dan body text |
| `color-text-muted` | `#6E6660` | Caption, label sekunder, placeholder |
| `color-primary` | `#2A2529` | Tombol utama, link aktif (tinta di atas ivory) |
| `color-primary-contrast` | `#F3F0E7` | Teks di atas `color-primary` |
| `color-accent-soft` | `#E9E3D5` | Hover state, chip, badge netral |

### Dark Mode
| Token Name | Value | Role / Usage |
| :--- | :--- | :--- |
| `color-bg-base` | `#2A2529` | Background utama halaman |
| `color-surface-card` | `#332E32` | Card, panel, area terangkat |
| `color-surface-border` | `#453E43` | Border card, divider, input |
| `color-text-main` | `#F3F0E7` | Heading dan body text |
| `color-text-muted` | `#A79E97` | Caption, label sekunder, placeholder |
| `color-primary` | `#F3F0E7` | Tombol utama, link aktif (ivory di atas charcoal) |
| `color-primary-contrast` | `#2A2529` | Teks di atas `color-primary` |
| `color-accent-soft` | `#3B353A` | Hover state, chip, badge netral |

### Status (kedua mode, versi muted agar tetap minimalis)
| Token | Value | Usage |
| :--- | :--- | :--- |
| `color-status-success` | `#7A9B76` | Indikator positif |
| `color-status-warning` | `#C9A227` | Peringatan |
| `color-status-danger` | `#B4574E` | Error / destruktif |

> Prinsip: tidak ada warna aksen cerah. Hierarki dibentuk lewat kontras ivory↔charcoal, bukan warna.

## 2b. Komposisi Warna 60-40-10

Setiap layar/section dibagi berdasar proporsi visual:

| Porsi | Peran | Light Mode | Dark Mode |
| :--- | :--- | :--- | :--- |
| **60% — Dominan** | Kanvas terbesar: background halaman, ruang kosong, section background | `color-bg-base` `#F3F0E7` | `color-bg-base` `#2A2529` |
| **40% — Sekunder** | Permukaan & struktur: card, panel, navbar, border, chip, blok teks body | `color-surface-card` `#FAF8F2` + `color-accent-soft` `#E9E3D5` + border | `color-surface-card` `#332E32` + `color-accent-soft` `#3B353A` + border |
| **10% — Aksen** | Titik fokus: heading, tombol utama, link aktif, ikon, angka statistik, typing text | `color-primary` `#2A2529` | `color-primary` `#F3F0E7` |

**Aturan penerapan:**
- Jangan biarkan aksen (10%) menyebar: satu section cukup 1–2 elemen fokus charcoal/ivory pekat (mis. tombol CTA + judul).
- Card dan chip termasuk 40% — boleh banyak, asal tonal (selisih halus dari background), bukan kontras keras.
- Ruang kosong (ivory/charcoal polos) adalah bagian dari desain — jangan takut area besar tanpa konten.
- Hero: 60% ivory background, 40% foto + teks pendukung, 10% nama & CTA berwarna charcoal pekat.
- Dark mode otomatis membalik proporsi ini karena token sudah swap — komposisi tetap terjaga.

## 3. Typography
Kesan minimalis ditopang oleh sans-serif geometris yang bersih.

- **Font Family**:
  - Display / Heading: `"Poppins"`, `"Space Grotesk"`, `sans-serif` — geometris, sedikit rounded, cocok dengan nuansa referensi
  - Body: `"Inter"`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif` — netral dan sangat terbaca
  - Monospace (kode/label teknis): `"JetBrains Mono"`, `monospace`
- **Type Scale**:
  - `Display / H1`: `clamp(40px, 6vw, 64px)`, weight 600, line-height 1.1, letter-spacing -0.02em
  - `Heading / H2 (section title)`: `32px`, weight 600, line-height 1.2, letter-spacing -0.01em
  - `Subheading / H3`: `20px`, weight 500, line-height 1.35
  - `Body Regular`: `16px`, weight 400, line-height 1.65
  - `Body Small`: `14px`, weight 400, line-height 1.55
  - `Caption / Overline`: `12px`, weight 500, letter-spacing 0.08em, uppercase (untuk label section seperti "PROJECTS", "SKILLS")

## 4. Spacing and Layout Architecture
- **Base Grid Unit**: 8px scale
  - `space-xs`: 4px · `space-sm`: 8px · `space-md`: 16px · `space-lg`: 24px · `space-xl`: 32px · `space-2xl`: 48px · `space-3xl`: 80px (antar section)
- **Container**: max-width `1120px`, horizontal padding `24px` (mobile) / `32px` (desktop)
- **Section Spacing**: vertical `space-3xl` (80px) antar section, dengan overline label + judul di setiap section
- **Grid**:
  - Projects: 1 kolom mobile, 2 kolom tablet, 3 kolom desktop, gap `24px`
  - Skills: kelompok per kategori, chip flow dengan gap `8px`

## 5. Shape, Elevation, and Borders
- **Border Radii**:
  - Input/badge kecil: `8px`
  - Card: `16px`
  - Pill/avatar/toggle: `9999px`
- **Borders**: `1px solid var(--color-surface-border)`
- **Shadows / Elevation** (sangat halus, sesuai minimalis):
  - Flat: `none`
  - Card rest: `0 1px 2px rgba(42,37,41,0.04)`
  - Card hover: `0 8px 24px rgba(42,37,41,0.10)`
  - Dark mode: shadow hampir tak terlihat, andalkan perbedaan `surface-card` vs `bg-base`

## 6. Generic Component Specifications

### Buttons
- **Primary**: bg `color-primary`, text `color-primary-contrast`, padding `12px 24px`, radius `9999px`, weight 500; hover: sedikit naik (`translateY(-1px)`) + shadow card-hover
- **Outline**: bg transparent, border `1px solid color-surface-border`, text `color-text-main`; hover: bg `color-accent-soft`
- **Ghost**: bg transparent, text `color-text-muted`; hover: bg `color-accent-soft`, text `color-text-main`

### Cards & Surfaces
- **Project Card**: bg `color-surface-card`, border 1px, radius `16px`, padding `24px`, gap internal `12px`; hover: shadow card-hover + border sedikit menggelap
- **Stat Card (GitHub)**: sama dengan project card, angka pakai Display scale, label pakai Caption

### Navigation
- **Navbar**: height `64px`, bg `color-bg-base` dengan blur `backdrop-filter: blur(8px)` saat scroll, bottom border 1px; logo teks (weight 600), link pakai Body Small; toggle dark mode berbentuk pill switch
- **Mobile**: link collapse ke menu sederhana; tetap one-page smooth scroll

### Form / Contact
- **Input**: height `44px`, bg `color-surface-card`, border 1px, radius `8px`, padding `12px 16px`; focus: outline `2px solid color-text-main` offset 2px (bukan biru default)

### Badges & Chips
- **Skill chip**: bg `color-accent-soft`, text `color-text-main`, padding `6px 12px`, radius `9999px`, font Body Small weight 500
- **Overline label**: Caption uppercase dengan letter-spacing lebar, warna `color-text-muted`

### Iconography
- Stroke `1.5px`, size `20px` (nav/kontak) / `16px` (inline), warna mengikuti `color-text-main` atau `color-text-muted`

### Animasi (interaktif tapi tenang)
- Scroll reveal: fade + translateY 12px, durasi 400–500ms, easing `ease-out`
- Typing effect di Hero: 80ms per karakter, pause 1.5s antar frasa
- Hover card/button: transisi 200ms
- Dark mode: transisi warna 250ms
- Hormati `prefers-reduced-motion`: matikan reveal/typing

## 7. AI Agent Guardrails (Rules for Consistency)
- **Token Enforcement**: selalu pakai token semantik di atas, dilarang hardcode hex baru.
- **Monokrom disiplin**: satu-satunya "warna" adalah ivory & charcoal; hierarki lewat kontras, bukan warna tambahan.
- **60-40-10 wajib**: cek setiap section — 60% kanvas (bg-base), 40% permukaan tonal (card/chip/border), 10% aksen pekat (primary). Aksen tidak boleh melebihi ~10% area visual.
- **Spacing**: kelipatan 8px; antar section 80px.
- **Radius harmony**: card 16px, input/chip kecil 8px, pill 9999px — jangan dicampur dalam satu komponen.
- **Accessibility**: kontras teks ≥ 4.5:1 (ivory di atas charcoal ≈ 12:1, aman); semua interaktif punya focus state terlihat.
- **Feature-agnostic**: token & komponen ini berlaku untuk semua section (hero, projects, skills, certification, contact) tanpa membawa elemen visual dari referensi lain.
