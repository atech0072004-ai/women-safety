import React from 'react';
import { ShieldCheck, BookOpen, Compass, Fingerprint } from 'lucide-react';

export default function TipCard({ title, desc, category }) {
  // Select icon based on tip category
  const renderIcon = () => {
    switch (category) {
      case 'physical':
        return <Fingerprint className="h-6 w-6 text-rose-500" />;
      case 'cyber':
        return <ShieldCheck className="h-6 w-6 text-emerald-500" />;
      case 'travel':
        return <Compass className="h-6 w-6 text-pink-500" />;
      default:
        return <BookOpen className="h-6 w-6 text-pink-500" />;
    }
  };

  const getCategoryLabel = () => {
    switch (category) {
      case 'physical': return 'Physical Defense';
      case 'cyber': return 'Cyber Safety';
      case 'travel': return 'Travel & Transit';
      default: return 'General Safety';
    }
  };

  return (
    <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
            {renderIcon()}
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
            category === 'physical' ? 'bg-rose-500/15 text-rose-500 border border-rose-500/10' :
            category === 'cyber' ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/10' :
            'bg-pink-500/15 text-pink-500 border border-pink-500/10'
          }`}>
            {getCategoryLabel()}
          </span>
        </div>

        <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-white mb-2 leading-snug">
          {title}
        </h3>
        
        <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="border-t border-slate-100 dark:border-white/5 pt-4 mt-4 flex items-center justify-between text-[10px] text-slate-400 dark:text-[#a89ec4]/40 font-semibold uppercase">
        <span>Verified Strategy</span>
        <span>Aura safe certified</span>
      </div>
    </div>
  );
}
