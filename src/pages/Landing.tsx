import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Mail, Lock, Zap, ChevronRight, Globe, Layout, 
  ShoppingCart, Activity, Share2, Search as SearchIcon, 
  CheckCircle2, Star, Users, ArrowRight
} from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
  error?: string;
  renderCustomLogin?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = ({ onLogin, error, renderCustomLogin }) => {
  const [regEmail, setRegEmail] = useState('');
  const [showQRIS, setShowQRIS] = useState(false);

  const waLink = `https://wa.me/6281330763633?text=Halo%20Admin%2C%20saya%20sudah%20melakukan%20pembayaran%20via%20QRIS%20untuk%20KelasWeb.%20Mohon%20aktifkan%20akses%20untuk%20email%3A%20${encodeURIComponent(regEmail)}`;

  const features = [
    { icon: <Zap size={18} />, title: "Kurikulum 2026", desc: "Materi terbaru fokus pada AI & Modern Dev." },
    { icon: <BookOpen size={18} />, title: "Project Based", desc: "Belajar sambil membangun produk nyata." },
    { icon: <Lock size={18} />, title: "Lifetime Access", desc: "Satu kali bayar untuk akses selamanya." },
  ];

  const showcases = [
    { icon: <Layout size={14} />, title: "Portfolio Tanpa Coding", link: "#" },
    { icon: <ShoppingCart size={14} />, title: "Toko Online Sederhana", link: "https://martabakgresik.my.id" },
    { icon: <Globe size={14} />, title: "Web AI Generator", link: "https://ruangriung.my.id" },
    { icon: <Activity size={14} />, title: "Platform Kesehatan", link: "https://nutrilife-ai.pages.dev/" },
    { icon: <Share2 size={14} />, title: "Web Affiliate", link: "https://bikinsendiri.my.id/" },
    { icon: <SearchIcon size={14} />, title: "Tools SEO Mandiri", link: "https://seo.ariftirtana.my.id" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#080808] text-black dark:text-white selection:bg-blue-500 selection:text-white">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12 lg:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: The "Why" (Value Proposition) */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                <Star size={12} fill="currentColor" />
                <span>Pendaftaran Batch 2026 Dibuka</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tightest leading-[0.95]">
                Ubah Skill,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  Ubah Masa Depan.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-black/60 dark:text-white/60 max-w-xl leading-relaxed font-medium">
                Belajar membangun aplikasi web modern dengan bimbingan AI, kurikulum berbasis proyek riil, dan komunitas yang suportif.
              </p>
            </motion.div>

            {/* Bento Features List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {features.map((f, i) => (
                <div key={i} className="p-5 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex gap-4 hover:border-blue-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm">{f.title}</h3>
                    <p className="text-[10px] opacity-50 font-medium leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
              {/* Trust Badge In Grid */}
              <div className="p-5 rounded-3xl bg-blue-500 text-white flex flex-col justify-center gap-2 shadow-xl shadow-blue-500/20">
                <div className="flex -space-x-2">
                  {[10, 20, 30].map(id => (
                    <img key={id} src={`https://i.pravatar.cc/100?u=${id}`} className="w-6 h-6 rounded-full border-2 border-blue-500" alt="User" />
                  ))}
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[8px] font-black">+500</div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Dipercaya Mahasiswa</p>
              </div>
            </motion.div>

            {/* Powered By (Social Proof) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-8 space-y-6"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Powered & Supported By</p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-6 grayscale opacity-40 dark:opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img src="/google-icon.svg" className="h-4" alt="Google" />
                <img src="/github.svg" className="h-5 dark:invert" alt="GitHub" />
                <img src="/openai.svg" className="h-6 dark:invert" alt="OpenAI" />
                <img src="/gemini.svg" className="h-6" alt="Gemini" />
                <img src="/deepseek.svg" className="h-6" alt="DeepSeek" />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: The "Do" (Interaction) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. What You'll Build (Showcase) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest opacity-60">Build Real Projects</h3>
                <Zap size={14} className="text-blue-500 fill-blue-500" />
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {showcases.map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => s.link !== '#' && window.open(s.link)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-blue-500/5 border border-transparent hover:border-blue-500/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-black border border-black/5 dark:border-white/5 flex items-center justify-center text-black/40 dark:text-white/40 group-hover:text-blue-500 transition-colors">
                        {s.icon}
                      </div>
                      <span className="text-[11px] font-bold text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white">{s.title}</span>
                    </div>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 2. Login Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur-xl opacity-20 dark:opacity-40 animate-pulse"></div>
              <div className="relative p-8 md:p-10 rounded-[3rem] bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-2xl space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-black tracking-tight">Mulai Sekarang</h2>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 text-blue-500">Akses Dashboard Siswa</p>
                </div>

                <div className="space-y-4">
                  {renderCustomLogin ? (
                    renderCustomLogin
                  ) : (
                    <div className="space-y-3">
                      <button onClick={onLogin} className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                        <Mail size={18} /> Sign in with Google
                      </button>
                    </div>
                  )}
                  
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-bold text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-30">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span>Secure Access Verified</span>
                  </div>
                </div>

                {/* Registration / Payment Info if Error */}
                {error && (
                  <div className="pt-2 space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-[10px] font-black opacity-40 uppercase">Registration</span>
                      <span className="text-[10px] font-black text-blue-500 uppercase">IDR 99K / Lifetime</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setShowQRIS(!showQRIS)} className="py-3 rounded-xl bg-black/5 dark:bg-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-black/10 transition-all text-center">
                        {showQRIS ? 'Tutup' : '1. QRIS'}
                      </button>
                      <a href={regEmail ? waLink : '#'} target="_blank" rel="noopener noreferrer" className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-center transition-all ${regEmail ? 'bg-green-500 text-white' : 'bg-black/10 opacity-50 cursor-not-allowed'}`}>
                        2. Konfirmasi
                      </a>
                    </div>
                    {showQRIS && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-white rounded-2xl border border-black/5 flex flex-col items-center gap-3">
                        <img src="/qris.png" alt="QRIS" className="w-32 h-32" />
                        <span className="text-[8px] font-black opacity-40 uppercase">Scan to Pay</span>
                      </motion.div>
                    )}
                    <input 
                      type="email" 
                      value={regEmail} 
                      onChange={(e) => setRegEmail(e.target.value)} 
                      placeholder="Email Anda" 
                      className="w-full bg-black/5 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-xs text-center font-bold"
                    />
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-32 pt-12 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            <Link to="/about" className="hover:opacity-100 transition-opacity">About</Link>
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
            <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms</Link>
          </div>
          <p className="text-[10px] font-medium opacity-20 tracking-[0.5em] text-center italic">
            &copy; 2026 KELASWEB INDONESIA &bull; CRAFTED WITH ANTIGRAVITY
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
