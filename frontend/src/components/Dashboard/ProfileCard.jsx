import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { User, ShieldAlert, Award, Clock } from 'lucide-react';

export default function ProfileCard() {
  const { currentUser, isMock } = useAuth();
  const { t } = useLanguage();

  const mockAvatar = currentUser?.photoURL || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150';

  return (
    <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 w-full font-body">
      
      {/* User Avatar */}
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-500/20 shadow-md">
          {currentUser?.photoURL ? (
            <img src={mockAvatar} alt="User Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <User className="h-10 w-10 text-pink-500" />
            </div>
          )}
        </div>
        <div className="absolute bottom-1 right-1 bg-emerald-500 border-2 border-white dark:border-[#23101e] w-5 h-5 rounded-full flex items-center justify-center" title="Online Status">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
        </div>
      </div>

      {/* User Details */}
      <h3 className="font-heading font-extrabold text-lg text-slate-800 dark:text-white">
        {currentUser?.displayName || 'Aura Safety Member'}
      </h3>
      <p className="text-xs text-slate-500 dark:text-[#a89ec4] mb-4">
        {currentUser?.email}
      </p>

      {/* User Badges */}
      <div className="grid grid-cols-2 gap-3 w-full border-t border-slate-100 dark:border-white/5 pt-4 mt-2">
        <div className="flex flex-col items-center bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5">
          <Award className="h-5 w-5 text-pink-500 mb-1" />
          <span className="text-[10px] text-slate-400 dark:text-[#a89ec4]/60 uppercase font-semibold">Tier</span>
          <span className="text-xs font-bold text-slate-700 dark:text-white">Silver Prep</span>
        </div>
        <div className="flex flex-col items-center bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5">
          <Clock className="h-5 w-5 text-rose-500 mb-1" />
          <span className="text-[10px] text-slate-400 dark:text-[#a89ec4]/60 uppercase font-semibold">Status</span>
          <span className="text-xs font-bold text-slate-700 dark:text-white">Armed</span>
        </div>
      </div>

      {/* Mock Status Alert */}
      {isMock && (
        <div className="mt-5 w-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] py-2 px-3 rounded-lg flex items-center gap-1.5 justify-center leading-relaxed font-semibold">
          <ShieldAlert className="h-4 w-4 flex-shrink-0" />
          <span>{t('dashboard.mockStatus')}</span>
        </div>
      )}

    </div>
  );
}
