import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useFavorites } from '../hooks/useFavorites';
import { Player } from '../types/player';

interface FavoriteButtonProps {
  player: Player;
  showLabel?: boolean;
}

export default function FavoriteButton({ player, showLabel = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(player.id);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(player.id);
      }}
      className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${
        active 
          ? 'bg-flag-red-50 text-flag-red-500' 
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
      }`}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`w-5 h-5 ${active ? 'fill-flag-red-500' : ''}`} 
      />
      {showLabel && (
        <span className="text-xs font-bold uppercase tracking-widest">
          {active ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </motion.button>
  );
}
