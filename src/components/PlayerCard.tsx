import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../types/player';
import PlayerAvatar from './PlayerAvatar';
import { ChevronRight } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link
      to={`/players/${player.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-6 flex flex-col items-center text-center">
        <PlayerAvatar name={player.fullName} imageUrl={player.imageUrl} size="md" />
        
        <h3 className="mt-4 text-xl font-bold text-gray-900 group-hover:text-flag-500 transition-colors">
          {player.knownAs}
        </h3>
        <p className="text-flag-500 font-bold text-sm uppercase tracking-wider mb-1">
          {player.role}
        </p>
        <div className="text-[11px] text-gray-400 font-medium mb-3">
          {Object.values(player.statsSummary).reduce((acc, curr) => acc + (curr?.runs || 0), 0).toLocaleString()} Runs • {Object.values(player.statsSummary).reduce((acc, curr) => acc + (curr?.wickets || 0), 0).toLocaleString()} Wickets
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {player.formats.map(format => (
            <span key={format} className="px-2 py-0.5 bg-flag-red-100 text-flag-red-600 text-[10px] font-bold rounded uppercase">
              {format}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {player.eraTags.map(tag => (
            <span key={tag} className="text-[10px] text-gray-400 font-medium">
              #{tag}
            </span>
          ))}
        </div>

        <div className="w-full pt-4 border-t border-gray-50 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-400">VIEW PROFILE</span>
          <ChevronRight className="w-4 h-4 text-flag-500" />
        </div>
      </div>
    </Link>
  );
}
