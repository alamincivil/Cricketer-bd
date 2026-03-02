import React, { useState, useEffect } from 'react';
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

  const activeFilterCount = filters.formats.length + filters.roles.length + filters.eras.length;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const results = searchAndFilter(searchQuery, filters);
      setPlayers(results);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, filters]);

  return (
    <Analytics event={searchQuery ? 'search' : undefined} params={{ query: searchQuery }}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Players</h1>
        <p className="text-gray-500 mb-8">The pride of Bangladesh Cricket across generations.</p>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <FilterPanel 
          onFilterChange={setFilters} 
          initialFilters={filters} 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
        />
        
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium text-gray-500">
              Showing <span className="text-gray-900 font-bold">{players.length}</span> players
            </p>
          </div>

          {isLoading ? (
            <SkeletonGrid />
          ) : players.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">No players found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ formats: [], roles: [], eras: [] });
                }}
                className="mt-4 text-flag-red-500 font-bold hover:underline"
              >
                Reset all filters
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
    </Analytics>
  );
}
