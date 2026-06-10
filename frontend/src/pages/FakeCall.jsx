import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, PhoneOff, Speaker, Volume2, ShieldAlert, Clock, User, EyeOff } from 'lucide-react';

export default function FakeCall() {
  const { language } = useLanguage();

  // Settings
  const [callerName, setCallerName] = useState('Mom');
  const [delay, setDelay] = useState(5); // in seconds
  const [status, setStatus] = useState('ready'); // 'ready' | 'scheduled' | 'ringing' | 'active'
  const [scheduledTime, setScheduledTime] = useState(null);
  
  // Call Active States
  const [timerText, setTimerText] = useState('00:00');
  const [speakerOn, setSpeakerOn] = useState(false);

  // Audio Context Ref
  const ringAudioCtxRef = useRef(null);
  const ringIntervalId = useRef(null);
  const scheduleTimeoutId = useRef(null);
  const callDurationIntervalId = useRef(null);
  const vibrationIntervalId = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const clearAllTimers = () => {
    if (scheduleTimeoutId.current) clearTimeout(scheduleTimeoutId.current);
    if (callDurationIntervalId.current) clearInterval(callDurationIntervalId.current);
    if (vibrationIntervalId.current) clearInterval(vibrationIntervalId.current);
    stopRingtone();
  };

  // Web Audio Ringtone Synthesizer
  const playRingtone = () => {
    try {
      ringAudioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      const triggerTone = () => {
        if (!ringAudioCtxRef.current) return;
        
        const osc1 = ringAudioCtxRef.current.createOscillator();
        const osc2 = ringAudioCtxRef.current.createOscillator();
        const gainNode = ringAudioCtxRef.current.createGain();
        
        osc1.type = 'sine';
        osc1.frequency.value = 440;
        
        osc2.type = 'sine';
        osc2.frequency.value = 480;
        
        gainNode.gain.setValueAtTime(0.15, ringAudioCtxRef.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ringAudioCtxRef.current.currentTime + 1.8);
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ringAudioCtxRef.current.destination);
        
        osc1.start();
        osc2.start();
        
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch(e){}
        }, 2000);
      };

      // Play initial ring
      triggerTone();
      
      // Repeat ring every 4 seconds (2s ring + 2s silence)
      ringIntervalId.current = setInterval(triggerTone, 4000);
    } catch (e) {
      console.error("Failed to play ringtone", e);
    }
  };

  const stopRingtone = () => {
    if (ringIntervalId.current) {
      clearInterval(ringIntervalId.current);
      ringIntervalId.current = null;
    }
    if (ringAudioCtxRef.current) {
      try {
        ringAudioCtxRef.current.close();
      } catch (e) {}
      ringAudioCtxRef.current = null;
    }
  };

  // Trigger call scheduler
  const handleScheduleCall = () => {
    clearAllTimers();
    setStatus('scheduled');
    
    // Countdown
    let timeLeft = delay;
    setScheduledTime(timeLeft);
    
    scheduleTimeoutId.current = setTimeout(() => {
      triggerIncomingRing();
    }, delay * 1000);
  };

  const triggerIncomingRing = () => {
    setStatus('ringing');
    playRingtone();

    // Trigger device vibration
    if (navigator.vibrate) {
      navigator.vibrate([1000, 1000]);
      vibrationIntervalId.current = setInterval(() => {
        navigator.vibrate([1000, 1000]);
      }, 2000);
    }
  };

  const handleDeclineCall = () => {
    clearAllTimers();
    setStatus('ready');
    if (navigator.vibrate) {
      navigator.vibrate(0);
    }
  };

  const handleAcceptCall = () => {
    stopRingtone();
    if (vibrationIntervalId.current) {
      clearInterval(vibrationIntervalId.current);
      vibrationIntervalId.current = null;
    }
    if (navigator.vibrate) {
      navigator.vibrate(0);
    }

    setStatus('active');
    
    let secondsElapsed = 0;
    setTimerText('00:00');
    
    callDurationIntervalId.current = setInterval(() => {
      secondsElapsed++;
      const mm = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
      const ss = String(secondsElapsed % 60).padStart(2, '0');
      setTimerText(`${mm}:${ss}`);
    }, 1000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-12 font-body relative">
      
      {/* 1. SETUP PANEL SCREEN */}
      {status === 'ready' && (
        <div className="flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-heading font-extrabold text-3xl text-slate-800 dark:text-white uppercase tracking-wider flex items-center justify-center gap-2">
              <Phone className="h-8 w-8 text-pink-500" />
              <span>{language === 'hi' ? 'नकली कॉल सिम्युलेटर' : 'Fake Call Simulator'}</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-[#a89ec4] max-w-sm mx-auto leading-normal">
              {language === 'hi' 
                ? 'असहज या असुरक्षित स्थितियों से सुरक्षित रूप से बाहर निकलने के लिए एक तत्काल इनकमिंग कॉल शेड्यूल करें।' 
                : 'Schedule a simulated incoming phone call to help you exit uncomfortable or unsafe environments safely.'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col gap-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                {language === 'hi' ? 'कॉलर का नाम' : 'Caller Display Name'}
              </label>
              <input 
                type="text" 
                value={callerName} 
                onChange={(e) => setCallerName(e.target.value)}
                className="w-full text-xs p-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                placeholder="e.g. Mom, Boss, Police"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {language === 'hi' ? 'कॉल शेड्यूल करने का समय' : 'Trigger Time Delay'}
              </label>
              
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 30, 60].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setDelay(sec)}
                    className={`py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      delay === sec
                        ? 'bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-500/10'
                        : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#a89ec4]'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleScheduleCall}
              className="w-full py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 mt-2"
            >
              <Clock className="h-4.5 w-4.5" />
              <span>{language === 'hi' ? 'नकली कॉल शेड्यूल करें' : 'Schedule Fake Call'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. SCHEDULED WAITING COUNTDOWN */}
      {status === 'scheduled' && (
        <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-8 rounded-2xl text-center flex flex-col items-center gap-5 shadow-xl">
          <div className="p-4 bg-pink-500/10 border border-pink-500/20 text-pink-500 rounded-full animate-pulse">
            <Clock className="h-10 w-10" />
          </div>
          <h2 className="font-heading font-extrabold text-xl text-slate-800 dark:text-white">
            {language === 'hi' ? 'कॉल शेड्यूल की गई' : 'Fake Call Scheduled'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-[#a89ec4]">
            {language === 'hi' 
              ? `${delay} सेकंड में इनकमिंग कॉल सक्रिय होगी। फ़ोन को बंद न करें...` 
              : `Incoming call simulation will trigger in ${delay} seconds. Keep this tab open...`}
          </p>
          <button
            onClick={handleDeclineCall}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer mt-2"
          >
            {language === 'hi' ? 'रद्द करें' : 'Cancel Simulation'}
          </button>
        </div>
      )}

      {/* 3. FULL SCREEN CALL RINGING OVERLAY (MOBILE STYLE) */}
      {status === 'ringing' && (
        <div className="fixed inset-0 z-50 bg-[#0c050a] flex flex-col justify-between py-16 px-8 text-white font-sans">
          <div className="text-center flex flex-col gap-2 mt-12 animate-fadeIn">
            <h2 className="text-3xl font-light tracking-wide">{callerName}</h2>
            <p className="text-xs tracking-widest uppercase text-pink-500 font-bold animate-pulse">
              {language === 'hi' ? 'इनकमिंग कॉल...' : 'Incoming Call...'}
            </p>
          </div>

          <div className="flex flex-col gap-12 items-center">
            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 animate-pulse">
              <User className="h-12 w-12 text-slate-400" />
            </div>
            
            <div className="flex justify-between w-full max-w-xs px-6">
              {/* Decline Call Button */}
              <button 
                onClick={handleDeclineCall}
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-transform"
              >
                <PhoneOff className="h-6 w-6 text-white" />
              </button>

              {/* Accept Call Button */}
              <button 
                onClick={handleAcceptCall}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-transform animate-bounce"
              >
                <Phone className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. FULL SCREEN CALL ACTIVE OVERLAY */}
      {status === 'active' && (
        <div className="fixed inset-0 z-50 bg-[#0c050a] flex flex-col justify-between py-16 px-8 text-white font-sans">
          
          <div className="text-center flex flex-col gap-2 mt-12">
            <h2 className="text-3xl font-light tracking-wide">{callerName}</h2>
            <p className="text-xs font-mono tracking-widest text-slate-400">{timerText}</p>
          </div>

          {/* Active Call UI Dashboard */}
          <div className="flex flex-col gap-16 items-center">
            <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
              <button 
                onClick={() => setSpeakerOn(!speakerOn)}
                className={`py-4 rounded-2xl border flex flex-col items-center gap-1.5 transition-colors cursor-pointer text-xs font-semibold ${
                  speakerOn 
                    ? 'bg-white border-white text-black' 
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }`}
              >
                <Speaker className="h-5 w-5" />
                <span>{language === 'hi' ? 'स्पीकर' : 'Speaker'}</span>
              </button>

              <button className="py-4 rounded-2xl border bg-white/5 border-white/10 text-white hover:bg-white/10 flex flex-col items-center gap-1.5 cursor-pointer text-xs font-semibold opacity-50">
                <Volume2 className="h-5 w-5" />
                <span>Mute</span>
              </button>
            </div>

            {/* Hangup Red Button */}
            <button 
              onClick={handleDeclineCall}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition-transform"
            >
              <PhoneOff className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
