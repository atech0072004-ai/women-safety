import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { BACKEND_URL } from '../../config';
import { ShieldAlert, Compass, Calendar } from 'lucide-react';

export default function EmergencyHistory() {
  const { currentUser, isMock } = useAuth();
  const { t } = useLanguage();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSOSHistory() {
      setLoading(true);
      const userUid = currentUser ? currentUser.uid : 'anonymous';

      if (!isMock && currentUser) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/sos?userId=${userUid}`);
          if (response.ok) {
            const data = await response.json();
            setHistory(data);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Failed to load SOS logs from API, trying mock fallback", error);
        }
      }

      // Fallback: Load mock alerts from LocalStorage
      const mockAlerts = JSON.parse(localStorage.getItem('safeher_mock_alerts') || '[]');
      const filtered = mockAlerts.filter(a => a.userId === userUid || a.user_id === userUid);
      setHistory(filtered);
      setLoading(false);
    }
    
    fetchSOSHistory();
  }, [currentUser, isMock]);

  if (loading) {
    return <div className="text-center py-6 text-sm text-slate-500">{t('emergency.loadingMap')}</div>;
  }

  return (
    <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl transition-all duration-300 font-body">
      <h3 className="font-heading font-extrabold text-md text-slate-800 dark:text-white mb-4 uppercase tracking-wider">
        {t('dashboard.historyTitle')}
      </h3>

      {history.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-400 dark:text-[#a89ec4]/60">
          <ShieldAlert className="h-8 w-8 mx-auto mb-2 text-slate-300 dark:text-[#a89ec4]/25" />
          <p>{t('dashboard.noHistory')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scroll pr-1">
          {history.map((log, index) => (
            <div key={log.id || index} className="p-3 bg-red-500/5 dark:bg-red-500/10 border border-red-500/15 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500 text-white rounded-lg">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-white uppercase">
                    SOS Alarm Triggered
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-[#a89ec4]/70 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="h-3 w-3" />
                    {new Date(log.created_at || log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              {log.latitude && (
                <div className="text-[9px] bg-red-500/10 dark:bg-red-500/20 text-red-500 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5 animate-spin" />
                  <span>Lat: {parseFloat(log.latitude).toFixed(4)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
