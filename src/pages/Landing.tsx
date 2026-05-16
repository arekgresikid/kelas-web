import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Mail, Lock, Zap, Globe, Layout, 
  ShoppingCart, Activity, Share2, Search as SearchIcon, 
  CheckCircle2, Star, ArrowRight
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
    { icon: <Zap size={20} />, title: "Kurikulum 2026", desc: "Materi terbaru fokus pada AI & Modern Dev." },
    { icon: <BookOpen size={20} />, title: "Project Based", desc: "Belajar sambil membangun produk nyata." },
    { icon: <Lock size={20} />, title: "Lifetime Access", desc: "Satu kali bayar untuk akses selamanya." },
  ];

  const showcases = [
    { icon: <Layout size={16} />, title: "Portfolio Tanpa Coding", desc: "Tampil profesional secara instan", link: "#" },
    { icon: <ShoppingCart size={16} />, title: "Toko Online Sederhana", desc: "Seperti martabakgresik.my.id", link: "https://martabakgresik.my.id" },
    { icon: <Globe size={16} />, title: "Web AI Generator", desc: "Seperti ruangriung.my.id", link: "https://ruangriung.my.id" },
    { icon: <Activity size={16} />, title: "Platform Kesehatan", desc: "Seperti nutrilife-ai.pages.dev", link: "https://nutrilife-ai.pages.dev/" },
    { icon: <Share2 size={16} />, title: "Web Affiliate", desc: "Seperti bikinsendiri.my.id", link: "https://bikinsendiri.my.id/" },
    { icon: <SearchIcon size={16} />, title: "Tools SEO Mandiri", desc: "Seperti seo.ariftirtana.my.id", link: "https://seo.ariftirtana.my.id" },
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
              {renderCustomLogin ? (
                renderCustomLogin
              ) : (
                <button onClick={onLogin} className="w-full bg-black dark:bg-white text-white dark:text-black py-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl">
                  <Mail size={22} /> Sign in with Google
                </button>
              )}
              
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
                    <a href={regEmail ? waLink : '#'} target="_blank" rel="noopener noreferrer" className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center transition-all ${regEmail ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-black/10 opacity-50 cursor-not-allowed'}`}>
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

        {/* 5. TRUSTED BY 500++ */}
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
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Bergabunglah dengan Komunitas Masa Depan</p>
            </div>
          </div>
          <CheckCircle2 size={32} className="opacity-20 relative z-10 hidden md:block" />
        </motion.div>

        {/* 6. POWERED & SUPPORTED BY */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-10 pt-12 pb-12"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 text-center">Global Partners & Technology Support</p>
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
          <div className="flex flex-col items-center gap-4">
            <div className="h-px w-24 bg-black/10 dark:bg-white/10"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-black/10 dark:text-white/10 italic text-center">
              &copy; 2026 KELASWEB INDONESIA &bull; DESIGNED BY ANTIGRAVITY
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Landing;
