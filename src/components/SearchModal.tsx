import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, BookOpen, X } from 'lucide-react';
import { useMaterials } from '../hooks/useMaterials';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  type: 'materi' | 'submateri';
  modulId: number;
  slug: string;
  title: string;
  hash?: string;
}

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { allMateri } = useMaterials();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Search Logic
  const results: SearchResult[] = [];
  if (query.trim().length > 1) {
    const q = query.toLowerCase();
    allMateri.forEach((m) => {
      // Search in main material title
      if (m.frontmatter.title.toLowerCase().includes(q)) {
        results.push({
          type: 'materi',
          modulId: m.frontmatter.modul,
          slug: m.slug,
          title: m.frontmatter.title,
        });
      }
      
      // Search in sub materials (H2)
      m.subMateri.forEach((sub) => {
        if (sub.title.toLowerCase().includes(q)) {
          results.push({
            type: 'submateri',
            modulId: m.frontmatter.modul,
            slug: m.slug,
            title: sub.title,
            hash: sub.id,
          });
        }
      });
    });
  }

  const handleSelect = (slug: string, hash?: string) => {
    setIsOpen(false);
    navigate(`/materi/${slug}${hash ? `#${hash}` : ''}`);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-black/10 dark:hover:border-white/10"
      >
        <Search size={16} />
        <span className="hidden md:inline font-medium">Cari Materi...</span>
        <div className="hidden md:flex items-center gap-1 opacity-50 ml-2">
          <Command size={12} />
          <span className="text-[10px] font-bold">K</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-[101] bg-white dark:bg-[#161616] rounded-3xl shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 flex flex-col max-h-[80vh]"
            >
              {/* Search Header */}
              <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center gap-3">
                <Search size={20} className="text-black/50 dark:text-white/50" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari konsep (contoh: Docker, React, SEO)..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-black/50 dark:text-white/50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                {query.trim().length <= 1 ? (
                  <div className="p-10 text-center text-black/40 dark:text-white/40 flex flex-col items-center gap-3">
                    <Command size={32} className="opacity-20" />
                    <p className="text-sm font-medium">Ketik apa saja untuk mulai mencari.</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-10 text-center text-black/40 dark:text-white/40 flex flex-col items-center gap-3">
                    <Search size={32} className="opacity-20" />
                    <p className="text-sm font-medium">Tidak ada materi yang cocok dengan "{query}".</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {results.slice(0, 15).map((result, i) => (
                      <button
                        key={`${result.slug}-${result.hash || 'main'}-${i}`}
                        onClick={() => handleSelect(result.slug, result.hash)}
                        className="w-full text-left flex items-start gap-4 p-4 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-colors group"
                      >
                        <div className="mt-1 p-2 bg-black/5 dark:bg-white/5 rounded-lg text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                          <BookOpen size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded-full uppercase tracking-widest text-black/50 dark:text-white/50">
                              Modul {result.modulId}
                            </span>
                            {result.type === 'submateri' && (
                              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                                Sub-Bab
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-sm text-black dark:text-white truncate">
                            {result.title}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-3 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-center">
                <p className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest flex items-center justify-center gap-2">
                  <span className="px-1.5 border border-black/20 dark:border-white/20 rounded shadow-sm">Enter</span> untuk memilih
                  <span className="px-1.5 border border-black/20 dark:border-white/20 rounded shadow-sm ml-2">Esc</span> untuk menutup
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
