import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { Materi } from '../types';
import { CheckCircle2, ChevronLeft, ChevronRight, List } from 'lucide-react';
import 'highlight.js/styles/github-dark.css';

interface MateriDetailProps {
  materi: Materi;
  onNext?: () => void;
  onPrev?: () => void;
}

const MateriDetail: React.FC<MateriDetailProps> = ({ materi, onNext, onPrev }) => {
  const [subProgress, setSubProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('sub_materi_progress') || '{}');
    setSubProgress(progress[materi.slug] || {});
    
    window.scrollTo(0, 0);
  }, [materi.slug]);

  const toggleSubRead = (subId: string) => {
    const allProgress = JSON.parse(localStorage.getItem('sub_materi_progress') || '{}');
    const currentMateriProgress = { ...subProgress, [subId]: !subProgress[subId] };
    
    allProgress[materi.slug] = currentMateriProgress;
    localStorage.setItem('sub_materi_progress', JSON.stringify(allProgress));
    setSubProgress(currentMateriProgress);

    // Also update the main materi progress if all sub-materi are read
    const isAllRead = materi.subMateri.every(s => currentMateriProgress[s.id]);
    const materiProgress = JSON.parse(localStorage.getItem('materi_progress') || '{}');
    materiProgress[materi.slug] = isAllRead;
    localStorage.setItem('materi_progress', JSON.stringify(materiProgress));
    
    window.dispatchEvent(new Event('storage'));
  };

  const isAllRead = materi.subMateri.length > 0 && materi.subMateri.every(s => subProgress[s.id]);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
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

        <div className="mt-16 pt-8 border-t border-black dark:border-white flex flex-col sm:flex-row items-center justify-between gap-6">
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
