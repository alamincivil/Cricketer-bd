import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'cricketer.bd:favorites';

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse favorites', e);
        return [];
      }
    }
    return [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const isFavorite = useCallback((id: string) => {
    return favoriteIds.includes(id);
  }, [favoriteIds]);

  const addFavorite = useCallback((id: string) => {
    setFavoriteIds(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds(prev => prev.filter(favId => favId !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    if (favoriteIds.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }, [favoriteIds, addFavorite, removeFavorite]);

  return {
    favoriteIds,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite
  };
};
