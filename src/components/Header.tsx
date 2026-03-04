import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favoriteIds } = useFavorites();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Players', path: '/players' },
    { name: 'Captains', path: '/captains' },
    { name: 'Leaders', path: '/leaders' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-flag-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-flag-red-500 p-1.5 rounded-full group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-flag-gold-400" />
              </div>
              <span className="text-xl font-bold tracking-tight">Cricketer.bd</span>
            </Link>
          </div>

          {/* Favorites Badge (Desktop) */}
          <div className="hidden md:flex items-center ml-auto mr-8">
            <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              <Heart className={`w-4 h-4 ${favoriteIds.length > 0 ? 'fill-flag-red-500 text-flag-red-500' : 'text-white'}`} />
              <span className="text-xs font-bold">{favoriteIds.length}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-flag-gold-400 ${
                  isActive(link.path) ? 'text-flag-gold-400 border-b-2 border-flag-gold-400' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-flag-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-flag-600 border-t border-flag-500">
          <div className="px-4 py-3 flex items-center justify-between border-b border-flag-500/50">
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Your Favorites</span>
            <div className="flex items-center space-x-2">
              <Heart className={`w-4 h-4 ${favoriteIds.length > 0 ? 'fill-flag-red-500 text-flag-red-500' : 'text-white'}`} />
              <span className="text-sm font-bold">{favoriteIds.length}</span>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-flag-500 text-flag-gold-400'
                    : 'text-white hover:bg-flag-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
