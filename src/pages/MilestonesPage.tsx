import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, History, Star, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MilestoneCard from '../components/MilestoneCard';
import SEOHead from '../components/SEOHead';
import milestonesData from '../data/milestones.json';

export default function MilestonesPage() {
  const [activeEra, setActiveEra] = useState<'all' | 'pioneers' | 'golden-era' | 'modern-stars'>('all');

  const filteredMilestones = useMemo(() => {
    const sorted = [...milestonesData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (activeEra === 'all') return sorted;
    return sorted.filter(m => m.era === activeEra);
  }, [activeEra]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead 
        title="Bangladesh Cricket Milestones | Timeline of Glory" 
        description="Explore the historic milestones of Bangladesh cricket. From the 1997 ICC Trophy to the 2024 Pakistan Test sweep."
      />

      {/* Hero Section */}
      <div className="bg-flag-500 py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flag-600 via-flag-500 to-flag-500/80" />
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -left-8 -bottom-8 w-64 h-64 rounded-full bg-white/5" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 mb-4"
          >
            <Trophy className="w-3 h-3 text-flag-gold-400" />
            Bangladesh Cricket History
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-4"
          >
            Timeline of <span className="text-flag-gold-400">Glory</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70 font-medium max-w-2xl mx-auto text-lg"
          >
            Every victory, every record, every milestone that shaped the identity of Bangladesh cricket. Revisit the moments that made us proud.
          </motion.p>

          {/* Quick stats in hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <p className="text-3xl font-black text-white">25+</p>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Milestones</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-black text-white">27+</p>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Years</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-black text-white">3</p>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Eras</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Era Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { key: 'all', label: 'All Eras', count: milestonesData.length },
            { key: 'pioneers', label: '1990s Pioneers', count: milestonesData.filter(m => m.era === 'pioneers').length },
            { key: 'golden-era', label: 'Golden Era', count: milestonesData.filter(m => m.era === 'golden-era').length },
            { key: 'modern-stars', label: 'Modern Stars', count: milestonesData.filter(m => m.era === 'modern-stars').length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveEra(tab.key as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeEra === tab.key
                  ? 'bg-flag-500 text-white shadow-lg shadow-flag-500/30'
                  : 'bg-white text-gray-600 border border-gray-100 shadow-sm hover:border-flag-200 hover:text-flag-500'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-md font-black ${
                activeEra === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        {/* Vertical Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-flag-500/20 via-flag-500/10 to-transparent" />
        
        {/* Vertical Line (Mobile) */}
        <div className="md:hidden absolute left-6 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-flag-500/20 via-flag-500/10 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeEra}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {filteredMilestones.map((milestone, index) => (
              <MilestoneCard key={milestone.id} milestone={milestone} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Final Indicator */}
        <div className="flex flex-col items-center mt-16 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-flag-500 p-6 rounded-full border-4 border-white shadow-xl shadow-flag-500/30"
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight mt-6">The Journey Continues...</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">More Milestones to Come 🏏</p>
          <Link
            to="/players"
            className="mt-6 inline-flex items-center gap-2 bg-flag-500 text-white px-8 py-3 rounded-full font-bold hover:bg-flag-600 transition-colors"
          >
            Meet the Players <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-flag-500 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full bg-white/10" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight text-center mb-8">
              The Numbers Behind <span className="text-flag-gold-400">The Glory</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
                <Star className="w-8 h-8 text-flag-gold-400 mx-auto mb-3" />
                <p className="text-4xl font-black text-white">25+</p>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest mt-2">Key Milestones</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
                <Award className="w-8 h-8 text-flag-gold-400 mx-auto mb-3" />
                <p className="text-4xl font-black text-white">100+</p>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest mt-2">Legends Featured</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
                <History className="w-8 h-8 text-flag-gold-400 mx-auto mb-3" />
                <p className="text-4xl font-black text-white">27+</p>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest mt-2">Years of History</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
