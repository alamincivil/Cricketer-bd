import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

export interface LeaderboardColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T, index: number) => React.ReactNode;
}

interface LeaderboardTableProps<T> {
  data: T[];
  columns: LeaderboardColumn<T>[];
  initialSortKey?: keyof T | string;
  initialSortOrder?: 'asc' | 'desc';
  playerIdKey?: keyof T;
  highlightFirstRow?: boolean;
}

export default function LeaderboardTable<T extends { id?: string }>({
  data,
  columns,
  initialSortKey,
  initialSortOrder = 'desc',
  playerIdKey,
  highlightFirstRow = true,
}: LeaderboardTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | string | undefined>(initialSortKey);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

  const handleSort = (key: keyof T | string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    
    const aValue = (a as any)[sortKey];
    const bValue = (b as any)[sortKey];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (aStr < bStr) return sortOrder === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-bottom border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 ${
                  col.sortable ? 'cursor-pointer hover:text-flag-500 transition-colors' : ''
                }`}
                onClick={() => col.sortable && handleSort(col.key as string)}
              >
                <div className="flex items-center">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span className="ml-1">
                      {sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={item.id || index}
              className={`border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/50 ${
                highlightFirstRow && index === 0 ? 'bg-flag-gold-50/30' : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.key as string} className="px-6 py-4 text-sm text-gray-700">
                  {col.render ? col.render(item, index) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
