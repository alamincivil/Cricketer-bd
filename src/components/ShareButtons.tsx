import React from 'react';
import { Twitter, Facebook, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ShareButtonsProps {
  title: string;
  url: string;
  playerName?: string;
}

/**
 * Share buttons for social media platforms.
 * Displays as a row on desktop and a column on mobile.
 */
export default function ShareButtons({ title, url, playerName }: ShareButtonsProps) {
  const shareText = playerName 
    ? `Check out ${playerName} on Cricketer.bd 🇧🇩` 
    : `Check out ${title} on Cricketer.bd 🇧🇩`;
  
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      label: 'Twitter',
      count: '1.2k', // Placeholder count
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      label: 'WhatsApp',
      count: '850', // Placeholder count
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: 'Facebook',
      count: '2.4k', // Placeholder count
    },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Share2 className="w-5 h-5 text-flag-500" />
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">Share Profile</h3>
      </div>
      
      {/* Desktop Row, Mobile Column */}
      <div className="flex flex-col md:flex-row gap-4">
        {shareLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-1 flex items-center justify-between bg-flag-red-500 hover:bg-flag-red-600 text-white px-6 py-4 rounded-2xl shadow-sm transition-all group"
          >
            <div className="flex items-center space-x-3">
              <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-xs">{link.label}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black opacity-60 uppercase tracking-tighter">Shares</span>
              <span className="text-sm font-black">{link.count}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
