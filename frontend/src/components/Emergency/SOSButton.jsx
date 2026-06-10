import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { BACKEND_URL } from '../../config';
import { BellRing, ShieldAlert, VolumeX, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SOSButton({ coordinates, onTriggerStateChange }) {
  const { currentUser, isMock } = useAuth();
  const { t } = useLanguage();
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [sirenActive, setSirenActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState(t('emergency.statusReady'));

  // Web Audio Context reference for siren synthesis
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const lfoRef = useRef(null);

  // Sync siren status when alert is disarmed
  useEffect(() => {
    if (!isAlertActive) {
      stopSiren();
    }
  }, [isAlertActive]);

  // Clean up Audio Context on unmount
  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, []);

  function startSiren() {
    if (sirenActive) return;
    try {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.setValueAtTime(0.5, audioCtxRef.current.currentTime);
      
      oscRef.current = audioCtxRef.current.createOscillator();
      oscRef.current.type = 'sawtooth';
      oscRef.current.frequency.value = 850;
      
      lfoRef.current = audioCtxRef.current.createOscillator();
      lfoRef.current.type = 'sine';
      lfoRef.current.frequency.value = 1.6; // siren swell rate
      
      const lfoGain = audioCtxRef.current.createGain();
      lfoGain.gain.value = 350; // pitch modulation sweep breadth
      
      lfoRef.current.connect(lfoGain);
      lfoGain.connect(oscRef.current.frequency);
      
      oscRef.current.connect(gainNode);
      gainNode.connect(audioCtxRef.current.destination);
      
      oscRef.current.start();
      lfoRef.current.start();
      setSirenActive(true);
    } catch (e) {
      console.error("Audio Context Failed", e);
    }
  }

  function stopSiren() {
    if (oscRef.current) {
      try { oscRef.current.stop(); } catch(e){}
      oscRef.current.disconnect();
      oscRef.current = null;
    }
    if (lfoRef.current) {
      try { lfoRef.current.stop(); } catch(e){}
      lfoRef.current.disconnect();
      lfoRef.current = null;
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch(e){}
      audioCtxRef.current = null;
    }
    setSirenActive(false);
  }

  const toggleSiren = () => {
    if (sirenActive) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  async function triggerSOS() {
    const nextState = !isAlertActive;
    setIsAlertActive(nextState);
    if (onTriggerStateChange) onTriggerStateChange(nextState);

    if (nextState) {
      startSiren();
      setStatusMessage(t('emergency.statusAlert'));
      
      const alertData = {
        userId: currentUser ? currentUser.uid : 'anonymous',
        userEmail: currentUser ? currentUser.email : 'anonymous@safeher.org',
        userName: currentUser ? currentUser.displayName : 'Anonymous User',
        latitude: coordinates.lat || null,
        longitude: coordinates.lon || null,
        status: 'active'
      };

      if (!isMock) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/sos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(alertData)
          });
          if (response.ok) {
            return;
          }
        } catch (error) {
          console.error("Failed to upload alert to API, saving locally", error);
        }
      }

      // Save to Mock alerts in LocalStorage
      const mockAlerts = JSON.parse(localStorage.getItem('safeher_mock_alerts') || '[]');
      mockAlerts.unshift({
        ...alertData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('safeher_mock_alerts', JSON.stringify(mockAlerts));
    } else {
      stopSiren();
      setStatusMessage(t('emergency.statusReady'));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 rounded-2xl shadow-xl transition-all duration-300 w-full font-body">
      
      {/* Alert Status Banner */}
      <div className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
        isAlertActive 
          ? 'bg-red-500/10 border-red-500/30 text-red-500 animate-pulse'
          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
      }`}>
        {isAlertActive ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
        <span>{statusMessage}</span>
      </div>

      {/* Ripple SOS Button */}
      <div className="relative w-56 h-56 flex items-center justify-center mb-8">
        {isAlertActive && (
          <>
            <div className="absolute w-full h-full rounded-full bg-red-500/20 animate-ripple"></div>
            <div className="absolute w-full h-full rounded-full bg-red-500/25 animate-ripple delay-500"></div>
            <div className="absolute w-full h-full rounded-full bg-red-500/15 animate-ripple delay-1000"></div>
          </>
        )}
        <button
          onClick={triggerSOS}
          className={`absolute w-48 h-48 rounded-full flex flex-col items-center justify-center cursor-pointer select-none border-4 border-white/10 shadow-2xl transition-all duration-300 active:scale-95 ${
            isAlertActive 
              ? 'bg-gradient-to-r from-red-600 to-rose-600 shadow-red-500/50 text-white' 
              : 'bg-gradient-to-r from-pink-600 to-rose-600 shadow-pink-500/30 text-white hover:from-pink-500 hover:to-rose-500'
          }`}
          aria-label={isAlertActive ? t('emergency.btnDisarm') : t('emergency.btnTrigger')}
        >
          <ShieldAlert className={`h-16 w-16 mb-2 ${isAlertActive ? 'animate-bounce' : ''}`} />
          <span className="font-heading font-extrabold text-sm tracking-widest text-center px-4 uppercase">
            {isAlertActive ? t('emergency.btnDisarm') : t('emergency.btnTrigger')}
          </span>
        </button>
      </div>

      {/* Siren & Action Panel */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <button 
          onClick={toggleSiren}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border font-semibold text-xs transition-all duration-200 cursor-pointer ${
            sirenActive 
              ? 'bg-red-500/15 border-red-500 text-red-500' 
              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#a89ec4] hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          {sirenActive ? <VolumeX className="h-4 w-4" /> : <BellRing className="h-4 w-4" />}
          <span>{sirenActive ? t('emergency.sirenOn') : t('emergency.sirenOff')}</span>
        </button>

        <button 
          onClick={() => {
            const smsMessage = `EMERGENCY ALERT: I need help! My coordinates are: Lat ${coordinates.lat || '--'}, Lon ${coordinates.lon || '--'}. Link: https://maps.google.com/?q=${coordinates.lat || '0'},${coordinates.lon || '0'}`;
            navigator.clipboard.writeText(smsMessage).then(() => {
              alert(t('alerts.copiedSOS'));
            });
          }}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-[#a89ec4] font-semibold text-xs transition-all duration-200 cursor-pointer"
        >
          <i className="fa-solid fa-copy"></i>
          <span>{t('emergency.shareMsg')}</span>
        </button>
      </div>

    </div>
  );
}
