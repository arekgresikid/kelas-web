import React from 'react';
import { BookOpen, Menu } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black dark:border-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-black dark:text-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-white dark:text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight text-black dark:text-white">Kelas<span className="text-black dark:text-white opacity-60">Web</span></span>
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          {user?.role === 'admin' && (
            <Link 
              to="/admin" 
              className="hidden sm:flex px-3 py-1 text-xs font-bold uppercase border border-black dark:border-white rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              Admin
            </Link>
          )}
          <DarkModeToggle />
          <button 
            onClick={logout}
            className="hidden sm:flex px-4 py-2 text-sm font-bold uppercase tracking-tighter text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
