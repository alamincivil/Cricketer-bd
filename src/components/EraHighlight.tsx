import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Star, History, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const eras = [
  {
    id: '1990s',
    title: 'The Pioneers',
    description: 'The era of the first Test and the 1999 World Cup upset.',
    icon: History,
    color: 'bg-flag-red-500',
    accent: 'text-flag-red-100',
  },
  {
    id: '2000s',
    title: 'The Golden Era',
    description: 'When Bangladesh gained Test status and produced its first superstars.',
    icon: Star,
    color: 'bg-flag-gold-400',
    accent: 'text-flag-gold-900',
  },
  {
    id: '2010s',
    title: 'The Modern Stars',
    description: 'A decade of dominance and consistent victories in all formats.',
    icon: Zap,
    color: 'bg-flag-500',
    accent: 'text-flag-green-100',
  },
];

export default function EraHighlight() {
  return (
    <section className="py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
            Explore by <span className="text-flag-500">Era</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-xl text-lg">
            Travel through time and discover the legends who built Bangladesh cricket from the ground up.
          </p>
        </div>
        <Link 
          to="/players" 
          className="inline-flex items-center space-x-2 text-flag-red-500 font-black uppercase tracking-widest text-sm hover:text-flag-red-600 transition-colors"
        >
          <span>View All Eras</span>
          <History className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {eras.map((era, index) => (
          <motion.div
            key={era.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              to={`/era/${era.id.toLowerCase()}`}
              className={`${era.color} p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block h-full relative overflow-hidden group`}
            >
              <div className="relative z-10">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <era.icon className={`w-8 h-8 ${era.accent}`} />
                </div>
                <h3 className={`text-2xl font-black uppercase tracking-tight mb-3 ${era.accent}`}>
                  {era.title}
                </h3>
                <p className={`font-medium leading-relaxed ${era.accent} opacity-80`}>
                  {era.description}
                </p>
                <div className={`mt-8 flex items-center space-x-2 font-black uppercase tracking-widest text-xs ${era.accent}`}>
                  <span>Explore {era.id}</span>
                  <History className="w-4 h-4" />
                </div>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-500">
                <era.icon className="w-48 h-48 text-white" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
