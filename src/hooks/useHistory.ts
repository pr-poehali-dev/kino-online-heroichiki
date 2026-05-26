import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  title: string;
  poster: string;
  progress: number;
  duration: number;
  watchedAt: string;
  type: 'movie' | 'series';
  episode?: string;
}

const STORAGE_KEY = 'poehali_cinema_history';

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : getDefaultHistory();
    } catch {
      return getDefaultHistory();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addOrUpdate = (item: HistoryItem) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== item.id);
      return [item, ...filtered].slice(0, 20);
    });
  };

  const remove = (id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  };

  const clear = () => setHistory([]);

  return { history, addOrUpdate, remove, clear };
}

function getDefaultHistory(): HistoryItem[] {
  return [
    {
      id: 'heroychiki-movie',
      title: 'Геройчики: Незваный гость',
      poster: 'https://cdn.poehali.dev/projects/312e5844-24db-4805-af37-6bf9e63c2cd2/files/3801e344-1504-4862-888b-a6117d3b7214.jpg',
      progress: 42,
      duration: 85,
      watchedAt: new Date(Date.now() - 3600000).toISOString(),
      type: 'movie',
    },
    {
      id: 'heroychiki-s1',
      title: 'Геройчики',
      poster: 'https://cdn.poehali.dev/projects/312e5844-24db-4805-af37-6bf9e63c2cd2/files/1f766a94-86d7-440f-aa48-4018d474f606.jpg',
      progress: 14,
      duration: 25,
      watchedAt: new Date(Date.now() - 86400000).toISOString(),
      type: 'series',
      episode: 'С1 Э5',
    },
  ];
}
