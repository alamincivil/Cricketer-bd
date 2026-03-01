import React from 'react';
import { Trophy, Heart, Shield, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="bg-flag-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Cricketer.bd</h1>
          <p className="text-xl text-flag-red-200 max-w-2xl mx-auto">
            The digital home for every Bangladesh cricket enthusiast. We document the history, the struggle, and the glory of our Tigers.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Cricketer.bd was founded with a simple goal: to create a comprehensive, accessible, and inspiring repository of information about Bangladesh's cricketers. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe that every run scored and every wicket taken is a part of our national narrative. By documenting these journeys, we aim to inspire the next generation of cricketers in every corner of Bangladesh.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <Heart className="w-8 h-8 mx-auto mb-4 text-flag-red-500" />
              <h3 className="font-bold">Passion</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <Shield className="w-8 h-8 mx-auto mb-4 text-flag-500" />
              <h3 className="font-bold">Accuracy</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <Globe className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h3 className="font-bold">Global Reach</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-4 text-flag-gold-400" />
              <h3 className="font-bold">Excellence</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Community */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Join the Community</h2>
          <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-600 text-lg mb-8">
              Are you a cricket historian or a passionate fan? We're always looking for contributors to help us keep our database up to date and tell the stories that matter.
            </p>
            <button className="bg-flag-500 text-white px-8 py-3 rounded-full font-bold hover:bg-flag-600 transition-colors">
              Become a Contributor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
