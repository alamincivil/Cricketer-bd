import React, { useState, useEffect, useRef } from 'react';
import { Search as MagnifyingGlassIcon, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { searchPlayers } from '../services/players';
import { Player } from '../types/player';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Existing onSearch debounce (300ms) - keep behavior exactly as before
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  // Suggestions debounce (200ms)
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const handler = setTimeout(() => {
      const results = searchPlayers(query);
      setSuggestions(results.slice(0, 6));
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full md:max-w-md" ref={containerRef} id="search-container">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        {isLoading ? (
          <Loader2 className="h-5 w-5 text-flag-500 animate-spin" />
        ) : (
          <MagnifyingGlassIcon className="h-5 w-5 text-flag-500" />
        )}
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-500 focus:border-flag-500 sm:text-sm transition-all shadow-sm"
        placeholder="Search by name... Shakib, Tamim"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => {
          if (query.length >= 2) setShowDropdown(true);
        }}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 z-10"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <AnimatePresence>
        {showDropdown && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[60]"
          >
            {suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((player) => (
                  <Link
                    key={player.id}
                    to={`/players/${player.id}`}
                    onClick={() => {
                      setShowDropdown(false);
                      setQuery('');
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#006a4e]/5 transition-colors group"
                  >
                    <div className="flex-shrink-0">
                      {player.imageUrl && !imageErrors[player.id] ? (
                        <img
                          src={player.imageUrl}
                          alt={player.knownAs}
                          className="w-8 h-8 rounded-full object-cover border border-gray-100"
                          onError={() => setImageErrors(prev => ({ ...prev, [player.id]: true }))}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#006a4e] flex items-center justify-center text-white text-xs font-bold">
                          {player.knownAs.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {player.knownAs}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {player.role}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 ml-auto">
                      {player.district}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="px-4 py-6 text-center text-sm text-gray-400">
                  No players found
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
