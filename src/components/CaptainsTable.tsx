import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronUp, ChevronDown, Trophy } from 'lucide-react';

interface Captain {
  id: string;
  name: string;
  format: string;
  tenure: string;
  matches: number;
  won: number;
  lost: number;
  drawn: number;
  winPercentage: number;
}

interface CaptainsTableProps {
  captains: Captain[];
}

export default function CaptainsTable({ captains }: CaptainsTableProps) {
  const [sortKey, setSortKey] = useState<keyof Captain>('matches');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: keyof Captain) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedCaptains = [...captains].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (aStr < bStr) return sortOrder === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const maxWins = Math.max(...captains.map(c => c.won));

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Rank</th>
              <th 
                className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 cursor-pointer hover:text-flag-500 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Captain
                  {sortKey === 'name' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Tenure</th>
              <th 
                className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 cursor-pointer hover:text-flag-500 transition-colors text-center"
                onClick={() => handleSort('matches')}
              >
                <div className="flex items-center justify-center">
                  Matches
                  {sortKey === 'matches' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-center">Won</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-center">Lost</th>
              <th 
                className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 cursor-pointer hover:text-flag-500 transition-colors text-center"
                onClick={() => handleSort('winPercentage')}
              >
                <div className="flex items-center justify-center">
                  Win %
                  {sortKey === 'winPercentage' && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Profile</th>
            </tr>
          </thead>
          <tbody>
            {sortedCaptains.map((captain, index) => (
              <tr 
                key={`${captain.id}-${captain.format}`}
                className={`border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/50 ${
                  captain.tenure.includes('Present') ? 'bg-flag-gold-50/30' : ''
                }`}
              >
                <td className="px-6 py-4 text-sm font-black text-gray-300">#{index + 1}</td>
                <td className="px-6 py-4">
                  <Link to={`/players/${captain.id}`} className="font-bold text-gray-900 hover:text-flag-500 transition-colors">
                    {captain.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">{captain.tenure}</td>
                <td className="px-6 py-4 text-center font-mono font-bold text-gray-700">{captain.matches}</td>
                <td className={`px-6 py-4 text-center font-mono font-bold ${captain.won === maxWins ? 'text-flag-red-500' : 'text-green-600'}`}>
                  {captain.won}
                </td>
                <td className="px-6 py-4 text-center font-mono font-bold text-gray-400">{captain.lost}</td>
                <td className="px-6 py-4 text-center">
                  <span className="font-mono font-black text-flag-500">{captain.winPercentage.toFixed(1)}%</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/players/${captain.id}`} className="inline-flex items-center text-flag-500 hover:text-flag-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile View Card List */}
      <div className="md:hidden divide-y divide-gray-50">
        {sortedCaptains.map((captain, index) => (
          <div 
            key={`${captain.id}-${captain.format}-mobile`} 
            className={`p-6 ${captain.tenure.includes('Present') ? 'bg-flag-gold-50/30' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Rank #{index + 1}</span>
                <Link to={`/players/${captain.id}`} className="text-lg font-black text-gray-900 leading-tight">
                  {captain.name}
                </Link>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{captain.tenure}</p>
              </div>
              <div className="bg-flag-50 p-2 rounded-xl">
                <Trophy className="w-5 h-5 text-flag-500" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4">
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Matches</p>
                <p className="font-mono font-black text-gray-900">{captain.matches}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Won</p>
                <p className={`font-mono font-black ${captain.won === maxWins ? 'text-flag-red-500' : 'text-green-600'}`}>{captain.won}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Win %</p>
                <p className="font-mono font-black text-flag-500">{captain.winPercentage.toFixed(1)}%</p>
              </div>
            </div>
            
            <Link 
              to={`/players/${captain.id}`}
              className="mt-4 w-full py-3 bg-white border border-gray-100 rounded-xl text-center text-xs font-bold text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              VIEW FULL PROFILE <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
