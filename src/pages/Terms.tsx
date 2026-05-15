import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-6 md:p-20">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-12">
          <ChevronLeft size={16} /> Kembali ke Beranda
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <header className="space-y-4">
            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Syarat & Ketentuan</h1>
            <p className="text-black/40 dark:text-white/40 font-medium">Terakhir diperbarui: 15 Mei 2026</p>
          </header>

          <article className="prose dark:prose-invert max-w-none space-y-8 text-black/70 dark:text-white/70 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-black dark:text-white">1. Penggunaan Layanan</h2>
              <p>
                Dengan mengakses KelasWeb, Anda setuju untuk menggunakan platform ini hanya untuk tujuan pembelajaran pribadi. Anda dilarang membagikan akun atau konten eksklusif di dalamnya kepada pihak lain tanpa izin tertulis.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-black dark:text-white">2. Akses Materi</h2>
              <p>
                Akses materi bersifat eksklusif bagi pengguna yang telah terdaftar. Kami berhak mencabut akses jika ditemukan pelanggaran terhadap syarat dan ketentuan ini.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-black dark:text-white">3. Kekayaan Intelektual</h2>
              <p>
                Seluruh materi, video, kode, dan desain di KelasWeb adalah milik intelektual kami. Penggandaan atau distribusi ilegal akan diproses sesuai hukum yang berlaku.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-black dark:text-white">4. Perubahan Layanan</h2>
              <p>
                Kami berhak memperbarui konten atau mengubah fitur platform kapan saja untuk meningkatkan kualitas pengalaman belajar Anda.
              </p>
            </section>
          </article>

          <footer className="pt-12 border-t border-black/10 dark:border-white/10 text-xs text-black/40 dark:text-white/40">
            &copy; 2026 KelasWeb Indonesia. Seluruh hak cipta dilindungi undang-undang.
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
