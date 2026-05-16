import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Lock, Zap, Globe, Layout, 
  ShoppingCart, Activity, Share2, Search as SearchIcon, 
  CheckCircle2, Star, ArrowRight
} from 'lucide-react';

interface LandingProps {
  error?: string;
  renderCustomLogin?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = ({ error, renderCustomLogin }) => {
  const [regEmail, setRegEmail] = useState('');
  const [showQRIS, setShowQRIS] = useState(false);

  useEffect(() => {
    document.title = 'KelasWeb Indonesia - Pendaftaran';
  }, []);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isEmailReady = isValidEmail(regEmail);

  const waLink = `https://wa.me/6281330763633?text=Halo%20Admin%2C%20saya%20sudah%20melakukan%20pembayaran%20via%20QRIS%20untuk%20KelasWeb.%20Mohon%20aktifkan%20akses%20untuk%20email%3A%20${encodeURIComponent(regEmail)}`;

  const features = [
    { icon: <Zap size={20} />, title: "Kurikulum 2026", desc: "Materi terbaru fokus pada AI & Modern Dev." },
    { icon: <BookOpen size={20} />, title: "Project Based", desc: "Belajar sambil membangun produk nyata." },
    { icon: <Lock size={20} />, title: "Lifetime Access", desc: "Satu kali bayar untuk akses selamanya." },
    { icon: <Activity size={20} />, title: "Expert Fullstack", desc: "Kuasai Next.js, Docker, & Arsitektur Microservices." },
    { icon: <Globe size={20} />, title: "Cloud & DevOps", desc: "Pelajari CI/CD, GitHub Actions, dan AWS Cloud." },
    { icon: <CheckCircle2 size={20} />, title: "Security & Testing", desc: "Pertahanan OWASP, Testing & Optimasi WPO." },
  ];

  const showcases = [
    { icon: <Layout size={16} />, title: "Portfolio Tanpa harus paham Coding", desc: "Bangun personal brand profesional dalam hitungan menit.", link: "#" },
    { icon: <ShoppingCart size={16} />, title: "Toko Online Sederhana", desc: "Solusi e-commerce praktis seperti martabakgresik.my.id", link: "https://martabakgresik.my.id" },
    { icon: <Globe size={16} />, title: "Web AI Generator", desc: "Buat tool gambar & teks otomatis seperti ruangriung.my.id", link: "https://ruangriung.my.id" },
    { icon: <Activity size={16} />, title: "Platform Kesehatan", desc: "Web konsultasi & tracking nutrisi seperti nutrilife-ai.pages.dev", link: "https://nutrilife-ai.pages.dev/" },
    { icon: <Share2 size={16} />, title: "Web Affiliate", desc: "Sistem rujukan otomatis seperti bikinsendiri.my.id", link: "https://bikinsendiri.my.id/" },
    { icon: <SearchIcon size={16} />, title: "Tools SEO Mandiri", desc: "Optimasi search engine sendiri seperti seo.ariftirtana.my.id", link: "https://seo.ariftirtana.my.id" },
    { icon: <Star size={16} />, title: "Web Unik & Kreatif", desc: "Eksplorasi desain kustom unik seperti jawidigital.my.id", link: "https://jawidigital.my.id" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#080808] text-black dark:text-white selection:bg-blue-500 selection:text-white pb-20">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8 lg:pt-12 space-y-20">
        
        {/* 1. HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 w-full text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mx-auto">
            <Star size={12} fill="currentColor" />
            <span>Pendaftaran Batch 2026 Dibuka</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tightest leading-[0.98] w-full text-center">
            Upgrade Skill, Ciptakan—<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Ide Baru, Ubah Masa Depan.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-black/60 dark:text-white/60 w-full leading-relaxed font-medium text-center max-w-4xl mx-auto">
            Wujudkan ide website impianmu dengan <span className='text-blue-600 dark:text-blue-400 font-bold'>bantuan AI</span>, kurikulum berbasis proyek nyata, dan dukungan komunitas—<span className='text-black dark:text-white font-bold'>meski kamu tidak paham koding sekalipun.</span>
          </p>
        </motion.div>

        {/* 2. LOGIN FORM CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative max-w-xl mx-auto w-full"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative p-8 md:p-12 rounded-[3rem] bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-2xl space-y-10">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight">Mulai Belajar</h2>
                <div className="flex justify-center">
                  <img src="/logo.png" alt="KelasWeb Logo" className="h-35 w-auto dark:invert-0 opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 text-blue-500">Akses Dashboard Siswa</p>
            </div>

            <div className="space-y-4">
              {renderCustomLogin}
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Registration Section within Login Card */}
              {error && (
                <div className="pt-6 border-t border-black/5 dark:border-white/10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">Pendaftaran Baru</span>
                    <span className="text-[10px] font-black text-blue-500 uppercase bg-blue-500/10 px-3 py-1 rounded-full">IDR 99K / LifeTime</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setShowQRIS(!showQRIS)} className="py-4 rounded-xl bg-black/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-black/10 transition-all">
                      {showQRIS ? 'Tutup QRIS' : '1. Lihat QRIS'}
                    </button>
                    <a href={isEmailReady ? waLink : '#'} target="_blank" rel="noopener noreferrer" className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center transition-all ${isEmailReady ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-black/10 opacity-50 cursor-not-allowed'}`}>
                      2. Konfirmasi WA
                    </a>
                  </div>
                  <AnimatePresence>
                    {showQRIS && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="p-6 bg-white rounded-[2rem] border border-black/5 flex flex-col items-center gap-4">
                        <img src="/qris.png" alt="QRIS" className="w-48 h-48" />
                        <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Scan QRIS Untuk Aktivasi</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <input 
                    type="email" 
                    value={regEmail} 
                    onChange={(e) => setRegEmail(e.target.value)} 
                    placeholder="Email yang akan didaftarkan" 
                    className="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm text-center font-bold"
                  />
                </div>
              )}

              <div className="pt-6 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] opacity-20">
                <CheckCircle2 size={14} className="text-green-500" />
                <span>Secure Access Verified</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. BUILD REAL PROJECTS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black tracking-tight">Build Real Projects</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 text-blue-500">Kuasai Skill dengan Praktek Langsung meski kamu tidak bisa koding sekalipun</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showcases.map((s, idx) => (
              <button 
                key={idx}
                onClick={() => s.link !== '#' && window.open(s.link)}
                className="flex items-center justify-between p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 hover:border-blue-500/30 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/30 dark:text-white/30 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all">
                    {s.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-black group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{s.title}</h4>
                    <p className="text-[9px] font-bold opacity-30 uppercase tracking-tighter">{s.desc}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-blue-500" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* 4. FEATURES GRID */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black tracking-tight uppercase">Kenapa Pilih KelasWeb?</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 text-blue-500">Kurikulum yang dirancang untuk kebutuhan industri masa depan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4 hover:border-blue-500/20 transition-all group text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  {f.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-sm uppercase tracking-tight">{f.title}</h3>
                  <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed font-medium">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. TRUSTED BY 500++ */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black tracking-tight uppercase">Community Proof</h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 text-blue-500">Bergabunglah dengan siswa yang telah memulai transformasi karir mereka</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-[3rem] bg-blue-500 text-white shadow-2xl shadow-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
              <div className="flex -space-x-4">
                {[10, 20, 30, 40, 50, 60].map(id => (
                  <img key={id} src={`https://i.pravatar.cc/150?u=${id}`} className="w-14 h-14 rounded-full border-4 border-blue-500 shadow-xl" alt="Student" />
                ))}
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Zap key={i} size={14} className="fill-white text-white" />)}
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter italic">Dipercaya 500++ Mahasiswa</h4>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Wujudkan Portfolio Impian Bersama Kami</p>
              </div>
            </div>
            <CheckCircle2 size={32} className="opacity-20 relative z-10 hidden md:block" />
          </motion.div>
        </div>

        {/* 6. POWERED & SUPPORTED BY */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-10 pt-12 pb-12"
        >
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Global Partners & Tech Support</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-20">Didukung oleh teknologi terbaik untuk menjamin kualitas pembelajaran</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 grayscale opacity-40 dark:opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div title="Cloudflare" className="flex items-center"><img src="https://www.cloudflare.com/img/logo-cloudflare-dark.svg" className="h-4 dark:invert" alt="Cloudflare" /></div>
            <div title="Google" className="flex items-center gap-2"><img src="/google-icon.svg" className="h-4" alt="Google" /><span className="font-bold text-[10px]">Google</span></div>
            <div title="GitHub" className="flex items-center gap-2"><img src="/github.svg" className="h-5 dark:invert" alt="GitHub" /><span className="font-bold text-[10px]">GitHub</span></div>
            <div title="Antigravity" className="flex items-center gap-2"><img src="/antigravity.svg" className="h-6" alt="Antigravity" /><span className="font-bold text-[10px]">Antigravity</span></div>
            <div title="DeepSeek" className="flex items-center"><img src="/deepseek.svg" className="h-6" alt="DeepSeek" /></div>
            <div title="Gemini" className="flex items-center gap-2"><img src="/gemini.svg" className="h-6" alt="Gemini" /><span className="font-bold text-[10px]">Gemini</span></div>
            <div title="OpenAI" className="flex items-center"><img src="/openai.svg" className="h-6 dark:invert" alt="OpenAI" /></div>
            <div title="Grok" className="flex items-center"><img src="/grok.svg" className="h-5 dark:invert" alt="Grok" /></div>
            <div title="Pollinations AI" className="flex items-center gap-2"><img src="/pollinations.svg" className="h-6" alt="Pollinations" /><span className="font-bold text-[10px]">Pollinations</span></div>
            <div title="Node.js" className="flex items-center"><img src="/nodejs.svg" className="h-5" alt="Node.js" /></div>
          </div>
        </motion.div>

        {/* FOOTER NAVIGATION */}
        <footer className="pt-20 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-10">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
            <Link to="/about" className="hover:opacity-100 hover:text-blue-500 transition-all">About</Link>
            <Link to="/privacy" className="hover:opacity-100 hover:text-blue-500 transition-all">Privacy</Link>
            <Link to="/terms" className="hover:opacity-100 hover:text-blue-500 transition-all">Terms</Link>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="h-px w-24 bg-black/10 dark:bg-white/10"></div>
            <div className="space-y-4 flex flex-col items-center">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/10 dark:text-white/10 italic text-center">
                &copy; 2026 KELASWEB INDONESIA &bull; DESIGNED BY ANTIGRAVITY
              </p>
              <img 
                src="https://img.shields.io/badge/Built%20with-Pollinations-8a2be2?style=for-the-badge&logo=data:image/png;base64,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&logoColor=white&labelColor=6a0dad" 
                alt="Built with Pollinations" 
                className="h-8 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Landing;
