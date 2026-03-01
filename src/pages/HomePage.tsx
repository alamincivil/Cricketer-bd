import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, label: 'Legendary Players', value: '100+', color: 'text-blue-500' },
            { icon: Trophy, label: 'Major Trophies', value: '15', color: 'text-flag-gold-400' },
            { icon: Star, label: 'Iconic Moments', value: '500+', color: 'text-flag-red-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-full bg-gray-50 mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Players Placeholder */}
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-lg transition-all">
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/cricket${id}/600/800`}
                  alt="Player"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-flag-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  # {id}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-flag-500 transition-colors">Player Name {id}</h3>
                <p className="text-sm text-gray-500 mb-4">All-rounder</p>
                <Link
                  to={`/players/${id}`}
                  className="block text-center py-2 px-4 rounded-lg bg-gray-50 text-gray-700 font-medium hover:bg-flag-500 hover:text-white transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
