import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface EraStoryProps {
  story: string;
  title: string;
}

export default function EraStory({ story, title }: EraStoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative group">
      {/* Background Gradient Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-flag-500/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-flag-500/10 transition-colors duration-500" />
      
      <div className="p-8 md:p-12 relative z-10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-flag-50 rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-flag-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            The Story of <span className="text-flag-500">{title}</span>
          </h2>
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
          <AnimatePresence initial={false}>
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : '150px' }}
              className="overflow-hidden relative"
            >
              <p className="whitespace-pre-line">{story}</p>
              
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-8 flex items-center space-x-2 text-flag-500 font-black uppercase tracking-widest text-xs hover:text-flag-600 transition-colors"
        >
          {isExpanded ? (
            <>
              <span>Read Less</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Read Full Era Story</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
