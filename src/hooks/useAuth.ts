import { useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  picture: string;
  role?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthorized(true);
    }
    setLoading(false);
  }, []);

  const login = async (googleToken: string) => {
    try {
      // KIRIM TOKEN KE BACKEND (Bukan email mentah)
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
        return { success: true };
      } else {
        return { success: false, error: 'Akses Ditolak. Email Anda belum terdaftar di sistem kami.' };
      }
    } catch (err) {
      console.error('Auth Error:', err);
      
      // AUTO-LOGIN UNTUK TESTING LOKAL
      if (window.location.hostname === 'localhost') {
        console.warn('Backend API tidak terdeteksi. Mengaktifkan Mode Dev (Auto-Login).');
        const devUser = {
          email: 'dev@localhost',
          name: 'Developer Mode',
          picture: 'https://ui-avatars.com/api/?name=Developer+Mode&background=000&color=fff',
          role: 'admin'
        };
        setUser(devUser);
        setIsAuthorized(true);
        localStorage.setItem('user', JSON.stringify(devUser));
        return { success: true };
      }

      return { success: false, error: 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthorized(false);
    localStorage.removeItem('user');
  };

  return { user, loading, isAuthorized, login, logout };
};
