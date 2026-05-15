import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Mail, Lock } from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
  error?: string;
  renderCustomLogin?: React.ReactNode;
}

const Landing: React.FC<LandingProps> = ({ onLogin, error, renderCustomLogin }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-12"
      >
        <div className="space-y-4">
          <div className="w-20 h-20 bg-black dark:bg-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl rotate-3">
            <BookOpen size={40} className="text-white dark:text-black" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-black dark:text-white">
            KelasWeb <span className="opacity-40">Exclusive</span>
          </h1>
          <p className="text-black/60 dark:text-white/60 leading-relaxed">
            Platform pembelajaran web development terkurasi untuk pengguna terdaftar.
          </p>
        </div>

        <div className="card p-8 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent" />
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
              <Lock size={14} /> Akses Terbatas
            </div>
            <h2 className="text-xl font-bold">Masuk dengan Google</h2>
            <p className="text-sm text-black/50 dark:text-white/50 px-4">
              Hanya email yang telah terdaftar di database D1 Cloudflare kami yang akan diberikan akses ke modul.
            </p>
          </div>

          <div className="flex justify-center">
            {renderCustomLogin ? (
              renderCustomLogin
            ) : (
              <button 
                onClick={onLogin}
                className="w-full btn btn-primary py-4 text-lg"
              >
                <Mail size={20} /> Login with Google
              </button>
            )}
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <div className="pt-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-black/40 dark:text-white/40 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
              <ShieldCheck size={12} /> Persetujuan Email Diperlukan
            </div>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-tighter opacity-30 hover:opacity-100 transition-opacity">
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="text-xs text-black/30 dark:text-white/30 italic">
          Belum terdaftar? Hubungi administrator untuk akses kurikulum.
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
