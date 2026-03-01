import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder data
  const players = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Cricketer ${i + 1}`,
    role: i % 3 === 0 ? 'Batsman' : i % 3 === 1 ? 'Bowler' : 'All-rounder',
    image: `https://picsum.photos/seed/player${i + 1}/600/800`
  }));

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Players</h1>
          <p className="text-gray-500">The pride of Bangladesh Cricket across generations.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-flag-500 w-full sm:w-64"
            />
          </div>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPlayers.map((player) => (
          <Link
            key={player.id}
            to={`/players/${player.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-medium flex items-center">
                  View Profile <ChevronRight className="ml-1 w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-flag-500 transition-colors">
                {player.name}
              </h3>
              <p className="text-flag-500 font-medium text-sm uppercase tracking-wider">
                {player.role}
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between text-xs text-gray-400">
                <span>Matches: 120</span>
                <span>Runs: 4,500</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No players found matching your search.</p>
        </div>
      )}
    </div>
  );
}
