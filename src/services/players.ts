import Fuse from 'fuse.js';
import playersData from '../data/players.json';
import { Player, LeaderStat } from '../types/player';

const players: Player[] = playersData as Player[];

export const getLeaders = (
  stat: 'runs' | 'wickets',
  format?: 'Test' | 'ODI' | 'T20I'
): LeaderStat[] => {
  const formatKey = format?.toLowerCase() as 'test' | 'odi' | 't20i' | undefined;

  const leaders = players.map(player => {
    let matches = 0;
    let runs = 0;
    let wickets = 0;

    if (formatKey) {
      const stats = player.statsSummary[formatKey];
      if (stats) {
        matches = stats.matches;
        runs = stats.runs;
        wickets = stats.wickets;
      }
    } else {
      // All formats
      Object.values(player.statsSummary).forEach(stats => {
        if (stats) {
          matches += stats.matches;
          runs += stats.runs;
          wickets += stats.wickets;
        }
      });
    }

    return {
      player,
      matches,
      runs,
      wickets,
      average: matches > 0 ? (stat === 'runs' ? runs / matches : matches / (wickets || 1)) : 0,
      strikeRate: stat === 'runs' ? (runs / (matches * 50 || 1)) * 100 : (matches * 6 / (wickets || 1)),
    };
  }).filter(l => (stat === 'runs' ? l.runs : l.wickets) > 0);

  return leaders.sort((a, b) => {
    const aVal = stat === 'runs' ? a.runs || 0 : a.wickets || 0;
    const bVal = stat === 'runs' ? b.runs || 0 : b.wickets || 0;
    return bVal - aVal;
  }).slice(0, 20);
};

export const getPlayersByDistrict = (district: string): Player[] => {
  return players.filter(p => p.district === district);
};

export const getDistrictStats = (): { district: string; count: number }[] => {
  const stats: Record<string, number> = {};
  players.forEach(p => {
    if (p.district) {
      stats[p.district] = (stats[p.district] || 0) + 1;
    }
  });
  return Object.entries(stats)
    .map(([district, count]) => ({ district, count }))
    .sort((a, b) => b.count - a.count);
};

export const getDistricts = (): string[] => {
  const districts = new Set<string>();
  players.forEach(p => {
    if (p.district) {
      districts.add(p.district);
    }
  });
  return Array.from(districts).sort();
};

const fuse = new Fuse(players, {
  keys: ['fullName', 'knownAs', 'role', 'birthPlace'],
  threshold: 0.3,
});

export const getAllPlayers = (): Player[] => {
  return players;
};

export const getPlayerById = (id: string): Player | undefined => {
  return players.find(p => p.id === id);
};

export const searchPlayers = (query: string): Player[] => {
  if (!query) return players;
  return fuse.search(query).map(result => result.item);
};

export const searchAndFilter = (
  query: string,
  filters: { formats: string[]; roles: string[]; eras: string[] }
): Player[] => {
  let results = query ? fuse.search(query).map(r => r.item) : players;

  if (filters.formats.length > 0) {
    results = results.filter(p => 
      filters.formats.some(f => p.formats.includes(f))
    );
  }

  if (filters.roles.length > 0) {
    results = results.filter(p => filters.roles.includes(p.role));
  }

  if (filters.eras.length > 0) {
    results = results.filter(p => 
      filters.eras.some(e => p.eraTags.includes(e))
    );
  }

  return results;
};
