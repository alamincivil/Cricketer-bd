import React from 'react';
import { Filter } from 'lucide-react';

interface MobileFilterToggleProps {
  onClick: () => void;
  activeCount: number;
}

export default function MobileFilterToggle({ onClick, activeCount }: MobileFilterToggleProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed bottom-6 right-6 z-40 bg-flag-red-500 text-white p-4 rounded-full shadow-2xl flex items-center space-x-2 hover:bg-flag-red-600 transition-all active:scale-95"
    >
      <Filter className="w-6 h-6" />
      {activeCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-flag-gold-400 text-flag-500 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
          {activeCount}
        </span>
      )}
      <span className="font-bold text-sm pr-2">Filters</span>
    </button>
  );
}
