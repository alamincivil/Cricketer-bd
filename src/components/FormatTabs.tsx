import React from 'react';

interface FormatTabsProps {
  activeFormat: string;
  onFormatChange: (format: string) => void;
  formats: string[];
}

export default function FormatTabs({ activeFormat, onFormatChange, formats }: FormatTabsProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white p-1.5 rounded-2xl shadow-xl flex space-x-1 border border-gray-100">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => onFormatChange(format)}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeFormat === format
                ? 'bg-flag-500 text-white shadow-lg shadow-flag-500/30'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
}
