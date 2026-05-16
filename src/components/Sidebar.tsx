import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, CheckCircle2, X, ChevronDown, Home, LogOut, Lock } from 'lucide-react';
import { useMaterials } from '../hooks/useMaterials';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../hooks/useAuth';
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
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const [expandedModul, setExpandedModul] = useState<number | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    return Number(localStorage.getItem('sidebar_width')) || 320;
  });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const sidebarElement = document.getElementById('app-sidebar');
      const offsetLeft = sidebarElement ? sidebarElement.getBoundingClientRect().left : 0;
      
      let newWidth = e.clientX - offsetLeft;
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
      id="app-sidebar"
      style={{ width: isOpen ? '100%' : (window.innerWidth >= 1024 ? `${sidebarWidth}px` : '18rem') }}
      className={cn(
        "fixed inset-y-0 left-0 z-50 transform lg:sticky lg:top-16 lg:z-30 lg:translate-x-0 transition-[transform,opacity] duration-300 ease-in-out bg-white dark:bg-[#161616] border-r border-black dark:border-white/10 lg:h-[calc(100vh-64px)] flex flex-col",
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

        {/* Admin Link - Mobile & Tablet priority */}
        {user?.role === 'admin' && (
          <NavLink
            to="/admin"
            onClick={onItemClick}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all border mb-4",
              isActive 
                ? "bg-red-500 text-white font-bold shadow-lg shadow-red-500/20" 
                : "bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/10"
            )}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${location.pathname === '/admin' ? 'bg-white/20' : 'bg-red-500/10'}`}>
              <Lock size={14} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Panel Admin</span>
          </NavLink>
        )}

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
                  <div className="relative">
                    <span className="w-6 h-6 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-bold z-10 relative">
                      {modul.id}
                    </span>
                    {/* Tiny Progress Ring or Dot */}
                    <div className={cn(
                      "absolute -inset-1 rounded-xl border-2 border-transparent transition-all",
                      modul.materi.every(m => progress[m.slug]) ? "border-green-500 scale-110" : ""
                    )} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[8px] font-black opacity-30 uppercase tracking-tighter">
                      {Math.round((modul.materi.filter(m => progress[m.slug]).length / modul.materi.length) * 100)}% Selesai
                    </span>
                    <span className="text-xs font-bold uppercase tracking-tight text-left leading-tight pr-2">
                      {modul.title}
                    </span>
                  </div>
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

      {/* User Profile & Logout - Visible on Mobile Sidebar */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 space-y-4">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 overflow-hidden">
              <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-black dark:text-white truncate">{user.name}</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 truncate">{user.role || 'Siswa'}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/40 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={16} />
          Keluar (Logout)
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
