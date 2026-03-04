import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DistrictCardProps {
  district: string;
  count: number;
  index: number;
}

export default function DistrictCard({ district, count, index }: DistrictCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link 
        to={`/districts?district=${district}`}
        className="group block bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-flag-500/10 hover:border-flag-100 transition-all transform hover:-translate-y-1"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-flag-50 rounded-2xl flex items-center justify-center group-hover:bg-flag-500 transition-colors">
            <MapPin className="w-6 h-6 text-flag-500 group-hover:text-white transition-colors" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-gray-900 leading-none">{count}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Players</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-gray-900 group-hover:text-flag-500 transition-colors uppercase tracking-tight">
            {district}
          </h3>
          <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-flag-500 transform group-hover:translate-x-1 transition-all" />
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${district}-${i}/100/100`} 
                  alt="Player" 
                  className="w-full h-full object-cover grayscale opacity-50"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          <span className="ml-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Local Pride 🏏</span>
        </div>
      </Link>
    </motion.div>
  );
}
