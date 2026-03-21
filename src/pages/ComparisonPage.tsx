import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeftRight, 
  Search, 
  X, 
  Crown, 
  ChevronDown, 
  User,
  GitCompare
} from 'lucide-react';
import { getAllPlayers } from '../services/players';
import { Player } from '../types/player';
import SEOHead from '../components/SEOHead';

type Format = 'All' | 'Test' | 'ODI' | 'T20I';

interface StatRow {
  label: string;
  key: string;
  isLowerBetter?: boolean;
  isDecimal?: boolean;
}

const STAT_ROWS: StatRow[] = [
  { label: 'Matches', key: 'matches' },
  { label: 'Runs', key: 'runs' },
  { label: 'Wickets', key: 'wickets' },
];

export default function ComparisonPage() {
  const [playerA, setPlayerA] = useState<Player | null>(null);
  const [playerB, setPlayerB] = useState<Player | null>(null);
  const [format, setFormat] = useState<Format>('ODI');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSelector, setActiveSelector] = useState<'A' | 'B' | null>(null);
  
  const allPlayers = useMemo(() => getAllPlayers(), []);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveSelector(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPlayers = useMemo(() => {
    const otherPlayerId = activeSelector === 'A' ? playerB?.id : playerA?.id;
    return allPlayers
      .filter(p => p.id !== otherPlayerId)
      .filter(p => 
        p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.knownAs.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [allPlayers, searchQuery, activeSelector, playerA, playerB]);

  const getPlayerStats = (player: Player | null, currentFormat: Format) => {
    if (!player) return null;

    if (currentFormat === 'All') {
      const stats = {
        matches: 0,
        runs: 0,
        wickets: 0,
      };

      Object.entries(player.statsSummary).forEach(([key, value]) => {
        if (value) {
          stats.matches += value.matches;
          stats.runs += value.runs;
          stats.wickets += value.wickets;
        }
      });

      return stats;
    }

    const formatKey = currentFormat.toLowerCase() as keyof typeof player.statsSummary;
    const stats = player.statsSummary[formatKey];
    return stats ? { ...stats } as any : null;
  };

  const statsA = useMemo(() => getPlayerStats(playerA, format), [playerA, format]);
  const statsB = useMemo(() => getPlayerStats(playerB, format), [playerB, format]);

  const compareStats = (valA: any, valB: any, isLowerBetter: boolean = false) => {
    if (valA === undefined || valA === null || valB === undefined || valB === null) return null;
    if (valA === valB) return 'tie';
    if (isLowerBetter) return valA < valB ? 'A' : 'B';
    return valA > valB ? 'A' : 'B';
  };

  const scorecard = useMemo(() => {
    if (!statsA || !statsB) return null;
    let scoreA = 0;
    let scoreB = 0;
    STAT_ROWS.forEach(row => {
      const winner = compareStats(statsA[row.key], statsB[row.key], row.isLowerBetter);
      if (winner === 'A') scoreA++;
      if (winner === 'B') scoreB++;
    });
    return { scoreA, scoreB };
  }, [statsA, statsB]);

  const renderValue = (val: any, isDecimal?: boolean) => {
    if (val === undefined || val === null) {
      return '—';
    }
    if (isDecimal) return val.toFixed(2);
    return val;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Helmet>
        <title>Compare Players | Cricketer.bd</title>
      </Helmet>
      <SEOHead 
        title="Compare Players | Cricketer.bd" 
        description="Compare career statistics of Bangladesh cricketers side-by-side. Test, ODI, and T20I head-to-head analysis."
      />

      {/* Hero Header */}
      <div className="bg-[#006a4e] py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-6"
          >
            <GitCompare className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Head-to-Head</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4"
          >
            Compare <span className="text-amber-400">Players</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 font-medium max-w-xl mx-auto"
          >
            Select two legends of Bangladesh cricket to see how their career numbers stack up against each other.
          </motion.p>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
          <ArrowLeftRight className="w-96 h-96 text-white" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        {/* Player Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Player A Selector */}
          <div className="relative">
            <p className="text-[10px] font-black text-[#006a4e] uppercase tracking-widest mb-2 ml-2">Player A</p>
            <div 
              onClick={() => setActiveSelector('A')}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer flex items-center space-x-4 ${
                playerA ? 'border-gray-100' : 'border-dashed border-gray-300 hover:border-[#006a4e]'
              }`}
            >
              {playerA ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#006a4e]/10 flex items-center justify-center text-[#006a4e] font-black text-2xl uppercase overflow-hidden relative">
                    <span className="absolute z-0">{playerA.knownAs[0]}</span>
                    <img 
                      src={playerA.imageUrl} 
                      alt={playerA.knownAs} 
                      className="w-full h-full object-cover relative z-10"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 uppercase tracking-tight">{playerA.fullName}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{playerA.role}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{playerA.district}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setPlayerA(null); }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center w-full py-4 text-gray-400">
                  <Search className="w-8 h-8 mb-2 opacity-20" />
                  <span className="text-sm font-bold uppercase tracking-widest">Select Player A</span>
                </div>
              )}
            </div>
          </div>

          {/* Player B Selector */}
          <div className="relative">
            <p className="text-[10px] font-black text-[#f42a41] uppercase tracking-widest mb-2 ml-2">Player B</p>
            <div 
              onClick={() => setActiveSelector('B')}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all cursor-pointer flex items-center space-x-4 ${
                playerB ? 'border-gray-100' : 'border-dashed border-gray-300 hover:border-[#f42a41]'
              }`}
            >
              {playerB ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#f42a41]/10 flex items-center justify-center text-[#f42a41] font-black text-2xl uppercase overflow-hidden relative">
                    <span className="absolute z-0">{playerB.knownAs[0]}</span>
                    <img 
                      src={playerB.imageUrl} 
                      alt={playerB.knownAs} 
                      className="w-full h-full object-cover relative z-10"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 uppercase tracking-tight">{playerB.fullName}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{playerB.role}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{playerB.district}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setPlayerB(null); }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center w-full py-4 text-gray-400">
                  <Search className="w-8 h-8 mb-2 opacity-20" />
                  <span className="text-sm font-bold uppercase tracking-widest">Select Player B</span>
                </div>
              )}
            </div>
          </div>

          {/* Search Dropdown */}
          <AnimatePresence>
            {activeSelector && (
              <motion.div 
                ref={dropdownRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-hidden flex flex-col"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      autoFocus
                      type="text"
                      placeholder="Search by name or role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#006a4e]/20"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto flex-1">
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map(player => (
                      <div 
                        key={player.id}
                        onClick={() => {
                          if (activeSelector === 'A') setPlayerA(player);
                          else setPlayerB(player);
                          setActiveSelector(null);
                          setSearchQuery('');
                        }}
                        className="p-4 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 transition-colors border-b border-gray-50 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold uppercase overflow-hidden relative">
                          <span className="absolute z-0">{player.knownAs[0]}</span>
                          <img 
                            src={player.imageUrl} 
                            alt={player.knownAs} 
                            className="w-full h-full object-cover relative z-10"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{player.fullName}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{player.role}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      <p className="text-sm font-medium">No players found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Format Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex space-x-1">
            {(['All', 'Test', 'ODI', 'T20I'] as Format[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  format === f 
                    ? 'bg-[#006a4e] text-white shadow-md' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Scorecard Banner */}
        <AnimatePresence>
          {scorecard && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-8"
            >
              <div className="bg-white px-8 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-4xl font-black text-[#006a4e]">{scorecard.scoreA}</p>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Player A</p>
                </div>
                <div className="text-center px-8 border-x border-gray-100">
                  <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Stats Won</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-black text-[#f42a41]">{scorecard.scoreB}</p>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Player B</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50/50 border-b border-gray-100">
            <div className="p-6 text-center border-r border-gray-100">
              <p className="text-[10px] font-black text-[#006a4e] uppercase tracking-widest mb-1">Player A</p>
              <h3 className="font-black text-gray-900 uppercase tracking-tight truncate">
                {playerA ? playerA.knownAs : 'Select Player'}
              </h3>
            </div>
            <div className="p-6 text-center flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-gray-300" />
            </div>
            <div className="p-6 text-center border-l border-gray-100">
              <p className="text-[10px] font-black text-[#f42a41] uppercase tracking-widest mb-1">Player B</p>
              <h3 className="font-black text-gray-900 uppercase tracking-tight truncate">
                {playerB ? playerB.knownAs : 'Select Player'}
              </h3>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {playerA || playerB ? (
              STAT_ROWS.map((row, idx) => {
                const valA = statsA ? statsA[row.key] : undefined;
                const valB = statsB ? statsB[row.key] : undefined;
                const winner = compareStats(valA, valB, row.isLowerBetter);
                
                // Calculate bar widths
                let barA = 0;
                let barB = 0;
                if (valA !== undefined && valB !== undefined && typeof valA === 'number' && typeof valB === 'number') {
                  const total = valA + valB;
                  if (total > 0) {
                    barA = (valA / total) * 100;
                    barB = (valB / total) * 100;
                  }
                }

                return (
                  <motion.div 
                    key={row.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`grid grid-cols-3 items-center ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    {/* Player A Value */}
                    <div className="p-6 text-center relative">
                      <div className="flex items-center justify-center space-x-2">
                        {winner === 'A' && <Crown className="w-4 h-4 text-amber-400" />}
                        <span className={`text-lg font-black ${winner === 'A' ? 'text-[#006a4e]' : 'text-gray-400'}`}>
                          {renderValue(valA, row.isDecimal)}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-6 right-6 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${barA}%` }}
                          className="h-full bg-[#006a4e]"
                        />
                      </div>
                    </div>

                    {/* Stat Name */}
                    <div className="p-6 text-center">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{row.label}</p>
                    </div>

                    {/* Player B Value */}
                    <div className="p-6 text-center relative">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`text-lg font-black ${winner === 'B' ? 'text-[#f42a41]' : 'text-gray-400'}`}>
                          {renderValue(valB, row.isDecimal)}
                        </span>
                        {winner === 'B' && <Crown className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className="absolute bottom-2 left-6 right-6 h-1 bg-gray-100 rounded-full overflow-hidden flex justify-end">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${barB}%` }}
                          className="h-full bg-[#f42a41]"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="p-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-gray-200" />
                </div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Ready to Compare?</h3>
                <p className="text-gray-400 font-medium max-w-xs mx-auto">Select two players from the selectors above to start the head-to-head comparison.</p>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        {(playerA || playerB) && (
          <div className="mt-8 flex flex-wrap justify-center gap-8 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#006a4e] rounded-full" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Player A Advantage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#f42a41] rounded-full" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Player B Advantage</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Winning Stat</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
