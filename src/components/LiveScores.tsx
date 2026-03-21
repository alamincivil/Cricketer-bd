/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

interface Match {
  id: string;
  name: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score: Score[];
  matchStarted: boolean;
  matchEnded: boolean;
}

export default function LiveScores() {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) {
        setIsLoading(false);
        setMatches([]);
      }
    }, 5000);

    const apiKey = import.meta.env.VITE_CRICAPI_KEY || '5f279767-666f-4a68-9be3-079e78190c67';
    if (!apiKey) {
      clearTimeout(timeout);
      setIsLoading(false);
      return;
    }

    fetch(`https://api.cricapi.com/v1/cricScore?apikey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          clearTimeout(timeout);
          const all = data?.data || [];
          const bd = all.filter((m: any) => {
            const t = JSON.stringify(m.teams || []).toLowerCase();
            const n = (m.name || '').toLowerCase();
            return t.includes('bangladesh') || n.includes('bangladesh');
          });
          setMatches(bd.slice(0, 4));
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          clearTimeout(timeout);
          setIsLoading(false);
          setMatches([]);
        }
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) return null;
  if (matches.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
            Bangladesh <span className="text-flag-500">Live</span>
          </h2>
          <p className="text-gray-500 font-medium text-sm">Current & recent match scores</p>
        </div>
        <div className="flex items-center gap-2 bg-flag-red-50 border border-flag-red-100 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-flag-red-500 animate-pulse" />
          <span className="text-xs font-bold text-flag-red-500 uppercase tracking-widest">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {matches.map((match) => {
        const isLive = match.matchStarted && !match.matchEnded;
        const isUpcoming = !match.matchStarted;
        const isRecent = match.matchEnded;

        const dateObj = new Date(match.dateTimeGMT);
        const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

        return (
          <div key={match.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                {isLive && (
                  <span className="bg-flag-red-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
                    Live
                  </span>
                )}
                {isUpcoming && (
                  <span className="bg-flag-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                    Upcoming
                  </span>
                )}
                {isRecent && (
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                    Recent
                  </span>
                )}
                <span className="text-xs font-bold text-gray-400">{formattedDate}</span>
              </div>

              <h3 className="font-bold text-gray-900 mb-3 line-clamp-1" title={match.name}>
                {match.name}
              </h3>

              {match.matchStarted ? (
                <div className="space-y-1.5">
                  {match.score?.map((s: any, idx: number) => (
                    <p key={idx} className="text-sm text-gray-700 font-medium">
                      {s.inning}: <span className="font-bold">{s.r}/{s.w}</span> ({s.o} ov)
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">{match.venue}</p>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50">
              <p className="text-xs text-gray-500 font-medium">{match.status}</p>
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
}
