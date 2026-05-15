import React, { useState } from 'react';
import { BookOpen, Menu, RotateCcw, X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { logout, user } = useAuth();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleReset = () => {
    localStorage.removeItem('materi_progress');
    localStorage.removeItem('last_read_materi');
    setShowResetModal(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black dark:border-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={24} className="text-black dark:text-white" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center shrink-0">
                <BookOpen size={20} className="text-white dark:text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight text-black dark:text-white hidden xs:block">
                Kelas<span className="opacity-60 hidden sm:inline">Web</span>
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="hidden lg:flex px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-black dark:border-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                Admin
              </Link>
            )}
            
            <DarkModeToggle />

            <button 
              onClick={() => setShowResetModal(true)}
              className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
              title="Reset Progres"
            >
              <RotateCcw size={18} />
            </button>
            
            {user && (
              <div className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-black/10 dark:border-white/10">
                <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                    }}
                  />
                </div>
                <button 
                  onClick={logout}
                  className="hidden lg:flex text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Custom Reset Modal - Outside Header */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetModal(false)}
              className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
            >
              <div className="absolute top-6 right-6">
                <button onClick={() => setShowResetModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-500">
                  <AlertTriangle size={40} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Reset Progres?</h3>
                  <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Tindakan ini akan menghapus semua riwayat belajar Anda secara permanen.
                  </p>
                </div>
                <div className="flex flex-col w-full gap-3 pt-4">
                  <button 
                    onClick={handleReset}
                    className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-red-500/20"
                  >
                    Ya, Reset Sekarang
                  </button>
                  <button 
                    onClick={() => setShowResetModal(false)}
                    className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast - Outside Header */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10001] flex items-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-4 rounded-2xl shadow-2xl"
          >
            <CheckCircle2 className="text-green-500" size={20} />
            <span className="font-bold text-sm">Progres berhasil direset. Memuat ulang...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
