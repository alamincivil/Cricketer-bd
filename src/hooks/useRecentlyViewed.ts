import { useState, useEffect, useCallback } from 'react';

const RECENT_KEY = 'cricketer.bd:recently_viewed';
const MAX_RECENT = 10;

export const useRecentlyViewed = () => {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(RECENT_KEY);
    if (saved) {
      try {
        setRecentIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recently viewed', e);
      }
    }
  }, []);

  // Save recently viewed to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
  }, [recentIds]);

  const addRecent = useCallback((playerId: string) => {
    setRecentIds(prev => {
      const filtered = prev.filter(id => id !== playerId);
      return [playerId, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentIds([]);
  }, []);

  return {
    recentIds,
    addRecent,
    clearRecent
  };
};
