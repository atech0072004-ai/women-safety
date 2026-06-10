import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Shield, Activity, Compass, Phone } from 'lucide-react';

export default function SafeMap({ coordinates }) {
  const { t, language } = useLanguage();
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '');
  const [nearbyResources, setNearbyResources] = useState([]);
  const [resourceType, setResourceType] = useState('police'); // 'police' or 'hospital'

  const hasApiKey = apiKey && apiKey !== 'your_google_maps_api_key_here';

  // Generate mock nearby stations/hospitals based on GPS coordinate offsets (Lucknow default center)
  useEffect(() => {
    const lat = parseFloat(coordinates.lat) || 26.8467; // Lucknow center lat
    const lon = parseFloat(coordinates.lon) || 80.9462; // Lucknow center lon

    const mockPolice = [
      { 
        nameEn: "Hazratganj Kotwali Police Station", 
        nameHi: "हज़रतगंज कोतवाली पुलिस थाना", 
        phone: "9454403854", 
        dist: "0.4 km", 
        lat: lat + 0.003, 
        lon: lon - 0.002 
      },
      { 
        nameEn: "Gomti Nagar Police Station", 
        nameHi: "गोमती नगर पुलिस थाना", 
        phone: "9454403849", 
        dist: "1.1 km", 
        lat: lat - 0.005, 
        lon: lon + 0.006 
      },
      { 
        nameEn: "Aliganj Kotwali", 
        nameHi: "अलीगंज कोतवाली", 
        phone: "9454403839", 
        dist: "1.8 km", 
        lat: lat + 0.008, 
        lon: lon + 0.009 
      },
      { 
        nameEn: "Gautam Palli Police Station", 
        nameHi: "गौतम पल्ली पुलिस थाना", 
        phone: "9454403848", 
        dist: "2.5 km", 
        lat: lat - 0.006, 
        lon: lon - 0.004 
      },
      { 
        nameEn: "Indira Nagar Police Station", 
        nameHi: "इन्दिरा नगर पुलिस थाना", 
        phone: "9454403873", 
        dist: "3.1 km", 
        lat: lat + 0.012, 
        lon: lon - 0.010 
      }
    ];

    const mockHospitals = [
      { 
        nameEn: "KGMU Trauma Centre", 
        nameHi: "केजीएमयू ट्रॉमा सेंटर", 
        phone: "102", 
        dist: "0.7 km", 
        lat: lat - 0.002, 
        lon: lon + 0.004 
      },
      { 
        nameEn: "Dr. Ram Manohar Lohia Hospital", 
        nameHi: "डॉ. राम मनोहर लोहिया अस्पताल", 
        phone: "102", 
        dist: "1.5 km", 
        lat: lat + 0.006, 
        lon: lon - 0.007 
      },
      { 
        nameEn: "Sanjay Gandhi PGI (SGPGIMS)", 
        nameHi: "संजय गांधी पीजीआई (SGPGIMS)", 
        phone: "102", 
        dist: "2.3 km", 
        lat: lat - 0.009, 
        lon: lon - 0.008 
      },
      { 
        nameEn: "Civil Hospital Hazratganj", 
        nameHi: "सिविल अस्पताल हज़रतगंज", 
        phone: "102", 
        dist: "3.0 km", 
        lat: lat + 0.010, 
        lon: lon + 0.005 
      },
      { 
        nameEn: "Medanta Hospital Lucknow", 
        nameHi: "मेदांता अस्पताल लखनऊ", 
        phone: "102", 
        dist: "4.2 km", 
        lat: lat - 0.014, 
        lon: lon + 0.012 
      }
    ];

    setNearbyResources(resourceType === 'police' ? mockPolice : mockHospitals);
  }, [coordinates, resourceType]);

  const lat = parseFloat(coordinates.lat) || 26.8467;
  const lon = parseFloat(coordinates.lon) || 80.9462;

  return (
    <div className="flex flex-col bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 w-full font-body">
      
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200 dark:border-pink-500/10 bg-slate-50 dark:bg-[#160913]/60 p-2">
        <button
          onClick={() => setResourceType('police')}
          className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition-colors cursor-pointer ${
            resourceType === 'police' 
              ? 'bg-pink-600 text-white shadow-md' 
              : 'text-slate-500 dark:text-[#a89ec4] hover:bg-slate-200/50 dark:hover:bg-white/5'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>{t('emergency.policeDesk')}</span>
        </button>
        <button
          onClick={() => setResourceType('hospital')}
          className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition-colors cursor-pointer ${
            resourceType === 'hospital' 
              ? 'bg-pink-600 text-white shadow-md' 
              : 'text-slate-500 dark:text-[#a89ec4] hover:bg-slate-200/50 dark:hover:bg-white/5'
          }`}
        >
          <Activity className="h-4 w-4" />
          <span>{t('emergency.hospitals')}</span>
        </button>
      </div>

      {/* Map Rendering Container */}
      <div className="relative w-full h-80 bg-slate-100 dark:bg-[#160913]/20 flex items-center justify-center">
        {hasApiKey ? (
          // Actual Google Maps Embed iframe
          <iframe
            title="Google SafeMap Tracker"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${
              resourceType === 'police' ? 'police+stations' : 'hospitals'
            }+near+${lat},${lon}&zoom=14`}
          ></iframe>
        ) : (
          // Live OpenStreetMap integration (Free, no API key needed!)
          <div className="relative w-full h-full overflow-hidden">
            <iframe
              title="OpenStreetMap Tracker"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'hue-rotate(180deg) invert(85%)' }}
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.015}%2C${lat - 0.01}%2C${lon + 0.015}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`}
            ></iframe>
            {/* Small glass panel HUD overlay to show stats */}
            <div className="absolute bottom-3 left-3 right-3 bg-[#160913]/90 text-white border border-pink-500/20 px-3.5 py-2.5 rounded-xl text-[10px] flex items-center justify-between backdrop-blur-md shadow-lg pointer-events-none select-none">
              <div className="flex items-center gap-1.5 font-semibold text-pink-400">
                <Compass className="h-4.5 w-4.5 animate-spin duration-[8s]" />
                <span className="uppercase tracking-widest">Active Safety Map Scan</span>
              </div>
              <div className="font-mono text-slate-300">
                Lat: {lat.toFixed(4)} | Lon: {lon.toFixed(4)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resource Listings */}
      <div className="p-4 flex flex-col gap-3 max-h-60 overflow-y-auto custom-scroll bg-white dark:bg-[#23101e]">
        <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-pink-600 dark:text-pink-400">
          Closest Outlets Detected
        </h3>
        
        {nearbyResources.map((res, index) => {
          const resourceName = language === 'hi' ? res.nameHi : res.nameEn;
          return (
            <div key={index} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl hover:border-pink-500/30 transition-colors">
              <div className="flex gap-3 items-center">
                <div className={`p-2.5 rounded-lg ${
                  resourceType === 'police' 
                    ? 'bg-pink-500/10 text-pink-500' 
                    : 'bg-rose-500/10 text-rose-500'
                }`}>
                  {resourceType === 'police' ? <Shield className="h-4.5 w-4.5" /> : <Activity className="h-4.5 w-4.5" />}
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-white">
                    {resourceName}
                  </h4>
                  <div className="flex flex-wrap gap-x-2.5 gap-y-1 items-center text-[10px] text-slate-500 dark:text-[#a89ec4]">
                    <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{res.dist}</span>
                    <a 
                      href={`tel:${res.phone}`} 
                      className="flex items-center gap-0.5 text-slate-600 dark:text-slate-300 font-mono font-bold hover:text-emerald-500 transition-colors"
                    >
                      <Phone className="h-3 w-3 text-emerald-500" /> {res.phone}
                    </a>
                  </div>
                </div>
              </div>
              
              <a 
                href={`tel:${res.phone}`}
                className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer"
                title={`Call ${res.phone}`}
              >
                <Phone className="h-4.5 w-4.5" />
              </a>
            </div>
          );
        })}
      </div>

    </div>
  );
}
