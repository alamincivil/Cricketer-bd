import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, Award, Star, ExternalLink, Languages, Medal, GitCompare } from 'lucide-react';
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

  const totalRuns = Object.values(player.statsSummary).reduce((acc, curr) => acc + (curr?.runs || 0), 0);
  const totalWickets = Object.values(player.statsSummary).reduce((acc, curr) => acc + (curr?.wickets || 0), 0);
  const totalMatches = Object.values(player.statsSummary).reduce((acc, curr) => acc + (curr?.matches || 0), 0);

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
        <div className="bg-flag-500 h-56 md:h-72 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-flag-600 via-flag-500 to-flag-500/80" />
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/5" />
          <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-black/10 translate-x-1/3 translate-y-1/3" />

          {/* Navigation row */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-8 flex items-center justify-between">
            <Link to="/players" className="text-white flex items-center hover:text-flag-gold-400 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Players
            </Link>
            <div className="flex items-center space-x-4">
              <FavoriteButton player={player} />
              <LanguageToggle />
            </div>
          </div>

          {/* Player name overlay at bottom of hero */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 absolute bottom-0 left-0 right-0 pb-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white/80 mb-3">
                  {player.role}
                </span>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
                  {player.knownAs}
                </h1>
                <p className="text-white/60 text-sm font-medium mt-2">{player.fullName}</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                {player.formats.map(format => (
                  <span key={format} className="bg-white/15 border border-white/20 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-24 md:-mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Image & Basic Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="ring-4 ring-flag-500/20 ring-offset-4 rounded-full">
                    <PlayerAvatar name={player.fullName} imageUrl={player.imageUrl} size="xl" />
                  </div>
                  
                  <h1 className="mt-6 text-3xl font-bold text-gray-900 mb-2">{player.knownAs}</h1>
                  <p className="text-flag-500 font-bold uppercase tracking-widest text-sm">{player.role}</p>
                  
                  <div className="flex items-center gap-1.5 mt-2 bg-flag-50 px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-flag-500" />
                    <span className="text-xs font-bold text-flag-500">{player.district}</span>
                  </div>
                  
                  <div className="w-full space-y-4 text-left mt-6">
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

                  <div className="w-full mt-6 bg-gray-50 rounded-2xl p-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-black text-gray-900">{totalRuns.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Runs</p>
                      </div>
                      <div>
                        <p className="text-lg font-black text-gray-900">{totalWickets}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Wickets</p>
                      </div>
                      <div>
                        <p className="text-lg font-black text-gray-900">{totalMatches}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Matches</p>
                      </div>
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

              {/* Awards & Accolades */}
              {player.awards && player.awards.length > 0 && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-flag-500" />
                    {lang === 'en' ? 'Awards & Accolades' : 'পুরস্কার ও সম্মাননা'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {player.awards.map((award, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-flag-200 transition-colors group">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black text-flag-500 uppercase tracking-widest">{award.year}</span>
                          <Trophy className="w-4 h-4 text-gray-300 group-hover:text-flag-gold-400 transition-colors" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{award.name}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{award.significance}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compare CTA */}
              <div className="bg-gradient-to-r from-flag-500 to-flag-600 p-6 rounded-2xl text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Head-to-Head</p>
                  <h3 className="text-xl font-black uppercase tracking-tight">Compare {player.knownAs}</h3>
                  <p className="text-white/70 text-sm mt-1">See how {player.knownAs} stacks up against other Tigers</p>
                </div>
                <Link
                  to="/compare"
                  className="flex-shrink-0 bg-white text-flag-500 px-5 py-3 rounded-xl font-bold text-sm hover:bg-flag-50 transition-colors flex items-center gap-2"
                >
                  <GitCompare className="w-4 h-4" />
                  Compare
                </Link>
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
                  <Link 
                    key={tag} 
                    to={`/era/${tag.toLowerCase()}`}
                    className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-2 hover:border-flag-500 hover:bg-flag-50 transition-all group"
                  >
                    <Award className="w-4 h-4 text-flag-gold-400" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-flag-500 uppercase tracking-wide">{tag} Era</span>
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
