import React from 'react';
import { StatsSummary } from '../types/player';

interface PlayerStatsTableProps {
  stats: StatsSummary;
}

export default function PlayerStatsTable({ stats }: PlayerStatsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="pb-4 font-semibold text-gray-400 uppercase text-xs tracking-wider">Format</th>
            <th className="pb-4 font-semibold text-gray-900">Matches</th>
            <th className="pb-4 font-semibold text-gray-900">Runs</th>
            <th className="pb-4 font-semibold text-gray-900">Wickets</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {Object.entries(stats).map(([format, data]) => (
            <tr key={format} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 font-bold text-flag-500 uppercase">{format}</td>
              <td className="py-4 text-gray-600">{data?.matches ?? '-'}</td>
              <td className="py-4 text-gray-600">{data?.runs ?? '-'}</td>
              <td className="py-4 text-gray-600">{data?.wickets ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
