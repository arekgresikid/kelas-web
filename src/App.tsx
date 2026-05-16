import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MateriDetail from './components/MateriDetail';
import AIAssistant from './components/AIAssistant';
import Landing from './pages/Landing';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import GithubCallback from './pages/GithubCallback';
import About from './pages/About';
import { useLocation } from 'react-router-dom';
import { useMaterials } from './hooks/useMaterials';
import { useAuth } from './hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

import Home from './pages/Home';

const MateriWrapper = () => {
  const { slug } = useParams();
  const { allMateri } = useMaterials();
  const navigate = useNavigate();
  
  const materi = allMateri.find(m => m.slug === slug);
  
  if (!materi) return <div className="p-10 text-center text-black dark:text-white">Materi tidak ditemukan.</div>;

  const currentIndex = allMateri.indexOf(materi);
  const nextMateri = allMateri[currentIndex + 1];
  const prevMateri = allMateri[currentIndex - 1];

  const handleNext = nextMateri ? () => navigate(`/materi/${nextMateri.slug}`) : undefined;
  const handlePrev = prevMateri ? () => navigate(`/materi/${prevMateri.slug}`) : undefined;

  return (
    <MateriDetail 
      materi={materi} 
      onNext={handleNext}
      onPrev={handlePrev}
    />
  );
};

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isAuthorized, login, loading } = useAuth();
  const [authError, setAuthError] = useState('');
  const location = useLocation();

  const isPublicRoute = ['/privacy', '/terms', '/about', '/auth/github/callback'].includes(location.pathname);

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

  // Render Public Routes (Privacy/Terms) first
  if (isPublicRoute) {
    return (
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/auth/github/callback" element={<GithubCallback />} />
      </Routes>
    );
  }

  if (!user || !isAuthorized) {
    return (
      <Landing 
        error={authError}
        renderCustomLogin={
          <div className="space-y-3">
            <button 
              onClick={() => loginWithGoogle()}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
            <button 
              onClick={() => {
                const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
                const redirectUri = `${window.location.origin}/auth/github/callback`;
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&redirect_uri=${redirectUri}`;
              }}
              className="w-full bg-[#24292e] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 dark:shadow-white/5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.24.73-.53v-1.84c-3.03.66-3.67-1.46-3.67-1.46-.5-1.26-1.2-1.6-1.2-1.6-1-.68.07-.66.07-.66 1.1.07 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.22.92.1-.72.37-1.2.69-1.48-2.42-.28-4.97-1.21-4.97-5.39 0-1.2.43-2.18 1.13-2.94-.11-.28-.49-1.4.11-2.9 0 0 .92-.3 3.03 1.13a10.45 10.45 0 015.5 0c2.1-1.43 3.03-1.13 3.03-1.13.6 1.5.22 2.62.11 2.9.71.76 1.13 1.74 1.13 2.94 0 4.19-2.55 5.11-4.98 5.38.4.34.74 1.01.74 2.03v3.01c0 .3.18.63.74.53A11 11 0 0012 1.27z" />
              </svg>
              Sign in with GitHub
            </button>
          </div>
        }
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0d0d0d] text-black dark:text-white">
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
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/auth/github/callback" element={<GithubCallback />} />
            {user?.role === 'admin' && <Route path="/admin" element={<Admin />} />}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <footer className="py-12 border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#0d0d0d]">
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

      {/* Global AI Assistant */}
      {user && isAuthorized && !isPublicRoute && <AIAssistant context="Siswa sedang berada di platform KelasWeb Indonesia." />}
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
