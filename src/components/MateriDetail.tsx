import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Materi } from '../types';
import { CheckCircle2, ChevronLeft, ChevronRight, List } from 'lucide-react';
import 'highlight.js/styles/github-dark.css';

import { useProgress } from '../context/ProgressContext';
import CodePlayground from './CodePlayground';

interface MateriDetailProps {
  materi: Materi;
  onNext?: () => void;
  onPrev?: () => void;
}
const MateriDetail = ({ materi, onNext, onPrev }: MateriDetailProps) => {
  const [subProgress, setSubProgress] = useState<Record<string, boolean>>({});
  const { toggleProgress } = useProgress();

  const isFrontendModul = materi.frontmatter.modul === 4 || materi.frontmatter.modul === 5;

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('sub_materi_progress') || '{}');
    setSubProgress(progress[materi.slug] || {});
    
    // Simpan materi terakhir yang dibaca untuk dashboard
    localStorage.setItem('last_read_materi', materi.slug);
    window.dispatchEvent(new Event('storage'));
    
    window.scrollTo(0, 0);
  }, [materi.slug]);

  const toggleSubRead = async (subId: string) => {
    const allProgress = JSON.parse(localStorage.getItem('sub_materi_progress') || '{}');
    const currentMateriProgress = { ...subProgress, [subId]: !subProgress[subId] };
    
    allProgress[materi.slug] = currentMateriProgress;
    localStorage.setItem('sub_materi_progress', JSON.stringify(allProgress));
    setSubProgress(currentMateriProgress);

    // Also update the main materi progress if all sub-materi are read
    const isAllRead = materi.subMateri.every(s => currentMateriProgress[s.id]);
    
    // Sync with global context (and cloud)
    await toggleProgress(materi.slug, isAllRead);
    
    window.dispatchEvent(new Event('storage'));
  };

  const isAllRead = materi.subMateri.length > 0 && materi.subMateri.every(s => subProgress[s.id]);

  // Reading progress calculation
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-10 relative">
      {/* Sticky Reading Progress (Desktop Side, Mobile Top) */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-black/5 dark:bg-white/5 pointer-events-none">
        <div 
          className="h-full bg-black dark:bg-white transition-all duration-150" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>

      <div className="flex-1 min-w-0 overflow-hidden">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-black/50 dark:text-white/50 mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          <span className="hover:text-black dark:hover:text-white cursor-pointer flex-shrink-0">Modul {materi.frontmatter.modul}</span>
          <span className="flex-shrink-0">/</span>
          <span className="text-black dark:text-white font-medium truncate">{materi.frontmatter.title}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white mb-4 tracking-tight break-words leading-tight scroll-mt-32">
          {materi.frontmatter.title}
        </h1>
        
        {materi.frontmatter.description && (
          <p className="text-xl text-black/60 dark:text-white/60 mb-10 leading-relaxed border-l-4 border-black dark:border-white pl-6 py-2 bg-black/5 dark:bg-white/5 rounded-r-xl">
            {materi.frontmatter.description}
          </p>
        )}

        <div className="prose dark:prose-invert">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeHighlight]}
          >
            {materi.content}
          </ReactMarkdown>
        </div>

        {isFrontendModul && <CodePlayground />}

        {/* Knowledge Check Section */}
        <div className="mt-20 p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-black dark:border-white space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black dark:bg-white rounded-lg">
              <CheckCircle2 size={20} className="text-white dark:text-black" />
            </div>
            <h3 className="text-xl font-bold">Knowledge Check</h3>
          </div>
          <p className="text-black/60 dark:text-white/60 text-sm italic">
            "Jangan hanya membaca. Cobalah untuk mempraktekkan apa yang baru saja Anda pelajari di terminal atau editor Anda sendiri."
          </p>
          <ul className="space-y-4">
             {materi.subMateri.map((sub) => (
               <li key={sub.id} className="flex items-start gap-3 group">
                 <button 
                   onClick={() => toggleSubRead(sub.id)}
                   className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                     subProgress[sub.id] ? 'bg-green-500 border-green-500 text-white' : 'border-black/20 dark:border-white/20 group-hover:border-black'
                   }`}
                 >
                   {subProgress[sub.id] ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />}
                 </button>
                 <div>
                   <p className={`font-bold ${subProgress[sub.id] ? 'opacity-40 line-through' : ''}`}>{sub.title}</p>
                   <p className="text-xs opacity-50">Klik kotak untuk menandai bagian ini sudah dipahami.</p>
                 </div>
               </li>
             ))}
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
             {isAllRead ? (
               <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-bold">
                 <CheckCircle2 size={20} />
                 Materi Selesai!
               </div>
             ) : (
               <div className="text-sm text-black/50 dark:text-white/50 italic">
                 Selesaikan semua sub-materi untuk menandai materi ini selesai.
               </div>
             )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onPrev}
              disabled={!onPrev}
              className="flex-1 sm:flex-none btn border border-black dark:border-white text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 flex items-center justify-center gap-2"
            >
              <ChevronLeft size={18} /> Prev
            </button>
            <button
              onClick={onNext}
              disabled={!onNext}
              className="flex-1 sm:flex-none btn btn-primary flex items-center justify-center gap-2"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table of Contents (Sidebar Kanan) */}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <div className="sticky top-24 bg-black/5 dark:bg-white/5 p-6 rounded-2xl border border-black dark:border-white">
          <div className="flex items-center gap-2 font-bold text-black dark:text-white mb-6 border-b border-black dark:border-white pb-4">
            <List size={20} className="text-black dark:text-white" />
            Daftar Isi & Progress
          </div>
          <nav className="space-y-3">
            {materi.subMateri.map((sub) => (
              <div key={sub.id} className="group flex items-start gap-3">
                <button
                  onClick={() => toggleSubRead(sub.id)}
                  className={`mt-1 flex-shrink-0 w-5 h-5 rounded border transition-all flex items-center justify-center ${
                    subProgress[sub.id] 
                      ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black' 
                      : 'bg-transparent border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white'
                  }`}
                >
                  {subProgress[sub.id] && <CheckCircle2 size={12} />}
                </button>
                <a
                  href={`#${sub.id}`}
                  className={`text-sm leading-tight transition-colors ${
                    subProgress[sub.id] 
                      ? 'text-black/30 dark:text-white/30 line-through decoration-black/10 dark:decoration-white/10' 
                      : 'text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sub.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {sub.title}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};


export default MateriDetail;
