import React, { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';
import { searchAndFilter } from '../services/players';
import PlayerCard from '../components/PlayerCard';
import SearchBar from '../components/SearchBar';
import FilterPanel, { FilterState } from '../components/FilterPanel';
import { SkeletonGrid } from '../components/PlayerCardSkeleton';
import MobileFilterToggle from '../components/MobileFilterToggle';
import Analytics from '../components/Analytics';

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({ formats: [], roles: [], eras: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState(searchAndFilter('', { formats: [], roles: [], eras: [] }));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'runs' | 'wickets' | 'matches'>('default');

  const activeFilterCount = filters.formats.length + filters.roles.length + filters.eras.length;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let results = searchAndFilter(searchQuery, filters);

      if (sortBy === 'runs') {
        results = [...results].sort((a, b) => {
          const aRuns = Object.values(a.statsSummary).reduce((acc, curr) => acc + (curr?.runs || 0), 0);
          const bRuns = Object.values(b.statsSummary).reduce((acc, curr) => acc + (curr?.runs || 0), 0);
          return bRuns - aRuns;
        });
      } else if (sortBy === 'wickets') {
        results = [...results].sort((a, b) => {
          const aW = Object.values(a.statsSummary).reduce((acc, curr) => acc + (curr?.wickets || 0), 0);
          const bW = Object.values(b.statsSummary).reduce((acc, curr) => acc + (curr?.wickets || 0), 0);
          return bW - aW;
        });
      } else if (sortBy === 'matches') {
        results = [...results].sort((a, b) => {
          const aM = Object.values(a.statsSummary).reduce((acc, curr) => acc + (curr?.matches || 0), 0);
          const bM = Object.values(b.statsSummary).reduce((acc, curr) => acc + (curr?.matches || 0), 0);
          return bM - aM;
        });
      }

      setPlayers(results);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, filters, sortBy]);

  return (
    <Analytics event={searchQuery ? 'search' : undefined} params={{ query: searchQuery }}>
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="bg-flag-500 py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-flag-600 via-flag-500 to-flag-500/80" />
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full bg-white/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 mb-4">
                  <Users className="w-3 h-3" />
                  Bangladesh Cricket
                </div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
                  Our <span className="text-flag-gold-400">Players</span>
                </h1>
                <p className="text-white/70 font-medium mt-3 max-w-xl">
                  The pride of Bangladesh Cricket across generations. Explore biographies, career stats, and historic moments.
                </p>
              </div>
              <div className="flex items-center gap-6 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
                <div className="text-center">
                  <p className="text-2xl font-black text-white">143</p>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Players</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-black text-white">3</p>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Formats</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-black text-white">30+</p>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <SearchBar onSearch={setSearchQuery} />
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing</span>
                <span className="text-sm font-black text-gray-900">{players.length}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">players</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Sort by:</span>
            {[
              { key: 'default', label: 'Default' },
              { key: 'runs', label: 'Most Runs' },
              { key: 'wickets', label: 'Most Wickets' },
              { key: 'matches', label: 'Most Matches' },
            ].map(option => (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  sortBy === option.key
                    ? 'bg-flag-500 text-white shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-100 hover:border-flag-200 hover:text-flag-500'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <FilterPanel 
              onFilterChange={setFilters} 
              initialFilters={filters} 
              isOpen={isFilterOpen} 
              onClose={() => setIsFilterOpen(false)} 
            />
            
            <div className="flex-grow">
              {isLoading ? (
                <SkeletonGrid />
              ) : players.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {players.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 col-span-full">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-200" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">No Players Found</h3>
                  <p className="text-gray-400 font-medium mb-8">Try a different search term or clear your filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({ formats: [], roles: [], eras: [] });
                      setSortBy('default');
                    }}
                    className="bg-flag-500 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-flag-600 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          <MobileFilterToggle 
            onClick={() => setIsFilterOpen(true)} 
            activeCount={activeFilterCount} 
          />
        </div>
      </div>
    </Analytics>
  );
}
