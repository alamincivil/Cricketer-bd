import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, Award, Star, ExternalLink } from 'lucide-react';
import { getPlayerById } from '../services/players';
import PlayerAvatar from '../components/PlayerAvatar';
import PlayerStatsTable from '../components/PlayerStatsTable';
import ShareButtons from '../components/ShareButtons';
import NotFoundPage from './NotFoundPage';
import SEOHead from '../components/SEOHead';

export default function PlayerDetailPage() {
  const { id } = useParams();
  const player = getPlayerById(id || '');

  if (!player) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <SEOHead 
        title={`${player.fullName}`} 
        description={player.bioEn.slice(0, 160)} 
        image={player.imageUrl}
        article={true}
      />
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
              <div className="p-8 flex flex-col items-center text-center">
                <PlayerAvatar name={player.fullName} imageUrl={player.imageUrl} size="xl" />
                
                <h1 className="mt-6 text-3xl font-bold text-gray-900 mb-2">{player.knownAs}</h1>
                <p className="text-flag-500 font-bold uppercase tracking-widest text-sm mb-6">{player.role}</p>
                
                <div className="w-full space-y-4 text-left">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Date of Birth</span>
                      <span className="text-sm font-medium">{player.dob}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Birth Place</span>
                      <span className="text-sm font-medium">{player.birthPlace}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-left">Formats Played</h3>
                  <div className="flex flex-wrap gap-2">
                    {player.formats.map(format => (
                      <span key={format} className="px-3 py-1 bg-flag-500 text-white text-xs font-bold rounded-full uppercase">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>

                {player.sourceUrls.length > 0 && (
                  <div className="w-full mt-6">
                    <a 
                      href={player.sourceUrls[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-2 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      ESPNcricinfo Profile <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                )}

                <ShareButtons 
                  title={`${player.fullName} - Bangladesh Cricketer Profile`} 
                  url={window.location.href} 
                />
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
                {player.bioEn}
              </p>
            </div>

            {/* Career Stats */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-flag-red-500" />
                Career Statistics
              </h2>
              
              <PlayerStatsTable stats={player.statsSummary} />
            </div>

            {/* Era Tags */}
            <div className="flex flex-wrap gap-3">
              {player.eraTags.map(tag => (
                <div key={tag} className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-flag-gold-400" />
                  <span className="text-sm font-bold text-gray-700">{tag} Era</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
