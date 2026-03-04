import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

interface DistrictSelectorProps {
  districts: string[];
  selectedDistrict: string;
  onSelect: (district: string) => void;
  stats: { district: string; count: number }[];
}

export default function DistrictSelector({ districts, selectedDistrict, onSelect, stats }: DistrictSelectorProps) {
  const [search, setSearch] = useState('');

  const filteredDistricts = districts.filter(d => 
    d.toLowerCase().includes(search.toLowerCase())
  );

  const topDistricts = stats.slice(0, 8);

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-flag-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search for a district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-3xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-flag-500/10 focus:border-flag-500 transition-all shadow-sm text-lg font-medium"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Popular Districts Chips */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Popular Districts</p>
        <div className="flex flex-wrap gap-2">
          {topDistricts.map(({ district, count }) => (
            <button
              key={district}
              onClick={() => onSelect(district)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center ${
                selectedDistrict === district
                  ? 'bg-flag-500 text-white shadow-lg shadow-flag-500/30'
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-flag-200 hover:bg-flag-50/30'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 mr-2 ${selectedDistrict === district ? 'text-white' : 'text-flag-500'}`} />
              {district}
              <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-md ${
                selectedDistrict === district ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Results / All Districts */}
      {search && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto">
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map(district => (
                <button
                  key={district}
                  onClick={() => {
                    onSelect(district);
                    setSearch('');
                  }}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-300 group-hover:text-flag-500 mr-3 transition-colors" />
                    <span className="font-bold text-gray-700 group-hover:text-gray-900">{district}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-300 group-hover:text-gray-400">
                    {stats.find(s => s.district === district)?.count || 0} Players
                  </span>
                </button>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-400 font-medium">
                No districts found matching "{search}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
