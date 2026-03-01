import React from 'react';
import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface FilterState {
  formats: string[];
  roles: string[];
  eras: string[];
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters: FilterState;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterPanel({ onFilterChange, initialFilters, isOpen, onClose }: FilterPanelProps) {
  const toggleFilter = (category: keyof FilterState, value: string) => {
    const newFilters = { ...initialFilters };
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter((v) => v !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    onFilterChange(newFilters);
  };

  const clearAll = () => {
    const cleared = { formats: [], roles: [], eras: [] };
    onFilterChange(cleared);
  };

  const categories = [
    { id: 'formats', label: 'Format', options: ['Test', 'ODI', 'T20I'] },
    { id: 'roles', label: 'Role', options: ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper Batsman'] },
    { id: 'eras', label: 'Era', options: ['1990s', '2000s', '2010s', '2020s'] },
  ];

  const FiltersContent = () => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:sticky lg:top-24 h-full lg:h-auto overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <div className="flex items-center space-x-4">
          <button onClick={clearAll} className="text-xs font-bold text-flag-red-500 hover:underline uppercase">
            Clear all
          </button>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.id}>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{cat.label}</h4>
            <div className="space-y-3">
              {cat.options.map((opt) => (
                <label key={opt} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-flag-red-500 focus:ring-flag-red-500 cursor-pointer"
                    checked={initialFilters[cat.id as keyof FilterState].includes(opt)}
                    onChange={() => toggleFilter(cat.id as keyof FilterState, opt)}
                  />
                  <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <FiltersContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-[80%] max-w-sm z-50"
            >
              <FiltersContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
