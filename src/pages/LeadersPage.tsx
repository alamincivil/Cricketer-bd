import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Award, TrendingUp, Filter, Star, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getLeaders } from '../services/players';
import LeadersTable from '../components/LeadersTable';
import FormatTabs from '../components/FormatTabs';
import SEOHead from '../components/SEOHead';

const formats = ['All', 'Test', 'ODI', 'T20I'];

export default function LeadersPage() {
  const [statType, setStatType] = useState<'runs' | 'wickets'>('runs');
  const [activeFormat, setActiveFormat] = useState('All');

  const leaders = useMemo(() => {
    const format = activeFormat === 'All' ? undefined : (activeFormat as 'Test' | 'ODI' | 'T20I');
    return getLeaders(statType, format);
  }, [statType, activeFormat]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead
        title="Bangladesh Cricket Leaderboards"
        description="Top run scorers and wicket takers for Bangladesh in Test, ODI, and T20I cricket."
      />

      {/* Hero Section */}
      <div className="bg-flag-500 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flag-600 via-flag-500 to-flag-500/80" />
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full bg-white/5" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 mb-4"
          >
            <TrendingUp className="w-3 h-3" />
            Statistical Records
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none mb-4"
          >
            All-Time <span className="text-flag-gold-400">Leaders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 font-medium max-w-xl mx-auto"
          >
            The record breakers and milestone makers. Explore the top performers in Bangladesh cricket history.
          </motion.p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Stat Type Selector */}
          <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setStatType('runs')}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                statType === 'runs'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Runs
            </button>
            <button
              onClick={() => setStatType('wickets')}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                statType === 'wickets'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Wickets
            </button>
          </div>

          {/* Format Tabs (Desktop) */}
          <div className="hidden lg:block">
            <FormatTabs 
              activeFormat={activeFormat} 
              onFormatChange={setActiveFormat} 
              formats={formats} 
            />
          </div>

          {/* Format Selector (Mobile) */}
          <div className="lg:hidden flex items-center space-x-4 w-full">
            <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest">
              <Filter className="w-4 h-4 mr-2" />
              Format
            </div>
            <select
              value={activeFormat}
              onChange={(e) => setActiveFormat(e.target.value)}
              className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-flag-500/20 cursor-pointer appearance-none"
            >
              {formats.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${statType}-${activeFormat}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {leaders.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* #2 */}
                <Link to={`/players/${leaders[1].player.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition-all group mt-6">
                  <div className="text-2xl font-black text-gray-300 mb-2">#2</div>
                  <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-3 border-4 border-gray-100">
                    <img src={leaders[1].player.imageUrl} alt={leaders[1].player.knownAs} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-black text-gray-900 text-sm group-hover:text-flag-500 transition-colors">{leaders[1].player.knownAs}</p>
                  <p className="text-xs text-gray-400">{leaders[1].player.role}</p>
                  <p className="text-xl font-black text-flag-500 mt-2">
                    {statType === 'runs' ? leaders[1].runs?.toLocaleString() : leaders[1].wickets}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{statType === 'runs' ? 'Runs' : 'Wickets'}</p>
                </Link>

                {/* #1 — Center, elevated */}
                <Link to={`/players/${leaders[0].player.id}`} className="bg-flag-500 rounded-2xl shadow-lg shadow-flag-500/30 p-5 text-center hover:shadow-xl transition-all group -mt-2">
                  <div className="text-2xl font-black text-flag-gold-400 mb-2">👑 #1</div>
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-4 border-white/30">
                    <img src={leaders[0].player.imageUrl} alt={leaders[0].player.knownAs} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-black text-white text-sm">{leaders[0].player.knownAs}</p>
                  <p className="text-xs text-white/60">{leaders[0].player.role}</p>
                  <p className="text-2xl font-black text-flag-gold-400 mt-2">
                    {statType === 'runs' ? leaders[0].runs?.toLocaleString() : leaders[0].wickets}
                  </p>
                  <p className="text-[10px] font-bold text-white/60 uppercase">{statType === 'runs' ? 'Runs' : 'Wickets'}</p>
                </Link>

                {/* #3 */}
                <Link to={`/players/${leaders[2].player.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition-all group mt-6">
                  <div className="text-2xl font-black text-gray-300 mb-2">#3</div>
                  <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-3 border-4 border-gray-100">
                    <img src={leaders[2].player.imageUrl} alt={leaders[2].player.knownAs} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-black text-gray-900 text-sm group-hover:text-flag-500 transition-colors">{leaders[2].player.knownAs}</p>
                  <p className="text-xs text-gray-400">{leaders[2].player.role}</p>
                  <p className="text-xl font-black text-flag-500 mt-2">
                    {statType === 'runs' ? leaders[2].runs?.toLocaleString() : leaders[2].wickets}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{statType === 'runs' ? 'Runs' : 'Wickets'}</p>
                </Link>
              </div>
            )}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    statType === 'runs' ? 'bg-flag-50' : 'bg-flag-red-50'
                  }`}>
                    <Award className={`w-6 h-6 ${
                      statType === 'runs' ? 'text-flag-500' : 'text-flag-red-500'
                    }`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">
                      Top {statType === 'runs' ? 'Run Scorers' : 'Wicket Takers'}
                    </h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                      {activeFormat} • Top 20
                    </p>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-flag-gold-50 border border-flag-gold-200 rounded" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">#1 Ranked</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-flag-red-50 border border-flag-red-200 rounded" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Top 5</span>
                  </div>
                </div>
              </div>
              <div className="p-0">
                <LeadersTable
                  leaders={leaders}
                  statType={statType}
                  maxValue={statType === 'runs' ? (leaders[0]?.runs || 0) : (leaders[0]?.wickets || 0)}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div className="w-16 h-16 bg-flag-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Star className="w-8 h-8 text-flag-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Runs Leader</p>
              <p className="text-2xl font-black text-gray-900">Mushfiqur Rahim</p>
              <p className="text-xs font-bold text-flag-500 mt-1">14,968 Runs</p>
            </div>
          </div>

          <div className="bg-flag-500 p-8 rounded-3xl shadow-sm flex items-center space-x-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Total Wickets Leader</p>
              <p className="text-2xl font-black text-white">Shakib Al Hasan</p>
              <p className="text-xs font-bold text-flag-gold-400 mt-1">712 Wickets</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div className="w-16 h-16 bg-flag-gold-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Award className="w-8 h-8 text-flag-gold-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Most ODI Runs</p>
              <p className="text-2xl font-black text-gray-900">Tamim Iqbal</p>
              <p className="text-xs font-bold text-flag-500 mt-1">8,357 Runs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
