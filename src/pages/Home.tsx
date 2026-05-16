import { NavLink } from 'react-router-dom';
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
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useMaterials } from '../hooks/useMaterials';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../context/ProgressContext';
import Certificate from '../components/Certificate';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
                        className="p-8 rounded-[3rem] bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all group shadow-sm hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 relative overflow-hidden"
                      >
                        {/* Background subtle number */}
                        <span className="absolute -bottom-10 -right-5 text-[150px] font-black opacity-[0.02] dark:opacity-[0.05] pointer-events-none select-none">
                          {modul.id}
                        </span>

                        <div className="flex items-center gap-5 mb-8">
                          <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                            {getIcon(modul.id)}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Modul {modul.id}</span>
                            <h4 className="font-bold text-xl leading-tight">{modul.title.split(': ').pop()}</h4>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <ul className="space-y-3 ml-1 relative z-10">
                            {modul.materi.map(m => (
                              <li key={m.slug} className="text-sm text-black/60 dark:text-white/60 flex items-center gap-3">
                                <div className={cn(
                                  "w-2 h-2 rounded-full transition-all",
                                  progress[m.slug] ? "bg-green-500 scale-125 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-black/10 dark:bg-white/10"
                                )} />
                                <span className={progress[m.slug] ? "text-black dark:text-white font-medium" : ""}>{m.frontmatter.title}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Per-Module Progress */}
                          <div className="pt-6 border-t border-black/5 dark:border-white/5">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Penyelesaian</span>
                              <span className="text-[10px] font-bold">{Math.round((modul.materi.filter(m => progress[m.slug]).length / modul.materi.length) * 100)}%</span>
                            </div>
                            <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-black dark:bg-white transition-all duration-1000"
                                style={{ width: `${(modul.materi.filter(m => progress[m.slug]).length / modul.materi.length) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
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

export default Home;
