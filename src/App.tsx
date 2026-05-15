import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MateriDetail from './components/MateriDetail';
import Landing from './pages/Landing';
import { useMaterials } from './hooks/useMaterials';
import { useAuth } from './hooks/useAuth';
import { ArrowRight, Zap, Globe, Cpu, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const { moduls } = useMaterials();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-black dark:border-white text-black dark:text-white text-sm font-bold mb-6">
          Vibe Coding 2026
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-black dark:text-white mb-8 tracking-tighter">
          Bangun Website Dari <span className="underline decoration-black/20 dark:decoration-white/20">Nol</span>
        </h1>
        <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
          Tutorial modular bahasa Indonesia untuk menguasai pengembangan web modern dengan bantuan AI. Terstruktur, praktis, dan siap rilis.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => navigate(`/materi/${moduls[0]?.materi[0]?.slug}`)}
            className="btn btn-primary px-8 py-4 text-lg flex items-center gap-2"
          >
            Mulai Belajar <ArrowRight size={20} />
          </button>
          <a href="#kurikulum" className="btn bg-white dark:bg-black border border-black dark:border-white text-black dark:text-white px-8 py-4 text-lg hover:bg-black/5 dark:hover:bg-white/5">
            Lihat Kurikulum
          </a>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { icon: <Zap />, title: "Cepat & Praktis", desc: "Fokus pada apa yang benar-benar digunakan di dunia kerja." },
          { icon: <Cpu />, title: "Bantuan AI", desc: "Optimalkan produktivitas Anda dengan pendekatan Vibe Coding." },
          { icon: <Globe />, title: "Siap Rilis", desc: "Dari beli domain hingga deploy ke platform cloud modern." },
        ].map((feat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card group"
          >
            <div className="w-12 h-12 rounded-xl border border-black dark:border-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
            <p className="text-black/60 dark:text-white/60">{feat.desc}</p>
          </motion.div>
        ))}
      </div>

      <section id="kurikulum" className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Kurikulum Pembelajaran</h2>
          <div className="w-20 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moduls.map((modul, i) => (
            <motion.div 
              key={modul.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                  {modul.id}
                </span>
                <h4 className="font-bold text-lg">{modul.title}</h4>
              </div>
              <ul className="space-y-2 ml-12">
                {modul.materi.map(m => (
                  <li key={m.slug} className="text-sm text-black/60 dark:text-white/60 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-black/40 dark:bg-white/40" />
                    {m.frontmatter.title}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
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

  if (loading) return null;

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Ambil info user menggunakan access_token
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const googleData = await res.json();
        
        if (googleData.email) {
          const result = await login({ 
            email: googleData.email, 
            name: googleData.name, 
            picture: googleData.picture 
          });
          
          if (!result.success) {
            setAuthError(result.error || 'Email Anda tidak terdaftar di database D1.');
          } else {
            setAuthError('');
          }
        }
      } catch (err) {
        setAuthError('Terjadi kesalahan saat mengambil data profil Google.');
      }
    },
    onError: () => setAuthError('Login Gagal. Silakan coba lagi.'),
    prompt: 'select_account', // Ini yang memaksa munculnya pilihan akun
  });

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
