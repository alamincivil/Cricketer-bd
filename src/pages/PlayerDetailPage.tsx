import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, Award, Star } from 'lucide-react';

export default function PlayerDetailPage() {
  const { id } = useParams();

  // Placeholder data
  const player = {
    id,
    name: `Cricketer ${id}`,
    fullName: `Full Name of Cricketer ${id}`,
    role: 'All-rounder',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm offbreak',
    birthDate: 'March 24, 1987',
    birthPlace: 'Magura, Bangladesh',
    image: `https://picsum.photos/seed/player${id}/800/1000`,
    bio: 'One of the greatest cricketers Bangladesh has ever produced. Known for his exceptional skills with both bat and ball, he has consistently been ranked among the top all-rounders in the world across all formats.',
    stats: [
      { label: 'Matches', test: '66', odi: '235', t20: '117' },
      { label: 'Runs', test: '4454', odi: '7211', t20: '2382' },
      { label: 'Wickets', test: '233', odi: '302', t20: '140' },
      { label: 'Average', test: '39.07', odi: '37.55', t20: '23.12' },
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header/Banner */}
      <div className="bg-flag-500 h-48 md:h-64 relative">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-end">
          <Link to="/players" className="absolute top-8 left-4 md:left-8 text-white flex items-center hover:text-flag-gold-400 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Players
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-24 md:-mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Image & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="aspect-[3/4] bg-gray-200">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{player.name}</h1>
                <p className="text-flag-500 font-bold uppercase tracking-widest text-sm mb-6">{player.role}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{player.birthDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{player.birthPlace}</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">Playing Style</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Batting</span>
                      <span className="font-medium text-gray-900">{player.battingStyle}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Bowling</span>
                      <span className="font-medium text-gray-900">{player.bowlingStyle}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Biography */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-flag-gold-400 fill-flag-gold-400" />
                Biography
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {player.bio}
              </p>
            </div>

            {/* Career Stats */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-flag-red-500" />
                Career Statistics
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-4 font-semibold text-gray-400 uppercase text-xs tracking-wider">Format</th>
                      <th className="pb-4 font-semibold text-gray-900">Matches</th>
                      <th className="pb-4 font-semibold text-gray-900">Runs</th>
                      <th className="pb-4 font-semibold text-gray-900">Wickets</th>
                      <th className="pb-4 font-semibold text-gray-900">Avg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {['Test', 'ODI', 'T20'].map((format) => (
                      <tr key={format} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-bold text-flag-500">{format}</td>
                        <td className="py-4 text-gray-600">{player.stats[0][format.toLowerCase() as keyof typeof player.stats[0]]}</td>
                        <td className="py-4 text-gray-600">{player.stats[1][format.toLowerCase() as keyof typeof player.stats[1]]}</td>
                        <td className="py-4 text-gray-600">{player.stats[2][format.toLowerCase() as keyof typeof player.stats[2]]}</td>
                        <td className="py-4 text-gray-600">{player.stats[3][format.toLowerCase() as keyof typeof player.stats[3]]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Achievements Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-flag-red-500 p-6 rounded-2xl text-white">
                <Award className="w-8 h-8 mb-4 text-flag-gold-400" />
                <h3 className="text-xl font-bold mb-2">ICC Ranking</h3>
                <p className="text-flag-red-200">Consistently ranked #1 All-rounder for over a decade.</p>
              </div>
              <div className="bg-flag-500 p-6 rounded-2xl text-white">
                <Trophy className="w-8 h-8 mb-4 text-flag-gold-400" />
                <h3 className="text-xl font-bold mb-2">Player of the Series</h3>
                <p className="text-flag-red-200">Multiple awards in major ICC tournaments and bilateral series.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
