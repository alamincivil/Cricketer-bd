import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <h1 className="text-9xl font-black text-gray-100">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-flag-red-500 p-4 rounded-full shadow-lg animate-bounce">
              <Search className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Out of the Ground!</h2>
        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
          The page you're looking for has been hit for a six and we can't find it anywhere in the stadium.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center bg-flag-500 text-white px-8 py-3 rounded-full font-bold hover:bg-flag-600 transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5 mr-2" /> Back to Home
          </Link>
          <Link
            to="/players"
            className="flex items-center bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
          >
            Browse Players
          </Link>
        </div>
      </div>
    </div>
  );
}
