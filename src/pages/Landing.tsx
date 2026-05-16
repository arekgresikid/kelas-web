import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, Lock, Zap } from 'lucide-react';

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
    { icon: <Zap size={20} />, title: "Kurikulum 2026", desc: "Materi terbaru fokus pada AI & Modern Dev." },
    { icon: <BookOpen size={20} />, title: "Project Based", desc: "Belajar sambil membangun produk nyata." },
    { icon: <Lock size={20} />, title: "Lifetime Access", desc: "Satu kali bayar untuk akses selamanya." },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0d0d0d] flex flex-col items-center p-6 relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_80%)] animate-pulse will-change-opacity" />
        <div className="absolute bottom-[10%] right-[-10%] w-[90%] h-[90%] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_80%)] animate-pulse delay-700 will-change-opacity" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mt-8 lg:mt-20 relative z-10">
        {/* Login Card (Now first in DOM for mobile priority) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:order-2"
        >
          {/* Glowing border effect - Static for performance */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-xl"></div>
          
          <div className="relative bg-white/95 dark:bg-black/95 border border-black/5 dark:border-white/10 rounded-[3rem] p-8 md:p-12 space-y-8 shadow-2xl overflow-hidden">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <img src="/favicon.svg" alt="Logo" className="w-10 h-10 dark:invert" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tight text-black dark:text-white">Selamat Datang</h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Silakan masuk ke dashboard</p>
              </div>
            </div>

            <div className="space-y-4">
              {renderCustomLogin ? (
                renderCustomLogin
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={onLogin}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
                  >
                    <Mail size={20} /> Sign in with Google
                  </button>
                  <button 
                    onClick={() => {
                      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
                      const redirectUri = `${window.location.origin}/auth/github/callback`;
                      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&redirect_uri=${redirectUri}`;
                    }}
                    className="w-full bg-[#24292e] text-white py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
                  >
                    <BookOpen size={20} /> Sign in with GitHub
                  </button>
                </div>
              )}
              <div className="flex items-center justify-center gap-2 text-[10px] text-black/40 dark:text-white/40 font-bold uppercase tracking-widest pt-4">
                <Lock size={12} />
                <span>Secure Access Only</span>
              </div>
            </div>

            {/* Registration Section */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-8 border-t border-black/5 dark:border-white/5 space-y-6"
                >
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold text-center">
                    {error}
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm flex items-center gap-2">
                        <Zap size={16} className="text-yellow-500 fill-yellow-500" /> Daftar Akses Baru
                      </h3>
                      <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">IDR 99K / LifeTime</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button 
                        onClick={() => setShowQRIS(!showQRIS)}
                        className="py-4 px-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest text-center"
                      >
                        {showQRIS ? 'Tutup QRIS' : '1. Lihat QRIS'}
                      </button>
                      <a 
                        href={regEmail ? waLink : '#'}
                        target={regEmail ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center py-4 px-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                          regEmail 
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                          : 'bg-black/10 dark:bg-white/10 text-black/20 dark:text-white/20 cursor-not-allowed'
                        }`}
                      >
                        2. Konfirmasi WA
                      </a>
                    </div>

                    <AnimatePresence>
                      {showQRIS && (
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          className="bg-white p-6 rounded-[2rem] shadow-2xl space-y-4 border border-black/5"
                        >
                          <img src="/qris.png" alt="QRIS" className="w-full max-w-[200px] mx-auto hover:scale-105 transition-transform cursor-pointer" onClick={() => window.open('/qris.png')} />
                          <p className="text-[10px] text-center font-bold uppercase tracking-widest opacity-40">Scan QRIS Untuk Aktivasi</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative group">
                      <input 
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="Email Anda (wajib sama dengan email login)"
                        className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl px-6 py-4 text-sm outline-none focus:bg-transparent focus:border-black/10 dark:focus:border-white/10 transition-all text-center font-medium"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Value Proposition (Now second in DOM) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10 text-center lg:text-left lg:order-1"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Pendaftaran Dibuka - Batch 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tightest leading-[1.1] text-black dark:text-white">
            Ubah Skill,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Ubah Masa Depan.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-black/60 dark:text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Belajar membangun aplikasi web modern dengan bimbingan AI, kurikulum berbasis proyek, dan komunitas developer yang suportif.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/80 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="font-bold text-sm">{f.title}</h3>
                <p className="text-[10px] opacity-60 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Brand Support Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-24 flex flex-col items-center gap-10 w-full max-w-5xl px-4 relative z-20"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 text-center">Powered & Supported By</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 md:gap-16 opacity-50 dark:opacity-40">
          <div title="Cloudflare" className="flex items-center">
            <img src="https://www.cloudflare.com/img/logo-cloudflare-dark.svg" className="h-4 dark:invert grayscale" alt="Cloudflare" />
          </div>
          <div title="Google" className="flex items-center gap-2">
            <img src="/google-icon.svg" className="h-4 grayscale" alt="Google" />
            <span className="font-bold text-xs tracking-tighter dark:text-white text-black opacity-80">Google</span>
          </div>
          <div title="GitHub" className="flex items-center gap-2">
            <img src="/github.svg" className="h-5 dark:invert grayscale" alt="GitHub" />
            <span className="font-bold text-xs tracking-tighter dark:text-white text-black opacity-80">GitHub</span>
          </div>
          <div title="Antigravity" className="flex items-center gap-2">
            <img src="/antigravity.svg" className="h-6 w-auto" alt="Antigravity" />
            <span className="font-bold text-xs tracking-tighter dark:text-white text-black opacity-80">Antigravity</span>
          </div>
          <div title="DeepSeek" className="flex items-center">
            <img src="/deepseek.svg" className="h-6 w-auto grayscale" alt="DeepSeek" />
          </div>
          <div title="Gemini" className="flex items-center gap-2">
            <img src="/gemini.svg" className="h-6 w-auto" alt="Gemini" />
            <span className="font-bold text-xs tracking-tighter dark:text-white text-black opacity-80">Gemini</span>
          </div>
          <div title="OpenAI" className="flex items-center">
            <img src="/openai.svg" className="h-6 w-auto dark:invert grayscale" alt="OpenAI" />
          </div>
          <div title="Grok" className="flex items-center">
            <img src="/grok.svg" className="h-5 w-auto dark:invert grayscale" alt="Grok" />
          </div>
          <div title="Pollinations AI" className="flex items-center gap-2">
            <img src="/pollinations.svg" className="h-6 w-auto" alt="Pollinations" />
            <span className="font-bold text-xs tracking-tighter dark:text-white text-black opacity-80">Pollinations</span>
          </div>
          <div title="Node.js" className="flex items-center">
            <img src="/nodejs.svg" className="h-5 w-auto grayscale" alt="Node.js" />
          </div>
        </div>
      </motion.div>

      {/* Trust Badges / Users */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col items-center gap-6 mt-16 pb-12"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {[10, 20, 30, 40, 50].map((id, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-4 border-[#fafafa] dark:border-[#0d0d0d] bg-black/5 dark:bg-white/5 overflow-hidden shadow-sm hover:translate-y-[-2px] transition-transform duration-300">
                <img 
                  src={`https://i.pravatar.cc/150?u=${id}`} 
                  alt={`Mahasiswa ${i + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Zap key={i} size={10} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <p className="text-[11px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">Dipercaya 500+ Mahasiswa</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
          <Link to="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
          <Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
        </div>

        <div className="h-px w-24 bg-black/5 dark:bg-white/10" />
        
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/10 dark:text-white/10 italic text-center">
          &copy; 2026 KelasWeb Indonesia &bull; Build with Antigravity
        </p>
      </motion.div>
    </div>
  );
};

export default Landing;
