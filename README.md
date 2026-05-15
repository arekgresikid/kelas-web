# KelasWeb - Tutorial Web Modular (Vibe Coding)

Web edukasi modular untuk belajar membuat website dari nol menggunakan bantuan AI.

## 🚀 Fitur Utama
- **Modular Markdown**: Materi disimpan dalam file `.md` yang mudah dikelola.
- **Dinamis**: Menambah materi baru semudah menambah file di folder `src/materi`.
- **Searchable**: Cari materi berdasarkan judul atau konten.
- **Progress Tracking**: Menandai materi yang sudah dibaca (disimpan di LocalStorage).
- **Dark Mode**: Nyaman dibaca siang maupun malam.
- **Responsif**: Tampilan optimal di HP maupun Desktop.

## 🛠 Tech Stack
- **Framework**: React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Markdown**: React-Markdown + RemarkGFM
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Instalasi dan Menjalankan Lokal

1. Pastikan Anda sudah menginstal **Node.js**.
2. Buka terminal di folder proyek ini.
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Jalankan mode pengembangan:
   ```bash
   npm run dev
   ```
5. Buka `http://localhost:5173` di browser Anda.

## 📝 Cara Menambah Materi Baru

1. Buat folder baru di dalam `src/materi/` (misal: `modul8/`).
2. Buat file Markdown baru dengan format `nama-materi.md`.
3. Tambahkan **Frontmatter** di bagian paling atas file:
   ```yaml
   ---
   title: "Judul Materi Anda"
   modul: 8
   order: 1
   description: "Deskripsi singkat materi ini."
   ---
   ```
4. Gunakan heading level 2 (`## Sub-materi`) untuk membuat daftar isi otomatis.
5. Simpan file, dan web akan mendeteksi materi baru secara otomatis!

## 🌍 Deploy ke Vercel/Netlify

Web ini bersifat statis, sehingga sangat mudah di-deploy:
1. Hubungkan repository GitHub Anda ke Vercel atau Netlify.
2. Atur Build Command: `npm run build`
3. Atur Publish Directory: `dist`
4. Klik Deploy!

---
Dibuat dengan ❤️ oleh Kelas Web Indonesia
