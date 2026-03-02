import { useState, useEffect, useCallback } from 'react';
import { Player } from '../types/player';

export interface FavoritePlayer {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

const FAVORITES_KEY = 'cricketer.bd:favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoritePlayer[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback((id: string) => {
    return favorites.some(f => f.id === id);
  }, [favorites]);

  const addFavorite = useCallback((player: Player) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === player.id)) return prev;
      return [...prev, {
        id: player.id,
        name: player.fullName,
        role: player.role,
        imageUrl: player.imageUrl
      }];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }, []);

  const toggleFavorite = useCallback((player: Player) => {
    if (isFavorite(player.id)) {
      removeFavorite(player.id);
    } else {
      addFavorite(player);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite
  };
};
