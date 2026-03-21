import React, { useMemo } from 'react';
import { Trophy, Calendar, History, Star, Award, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import MilestoneCard from '../components/MilestoneCard';
import SEOHead from '../components/SEOHead';
import milestonesData from '../data/milestones.json';

export default function MilestonesPage() {
  const sortedMilestones = useMemo(() => 
    [...milestonesData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead 
        title="Bangladesh Cricket Milestones | Timeline of Glory" 
        description="Explore the historic milestones of Bangladesh cricket. From the 1997 ICC Trophy to the 2024 Pakistan Test sweep."
      />

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 py-20 md:py-32 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Trophy className="w-96 h-96 text-flag-500" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-flag-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"
          >
            <Trophy className="w-10 h-10 text-flag-500" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight uppercase"
          >
            TIMELINE OF <span className="text-flag-500">GLORY</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-medium"
          >
            Every victory, every record, every milestone that shaped the identity of Bangladesh cricket. Revisit the moments that made us proud.
          </motion.p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        {/* Vertical Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-flag-500/20 via-flag-500/10 to-transparent" />
        
        {/* Vertical Line (Mobile) */}
        <div className="md:hidden absolute left-6 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-flag-500/20 via-flag-500/10 to-transparent" />

        <div className="relative z-10">
          {sortedMilestones.map((milestone, index) => (
            <MilestoneCard 
              key={milestone.id} 
              milestone={milestone} 
              index={index} 
            />
          ))}
        </div>

        {/* Final Indicator */}
        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-full border-4 border-flag-500 shadow-xl"
          >
            <TrendingUp className="w-8 h-8 text-flag-500" />
          </motion.div>
        </div>
        <div className="text-center mt-8">
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">The Journey Continues...</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">More Milestones to Come 🏏</p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-flag-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-flag-500" />
            </div>
            <p className="text-3xl font-black text-gray-900">25+</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Key Milestones</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-flag-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-flag-500" />
            </div>
            <p className="text-3xl font-black text-gray-900">100+</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Legends Featured</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-flag-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <History className="w-6 h-6 text-flag-500" />
            </div>
            <p className="text-3xl font-black text-gray-900">27+</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Years of History</p>
          </div>
        </div>
      </div>
    </div>
  );
}
