import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - KelasWeb Indonesia';
  }, []);
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
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Kebijakan Privasi</h1>
            <p className="text-black/40 dark:text-white/40 font-medium">Terakhir diperbarui: 15 Mei 2026</p>
          </header>

          <article className="prose dark:prose-invert max-w-none space-y-8 text-black/70 dark:text-white/70 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-black dark:text-white">1. Informasi yang Kami Kumpulkan</h2>
              <p>
                Saat Anda masuk menggunakan Google, kami hanya mengumpulkan informasi dasar profil Anda seperti Nama, Alamat Email, dan Foto Profil. Informasi ini digunakan semata-mata untuk proses autentikasi dan personalisasi pengalaman belajar Anda di KelasWeb.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-black dark:text-white">2. Penggunaan Data</h2>
              <p>
                Kami menggunakan data Anda untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Memverifikasi hak akses Anda terhadap materi pembelajaran.</li>
                <li>Menyimpan progres belajar Anda (cloud sync).</li>
                <li>Memberikan sertifikat digital atas nama Anda setelah kursus selesai.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-black dark:text-white">3. Keamanan Data</h2>
              <p>
                Keamanan informasi Anda adalah prioritas kami. Kami menggunakan enkripsi standar industri dan layanan aman dari Cloudflare untuk melindungi data Anda dari akses yang tidak sah. Kami tidak akan pernah menjual atau membagikan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-black dark:text-white">4. Kontak</h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, Anda dapat menghubungi kami melalui WhatsApp Admin yang tertera di halaman utama.
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

export default Privacy;
