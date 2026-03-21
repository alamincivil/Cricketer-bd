import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Award, Users, Trophy, Star, History } from 'lucide-react';
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
      <div className="bg-white border-b border-gray-100 py-20 md:py-32 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <History className="w-96 h-96 text-flag-500" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-flag-50 rounded-3xl flex items-center justify-center mx-auto md:mx-0 mb-8 shadow-inner"
          >
            <Award className="w-10 h-10 text-flag-500" />
          </motion.div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-black text-gray-900 mb-4 tracking-tight uppercase"
              >
                {eraInfo.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center md:justify-start space-x-4"
              >
                <span className="px-4 py-1.5 bg-flag-500 text-white rounded-full text-xs font-black uppercase tracking-widest">
                  {eraInfo.decade}
                </span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                  {players.length} Legends Found
                </span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-8 bg-gray-50 p-8 rounded-3xl border border-gray-100"
            >
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">{stats.mostRuns.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Most Runs</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">{stats.mostWickets}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Most Wickets</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-2xl font-black text-gray-900">{stats.mostMatches}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Most Matches</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content - Story */}
          <div className="lg:col-span-8 space-y-12">
            <EraStory story={eraInfo.storyEn} title={eraInfo.title} />
            
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-flag-500" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                    ERA <span className="text-flag-500">LEGENDS</span>
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {players.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
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
                  This era defined the spirit of Bangladesh cricket, transitioning from a young nation to a global competitor.
                </p>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Key Milestone</p>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-5 h-5 text-flag-500" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">
                      {eraInfo.slug === 'pioneers' ? '1999 World Cup Victory against Pakistan' : 
                       eraInfo.slug === 'golden-era' ? 'Gaining Test Status in 2000' : 
                       'Reaching 2017 Champions Trophy Semi-Final'}
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
