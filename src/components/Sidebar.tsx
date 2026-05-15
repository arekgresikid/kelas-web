import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, CheckCircle2, X, ChevronDown, Home } from 'lucide-react';
import { useMaterials } from '../hooks/useMaterials';
import { useProgress } from '../context/ProgressContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  onItemClick?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick, isOpen, onClose }) => {
  const { moduls } = useMaterials();
  const { progress } = useProgress();
  const location = useLocation();
  
  const [expandedModul, setExpandedModul] = useState<number | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    return Number(localStorage.getItem('sidebar_width')) || 320;
  });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      let newWidth = e.clientX;
      if (newWidth < 280) newWidth = 280;
      if (newWidth > 500) newWidth = 500;
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      localStorage.setItem('sidebar_width', String(sidebarWidth));
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, sidebarWidth]);

  // Auto-expand based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/materi/')) {
      const slug = currentPath.split('/').pop();
      const currentModul = moduls.find(m => m.materi.some(mat => mat.slug === slug));
      if (currentModul) {
        setExpandedModul(currentModul.id);
      }
    }
  }, [location.pathname, moduls]);

  const isMateriRead = (slug: string) => {
    return progress[slug] === true;
  };

  const toggleModul = (id: number) => {
    setExpandedModul(expandedModul === id ? null : id);
  };

  return (
    <aside 
      style={{ width: isOpen ? '100%' : (window.innerWidth >= 1024 ? `${sidebarWidth}px` : '18rem') }}
      className={cn(
        "fixed inset-y-0 left-0 z-50 transform lg:sticky lg:top-16 lg:z-30 lg:translate-x-0 transition-[transform,opacity] duration-300 ease-in-out bg-white dark:bg-black border-r border-black dark:border-white lg:h-[calc(100vh-64px)] flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Resize Handle */}
      <div 
        onMouseDown={() => setIsResizing(true)}
        className={cn(
          "hidden lg:block absolute top-0 right-0 w-1 h-full cursor-col-resize transition-all z-50",
          isResizing ? "bg-black dark:bg-white" : "hover:bg-black/10 dark:hover:bg-white/10"
        )}
      />
      {/* Mobile Close Button */}
      <div className="lg:hidden p-4 flex justify-end border-b border-black/10 dark:border-white/10">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <X size={20} className="text-black dark:text-white" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2 scrollbar-hide">
        {/* Home Link */}
        <NavLink
          to="/"
          onClick={onItemClick}
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all border border-transparent mb-4",
            isActive 
              ? "bg-black text-white dark:bg-white dark:text-black font-bold shadow-lg shadow-black/5 dark:shadow-white/5" 
              : "hover:bg-black/5 dark:hover:bg-white/5 text-black/60 dark:text-white/60"
          )}
        >
          {({ isActive }) => (
            <>
              <div className="w-6 h-6 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center">
                <Home size={14} className={isActive ? "text-white dark:text-black" : "text-black dark:text-white"} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Dashboard Utama</span>
            </>
          )}
        </NavLink>

        <div className="h-px bg-black/10 dark:bg-white/10 mx-3 mb-6" />

        {moduls.map((modul) => {
          const isExpanded = expandedModul === modul.id;
          
          return (
            <div key={modul.id} className="space-y-1">
              <button
                onClick={() => toggleModul(modul.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all border border-transparent",
                  isExpanded 
                    ? "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10" 
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold">
                    {modul.id}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-tight text-left leading-tight pr-2">
                    {modul.title}
                  </span>
                </div>
                <ChevronDown 
                  size={14} 
                  className={cn("transition-transform duration-300 opacity-40", isExpanded && "rotate-180")} 
                />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1 ml-4 pl-4 border-l border-black/10 dark:border-white/10 space-y-1 py-1">
                      {modul.materi.map((m) => (
                        <NavLink
                          key={m.slug}
                          to={`/materi/${m.slug}`}
                          onClick={onItemClick}
                          className={({ isActive }) => cn(
                            "group flex items-start justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all",
                            isActive 
                              ? "text-black dark:text-white font-bold" 
                              : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                          )}
                        >
                          <span className="leading-snug break-words">{m.frontmatter.title}</span>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            {isMateriRead(m.slug) && (
                              <CheckCircle2 size={12} className="text-green-500" />
                            )}
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
