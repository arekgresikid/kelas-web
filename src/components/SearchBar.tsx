import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMaterials } from '../hooks/useMaterials';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { allMateri } = useMaterials();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const filtered = allMateri.filter(m => 
      m.frontmatter.title.toLowerCase().includes(query.toLowerCase()) ||
      m.content.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setResults(filtered);
    setIsOpen(true);
  }, [query, allMateri]);

  const handleSelect = (slug: string) => {
    navigate(`/materi/${slug}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
        <input
          type="text"
          placeholder="Cari materi..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 focus:bg-white dark:focus:bg-black border focus:border-black dark:focus:border-white rounded-full text-sm transition-all outline-none text-black dark:text-white"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black border border-black dark:border-white rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="py-2">
            {results.map(res => (
              <button
                key={res.slug}
                onClick={() => handleSelect(res.slug)}
                className="w-full px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-white/5 flex flex-col transition-colors border-b last:border-0 border-black/10 dark:border-white/10"
              >
                <span className="font-medium text-black dark:text-white">{res.frontmatter.title}</span>
                <span className="text-xs text-black/40 dark:text-white/40">Modul {res.frontmatter.modul}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
