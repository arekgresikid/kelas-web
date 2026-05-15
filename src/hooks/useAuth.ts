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

  const login = async (googleUser: any) => {
    try {
      // Panggil API Bridge Cloudflare Pages (Menembak ke D1 Database)
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: googleUser.email })
      });

      const data = await response.json();

      if (data.authorized) {
        const newUser = {
          email: googleUser.email,
          name: googleUser.name,
          picture: googleUser.picture,
          role: data.user.role
        };
        
        setUser(newUser);
        setIsAuthorized(true);
        localStorage.setItem('user', JSON.stringify(newUser));
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      console.error('Auth Error:', err);
      return { success: false, error: 'Gagal terhubung ke database D1.' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthorized(false);
    localStorage.removeItem('user');
  };

  return { user, loading, isAuthorized, login, logout };
};
