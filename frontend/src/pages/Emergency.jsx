import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SOSButton from '../components/Emergency/SOSButton';
import SafeMap from '../components/Emergency/SafeMap';
import { Compass, RefreshCw, AlertOctagon } from 'lucide-react';

export default function Emergency() {
  const { t } = useLanguage();
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState('');
  const [isAlertActive, setIsAlertActive] = useState(false);

  function fetchGeoLocation() {
    setLocLoading(true);
    setLocError('');
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser');
      setLocLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude.toFixed(6),
          lon: position.coords.longitude.toFixed(6)
        });
        setLocLoading(false);
      },
      (err) => {
        setLocError('GPS Access Denied. Please enable location services.');
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  // Fetch location initially on load
  useEffect(() => {
    fetchGeoLocation();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8 font-body">
      
      {/* Page Header */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-heading font-extrabold text-3xl text-slate-800 dark:text-white uppercase tracking-wider flex items-center justify-center gap-2">
          <AlertOctagon className="h-8 w-8 text-pink-500 animate-pulse" />
          <span>{t('emergency.title')}</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-[#a89ec4] font-semibold">
          Instant emergency dispatcher. Trigger sound sirens and broadcast live coordinates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: SOS Button & Live coordinates card */}
        <div className="flex flex-col gap-6">
          <SOSButton 
            coordinates={coordinates} 
            onTriggerStateChange={(active) => setIsAlertActive(active)} 
          />

          {/* Coordinates Info Panel */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-5 rounded-2xl shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                <Compass className="h-4 w-4" />
                <span>{t('emergency.gpsCoords')}</span>
              </h4>
              <button 
                onClick={fetchGeoLocation}
                disabled={locLoading}
                className="p-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-[#a89ec4] disabled:opacity-50 cursor-pointer"
                title="Update Location"
              >
                <RefreshCw className={`h-4.5 w-4.5 ${locLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {locError ? (
              <div className="text-xs text-red-500 font-semibold bg-red-500/10 border border-red-500/20 py-2.5 px-3.5 rounded-xl">
                {locError}
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-[#160913]/50 border border-slate-200/50 dark:border-white/5 p-4 rounded-xl font-mono text-xs text-slate-700 dark:text-white flex justify-around">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Latitude</span>
                  <span className="font-bold text-sm">{coordinates.lat || 'Loading...'}</span>
                </div>
                <div className="border-l border-slate-200 dark:border-white/5 mx-2"></div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Longitude</span>
                  <span className="font-bold text-sm">{coordinates.lon || 'Loading...'}</span>
                </div>
              </div>
            )}
            
            <p className="text-[10px] text-slate-400 dark:text-[#a89ec4]/40 mt-3 leading-normal">
              {t('emergency.gpsNote')}
            </p>
          </div>
        </div>

        {/* Right Side: Radar / Google Map */}
        <div className="w-full">
          <SafeMap coordinates={coordinates} />
        </div>

      </div>

    </div>
  );
}
