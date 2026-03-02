import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface FeedbackButtonProps {
  playerName?: string;
}

/**
 * Floating feedback button to suggest corrections.
 */
export default function FeedbackButton({ playerName }: FeedbackButtonProps) {
  const subject = playerName ? `${playerName} Correction` : 'Cricketer.bd Correction';
  const mailtoUrl = `mailto:contact@cricketer.bd?subject=${encodeURIComponent(subject)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <a
        href={mailtoUrl}
        className="group flex items-center bg-flag-red-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-flag-red-600 transition-all duration-300"
      >
        <MessageSquare className="w-5 h-5 md:mr-2" />
        <span className="hidden md:inline font-bold uppercase tracking-widest text-xs">
          Suggest Correction
        </span>
        
        {/* Mobile Tooltip/Label (Always visible on mobile as per request) */}
        <span className="md:hidden ml-2 font-bold uppercase tracking-widest text-[10px]">
          Suggest
        </span>
      </a>
    </motion.div>
  );
}
