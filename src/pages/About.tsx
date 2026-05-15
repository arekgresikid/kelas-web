import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Shield, Rocket, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 md:p-16 lg:p-24 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-4xl mx-auto space-y-24">
        {/* Hero Header */}
        <header className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[10px] font-black tracking-[0.2em] uppercase"
          >
            <Sparkles size={12} />
            The Vision 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-none tracking-tighter"
          >
            Mendefinisikan Ulang <br />
            <span className="opacity-30 italic">Cara Kita Belajar.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-black/60 dark:text-white/60 max-w-2xl leading-relaxed"
          >
            KelasWeb bukan sekadar tutorial. Ini adalah ekosistem edukasi modern yang menggabungkan 
            proyek dunia nyata dengan bimbingan kecerdasan buatan.
          </motion.p>
        </header>

        {/* Pillars */}
        <section className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-6"
          >
            <Rocket className="w-12 h-12" />
            <h2 className="text-3xl font-black">Misi Kami</h2>
            <p className="text-black/60 dark:text-white/60 leading-relaxed text-lg">
              Melahirkan talenta digital yang tidak hanya paham sintaks kode, tapi juga menguasai 
              arsitektur, keamanan, dan cara berpikir seorang engineer profesional di era AI.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-10 rounded-[3rem] bg-black dark:bg-white text-white dark:text-black space-y-6"
          >
            <Shield className="w-12 h-12" />
            <h2 className="text-3xl font-black">Standar 2026</h2>
            <p className="opacity-60 leading-relaxed text-lg">
              Kurikulum kami selalu diperbarui untuk menjawab tantangan teknologi terbaru, 
              dari Vibe Coding hingga implementasi keamanan Zero-Trust.
            </p>
          </motion.div>
        </section>

        {/* Story */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-40">The Backstory</h2>
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10"></div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-2xl leading-relaxed font-medium">
              Didirikan oleh para engineer yang percaya bahwa pendidikan harus secepat perkembangan teknologi. 
              Di KelasWeb, kami menghilangkan "teori yang membosankan" dan langsung terjun ke dalam 
              pembuatan infrastruktur nyata.
            </p>
          </div>
        </section>

        {/* Footer Link */}
        <footer className="pt-24 pb-12 flex flex-col items-center text-center space-y-8">
          <Heart className="text-red-500 w-8 h-8 fill-current" />
          <p className="text-sm font-bold opacity-30">
            Dibuat dengan dedikasi untuk komunitas tech Indonesia. <br />
            &copy; 2026 KelasWeb Indonesia.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:scale-105 transition-transform"
          >
            Kembali ke Beranda
          </a>
        </footer>
      </div>
    </div>
  );
};

export default About;
