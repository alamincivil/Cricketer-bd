import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Github, Twitter, Facebook, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* COLUMN 1 — Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-flag-red-500 p-1.5 rounded-full">
                <Trophy className="w-5 h-5 text-flag-gold-400" />
              </div>
              <span className="text-xl font-bold text-white">Cricketer.bd</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              The ultimate portal for Bangladesh cricket fans. Discover biographies, career stats, and historic moments of our Tigers.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-400">100+ Players</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-400">25+ Milestones</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-gray-400">3 Formats</span>
            </div>
          </div>

          {/* COLUMN 2 — Explore */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-flag-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/players" className="hover:text-flag-gold-400 transition-colors">Players</Link></li>
              <li><Link to="/captains" className="hover:text-flag-gold-400 transition-colors">Captains</Link></li>
              <li><Link to="/leaders" className="hover:text-flag-gold-400 transition-colors">Leaders</Link></li>
              <li><Link to="/milestones" className="hover:text-flag-gold-400 transition-colors">Milestones</Link></li>
              <li><Link to="/districts" className="hover:text-flag-gold-400 transition-colors">Districts</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 — Features */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/compare" className="hover:text-flag-gold-400 transition-colors">Compare Players</Link></li>
              <li><Link to="/quiz" className="hover:text-flag-gold-400 transition-colors">Cricket Quiz</Link></li>
              <li><Link to="/fanzone" className="hover:text-flag-gold-400 transition-colors">Fan Zone</Link></li>
              <li><Link to="/era/pioneers" className="hover:text-flag-gold-400 transition-colors">Era Stories</Link></li>
              <li><Link to="/about" className="hover:text-flag-gold-400 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* COLUMN 4 — Follow Tigers */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Follow Tigers</h3>
            <div className="flex flex-col space-y-3">
              <a href="#" className="flex items-center gap-2 hover:text-flag-gold-400 transition-colors text-sm">
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-flag-gold-400 transition-colors text-sm">
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-flag-gold-400 transition-colors text-sm">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
            <a href="mailto:contact@cricketer.bd" className="flex items-center gap-2 mt-6 text-xs text-gray-500 hover:text-gray-300 transition-colors">
              <MessageSquare className="w-3 h-3" />
              Suggest a Correction
            </a>
          </div>
        </div>

        {/* MIDDLE STATS BAR */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <Link to="/players" className="hover:text-gray-300 transition-colors">Players</Link>
            <Link to="/compare" className="hover:text-gray-300 transition-colors">Compare</Link>
            <Link to="/quiz" className="hover:text-gray-300 transition-colors">Quiz</Link>
            <Link to="/fanzone" className="hover:text-gray-300 transition-colors">Fan Zone</Link>
            <Link to="/milestones" className="hover:text-gray-300 transition-colors">Milestones</Link>
            <Link to="/captains" className="hover:text-gray-300 transition-colors">Captains</Link>
            <Link to="/leaders" className="hover:text-gray-300 transition-colors">Leaders</Link>
            <Link to="/about" className="hover:text-gray-300 transition-colors">About</Link>
          </div>
        </div>

        {/* COPYRIGHT BAR */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Cricketer.bd. All rights reserved. Made with ❤️ for Bangladesh Cricket.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Live & Updated</span>
            </span>
            <span>•</span>
            <span>Powered by the Tigers Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
