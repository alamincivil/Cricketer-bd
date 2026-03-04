import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Users, Filter, Search, ArrowRight, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getDistricts, getDistrictStats, getPlayersByDistrict } from '../services/players';
import DistrictSelector from '../components/DistrictSelector';
import PlayerCard from '../components/PlayerCard';
import SEOHead from '../components/SEOHead';

export default function DistrictsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDistrict = searchParams.get('district') || 'Dhaka';
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);

  const districts = useMemo(() => getDistricts(), []);
  const stats = useMemo(() => getDistrictStats(), []);
  const players = useMemo(() => getPlayersByDistrict(selectedDistrict), [selectedDistrict]);

  useEffect(() => {
    const district = searchParams.get('district');
    if (district && districts.includes(district)) {
      setSelectedDistrict(district);
    }
  }, [searchParams, districts]);

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setSearchParams({ district });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead
        title={`${selectedDistrict} Cricketers | District Pride`}
        description={`Explore cricketers from ${selectedDistrict} district. Discover local legends and rising stars from your hometown.`}
      />

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <MapPin className="w-64 h-64 text-flag-500" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-flag-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner"
          >
            <MapPin className="w-10 h-10 text-flag-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight"
          >
            LOCAL <span className="text-flag-500">PRIDE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto font-medium"
          >
            Every legend starts in a local field. Explore the cricketers who represent your district on the world stage.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar - District Selection */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight flex items-center">
                <Filter className="w-6 h-6 mr-3 text-flag-500" />
                Find District
              </h2>
              <DistrictSelector
                districts={districts}
                selectedDistrict={selectedDistrict}
                onSelect={handleDistrictSelect}
                stats={stats}
              />
            </div>

            {/* Quick Stats Card */}
            <div className="bg-flag-500 p-8 rounded-3xl text-white shadow-xl shadow-flag-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Trophy className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Top Producer</h3>
                <p className="text-white/80 text-sm font-medium mb-6">Dhaka district has produced the most international cricketers for Bangladesh.</p>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-black">45+</span>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Players</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Player Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-flag-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                    {selectedDistrict} <span className="text-flag-500">Tigers</span>
                  </h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    {players.length} Players Found
                  </p>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDistrict}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {players.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {players.map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">No Players Found</h3>
                    <p className="text-gray-500 font-medium max-w-xs mx-auto">
                      We haven't added players from {selectedDistrict} yet. Try searching for another district.
                    </p>
                    <button 
                      onClick={() => handleDistrictSelect('Dhaka')}
                      className="mt-8 px-8 py-3 bg-flag-500 text-white rounded-full font-bold text-sm shadow-lg shadow-flag-500/20 hover:bg-flag-600 transition-all"
                    >
                      Browse Dhaka Players
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
