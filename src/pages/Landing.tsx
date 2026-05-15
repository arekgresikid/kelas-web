import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Mail, Lock, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex flex-col items-center justify-center p-6 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full text-center space-y-12 relative z-10"
      >
        {/* Hero Section */}
        <div className="space-y-6">
          <motion.div 
            whileHover={{ rotate: 8, scale: 1.1 }}
            className="w-24 h-24 bg-black dark:bg-white rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)] rotate-3 transition-transform"
          >
            <BookOpen size={48} className="text-white dark:text-black" />
          </motion.div>
          
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tightest text-black dark:text-white leading-tight">
              KelasWeb <span className="text-transparent bg-clip-text bg-gradient-to-r from-black/40 to-black/20 dark:from-white/40 dark:to-white/20">Studio</span>
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-black/10 dark:bg-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/40">Edition 2026</span>
              <div className="h-px w-8 bg-black/10 dark:bg-white/10" />
            </div>
          </div>

          <p className="text-black/60 dark:text-white/60 leading-relaxed text-sm max-w-xs mx-auto">
            Kuasai Web Development modern dengan kurikulum berbasis proyek & bimbingan AI masa depan.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
              <Lock size={12} /> Restricted Access
            </div>
            <h2 className="text-2xl font-bold">Portal Pembelajaran</h2>
          </div>

          <div className="space-y-4">
            {renderCustomLogin ? (
              renderCustomLogin
            ) : (
              <button 
                onClick={onLogin}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
              >
                <Mail size={22} /> Login with Google
              </button>
            )}
            <p className="text-[10px] text-black/40 dark:text-white/40 font-medium">
              Gunakan email yang sudah terdaftar untuk masuk.
            </p>
          </div>

          {/* Registration Section (Only show on error) */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-8 border-t border-black/5 dark:border-white/5 space-y-8"
              >
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center justify-center gap-2">
                   {error}
                </div>

                <div className="text-left space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Zap size={16} className="text-yellow-500" /> Daftar Akses Baru
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black rounded">PRO</span>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={() => setShowQRIS(!showQRIS)}
                      className="w-full group py-4 px-6 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center justify-between"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest opacity-60">1. Lihat QRIS Pembayaran</span>
                      <ArrowRight size={16} className={`transition-transform ${showQRIS ? 'rotate-90' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {showQRIS && (
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.9, opacity: 0 }}
                          className="bg-white p-6 rounded-[2rem] shadow-2xl space-y-4 border border-black/5"
                        >
                          <div className="aspect-square w-full relative group">
                            <img 
                              src="/qris.png" 
                              alt="QRIS KelasWeb"
                              className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                               <CheckCircle2 className="text-black/20" size={48} />
                            </div>
                          </div>
                          <a 
                            href="/qris.png" 
                            download="QRIS-KelasWeb.png"
                            className="block text-center text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors underline"
                          >
                            Simpan Gambar QRIS
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-2">2. Masukkan Email Anda</label>
                        <input 
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="nama@gmail.com"
                          className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-2xl px-5 py-4 text-sm outline-none focus:bg-transparent focus:border-black/20 dark:focus:border-white/20 transition-all"
                        />
                      </div>

                      <a 
                        href={regEmail ? waLink : '#'}
                        target={regEmail ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-bold text-sm transition-all shadow-xl ${
                          regEmail 
                          ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20 scale-[1.02]' 
                          : 'bg-black/10 dark:bg-white/10 text-black/20 dark:text-white/20 cursor-not-allowed'
                        }`}
                      >
                        Konfirmasi Pembayaran
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-black bg-black/10 dark:bg-white/10 overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="avatar" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-black/40 dark:text-white/40 tracking-tight">Bergabung dengan 500+ Siswa</span>
            </div>
            
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity">
              <a href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>

        <footer className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/20 dark:text-white/20">
          &copy; 2026 KelasWeb Indonesia
        </footer>
      </motion.div>
    </div>
  );
};

export default Landing;
