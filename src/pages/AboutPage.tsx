import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Heart, Shield, Globe, Users, Star, Zap, BookOpen, MapPin, GitCompare, Brain, TrendingUp, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <div className="pb-20">
      {/* SECTION 1 — Hero */}
      <div className="bg-flag-500 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-flag-600 via-flag-500 to-flag-500/80" />
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -left-8 -bottom-8 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute right-1/4 top-1/2 w-32 h-32 rounded-full bg-white/5" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 mb-6"
          >
            <Trophy className="w-3 h-3 text-flag-gold-400" />
            Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6"
          >
            About <span className="text-flag-gold-400">Cricketer.bd</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            The digital home for every Bangladesh cricket enthusiast. We document the history, the struggle, and the glory of our Tigers.
          </motion.p>
        </div>
      </div>

      {/* SECTION 2 — Stats Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '143+', label: 'Players Documented', icon: Users },
              { value: '25+', label: 'Historic Milestones', icon: Trophy },
              { value: '30+', label: 'Years of History', icon: Star },
              { value: '3', label: 'Cricket Formats', icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-flag-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-flag-500" />
                </div>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 — Our Mission */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-flag-500 mb-4 block">Our Purpose</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">
              Our <span className="text-flag-500">Mission</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Cricketer.bd was founded with a simple goal: to create a comprehensive, accessible, and inspiring repository of information about Bangladesh's cricketers.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We believe that every run scored and every wicket taken is a part of our national narrative. By documenting these journeys, we aim to inspire the next generation of cricketers in every corner of Bangladesh.
            </p>
            <Link
              to="/players"
              className="inline-flex items-center gap-2 bg-flag-500 text-white px-6 py-3 rounded-full font-bold hover:bg-flag-600 transition-colors"
            >
              Explore Players <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Heart, label: 'Passion', desc: 'Built by fans, for fans of Bangladesh cricket', color: 'text-flag-red-500', bg: 'bg-flag-red-50' },
              { icon: Shield, label: 'Accuracy', desc: 'Every stat and story verified carefully', color: 'text-flag-500', bg: 'bg-flag-50' },
              { icon: Globe, label: 'Global Reach', desc: 'Connecting Bangladesh cricket fans worldwide', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: Trophy, label: 'Excellence', desc: 'Celebrating the best of our Tigers', color: 'text-flag-gold-400', bg: 'bg-flag-gold-50' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="font-black text-gray-900 mb-2 uppercase tracking-tight">{item.label}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — Features Showcase */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-flag-500 mb-4 block">What We Offer</span>
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
              Explore <span className="text-flag-500">Features</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, label: 'Player Profiles', desc: '143+ detailed player biographies with career stats, achievements, and awards in English and Bangla.', link: '/players', linkLabel: 'Browse Players', color: 'bg-flag-500' },
              { icon: GitCompare, label: 'Compare Players', desc: 'Compare any two Bangladesh cricketers side-by-side across all formats with visual stat bars.', link: '/compare', linkLabel: 'Compare Now', color: 'bg-flag-red-500' },
              { icon: Brain, label: 'Cricket Quiz', desc: 'Test your knowledge of Bangladesh cricket history with 15 questions about historic milestones.', link: '/quiz', linkLabel: 'Take Quiz', color: 'bg-flag-gold-400' },
              { icon: Trophy, label: 'Milestones Timeline', desc: '25+ historic moments in Bangladesh cricket documented in a beautiful chronological timeline.', link: '/milestones', linkLabel: 'View Timeline', color: 'bg-flag-500' },
              { icon: MapPin, label: 'District Pride', desc: 'Discover cricketers from your hometown. Browse players by their home district across Bangladesh.', link: '/districts', linkLabel: 'Find Your District', color: 'bg-flag-red-500' },
              { icon: Heart, label: 'Fan Zone', desc: 'Save your favorite players and build your personal collection of Bangladesh cricket legends.', link: '/fanzone', linkLabel: 'My Fan Zone', color: 'bg-flag-gold-400' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2">{feature.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{feature.desc}</p>
                <Link to={feature.link} className="text-xs font-bold text-flag-500 uppercase tracking-widest hover:text-flag-600 flex items-center gap-1 group/link">
                  {feature.linkLabel} <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Join the Community */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-flag-500 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -left-8 -bottom-8 w-48 h-48 rounded-full bg-white/10" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
                Join the <span className="text-flag-gold-400">Community</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Are you a cricket historian or a passionate fan? We're always looking for contributors to help us keep our database up to date and tell the stories that matter.
              </p>
              
              <a
                href="mailto:contact@cricketer.bd"
                className="inline-flex items-center gap-2 bg-white text-flag-500 px-8 py-3 rounded-full font-bold hover:bg-flag-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Become a Contributor
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '100+', label: 'Contributors' },
                { value: '500+', label: 'Data Points' },
                { value: '2', label: 'Languages' },
                { value: '∞', label: 'Passion' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-xs font-bold text-white/60 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
