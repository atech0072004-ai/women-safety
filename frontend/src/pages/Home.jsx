import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ShieldAlert, Navigation, FileText, ChevronRight, Users } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center font-body">
      
      {/* 1. Hero Section */}
      <section className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
        
        {/* Background gradient flares */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-pink-500/10 dark:bg-pink-500/5 blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full bg-rose-500/10 dark:bg-rose-500/5 blur-3xl -z-10 pointer-events-none"></div>

        {/* Hero Left Content */}
        <div className="flex-1 flex flex-col gap-6 text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-500 font-bold text-xs uppercase tracking-wide w-max">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span>24/7 Security Coverage</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl leading-tight text-slate-800 dark:text-white tracking-tight">
            {t('home.heroTitle')}
          </h1>
          
          <p className="text-sm sm:text-base text-slate-500 dark:text-[#a89ec4] leading-relaxed">
            {t('home.heroSubtitle')}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <Link 
              to="/emergency" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-extrabold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 shadow-lg shadow-red-500/30 hover:from-red-500 hover:to-rose-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <ShieldAlert className="h-4 w-4 animate-bounce" />
              <span>{t('home.sosButton')}</span>
            </Link>
            <Link 
              to="/report" 
              className="inline-flex items-center justify-center gap-1 px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-slate-700 dark:text-[#a89ec4] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300"
            >
              <span>{t('nav.report')}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Hero Right Interactive Mockup Dashboard */}
        <div className="flex-1 w-full max-w-md bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-3xl shadow-2xl relative">
          
          {/* Glass Card Floating Badge */}
          <div className="absolute -top-4 -left-4 bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-lg border border-emerald-400/20">
            <ShieldCheck className="h-4 w-4" />
            <span>GPS Tracking Live</span>
          </div>

          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
            <div>
              <h3 className="font-heading font-extrabold text-sm text-slate-800 dark:text-white">Active Guard Status</h3>
              <p className="text-[10px] text-slate-400 font-bold">Monitoring Active Area</p>
            </div>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
          </div>

          {/* Interactive Button Demonstration Mockup */}
          <div className="flex flex-col items-center justify-center py-6 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#160913]/50 rounded-2xl mb-4 relative overflow-hidden">
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse-slow">
              <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg">
                <ShieldAlert className="h-8 w-8" />
              </div>
            </div>
            <p className="text-xs font-semibold text-red-500 mt-4 tracking-wider uppercase">SOS Ready</p>
          </div>

          <div className="flex gap-3 mt-4">
            <div className="flex-1 p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl text-center">
              <span className="block font-heading font-black text-lg text-pink-600 dark:text-pink-400">5k+</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Guarded</span>
            </div>
            <div className="flex-1 p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl text-center">
              <span className="block font-heading font-black text-lg text-red-500">12k+</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">SOS dispatches</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Core Features Section */}
      <section className="w-full bg-slate-100 dark:bg-[#23101e] border-t border-b border-slate-200 dark:border-white/5 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center flex flex-col gap-3 mb-12">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-white">
            {t('home.featuresTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#a89ec4] max-w-lg mx-auto">
            {t('home.featuresSubtitle')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: SOS */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-md flex flex-col gap-4 text-left">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-xl w-max">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-800 dark:text-white">
              {t('home.featureSosTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
              {t('home.featureSosDesc')}
            </p>
          </div>

          {/* Card 2: Maps */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-md flex flex-col gap-4 text-left">
            <div className="p-3 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-xl w-max">
              <Navigation className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-800 dark:text-white">
              {t('home.featureMapTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
              {t('home.featureMapDesc')}
            </p>
          </div>

          {/* Card 3: Incident Report */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-md flex flex-col gap-4 text-left">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl w-max">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-800 dark:text-white">
              {t('home.featureReportTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
              {t('home.featureReportDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Women Stories / Testimonials Section */}
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-10">
        <div className="text-center flex flex-col gap-3">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-white">
            Empowered & Protected
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#a89ec4] max-w-lg mx-auto">
            See how women are using SafeHer to gain peace of mind and travel with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between gap-4 hover:border-pink-500/20 transition-all duration-300">
            <p className="text-xs italic text-slate-500 dark:text-[#a89ec4] leading-relaxed">
              "The SOS button has given me immense confidence during my late-night commute back from the office in Lucknow. The siren is extremely loud and immediately alerts everyone around."
            </p>
            <div className="flex items-center gap-3 mt-2 border-t border-slate-100 dark:border-white/5 pt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/30">
                <img src="/woman_avatar_1.png" alt="Ananya" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Ananya Sharma</h4>
                <p className="text-[9px] text-pink-500 font-semibold">Software Engineer, Lucknow</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between gap-4 hover:border-pink-500/20 transition-all duration-300">
            <p className="text-xs italic text-slate-500 dark:text-[#a89ec4] leading-relaxed">
              "I registered an infrastructure complaint about broken streetlights near the metro station. It was reviewed and resolved within days. Anonymous filing is a lifesaver."
            </p>
            <div className="flex items-center gap-3 mt-2 border-t border-slate-100 dark:border-white/5 pt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/30">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="Preeti" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Preeti Yadav</h4>
                <p className="text-[9px] text-pink-500 font-semibold">University Student, Noida</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col justify-between gap-4 hover:border-pink-500/20 transition-all duration-300">
            <p className="text-xs italic text-slate-500 dark:text-[#a89ec4] leading-relaxed">
              "Managing my guardians list is super simple. My parents receive instant coordinates alerts whenever I travel alone. This is an essential safety app for every woman."
            </p>
            <div className="flex items-center gap-3 mt-2 border-t border-slate-100 dark:border-white/5 pt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/30">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Sneha" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">Sneha Kapoor</h4>
                <p className="text-[9px] text-pink-500 font-semibold">Research Scholar, Kanpur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
