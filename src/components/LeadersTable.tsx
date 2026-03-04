import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award } from 'lucide-react';
import { LeaderStat } from '../types/player';
import PlayerAvatar from './PlayerAvatar';

interface LeadersTableProps {
  leaders: LeaderStat[];
  statType: 'runs' | 'wickets';
}

export default function LeadersTable({ leaders, statType }: LeadersTableProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Rank</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Player</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-center">Matches</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-center">
                {statType === 'runs' ? 'Runs' : 'Wickets'}
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-center">Avg</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Profile</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr 
                key={leader.player.id}
                className={`border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/50 ${
                  index === 0 ? 'bg-flag-gold-50/30' : index < 5 ? 'bg-flag-red-50/10' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <span className={`font-black ${index === 0 ? 'text-flag-gold-500 text-lg' : 'text-gray-300'}`}>
                    #{index + 1}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/players/${leader.player.id}`} className="flex items-center group">
                    <PlayerAvatar name={leader.player.fullName} imageUrl={leader.player.imageUrl} size="sm" />
                    <div className="ml-3">
                      <p className="font-bold text-gray-900 group-hover:text-flag-500 transition-colors">{leader.player.knownAs}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{leader.player.role}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-center font-mono font-medium text-gray-600">{leader.matches}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`font-mono font-black text-lg ${statType === 'runs' ? 'text-gray-900' : 'text-flag-red-500'}`}>
                    {statType === 'runs' ? leader.runs?.toLocaleString() : leader.wickets}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-mono text-gray-500">{leader.average?.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/players/${leader.player.id}`} className="inline-flex items-center text-flag-500 hover:text-flag-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden divide-y divide-gray-50">
        {leaders.map((leader, index) => (
          <div 
            key={`${leader.player.id}-mobile`}
            className={`p-6 ${index === 0 ? 'bg-flag-gold-50/30' : index < 5 ? 'bg-flag-red-50/10' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <Link to={`/players/${leader.player.id}`} className="flex items-center">
                <PlayerAvatar name={leader.player.fullName} imageUrl={leader.player.imageUrl} size="sm" />
                <div className="ml-3">
                  <p className="font-bold text-gray-900">{leader.player.knownAs}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{leader.player.role}</p>
                </div>
              </Link>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                index === 0 ? 'bg-flag-gold-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                #{index + 1}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 bg-white/50 rounded-2xl p-4 border border-white/20">
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Matches</p>
                <p className="font-mono font-bold text-gray-700">{leader.matches}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{statType === 'runs' ? 'Runs' : 'Wickets'}</p>
                <p className={`font-mono font-black ${statType === 'runs' ? 'text-gray-900' : 'text-flag-red-500'}`}>
                  {statType === 'runs' ? leader.runs?.toLocaleString() : leader.wickets}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Avg</p>
                <p className="font-mono font-bold text-gray-500">{leader.average?.toFixed(2)}</p>
              </div>
            </div>

            <Link 
              to={`/players/${leader.player.id}`}
              className="mt-4 w-full py-3 bg-white border border-gray-100 rounded-xl text-center text-xs font-bold text-gray-600 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              VIEW PROFILE <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
