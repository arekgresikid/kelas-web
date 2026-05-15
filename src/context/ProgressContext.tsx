import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

interface ProgressContextType {
  progress: Record<string, boolean>;
  toggleProgress: (slug: string) => Promise<void>;
  loading: boolean;
  syncProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load initial progress from localStorage
  useEffect(() => {
    const localProgress = JSON.parse(localStorage.getItem('materi_progress') || '{}');
    setProgress(localProgress);
    setLoading(false);
  }, []);

  // Sync with cloud when user logs in
  useEffect(() => {
    if (user?.email) {
      syncProgress();
    }
  }, [user?.email]);

  const syncProgress = async () => {
    if (!user?.email) return;
    
    try {
      const response = await fetch(`/api/progress?email=${encodeURIComponent(user.email)}`);
      const cloudData = await response.json() as { materi_slug: string }[];
      
      const newProgress: Record<string, boolean> = { ...progress };
      cloudData.forEach(item => {
        newProgress[item.materi_slug] = true;
      });
      
      // Update local storage and state
      localStorage.setItem('materi_progress', JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (err) {
      console.error('Failed to sync progress:', err);
    }
  };

  const toggleProgress = async (slug: string, explicitCompleted?: boolean) => {
    const isCompleted = explicitCompleted !== undefined ? explicitCompleted : !progress[slug];
    const newProgress = { ...progress, [slug]: isCompleted };
    
    // Optimistic update
    setProgress(newProgress);
    localStorage.setItem('materi_progress', JSON.stringify(newProgress));

    // Sync to cloud if logged in
    if (user?.email) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            slug,
            completed: isCompleted
          })
        });
      } catch (err) {
        console.error('Failed to save progress to cloud:', err);
      }
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, toggleProgress, loading, syncProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
