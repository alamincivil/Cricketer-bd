import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, Award, Star, ExternalLink, Languages, Medal } from 'lucide-react';
import { getPlayerById } from '../services/players';
import PlayerAvatar from '../components/PlayerAvatar';
import PlayerStatsTable from '../components/PlayerStatsTable';
import ShareButtons from '../components/ShareButtons';
import LanguageToggle from '../components/LanguageToggle';
import FavoriteButton from '../components/FavoriteButton';
import NotFoundPage from './NotFoundPage';
import SEOHead from '../components/SEOHead';
import Analytics from '../components/Analytics';
import FeedbackButton from '../components/FeedbackButton';

export default function PlayerDetailPage() {
  const { id } = useParams();
  const player = getPlayerById(id || '');
  const [lang, setLang] = useState<'en' | 'bn'>(() => {
    const saved = localStorage.getItem('preferred_lang');
    return (saved as 'en' | 'bn') || 'en';
  });

  useEffect(() => {
    const handleLangChange = () => {
      const saved = localStorage.getItem('preferred_lang');
      setLang((saved as 'en' | 'bn') || 'en');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  if (!player) {
    return <NotFoundPage />;
  }

  const bio = lang === 'en' ? player.bioEn : (player.bioBn || player.bioEn);
  const achievements = lang === 'en' ? player.achievementsEn : (player.achievementsBn || player.achievementsEn);

  return (
    <Analytics event="player_view" params={{ player_id: player.id, player_name: player.fullName }}>
      <div className="bg-gray-50 min-h-screen pb-20">
        <SEOHead 
          title={`${player.fullName}`} 
          image={player.imageUrl}
          article={true}
          player={player}
        />
        {/* Header/Banner */}
        <div className="bg-flag-500 h-48 md:h-64 relative">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-end">
            <Link to="/players" className="absolute top-8 left-4 md:left-8 text-white flex items-center hover:text-flag-gold-400 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Players
            </Link>
            <div className="absolute top-8 right-4 md:right-8 flex items-center space-x-4">
              <FavoriteButton player={player} />
              <LanguageToggle />
            </div>
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
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Stats */}
            <div className="lg:col-span-2 space-y-8">
              {/* Biography */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-flag-gold-400 fill-flag-gold-400" />
                    Biography
                  </h2>
                  <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <Languages className="w-4 h-4" />
                    <span>{lang === 'en' ? 'English' : 'বাংলা'}</span>
                  </div>
                </div>
                <p className={`text-gray-600 leading-relaxed text-lg ${lang === 'bn' ? 'font-medium' : ''}`}>
                  {bio}
                </p>
              </div>

              {/* Achievements */}
              {achievements && achievements.length > 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Medal className="w-6 h-6 mr-2 text-flag-gold-400" />
                    {lang === 'en' ? 'Key Achievements' : 'প্রধান অর্জনসমূহ'}
                  </h2>
                  <ul className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-flag-gold-50 flex items-center justify-center mr-3 mt-1">
                          <span className="text-flag-gold-600 text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className={`text-gray-700 ${lang === 'bn' ? 'font-medium' : ''}`}>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
                  <Link 
                    key={tag} 
                    to={`/era/${tag.toLowerCase()}`}
                    className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-2 hover:border-flag-gold-400 transition-colors"
                  >
                    <Award className="w-4 h-4 text-flag-gold-400" />
                    <span className="text-sm font-bold text-gray-700">{tag} Era</span>
                  </Link>
                ))}
              </div>

              {/* Share Buttons */}
              <ShareButtons 
                title={`${player.fullName} - Bangladesh Cricketer Profile`} 
                url={window.location.href} 
                playerName={player.fullName}
              />
            </div>
          </div>
        </div>

        {/* Feedback Button */}
        <FeedbackButton playerName={player.fullName} />
      </div>
    </Analytics>
  );
}
