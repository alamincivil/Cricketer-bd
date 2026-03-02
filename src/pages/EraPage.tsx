import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, Users } from 'lucide-react';
import { getAllPlayers } from '../services/players';
import PlayerCard from '../components/PlayerCard';
import SEOHead from '../components/SEOHead';

const eraContexts: Record<string, string> = {
  '1990s': 'The era of pioneers. Bangladesh cricket was finding its feet on the international stage, leading up to the historic 1999 World Cup victory.',
  '2000s': 'The Golden Era of transition. Bangladesh gained Test status and produced its first generation of global superstars.',
  '2010s': 'The era of dominance. Bangladesh became a formidable force at home and started winning consistently in all formats.',
  '2020s': 'The modern era. A new generation of fearless cricketers carrying the legacy forward with aggressive and professional cricket.',
};

export default function EraPage() {
  const { era } = useParams();
  const eraTitle = era ? era.charAt(0).toUpperCase() + era.slice(1) : '';
  const players = getAllPlayers().filter(p => 
    p.eraTags.some(tag => tag.toLowerCase() === era?.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead 
        title={`${eraTitle} Era Players`} 
        description={`Explore cricketers from the ${eraTitle} era of Bangladesh cricket. ${eraContexts[eraTitle] || ''}`}
      />

      <div className="bg-flag-500 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <Link to="/players" className="inline-flex items-center text-flag-red-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Directory
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <Award className="w-10 h-10 text-flag-gold-400" />
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              {eraTitle} <span className="text-flag-gold-400">Era</span>
            </h1>
          </div>
          <p className="text-xl text-flag-red-100 max-w-2xl leading-relaxed">
            {eraContexts[eraTitle] || 'Exploring the history and legends of Bangladesh cricket.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-gray-500">
            <Users className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">{players.length} Players Found</span>
          </div>
        </div>

        {players.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {players.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No players found for this era.</p>
          </div>
        )}
      </div>
    </div>
  );
}
