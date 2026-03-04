import React, { useState, useMemo } from 'react';
import { Trophy, Users, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import captainsData from '../data/captains.json';
import CaptainsTable from '../components/CaptainsTable';
import FormatTabs from '../components/FormatTabs';
import SEOHead from '../components/SEOHead';

const formats = ['All', 'Test', 'ODI', 'T20I'];

export default function CaptainsPage() {
  const [activeFormat, setActiveFormat] = useState('All');

  const filteredCaptains = useMemo(() => {
    if (activeFormat === 'All') return captainsData;
    return captainsData.filter((c) => c.format === activeFormat);
  }, [activeFormat]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead
        title="Bangladesh Cricket Captains"
        description="Historical list of Bangladesh cricket captains across all formats: Test, ODI, and T20I."
      />

      {/* Hero Section */}
      <div className="bg-flag-500 py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-flag-gold-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 mb-6"
          >
            <Trophy className="w-4 h-4 text-flag-gold-400 mr-2" />
            <span className="text-xs font-bold uppercase tracking-widest">Leaders of the Tigers</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            BANGLADESH CRICKET <span className="text-flag-gold-400">CAPTAINS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto font-medium"
          >
            The visionaries who led Bangladesh cricket through challenges and triumphs across generations.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        {/* Format Tabs */}
        <FormatTabs 
          activeFormat={activeFormat} 
          onFormatChange={setActiveFormat} 
          formats={formats} 
        />

        {/* Table Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFormat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-flag-50 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-flag-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{activeFormat} Captains</h2>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Historical Records</p>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-flag-gold-50 border border-flag-gold-200 rounded" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Current Captain</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-flag-red-50 border border-flag-red-200 rounded" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Most Wins</span>
                  </div>
                </div>
              </div>
              
              <div className="p-0">
                <CaptainsTable captains={filteredCaptains} />
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
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Captains</p>
              <p className="text-3xl font-black text-gray-900">{new Set(captainsData.map(c => c.id)).size}</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div className="w-16 h-16 bg-flag-red-50 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-flag-red-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Most ODI Wins</p>
              <p className="text-3xl font-black text-gray-900">50</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Mashrafe Mortaza</p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div className="w-16 h-16 bg-flag-gold-50 rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-flag-gold-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Most Test Wins</p>
              <p className="text-3xl font-black text-gray-900">7</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Mushfiqur Rahim</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
