import React from 'react';
import { Trophy, Github, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-flag-red-500 p-1 rounded-full">
                <Trophy className="w-5 h-5 text-flag-gold-400" />
              </div>
              <span className="text-xl font-bold text-white">Cricketer.bd</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The ultimate portal for Bangladesh cricket fans. Discover biographies, career stats, and historic moments of our Tigers.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-flag-gold-400 transition-colors">Home</a></li>
              <li><a href="/players" className="hover:text-flag-gold-400 transition-colors">Players</a></li>
              <li><a href="/about" className="hover:text-flag-gold-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Tigers</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-flag-gold-400 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-flag-gold-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-flag-gold-400 transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Cricketer.bd. All rights reserved. Made with ❤️ for Bangladesh Cricket.</p>
        </div>
      </div>
    </footer>
  );
}
