import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Heart, ShieldCheck, Mail, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-slate-100 dark:bg-[#0d060c] border-t border-slate-200 dark:border-white/5 py-12 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand and Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-pink-500" />
            <span className="font-heading font-extrabold text-lg bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              SafeHer
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
            Empowering women with instant crisis assistance, real-time safety tracking, and protected logs. Built for rapid security response.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-max mt-2">
            <ShieldCheck className="h-4 w-4" />
            <span>256-bit Encrypted Platform</span>
          </div>
        </div>

        {/* Quick Pages Navigation */}
        <div className="flex flex-col gap-2.5">
          <h4 className="font-heading font-semibold text-sm text-pink-600 dark:text-pink-400 uppercase tracking-widest">
            Resources
          </h4>
          <Link to="/" className="text-xs text-slate-500 dark:text-[#a89ec4] hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
            {t('nav.home')}
          </Link>
          <Link to="/about" className="text-xs text-slate-500 dark:text-[#a89ec4] hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
            {t('nav.about')}
          </Link>
          <Link to="/emergency" className="text-xs text-red-500 hover:text-red-600 transition-colors font-semibold">
            {t('nav.emergency')}
          </Link>
          <Link to="/tips" className="text-xs text-slate-500 dark:text-[#a89ec4] hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
            {t('nav.tips')}
          </Link>
          <Link to="/report" className="text-xs text-slate-500 dark:text-[#a89ec4] hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
            {t('nav.report')}
          </Link>
          <Link to="/helplines" className="text-xs text-slate-500 dark:text-[#a89ec4] hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
            {t('nav.helplines')}
          </Link>
        </div>

        {/* Essential Helplines */}
        <div className="flex flex-col gap-2.5">
          <h4 className="font-heading font-semibold text-sm text-pink-600 dark:text-pink-400 uppercase tracking-widest">
            Helplines
          </h4>
          <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-[#a89ec4]">
            <p className="font-semibold text-slate-700 dark:text-[#f5f2fd]">Police Emergency: 112</p>
            <p>Women Power Line (WPL): 1090</p>
            <p>Domestic Abuse: 181</p>
            <p>Cyber Crime: 1930</p>
          </div>
        </div>

        {/* Contact and Support */}
        <div className="flex flex-col gap-2.5">
          <h4 className="font-heading font-semibold text-sm text-pink-600 dark:text-pink-400 uppercase tracking-widest">
            Support
          </h4>
          <a href="mailto:support@safeher.org" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-[#a89ec4] hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
            <Mail className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            support@safeher.org
          </a>
          <a href="tel:112" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-[#a89ec4] hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
            <PhoneCall className="h-4 w-4 text-red-500" />
            112 Emergency Dispatch
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-slate-400 dark:text-[#a89ec4]/50">
          © {new Date().getFullYear()} SafeHer Platform. All Rights Reserved. Prepared for general women protection and safety coordination.
        </p>
        <p className="text-[10px] text-slate-400 dark:text-[#a89ec4]/50 flex items-center gap-1">
          Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> for a safer community.
        </p>
      </div>
    </footer>
  );
}
