import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate, NavLink } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MateriDetail from './components/MateriDetail';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import Certificate from './components/Certificate';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { 
  BookOpen, 
  Globe, 
  Wrench, 
  Layout, 
  Layers, 
  Package, 
  Gift, 
  Database, 
  Bot, 
  ShieldCheck, 
  Banknote, 
  Rocket,
  Sparkles
} from 'lucide-react';
import { useMaterials } from './hooks/useMaterials';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './context/ProgressContext';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const { moduls, allMateri } = useMaterials();
  const { user } = useAuth();
  const { progress } = useProgress();

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalCount = allMateri.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Find last read or first unread
  const lastReadSlug = localStorage.getItem('last_read_materi');
  const continueMateri = allMateri.find(m => m.slug === lastReadSlug) || allMateri.find(m => !progress[m.slug]);

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-4 md:py-8">
      {/* Header Section */}
      <section className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-black dark:bg-white p-8 md:p-16 text-white dark:text-black">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-black/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {user && (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] border-4 border-white/20 dark:border-black/10 overflow-hidden shadow-2xl bg-black/5 dark:bg-white/5">
              <img 
                src={user.picture} 
                alt={user.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=256`;
                }}
              />
            </div>
          )}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-black/5 text-[10px] font-bold tracking-[0.2em] uppercase">
              <Sparkles size={12} />
              Selamat Belajar
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Halo, {user?.name.split(' ')[0] || 'Kawan'}! 👋
            </h1>
            <p className="text-lg md:text-xl opacity-60 max-w-xl">
              Siap untuk melanjutkan perjalanan menjadi Web Developer profesional hari ini?
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="text-center md:text-right">
              <span className="text-5xl md:text-7xl font-black">{progressPercent}%</span>
              <p className="text-xs font-bold uppercase tracking-widest opacity-40">Progres Belajar</p>
            </div>
            {continueMateri && (
              <NavLink 
                to={`/materi/${continueMateri.slug}`}
                className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-black/20 dark:shadow-white/20"
              >
                {progressPercent === 0 ? 'Mulai Belajar' : 'Lanjutkan Materi'} <ArrowRight size={18} />
              </NavLink>
            )}
          </div>
        </div>
      </section>

      {/* Progress Bar Detail */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/5 dark:bg-white/5 p-8 rounded-[2rem] border border-black/10 dark:border-white/10 group hover:border-black dark:hover:border-white transition-colors">
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] mb-2">Materi Selesai</p>
          <p className="text-4xl font-black">{completedCount} <span className="text-lg opacity-20">/ {totalCount}</span></p>
          <div className="mt-6 h-3 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-black dark:bg-white"
            />
          </div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 p-8 rounded-[2rem] border border-black/10 dark:border-white/10 group hover:border-black dark:hover:border-white transition-colors">
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] mb-2">Status Akun</p>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <p className="text-3xl font-black uppercase tracking-tighter">{user?.role || 'Siswa'}</p>
          </div>
          <p className="mt-3 text-xs opacity-40 font-medium truncate">ID: {user?.email}</p>
        </div>
        <div className="bg-black/5 dark:bg-white/5 p-8 rounded-[2rem] border border-black/10 dark:border-white/10 group hover:border-black dark:hover:border-white transition-colors flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] mb-2">Materi Berikutnya</p>
            <p className="text-xl font-bold leading-tight line-clamp-1">{continueMateri?.frontmatter.title || 'Selesai Semua!'}</p>
          </div>
          <div className="flex items-center gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <Gift size={12} /> Dapatkan Sertifikat
          </div>
        </div>
      </section>

      {/* Curriculum Grid */}
      <section id="kurikulum" className="space-y-16 pt-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Kurikulum Belajar</h2>
          <p className="text-black/60 dark:text-white/60 max-w-xl mx-auto">
            Jelajahi setiap materi yang telah disusun rapi berdasarkan fase perkembangan skill Anda.
          </p>
        </div>
        
        <div className="space-y-12">
          {[
            { title: 'FASE 1: FONDASI', moduls: [1, 2, 3] },
            { title: 'FASE 2: FRONTEND', moduls: [4, 5] },
            { title: 'FASE 3: BACKEND', moduls: [8] },
            { title: 'FASE 4: MODERN DEV (AI)', moduls: [9] },
            { title: 'FASE 5: DEPLOYMENT & RILIS', moduls: [6, 12, 10] },
            { title: 'FASE 6: KARIR & BONUS', moduls: [11, 7] },
          ].map((fase) => {
            const faseModuls = moduls.filter(m => fase.moduls.includes(m.id));
            if (faseModuls.length === 0) return null;

            return (
              <div key={fase.title} className="space-y-8">
                <div className="flex items-center gap-6">
                  <h3 className="text-sm font-black tracking-[0.3em] text-black/40 dark:text-white/40 uppercase whitespace-nowrap">
                    {fase.title}
                  </h3>
                  <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {faseModuls.map((modul, i) => {
                    const getIcon = (id: number) => {
                      const iconProps = { size: 24, className: "text-black dark:text-white" };
                      const icons: Record<number, React.ReactNode> = {
                        1: <BookOpen {...iconProps} />, 
                        2: <Globe {...iconProps} />, 
                        3: <Wrench {...iconProps} />, 
                        4: <Layout {...iconProps} />, 
                        5: <Layers {...iconProps} />, 
                        6: <Package {...iconProps} />, 
                        7: <Gift {...iconProps} />, 
                        8: <Database {...iconProps} />, 
                        9: <Bot {...iconProps} />, 
                        10: <ShieldCheck {...iconProps} />, 
                        11: <Banknote {...iconProps} />, 
                        12: <Rocket {...iconProps} />
                      };
                      return icons[id] || <BookOpen {...iconProps} />;
                    };

                    return (
                      <motion.div 
                        key={modul.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="p-8 rounded-[2rem] bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all group shadow-sm hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5"
                      >
                        <div className="flex items-center gap-5 mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {getIcon(modul.id)}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Modul {modul.id}</span>
                            <h4 className="font-bold text-xl leading-tight">{modul.title.split(': ').pop()}</h4>
                          </div>
                        </div>
                        <ul className="space-y-3 ml-1">
                          {modul.materi.map(m => (
                            <li key={m.slug} className="text-sm text-black/60 dark:text-white/60 flex items-center gap-3">
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                progress[m.slug] ? "bg-green-500" : "bg-black/10 dark:bg-white/10"
                              )} />
                              {m.frontmatter.title}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {progressPercent === 100 && <Certificate />}
    </div>
  );
};

const MateriWrapper = () => {
  const { slug } = useParams();
  const { allMateri } = useMaterials();
  const navigate = useNavigate();
  
  const materi = allMateri.find(m => m.slug === slug);
  
  if (!materi) return <div className="p-10 text-center text-black dark:text-white">Materi tidak ditemukan.</div>;

  const currentIndex = allMateri.indexOf(materi);
  const nextMateri = allMateri[currentIndex + 1];
  const prevMateri = allMateri[currentIndex - 1];

  return (
    <MateriDetail 
      materi={materi} 
      onNext={nextMateri ? () => navigate(`/materi/${nextMateri.slug}`) : undefined}
      onPrev={prevMateri ? () => navigate(`/materi/${prevMateri.slug}`) : undefined}
    />
  );
};

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isAuthorized, login, loading } = useAuth();
  const [authError, setAuthError] = useState('');

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Langsung kirim access_token ke hook login kita
      const result = await login(tokenResponse.access_token);
      
      if (!result.success) {
        setAuthError(result.error || 'Email Anda tidak terdaftar di database D1.');
      } else {
        setAuthError('');
      }
    },
    onError: () => setAuthError('Login Gagal. Silakan coba lagi.'),
    prompt: 'select_account',
  });

  if (loading) return null;

  if (!user || !isAuthorized) {
    return (
      <Landing 
        onLogin={() => {}} 
        error={authError}
        renderCustomLogin={
          <button 
            onClick={() => loginWithGoogle()}
            className="btn bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white px-8 py-4 text-lg flex items-center justify-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 w-full rounded-full font-bold transition-all shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
        }
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      
      <div className="flex-1 flex flex-col lg:flex-row container mx-auto px-4 sm:px-6">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>

        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          onItemClick={() => setIsSidebarOpen(false)} 
        />

        <main className="flex-1 min-w-0 p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/materi/:slug" element={<MateriWrapper />} />
            {user?.role === 'admin' && <Route path="/admin" element={<Admin />} />}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <footer className="py-12 border-t border-black/10 dark:border-white/10 bg-white dark:bg-black">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-xl text-black/40 dark:text-white/40 mb-4">
            <BookOpen className="w-6 h-6" />
            <span>KelasWeb</span>
          </div>
          <p className="text-black/40 dark:text-white/40 text-sm">
            &copy; 2026 Kelas Web Indonesia. Membangun masa depan digital dengan AI.
          </p>
        </div>
      </footer>
    </div>
  );
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
