import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { getAllPlayers } from '../services/players';
import PlayerCard from '../components/PlayerCard';
import SEOHead from '../components/SEOHead';

export default function FanZonePage() {
  const { favoriteIds } = useFavorites();
  const allPlayers = getAllPlayers();

  const favoritePlayers = useMemo(() => {
    return allPlayers.filter(player => favoriteIds.includes(player.id));
  }, [allPlayers, favoriteIds]);

  const stats = useMemo(() => {
    let totalRuns = 0;
    let totalWickets = 0;
    const formats = new Set<string>();

    favoritePlayers.forEach(player => {
      Object.values(player.statsSummary).forEach(s => {
        if (s) {
          totalRuns += s.runs;
          totalWickets += s.wickets;
        }
      });
      player.formats.forEach(f => formats.add(f));
    });

    return {
      totalRuns,
      totalWickets,
      formatsCount: formats.size
    };
  }, [favoritePlayers]);

  const hasFavorites = favoritePlayers.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead 
        title="Fan Zone | Cricketer.bd" 
        description="Your personal collection of Bangladesh cricket legends. View stats and details of your favorite players."
      />

      {/* Hero Header */}
      <div className="bg-flag-500 py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-6"
          >
            <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">YOUR COLLECTION</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4"
          >
            FAN <span className="text-amber-400">ZONE</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 font-medium max-w-xl mx-auto mb-8"
          >
            Your personal collection of Bangladesh cricket legends
          </motion.p>

          {hasFavorites && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center space-x-2 bg-flag-red-500 px-4 py-2 rounded-full shadow-lg"
            >
              <Users className="w-4 h-4 text-white" />
              <span className="text-sm font-black text-white uppercase tracking-tight">
                {favoritePlayers.length} Players Saved
              </span>
            </motion.div>
          )}
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
          <Heart className="w-96 h-96 text-white" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <AnimatePresence mode="wait">
          {!hasFavorites ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl p-12 md:p-20 shadow-xl border border-gray-100 text-center max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-16 h-16 text-gray-200" />
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">No Favorites Yet</h2>
              <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">
                Start exploring players and tap the heart icon to build your collection
              </p>

              <Link
                to="/players"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-flag-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-flag-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>Browse Players</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* Stats Bar */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center space-x-2 text-flag-500 mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Total Runs</span>
                    </div>
                    <div className="text-4xl font-black text-gray-900">
                      {stats.totalRuns.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center space-x-2 text-flag-red-500 mb-2">
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Total Wickets</span>
                    </div>
                    <div className="text-4xl font-black text-gray-900">
                      {stats.totalWickets.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center space-x-2 text-amber-500 mb-2">
                      <Users className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Formats</span>
                    </div>
                    <div className="text-4xl font-black text-gray-900">
                      {stats.formatsCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Section */}
              <section>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">YOUR TIGERS</h2>
                    <p className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                      Collection <span className="text-flag-500">({favoritePlayers.length})</span>
                    </p>
                  </div>
                </div>

                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {favoritePlayers.map((player) => (
                      <motion.div
                        key={player.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <PlayerCard player={player} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                <div className="mt-12 text-center">
                  <p className="text-xs font-medium text-gray-400 italic">
                    Tap the <Heart className="w-3 h-3 inline fill-gray-400" /> on any player card to remove them from your Fan Zone
                  </p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
