import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface MilestoneCardProps {
  milestone: {
    id: string;
    date: string;
    title: string;
    description: string;
    players: string[];
    era: string;
  };
  index: number;
}

export default function MilestoneCard({ milestone, index }: MilestoneCardProps) {
  const year = new Date(milestone.date).getFullYear();
  const formattedDate = new Date(milestone.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`relative flex items-center justify-between mb-12 md:mb-24 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Date Indicator (Center Line) */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex flex-col items-center z-10">
        <div className="w-12 h-12 bg-flag-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-black text-xs">
          {year}
        </div>
        <div className="w-1 h-full bg-gray-100 absolute top-12 -z-10" />
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-[45%] ml-16 md:ml-0 group`}>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 hover:shadow-2xl hover:shadow-flag-500/10 transition-all duration-500 relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Trophy className="w-32 h-32 text-flag-500" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-4 py-1.5 bg-flag-50 text-flag-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center">
                <Calendar className="w-3 h-3 mr-2" />
                {formattedDate}
              </span>
              <span className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                {milestone.era.replace('-', ' ')}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-none group-hover:text-flag-500 transition-colors">
              {milestone.title}
            </h3>

            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              {milestone.description}
            </p>

            {milestone.players.length > 0 && (
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Key Figures</p>
                <div className="flex flex-wrap gap-3">
                  {milestone.players.map((playerId) => (
                    <Link
                      key={playerId}
                      to={`/players/${playerId}`}
                      className="flex items-center space-x-2 bg-gray-50 hover:bg-flag-50 px-4 py-2 rounded-2xl border border-gray-100 hover:border-flag-200 transition-all group/player"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${playerId}/100/100`} 
                          alt={playerId} 
                          className="w-full h-full object-cover grayscale group-hover/player:grayscale-0 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600 group-hover/player:text-flag-500 capitalize">
                        {playerId.replace(/-/g, ' ')}
                      </span>
                      <ArrowRight className="w-3 h-3 text-gray-300 group-hover/player:text-flag-500 transform group-hover/player:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for the other side on desktop */}
      <div className="hidden md:block md:w-[45%]" />
    </motion.div>
  );
}
