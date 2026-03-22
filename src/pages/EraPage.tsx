import React, { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Award, Users, Trophy, Star, History, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { getPlayersByEra, getEraStats } from '../services/players';
import PlayerCard from '../components/PlayerCard';
import SEOHead from '../components/SEOHead';
import EraStory from '../components/EraStory';
import erasData from '../data/eras.json';

export default function EraPage() {
  const { eraSlug } = useParams();
  
  const eraInfo = useMemo(() => 
    erasData.find(e => e.slug === eraSlug),
    [eraSlug]
  );

  const players = useMemo(() => 
    eraInfo ? getPlayersByEra(eraInfo.eraTags) : [],
    [eraInfo]
  );

  const stats = useMemo(() => 
    eraInfo ? getEraStats(eraInfo.eraTags) : { mostMatches: 0, mostRuns: 0, mostWickets: 0 },
    [eraInfo]
  );

  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const INITIAL_PLAYER_COUNT = 8;
  const displayedPlayers = showAllPlayers ? players : players.slice(0, INITIAL_PLAYER_COUNT);

  const eraColor = eraInfo?.slug === 'pioneers' 
    ? 'from-flag-red-600 via-flag-red-500 to-flag-red-500/80'
    : eraInfo?.slug === 'golden-era'
    ? 'from-amber-600 via-amber-500 to-amber-500/80'
    : 'from-flag-600 via-flag-500 to-flag-500/80';

  const eraBg = eraInfo?.slug === 'pioneers'
    ? 'bg-flag-red-500'
    : eraInfo?.slug === 'golden-era'
    ? 'bg-amber-500'
    : 'bg-flag-500';

  const eraHighlights = {
    pioneers: {
      text: 'The 1997 ICC Trophy win and the 1999 World Cup upset against Pakistan put Bangladesh on the world cricket map.',
      milestone: '1999 World Cup Victory vs Pakistan',
      icon: '🏆',
    },
    'golden-era': {
      text: 'Bangladesh gained Test status in 2000 and produced its first generation of world-class cricketers.',
      milestone: 'First Test Victory in 2005 vs Zimbabwe',
      icon: '⭐',
    },
    'modern-stars': {
      text: 'A decade of consistency, with series wins against top nations and reaching global tournament knockouts.',
      milestone: '2017 Champions Trophy Semi-Final',
      icon: '🚀',
    },
  };

  const highlight = eraHighlights[eraInfo?.slug as keyof typeof eraHighlights] || eraHighlights['modern-stars'];

  if (!eraInfo) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead 
        title={`${eraInfo.title} | Cricket History`} 
        description={`Explore the ${eraInfo.title} of Bangladesh cricket. ${eraInfo.storyEn.slice(0, 150)}...`}
      />

      {/* Hero Section */}
      <div className={`${eraBg} py-16 md:py-24 relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${eraColor}`} />
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -left-8 -bottom-8 w-64 h-64 rounded-full bg-white/5" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 mb-4"
              >
                <History className="w-3 h-3" />
                {eraInfo.decade}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight uppercase leading-none"
              >
                {eraInfo.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {players.length} Legends
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-8 bg-white/10 border border-white/20 backdrop-blur-sm p-6 rounded-2xl"
            >
              <div className="text-center">
                <p className="text-2xl font-black text-white">{stats.mostRuns.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Most Runs</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">{stats.mostWickets}</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Most Wickets</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">{stats.mostMatches}</p>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Most Matches</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content - Story */}
          <div className="lg:col-span-8 space-y-12">
            <EraStory story={eraInfo.storyEn} title={eraInfo.title} />
            
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${eraBg} rounded-2xl flex items-center justify-center`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                      Era <span className="text-flag-500">Legends</span>
                    </h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                      {players.length} players from the {eraInfo.decade}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayedPlayers.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>

              {players.length > INITIAL_PLAYER_COUNT && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllPlayers(!showAllPlayers)}
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:border-flag-500 hover:text-flag-500 transition-all shadow-sm"
                  >
                    {showAllPlayers ? (
                      <>Show Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Show All {players.length} Legends <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center">
                <Star className="w-5 h-5 mr-3 text-flag-gold-500" />
                Era Highlight
              </h3>
              <div className="space-y-6">
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  {highlight.text}
                </p>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Key Milestone</p>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{highlight.icon}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-700">
                      {highlight.milestone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-flag-500 p-8 rounded-3xl text-white shadow-xl shadow-flag-500/20">
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Explore Other Eras</h3>
              <div className="space-y-3">
                {erasData.filter(e => e.slug !== eraSlug).map(e => (
                  <Link 
                    key={e.slug}
                    to={`/era/${e.slug}`}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all group"
                  >
                    <span className="font-bold uppercase tracking-widest text-xs">{e.title}</span>
                    <ArrowLeft className="w-4 h-4 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
