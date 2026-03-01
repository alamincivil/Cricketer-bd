import React, { useState, useEffect } from 'react';
import { Search as MagnifyingGlassIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <div className="relative w-full md:max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-flag-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-flag-500 focus:border-flag-500 sm:text-sm transition-all shadow-sm"
        placeholder="Search by name... Shakib, Tamim"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
