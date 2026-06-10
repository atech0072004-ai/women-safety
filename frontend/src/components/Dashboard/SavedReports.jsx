import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { BACKEND_URL } from '../../config';
import { AlertCircle, Calendar, MapPin, EyeOff } from 'lucide-react';

export default function SavedReports() {
  const { currentUser, isMock } = useAuth();
  const { t } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      const userUid = currentUser ? currentUser.uid : 'anonymous';

      if (!isMock && currentUser) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/incidents?userId=${userUid}`);
          if (response.ok) {
            const data = await response.json();
            setReports(data);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Failed to load reports from API, trying mock fallback", error);
        }
      }

      // Fallback: Load mock reports from LocalStorage
      const mockReports = JSON.parse(localStorage.getItem('safeher_mock_reports') || '[]');
      const filtered = mockReports.filter(r => r.userId === userUid || r.user_id === userUid);
      setReports(filtered);
      setLoading(false);
    }
    
    fetchReports();
  }, [currentUser, isMock]);

  if (loading) {
    return <div className="text-center py-6 text-sm text-slate-500">{t('emergency.loadingMap')}</div>;
  }

  return (
    <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl transition-all duration-300 font-body">
      <h3 className="font-heading font-extrabold text-md text-slate-800 dark:text-white mb-4 uppercase tracking-wider">
        {t('report.historyTitle')}
      </h3>

      {reports.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-400 dark:text-[#a89ec4]/60">
          <AlertCircle className="h-8 w-8 mx-auto mb-2 text-slate-300 dark:text-[#a89ec4]/25" />
          <p>{t('report.noHistory')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto custom-scroll pr-1">
          {reports.map((report, index) => (
            <div key={report.id || index} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl hover:border-pink-500/30 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-1 rounded bg-pink-500/10 text-pink-500 text-[10px] font-bold uppercase tracking-wider">
                  {report.category || 'Harassment'}
                </span>
                
                {report.anonymous && (
                  <span className="flex items-center gap-1 text-[9px] text-amber-500 font-semibold bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded">
                    <EyeOff className="h-3 w-3" />
                    <span>{t('report.labelAnon')}</span>
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 dark:text-white leading-relaxed mb-3">
                {report.description}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 dark:text-[#a89ec4]/60 border-t border-slate-200/50 dark:border-white/5 pt-2.5 mt-2">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{report.location}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(report.created_at || report.timestamp).toLocaleDateString()}
                </span>
              </div>

              {/* Show uploaded evidence preview if present */}
              {report.evidence_url || report.evidenceUrl ? (
                <div className="mt-3.5 border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden max-h-36">
                  <img src={report.evidence_url || report.evidenceUrl} alt="Report Evidence" className="w-full h-full object-cover" />
                </div>
              ) : null}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
