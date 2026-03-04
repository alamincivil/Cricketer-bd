import React, { useState, useMemo } from 'react';
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
      <div className="bg-white border-b border-gray-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-flag-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"
          >
            <TrendingUp className="w-10 h-10 text-flag-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight"
          >
            ALL-TIME <span className="text-flag-500">LEADERS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-medium"
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
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div className="w-16 h-16 bg-flag-50 rounded-2xl flex items-center justify-center">
              <Star className="w-8 h-8 text-flag-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Runs Leader</p>
              <p className="text-2xl font-black text-gray-900">Mushfiqur Rahim</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">14,000+ Runs</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div className="w-16 h-16 bg-flag-red-50 rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-flag-red-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Wickets Leader</p>
              <p className="text-2xl font-black text-gray-900">Shakib Al Hasan</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">700+ Wickets</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div className="w-16 h-16 bg-flag-gold-50 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-flag-gold-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Most ODI Runs</p>
              <p className="text-2xl font-black text-gray-900">Tamim Iqbal</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">8,000+ Runs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
