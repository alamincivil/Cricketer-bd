import Fuse from 'fuse.js';
import playersData from '../data/players.json';
import { Player } from '../types/player';

const players: Player[] = playersData as Player[];

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
