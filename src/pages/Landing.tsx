import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        {/* Header Compact */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center shadow-lg">
              <img src="/favicon.svg" alt="Logo" className="w-6 h-6 object-contain dark:invert" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-black dark:text-white">KelasWeb</h1>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">Edition 2026</span>
            </div>
          </div>
          <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest opacity-30">
            <Link to="/about" className="hover:opacity-100 transition-opacity">About</Link>
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
            <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms</Link>
          </div>
        </div>


        {/* Login Card Compact */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl font-black tracking-tightest leading-tight text-black dark:text-white">
              Kuasai Web Dev <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Berbasis Proyek.</span>
            </h2>
            <p className="text-black/60 dark:text-white/60 text-[10px] leading-relaxed font-bold uppercase tracking-widest">
              Bimbingan AI & Kurikulum 2026
            </p>
          </div>
          <div className="space-y-4">
            {renderCustomLogin ? (
              renderCustomLogin
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={onLogin}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
                >
                  <Mail size={18} /> Login with Google
                </button>
                <button 
                  onClick={() => {
                    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
                    const redirectUri = `${window.location.origin}/auth/github/callback`;
                    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&redirect_uri=${redirectUri}`;
                  }}
                  className="w-full bg-[#24292e] text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
                >
                  <BookOpen size={18} /> Login with GitHub
                </button>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-[10px] text-black/40 dark:text-white/40">
              <Lock size={10} />
              <span>Akses terbatas untuk email terdaftar</span>
            </div>
          </div>

          {/* Registration Section (Only show on error) */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-6 border-t border-black/5 dark:border-white/5 space-y-6"
              >
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold text-center">
                   {error}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs flex items-center gap-2 italic">
                      <Zap size={14} className="text-yellow-500" /> Daftar Akses Baru
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setShowQRIS(!showQRIS)}
                      className="py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest text-center"
                    >
                      {showQRIS ? 'Tutup QRIS' : '1. Lihat QRIS'}
                    </button>
                    <a 
                      href={regEmail ? waLink : '#'}
                      target={regEmail ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                        regEmail 
                        ? 'bg-green-500 text-white animate-pulse' 
                        : 'bg-black/10 dark:bg-white/10 text-black/20 dark:text-white/20 cursor-not-allowed'
                      }`}
                    >
                      2. Konfirmasi
                    </a>
                  </div>

                  <AnimatePresence>
                    {showQRIS && (
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white p-4 rounded-2xl shadow-xl space-y-3 border border-black/5"
                      >
                        <img src="/qris.png" alt="QRIS" className="w-48 mx-auto grayscale hover:grayscale-0 transition-all cursor-pointer" onClick={() => window.open('/qris.png')} />
                        <p className="text-[8px] text-center uppercase tracking-widest opacity-40">Scan & Bayar</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-2">
                    <input 
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="Masukkan email Anda untuk konfirmasi"
                      className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-xl px-4 py-3 text-xs outline-none focus:bg-transparent focus:border-black/10 dark:focus:border-white/10 transition-all text-center"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Compact */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {[1,2,3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full border border-white dark:border-black bg-black/10 dark:bg-white/10 overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=U+${i}&background=random`} alt="avatar" />
                </div>
              ))}
            </div>
            <span className="text-[9px] font-bold text-black/30 dark:text-white/30">Join 500+ Students</span>
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black/10 dark:text-white/10 italic">
            &copy; 2026 KelasWeb Indonesia
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
