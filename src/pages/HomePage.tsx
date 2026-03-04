import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Star, ArrowRight } from 'lucide-react';
import { getAllPlayers } from '../services/players';
import { getDistrictStats } from '../services/players';
import PlayerCard from '../components/PlayerCard';
import StatsHighlight from '../components/StatsHighlight';
import EraHighlight from '../components/EraHighlight';
import DistrictCard from '../components/DistrictCard';

export default function HomePage() {
  const featuredPlayers = getAllPlayers().slice(0, 6);
  const districtStats = getDistrictStats().slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000"
            alt="Cricket Stadium"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-flag-500/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Celebrating Our <span className="text-flag-gold-400">Tigers</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Explore the legendary journeys of Bangladesh's finest cricketers. From historic wins to personal milestones, discover the stories that define our nation's pride.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/players"
                className="bg-flag-red-500 hover:bg-flag-red-600 text-white px-8 py-3 rounded-full font-semibold flex items-center transition-all transform hover:scale-105"
              >
                Meet the Players <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <StatsHighlight />
      </section>

      {/* Era Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EraHighlight />
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            to="/captains"
            className="group bg-flag-500 rounded-3xl p-8 text-white relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-flag-500/30"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
              <Trophy className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">National Captains</h3>
              <p className="text-white/80 font-medium mb-6 max-w-xs">Explore the leaders who shaped Bangladesh cricket history across all formats.</p>
              <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/20">
                View Captains <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>

          <Link 
            to="/leaders"
            className="group bg-white rounded-3xl p-8 text-gray-900 border border-gray-100 shadow-sm relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-gray-200"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Users className="w-32 h-32 text-flag-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">Statistical Leaders</h3>
              <p className="text-gray-500 font-medium mb-6 max-w-xs">The record breakers and milestone makers. See the top run scorers and wicket takers.</p>
              <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest bg-flag-50 text-flag-500 px-4 py-2 rounded-full border border-flag-100">
                View Leaderboards <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* District Pride Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">District <span className="text-flag-500">Pride</span></h2>
            <p className="text-gray-500 font-medium">Explore cricketers from your hometown</p>
          </div>
          <Link to="/districts" className="text-flag-500 font-bold hover:underline flex items-center uppercase tracking-widest text-xs">
            All Districts <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {districtStats.map((stat, index) => (
            <DistrictCard 
              key={stat.district} 
              district={stat.district} 
              count={stat.count} 
              index={index} 
            />
          ))}
        </div>
      </section>

      {/* Featured Players */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Tigers</h2>
            <p className="text-gray-500">The stars of Bangladesh Cricket</p>
          </div>
          <Link to="/players" className="text-flag-500 font-semibold hover:underline flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>
    </div>
  );
}
