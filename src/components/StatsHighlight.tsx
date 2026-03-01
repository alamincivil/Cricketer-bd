import React from 'react';
import { Users, Calendar, Trophy } from 'lucide-react';

export default function StatsHighlight() {
  const stats = [
    {
      label: 'Legendary Players',
      value: '50+',
      icon: Users,
      color: 'bg-flag-500',
    },
    {
      label: 'Years of History',
      value: '30+',
      icon: Calendar,
      color: 'bg-flag-red-500',
    },
    {
      label: 'Cricket Formats',
      value: '3',
      icon: Trophy,
      color: 'bg-flag-gold-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6 hover:shadow-md transition-shadow"
        >
          <div className={`${stat.color} p-4 rounded-2xl text-white`}>
            <stat.icon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
