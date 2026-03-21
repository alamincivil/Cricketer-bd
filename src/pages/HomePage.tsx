import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Star, ArrowRight } from 'lucide-react';
import { getAllPlayers } from '../services/players';
import { getDistrictStats } from '../services/players';
import PlayerCard from '../components/PlayerCard';
import StatsHighlight from '../components/StatsHighlight';
import LiveScores from '../components/LiveScores';
import EraHighlight from '../components/EraHighlight';
import DistrictCard from '../components/DistrictCard';

export default function HomePage() {
  const featuredPlayers = getAllPlayers().slice(0, 6);
  const districtStats = getDistrictStats().slice(0, 6);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000"
            alt="Cricket Stadium"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-flag-500/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-tight mb-6">
              Celebrating Our <span className="text-flag-gold-400">Tigers</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-xl">
              Explore the legendary journeys of Bangladesh's finest cricketers. From historic wins to personal milestones, discover the stories that define our nation's pride.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/players"
                className="bg-flag-red-500 hover:bg-flag-red-600 text-white px-10 py-4 text-base font-bold rounded-full flex items-center transition-all transform hover:scale-105"
              >
                Meet the Players <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-4 text-base font-bold rounded-full transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2">
          <StatsHighlight />
        </div>
      </section>

      <LiveScores />

      {/* Era Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EraHighlight />
      </section>

      {/* Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            to="/captains"
            className="group bg-flag-500 rounded-3xl p-10 text-white relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-flag-500/30 flex flex-col justify-center min-h-[320px]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
              <Trophy className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-2 uppercase tracking-tight">National Captains</h3>
              <p className="text-white/80 font-medium mb-2 max-w-xs">Explore the leaders who shaped Bangladesh cricket history across all formats.</p>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-6">14 Captains • 3 Formats</p>
              <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/20">
                View Captains <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>

          <Link 
            to="/leaders"
            className="group bg-white rounded-3xl p-10 text-gray-900 border border-gray-100 shadow-sm relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-gray-200 flex flex-col justify-center min-h-[320px]"
          >
            <div className="relative z-10">
              <div className="flex gap-2 mb-4">
                <span className="bg-gray-50 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-600">15,249 Runs</span>
                <span className="bg-gray-50 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-600">712 Wkts</span>
                <span className="bg-gray-50 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-600">391 Matches</span>
              </div>
              <h3 className="text-4xl font-black mb-2 uppercase tracking-tight text-gray-900">Statistical Leaders</h3>
              <p className="text-gray-500 font-medium mb-6 max-w-xs">The record breakers and milestone makers. See the top run scorers and wicket takers.</p>
              <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest bg-flag-50 text-flag-500 px-4 py-2 rounded-full border border-flag-100">
                View Leaderboards <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* District Pride Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">Featured <span className="text-flag-500">Tigers</span></h2>
            <p className="text-gray-500 font-medium">The stars of Bangladesh Cricket</p>
          </div>
          <Link to="/players" className="text-flag-500 font-bold hover:underline flex items-center uppercase tracking-widest text-xs">
            View All <ArrowRight className="ml-2 w-4 h-4" />
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
