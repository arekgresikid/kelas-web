import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMaterials } from '../hooks/useMaterials';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const { allMateri } = useMaterials();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const filtered = allMateri.filter(m => 
      m.frontmatter.title.toLowerCase().includes(query.toLowerCase()) ||
      m.content.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);

    setResults(filtered);
  }, [query, allMateri]);

  const handleSelect = (slug: string) => {
    navigate(`/materi/${slug}`);
    setQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white dark:bg-[#0d0d0d] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center gap-4 p-4 border-b border-black/10 dark:border-white/10">
            <Search className="w-6 h-6 text-black/40 dark:text-white/40" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Cari materi belajar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xl font-bold outline-none text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20"
            />
            <button 
              onClick={onClose}
              className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={24} className="text-black dark:text-white" />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {query.length < 2 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 opacity-30">
                <Search size={48} />
                <p className="text-lg font-medium">Ketik minimal 2 karakter untuk mencari</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Hasil Pencarian ({results.length})</p>
                {results.map(res => (
                  <button
                    key={res.slug}
                    onClick={() => handleSelect(res.slug)}
                    className="w-full p-6 text-left bg-black/5 dark:bg-white/5 hover:bg-black dark:hover:bg-white group rounded-3xl transition-all flex items-center justify-between border border-transparent hover:border-black dark:hover:border-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center group-hover:bg-white/20 dark:group-hover:bg-black/20">
                        <BookOpen size={18} className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg group-hover:text-white dark:group-hover:text-black transition-colors">{res.frontmatter.title}</h4>
                        <p className="text-xs opacity-40 group-hover:text-white/60 dark:group-hover:text-black/60 font-bold uppercase tracking-widest">Modul {res.frontmatter.modul}</p>
                      </div>
                    </div>
                    <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-white dark:text-black" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 opacity-30">
                <X size={48} />
                <p className="text-lg font-medium">Materi tidak ditemukan</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
