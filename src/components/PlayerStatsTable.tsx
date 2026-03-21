import React from 'react';
import { StatsSummary } from '../types/player';

interface PlayerStatsTableProps {
  stats: StatsSummary;
}

export default function PlayerStatsTable({ stats }: PlayerStatsTableProps) {
  const formats = ['test', 'odi', 't20i'] as const;

  return (
    <div className="space-y-4">
      {formats.map((format) => {
        const data = stats[format];
        if (!data || (data.matches || 0) === 0) return null;

        const runsPercent = Math.min((data.runs || 0) / 10000 * 100, 100);

        return (
          <div key={format} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <span className="bg-flag-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {format}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {data.matches} Matches
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-2xl font-black text-gray-900">{data.runs?.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Runs</p>
              </div>
              <div>
                <p className={`text-2xl font-black ${(data.wickets || 0) > 0 ? 'text-flag-red-500' : 'text-gray-300'}`}>
                  {data.wickets}
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wickets</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Career Progress</span>
                <span>{data.runs?.toLocaleString()} / 10,000</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-flag-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${runsPercent}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
