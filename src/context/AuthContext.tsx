import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  picture: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthorized: boolean;
  login: (googleToken: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthorized(true);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (googleToken: string) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken })
      });

      const data = await response.json();

      if (data.authorized) {
        const newUser = {
          email: data.user.email,
          name: data.user.name,
          picture: data.user.picture,
          role: data.user.role
        };
        
        setUser(newUser);
        setIsAuthorized(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        
        // Force refresh to ensure all components sync with the new auth state
        window.location.reload();
        
        return { success: true };
      } else {
        return { success: false, error: 'Akses Ditolak. Email Anda belum terdaftar di sistem kami.' };
      }
    } catch (err) {
      console.error('Auth Error:', err);
      
      // AUTO-LOGIN UNTUK TESTING LOKAL (Jika API tidak terjangkau)
      if (window.location.hostname === 'localhost') {
        const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',');
        const isDevAdmin = adminEmails.some(e => googleToken.includes(e)) || googleToken.includes('admin');
        
        const devUser = {
          email: isDevAdmin ? (adminEmails[0] || 'admin@localhost') : 'student@localhost',
          name: isDevAdmin ? 'Admin (Dev Mode)' : 'Student (Dev Mode)',
          picture: `https://ui-avatars.com/api/?name=${isDevAdmin ? 'Admin' : 'Student'}&background=random`,
          role: isDevAdmin ? 'admin' : 'student'
        };
        setUser(devUser);
        setIsAuthorized(true);
        localStorage.setItem('user', JSON.stringify(devUser));
        window.location.reload();
        return { success: true };
      }

      return { success: false, error: 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthorized(false);
    localStorage.removeItem('user');
    // Force redirect to home and refresh state
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
