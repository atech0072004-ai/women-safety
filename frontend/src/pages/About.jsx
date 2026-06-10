import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, Heart, Phone } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const helplines = [
    { name: t('about.helplinePolice'), number: "112", description: "Direct response dispatch services." },
    { name: t('about.helplineNational'), number: "1090", description: "Women Power Line (U.P.) for safety & harassment support." },
    { name: t('about.helplineDomestic'), number: "181", description: "Support desk for abuse and domestic concerns." },
    { name: "Cyber Crime Helpline", number: "1930", description: "Harassment, digital extortion, or fraud logs." },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col gap-10 font-body">
      
      {/* Page Header */}
      <div className="text-center flex flex-col gap-3">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white">
          {t('about.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-[#a89ec4] max-w-lg mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      {/* Mission Content */}
      <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-6 items-start">
        <div className="p-4 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-2xl w-max flex-shrink-0">
          <Heart className="h-8 w-8 text-pink-500" />
        </div>
        <div className="flex flex-col gap-2.5">
          <h2 className="font-heading font-extrabold text-lg text-slate-800 dark:text-white">
            {t('about.missionTitle')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
            {t('about.missionDesc')}
          </p>
        </div>
      </div>

      {/* Helplines Section */}
      <div className="flex flex-col gap-6">
        <h2 className="font-heading font-extrabold text-lg text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-pink-500/10 pb-3">
          <ShieldAlert className="h-5 w-5 text-red-500" />
          <span>{t('about.helplinesTitle')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {helplines.map((hl, index) => (
            <div key={index} className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-5 rounded-xl shadow-md flex justify-between items-center group hover:border-pink-500/35 transition-all duration-300">
              <div className="flex flex-col gap-1 pr-4">
                <h4 className="font-heading font-bold text-xs text-slate-800 dark:text-white">
                  {hl.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-[#a89ec4] leading-normal">
                  {hl.description}
                </p>
                <span className="text-sm font-black text-pink-600 dark:text-pink-400 mt-1 block">
                  {hl.number}
                </span>
              </div>

              <a 
                href={`tel:${hl.number}`} 
                className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md group-hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                title={`Call ${hl.name}`}
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
