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
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchScores = async () => {
    const apiKey = import.meta.env.VITE_CRICAPI_KEY || '5f279767-666f-4a68-9be3-079e78190c67';
    console.log('API Key:', apiKey);
    console.log('Fetching live scores...');

    if (!apiKey) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`https://api.cricapi.com/v1/cricScore?apikey=${apiKey}`);
      const data = await response.json();
      console.log('API Response:', data);

      if (data.status === 'success') {
        const bangladeshMatches = (data.data || []).filter((match: any) => {
          const teamsStr = JSON.stringify(match.teams || []).toLowerCase();
          const nameStr = (match.name || '').toLowerCase();
          return teamsStr.includes('bangladesh') || nameStr.includes('bangladesh');
        })
          .sort((a: any, b: any) => {
            // Live matches first (started but not ended)
            const aLive = a.matchStarted && !a.matchEnded;
            const bLive = b.matchStarted && !b.matchEnded;
            if (aLive && !bLive) return -1;
            if (!aLive && bLive) return 1;
            // Then by date descending
            return new Date(b.dateTimeGMT).getTime() - new Date(a.dateTimeGMT).getTime();
          })
          .slice(0, 4);
        
        setMatches(bangladeshMatches);
      } else {
        setMatches([]);
        if (data.status !== 'success') {
          setError(true);
        }
      }
    } catch (err) {
      console.error('Failed to fetch scores:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-40 animate-pulse">
            <div className="flex justify-between mb-4">
              <div className="h-4 w-16 bg-gray-200 rounded-full" />
              <div className="h-4 w-12 bg-gray-200 rounded-full" />
            </div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 text-gray-500 text-sm py-4">
        <span>Live scores unavailable</span>
        <button 
          onClick={fetchScores}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (matches.length === 0) return null;

  return (
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
                  {match.score?.map((s, idx) => (
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
  );
}
