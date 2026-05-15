import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, CheckCircle2, BookOpen, X } from 'lucide-react';
import { useMaterials } from '../hooks/useMaterials';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  const [progress, setProgress] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const syncProgress = () => {
      setProgress(JSON.parse(localStorage.getItem('materi_progress') || '{}'));
    };

    syncProgress();
    window.addEventListener('storage', syncProgress);
    return () => window.removeEventListener('storage', syncProgress);
  }, []);

  const isMateriRead = (slug: string) => {
    return progress[slug] === true;
  };

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-72 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white dark:bg-black border-r border-black dark:border-white h-screen flex flex-col",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Mobile Close Button (Only visible when sidebar is open on mobile) */}
      <div className="lg:hidden p-4 flex justify-end border-b border-black/10 dark:border-white/10">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <X size={20} className="text-black dark:text-white" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        {moduls.map((modul) => (
          <div key={modul.id}>
            <h3 className="px-3 text-xs font-semibold text-black/50 dark:text-white/50 uppercase tracking-wider mb-3">
              Modul {modul.id}: {modul.title}
            </h3>
            <div className="space-y-1">
              {modul.materi.map((m) => (
                <NavLink
                  key={m.slug}
                  to={`/materi/${m.slug}`}
                  onClick={onItemClick}
                  className={({ isActive }) => cn(
                    "group flex items-start justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all border border-transparent",
                    isActive 
                      ? "bg-black text-white dark:bg-white dark:text-black" 
                      : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                  )}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-40 mt-1.5" />
                    <span className="leading-snug break-words">{m.frontmatter.title}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2 mt-0.5">
                    {isMateriRead(m.slug) && (
                      <CheckCircle2 size={14} className="text-black dark:text-white" />
                    )}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
