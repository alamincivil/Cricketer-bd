import React, { useEffect, useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTrackEvent } from '../hooks/useTrackEvent';

type Language = 'en' | 'bn';

export default function LanguageToggle() {
  const { track } = useTrackEvent();
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred_lang');
    return (saved as Language) || 'en';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('preferred_lang', lang);
    window.dispatchEvent(new Event('languageChange'));
    track('language_toggle', { language: lang });
  }, [lang, track]);

  const toggleLanguage = (newLang: Language) => {
    setLang(newLang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Desktop View */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
        <button
          onClick={() => toggleLanguage('en')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            lang === 'en'
              ? 'bg-flag-red-500 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => toggleLanguage('bn')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            lang === 'bn'
              ? 'bg-flag-500 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          বাংলা
        </button>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm font-bold text-gray-700 active:bg-gray-50"
        >
          <Languages className="w-4 h-4 text-flag-500" />
          <span>{lang === 'en' ? 'EN' : 'বাংলা'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)} 
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
              >
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`w-full text-left px-4 py-3 text-sm font-bold ${
                    lang === 'en' ? 'bg-flag-red-50 text-flag-red-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => toggleLanguage('bn')}
                  className={`w-full text-left px-4 py-3 text-sm font-bold ${
                    lang === 'bn' ? 'bg-flag-50 text-flag-500' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  বাংলা (BN)
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
