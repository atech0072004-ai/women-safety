import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SafeMap from '../components/Emergency/SafeMap';
import { Shield, Phone, Search, MapPin, Compass, AlertCircle, Heart } from 'lucide-react';

export default function PoliceHelplines() {
  const { t, language } = useLanguage();

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Coordinates for mapping (defaults to Lucknow center if GPS not active)
  const [coordinates, setCoordinates] = useState({ lat: 26.8467, lon: 80.9462 });
  const [loadingGPS, setLoadingGPS] = useState(false);

  // List of major National/State Women Helplines (India)
  const officialHelplines = [
    { name: language === 'hi' ? "पुलिस आपातकालीन सहायता" : "Police Emergency", number: "112", description: language === 'hi' ? "24/7 सामान्य आपातकालीन सेवा" : "24/7 general emergency dispatch services" },
    { name: language === 'hi' ? "महिला पावर लाइन (उत्तर प्रदेश)" : "Women Power Line (U.P.)", number: "1090", description: language === 'hi' ? "महिलाओं के खिलाफ उत्पीड़न और सुरक्षा के लिए 24/7 हेल्पलाइन" : "24/7 dedicated helpline for women safety and harassment protection" },
    { name: language === 'hi' ? "घरेलू हिंसा सेल" : "Domestic Abuse Helpline", number: "181", description: language === 'hi' ? "पीड़ितों को कानूनी और परामर्श सहायता" : "Providing counseling & legal aid for victims" },
    { name: language === 'hi' ? "साइबर सेल रिपोर्टिंग" : "Cyber Crime Reporting", number: "1930", description: language === 'hi' ? "वित्तीय धोखाधड़ी और ऑनलाइन ब्लैकमेल उत्पीड़न" : "Online financial fraud & cyber blackmail support" },
    { name: language === 'hi' ? "छात्र सुरक्षा डेस्क" : "Student Safety Desk", number: "1096", description: language === 'hi' ? "शैक्षणिक संस्थानों में सुरक्षा और रैगिंग विरोधी हेल्पलाइन" : "Anti-ragging and safety helpline inside campuses" }
  ];

  // Directory of Major Police Stations across Uttar Pradesh (U.P.)
  const allPoliceStations = [
    { 
      nameEn: "Hazratganj Kotwali Police Station", 
      nameHi: "हज़रतगंज कोतवाली पुलिस थाना", 
      areaEn: "Hazratganj", 
      areaHi: "हज़रतगंज", 
      districtEn: "Lucknow, U.P.", 
      districtHi: "लखनऊ, उत्तर प्रदेश", 
      phone: "9454403854", 
      distance: "0.4 km", 
      rating: "4.8", 
      ratingCount: 142,
      lat: 26.8467,
      lon: 80.9462
    },
    { 
      nameEn: "Gomti Nagar Police Station", 
      nameHi: "गोमती नगर पुलिस थाना", 
      areaEn: "Vibhuti Khand", 
      areaHi: "विभूति खंड", 
      districtEn: "Lucknow, U.P.", 
      districtHi: "लखनऊ, उत्तर प्रदेश", 
      phone: "9454403849", 
      distance: "1.1 km", 
      rating: "4.6", 
      ratingCount: 390,
      lat: 26.8510,
      lon: 80.9984
    },
    { 
      nameEn: "Aliganj Kotwali Police Station", 
      nameHi: "अलीगंज कोतवाली पुलिस थाना", 
      areaEn: "Sector H", 
      areaHi: "सेक्टर एच", 
      districtEn: "Lucknow, U.P.", 
      districtHi: "लखनऊ, उत्तर प्रदेश", 
      phone: "9454403839", 
      distance: "1.8 km", 
      rating: "4.7", 
      ratingCount: 88,
      lat: 26.8900,
      lon: 80.9380
    },
    { 
      nameEn: "Indira Nagar Police Station", 
      nameHi: "इन्दिरा नगर पुलिस थाना", 
      areaEn: "Sector 14", 
      areaHi: "सेक्टर 14", 
      districtEn: "Lucknow, U.P.", 
      districtHi: "लखनऊ, उत्तर प्रदेश", 
      phone: "9454403873", 
      distance: "2.1 km", 
      rating: "4.5", 
      ratingCount: 215,
      lat: 26.8833,
      lon: 80.9833
    },
    { 
      nameEn: "Gautam Palli Police Station", 
      nameHi: "गौतम पल्ली पुलिस थाना", 
      areaEn: "Vikramaditya Marg", 
      areaHi: "विक्रमादित्य मार्ग", 
      districtEn: "Lucknow, U.P.", 
      districtHi: "लखनऊ, उत्तर प्रदेश", 
      phone: "9454403848", 
      distance: "2.5 km", 
      rating: "4.9", 
      ratingCount: 104,
      lat: 26.8390,
      lon: 80.9570
    },
    { 
      nameEn: "Mahanagar Police Station", 
      nameHi: "महानगर पुलिस थाना", 
      areaEn: "Mahanagar", 
      areaHi: "महानगर", 
      districtEn: "Lucknow, U.P.", 
      districtHi: "लखनऊ, उत्तर प्रदेश", 
      phone: "9454403859", 
      distance: "3.0 km", 
      rating: "4.6", 
      ratingCount: 312,
      lat: 26.8720,
      lon: 80.9530
    },
    { 
      nameEn: "Aashiana Police Station", 
      nameHi: "आशियाना पुलिस थाना", 
      areaEn: "Aashiana", 
      areaHi: "आशियाना", 
      districtEn: "Lucknow, U.P.", 
      districtHi: "लखनऊ, उत्तर प्रदेश", 
      phone: "9454403841", 
      distance: "3.8 km", 
      rating: "4.7", 
      ratingCount: 190,
      lat: 26.7900,
      lon: 80.9200
    },
    { 
      nameEn: "Chowk Kotwali", 
      nameHi: "चौक कोतवाली", 
      areaEn: "Chowk Area", 
      areaHi: "चौक क्षेत्र", 
      districtEn: "Lucknow, U.P.", 
      districtHi: "लखनऊ, उत्तर प्रदेश", 
      phone: "9454403845", 
      distance: "4.2 km", 
      rating: "4.4", 
      ratingCount: 175,
      lat: 26.8650,
      lon: 80.9080
    },
    { 
      nameEn: "Sector 20 Police Station", 
      nameHi: "सेक्टर 20 पुलिस थाना", 
      areaEn: "Sector 20", 
      areaHi: "सेक्टर 20", 
      districtEn: "Noida, U.P.", 
      districtHi: "नोएडा, उत्तर प्रदेश", 
      phone: "8595902530", 
      distance: "0.5 km", 
      rating: "4.5", 
      ratingCount: 280,
      lat: 28.5830,
      lon: 77.3230
    },
    { 
      nameEn: "Sector 39 Police Station", 
      nameHi: "सेक्टर 39 पुलिस थाना", 
      areaEn: "Sector 39", 
      areaHi: "सेक्टर 39", 
      districtEn: "Noida, U.P.", 
      districtHi: "नोएडा, उत्तर प्रदेश", 
      phone: "8595902532", 
      distance: "1.2 km", 
      rating: "4.4", 
      ratingCount: 155,
      lat: 28.5680,
      lon: 77.3620
    },
    { 
      nameEn: "Surajpur Police Station", 
      nameHi: "सूरजपुर पुलिस थाना", 
      areaEn: "Surajpur", 
      areaHi: "सूरजपुर", 
      districtEn: "Greater Noida, U.P.", 
      districtHi: "ग्रेटर नोएडा, उत्तर प्रदेश", 
      phone: "8595902540", 
      distance: "2.4 km", 
      rating: "4.3", 
      ratingCount: 94,
      lat: 28.5200,
      lon: 77.4900
    },
    { 
      nameEn: "Sihani Gate Police Station", 
      nameHi: "सिहानी गेट पुलिस थाना", 
      areaEn: "Sihani Gate", 
      areaHi: "सिहानी गेट", 
      districtEn: "Ghaziabad, U.P.", 
      districtHi: "गाजियाबाद, उत्तर प्रदेश", 
      phone: "9643322919", 
      distance: "0.8 km", 
      rating: "4.5", 
      ratingCount: 210,
      lat: 28.6750,
      lon: 77.4320
    },
    { 
      nameEn: "Kavi Nagar Police Station", 
      nameHi: "कवि नगर पुलिस थाना", 
      areaEn: "Kavi Nagar", 
      areaHi: "कवि नगर", 
      districtEn: "Ghaziabad, U.P.", 
      districtHi: "गाजियाबाद, उत्तर प्रदेश", 
      phone: "9643322920", 
      distance: "1.5 km", 
      rating: "4.6", 
      ratingCount: 165,
      lat: 28.6700,
      lon: 77.4520
    },
    { 
      nameEn: "Kalyanpur Police Station", 
      nameHi: "कल्याणपुर पुलिस थाना", 
      areaEn: "Kalyanpur", 
      areaHi: "कल्याणपुर", 
      districtEn: "Kanpur, U.P.", 
      districtHi: "कानपुर, उत्तर प्रदेश", 
      phone: "9454403732", 
      distance: "1.0 km", 
      rating: "4.4", 
      ratingCount: 220,
      lat: 26.5050,
      lon: 80.2650
    },
    { 
      nameEn: "Swaroop Nagar Police Station", 
      nameHi: "स्वरूप नगर पुलिस थाना", 
      areaEn: "Swaroop Nagar", 
      areaHi: "स्वरूप नगर", 
      districtEn: "Kanpur, U.P.", 
      districtHi: "कानपुर, उत्तर प्रदेश", 
      phone: "9454401460", 
      distance: "1.6 km", 
      rating: "4.7", 
      ratingCount: 140,
      lat: 26.4760,
      lon: 80.3160
    },
    { 
      nameEn: "Tajganj Police Station", 
      nameHi: "ताजगंज पुलिस थाना", 
      areaEn: "Tajganj", 
      areaHi: "ताजगंज", 
      districtEn: "Agra, U.P.", 
      districtHi: "आगरा, उत्तर प्रदेश", 
      phone: "9454402763", 
      distance: "0.9 km", 
      rating: "4.8", 
      ratingCount: 310,
      lat: 27.1640,
      lon: 78.0420
    },
    { 
      nameEn: "Hari Parvat Police Station", 
      nameHi: "हरि पर्वत पुलिस थाना", 
      areaEn: "Hari Parvat", 
      areaHi: "हरि पर्वत", 
      districtEn: "Agra, U.P.", 
      districtHi: "आगरा, उत्तर प्रदेश", 
      phone: "9454402735", 
      distance: "2.0 km", 
      rating: "4.5", 
      ratingCount: 185,
      lat: 27.1950,
      lon: 78.0080
    },
    { 
      nameEn: "Cantt Police Station", 
      nameHi: "कैंट पुलिस थाना", 
      areaEn: "Cantt Area", 
      areaHi: "कैंट क्षेत्र", 
      districtEn: "Varanasi, U.P.", 
      districtHi: "वाराणसी, उत्तर प्रदेश", 
      phone: "9454404391", 
      distance: "1.3 km", 
      rating: "4.6", 
      ratingCount: 245,
      lat: 25.3280,
      lon: 82.9730
    },
    { 
      nameEn: "Bhelupur Police Station", 
      nameHi: "भेलूपुर पुलिस थाना", 
      areaEn: "Bhelupur", 
      areaHi: "भेलूपुर", 
      districtEn: "Varanasi, U.P.", 
      districtHi: "वाराणसी, उत्तर प्रदेश", 
      phone: "9454404378", 
      distance: "1.9 km", 
      rating: "4.5", 
      ratingCount: 195,
      lat: 25.2970,
      lon: 83.0010
    },
    { 
      nameEn: "Civil Lines Police Station", 
      nameHi: "सिविल लाइन्स पुलिस थाना", 
      areaEn: "Civil Lines", 
      areaHi: "सिविल लाइन्स", 
      districtEn: "Prayagraj, U.P.", 
      districtHi: "प्रयागराज, उत्तर प्रदेश", 
      phone: "7839867088", 
      distance: "0.7 km", 
      rating: "4.7", 
      ratingCount: 290,
      lat: 25.4540,
      lon: 81.8330
    },
    { 
      nameEn: "Dhoomanganj Police Station", 
      nameHi: "धूमनगंज पुलिस थाना", 
      areaEn: "Dhoomanganj", 
      areaHi: "धूमनगंज", 
      districtEn: "Prayagraj, U.P.", 
      districtHi: "प्रयागराज, उत्तर प्रदेश", 
      phone: "9454402824", 
      distance: "2.3 km", 
      rating: "4.4", 
      ratingCount: 180,
      lat: 25.4420,
      lon: 81.7920
    },
    { 
      nameEn: "Civil Lines Police Station (Meerut)", 
      nameHi: "सिविल लाइन्स पुलिस थाना (मेरठ)", 
      areaEn: "Civil Lines", 
      areaHi: "सिविल लाइन्स", 
      districtEn: "Meerut, U.P.", 
      districtHi: "मेरठ, उत्तर प्रदेश", 
      phone: "9454403973", 
      distance: "1.1 km", 
      rating: "4.5", 
      ratingCount: 115,
      lat: 29.0020,
      lon: 77.7120
    },
    { 
      nameEn: "Kotwali Police Station (Gorakhpur)", 
      nameHi: "कोतवाली पुलिस थाना (गोरखपुर)", 
      areaEn: "Kotwali", 
      areaHi: "कोतवाली", 
      districtEn: "Gorakhpur, U.P.", 
      districtHi: "गोरखपुर, उत्तर प्रदेश", 
      phone: "9454403501", 
      distance: "1.5 km", 
      rating: "4.4", 
      ratingCount: 130,
      lat: 26.7600,
      lon: 83.3700
    },
    { 
      nameEn: "Kotwali Police Station (Bareilly)", 
      nameHi: "कोतवाली पुलिस थाना (बरेली)", 
      areaEn: "Kotwali", 
      areaHi: "कोतवाली", 
      districtEn: "Bareilly, U.P.", 
      districtHi: "बरेली, उत्तर प्रदेश", 
      phone: "9454403115", 
      distance: "0.6 km", 
      rating: "4.6", 
      ratingCount: 150,
      lat: 28.3450,
      lon: 79.4180
    },
    { 
      nameEn: "Nawabad Police Station", 
      nameHi: "नवाबाद पुलिस थाना", 
      areaEn: "Nawabad", 
      areaHi: "नवाबाद", 
      districtEn: "Jhansi, U.P.", 
      districtHi: "झांसी, उत्तर प्रदेश", 
      phone: "9454403615", 
      distance: "1.2 km", 
      rating: "4.5", 
      ratingCount: 98,
      lat: 25.4480,
      lon: 78.5680
    },
    { 
      nameEn: "Civil Lines Police Station (Aligarh)", 
      nameHi: "सिविल लाइन्स पुलिस थाना (अलीगढ़)", 
      areaEn: "Civil Lines", 
      areaHi: "सिविल लाइन्स", 
      districtEn: "Aligarh, U.P.", 
      districtHi: "अलीगढ़, उत्तर प्रदेश", 
      phone: "9454402928", 
      distance: "1.4 km", 
      rating: "4.6", 
      ratingCount: 112,
      lat: 27.9010,
      lon: 78.0820
    },
    { 
      nameEn: "Ayodhya Kotwali Police Station", 
      nameHi: "अयोध्या कोतवाली पुलिस थाना", 
      areaEn: "Ayodhya Kotwali", 
      areaHi: "अयोध्या कोतवाली", 
      districtEn: "Ayodhya, U.P.", 
      districtHi: "अयोध्या, उत्तर प्रदेश", 
      phone: "9454403201", 
      distance: "0.8 km", 
      rating: "4.7", 
      ratingCount: 205,
      lat: 26.7980,
      lon: 82.1980
    },
    { 
      nameEn: "Vrindavan Police Station", 
      nameHi: "वृंदावन पुलिस थाना", 
      areaEn: "Vrindavan", 
      areaHi: "वृंदावन", 
      districtEn: "Mathura, U.P.", 
      districtHi: "मथुरा, उत्तर प्रदेश", 
      phone: "9454403980", 
      distance: "1.5 km", 
      rating: "4.8", 
      ratingCount: 175,
      lat: 27.5650,
      lon: 77.7000
    }
  ];

  const [filteredStations, setFilteredStations] = useState(allPoliceStations);

  // Search filter effect (query both English and Hindi fields)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStations(allPoliceStations);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = allPoliceStations.filter(
      station => 
        station.nameEn.toLowerCase().includes(query) || 
        station.nameHi.toLowerCase().includes(query) || 
        station.areaEn.toLowerCase().includes(query) || 
        station.areaHi.toLowerCase().includes(query) || 
        station.districtEn.toLowerCase().includes(query) ||
        station.districtHi.toLowerCase().includes(query)
    );
    setFilteredStations(filtered);
  }, [searchQuery]);

  // GPS Coordinate retrieval for map sync
  const getGPSCoordinates = () => {
    setLoadingGPS(true);
    if (!navigator.geolocation) {
      alert(t('alerts.geoNotSupported'));
      setLoadingGPS(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordinates({
          lat: pos.coords.latitude.toFixed(6),
          lon: pos.coords.longitude.toFixed(6)
        });
        setLoadingGPS(false);
      },
      (err) => {
        console.error("GPS access failed", err);
        setLoadingGPS(false);
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  };

  useEffect(() => {
    getGPSCoordinates();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8 font-body">
      
      {/* Page Header */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-heading font-extrabold text-3xl text-slate-800 dark:text-white uppercase tracking-wider flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-pink-500 animate-pulse" />
          <span>{t('helplines.title') || "Police & Helpline Directory"}</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-[#a89ec4] max-w-md mx-auto">
          {t('helplines.subtitle') || "Immediate contact access to national emergency lines and search tools to track nearby safety outposts."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Essential Helplines Grid */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl">
            <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-4 pb-2 border-b border-slate-100 dark:border-pink-500/10 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>National Safety Helpline</span>
            </h3>

            <div className="flex flex-col gap-4">
              {officialHelplines.map((hl, index) => (
                <div key={index} className="p-3 bg-pink-50/40 dark:bg-pink-500/5 border border-pink-100/50 dark:border-pink-500/10 rounded-xl flex items-center justify-between hover:scale-[1.01] transition-transform duration-200">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-white">{hl.name}</h4>
                    <p className="text-[10px] text-slate-400 dark:text-[#a89ec4]/60 leading-normal mt-0.5">{hl.description}</p>
                    <span className="inline-block mt-2 text-sm font-black text-pink-600 dark:text-pink-400 font-mono">Dial: {hl.number}</span>
                  </div>
                  
                  <a
                    href={`tel:${hl.number}`}
                    className="p-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors flex items-center justify-center cursor-pointer shadow-md shadow-pink-500/10"
                    title={t('helplines.dialBtn') || "Initiate Call"}
                  >
                    <Phone className="h-4.5 w-4.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right: Search, Station Listings & Interactive Map */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Active Local Directory Search */}
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl">
            
            {/* Search Input Box */}
            <div className="relative mb-6">
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('helplines.searchPlaceholder') || "Search by region (e.g. Hazratganj, Gomti Nagar)..."}
                className="w-full text-xs pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-pink-500/15 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto custom-scroll pr-1">
              {filteredStations.length === 0 ? (
                <div className="md:col-span-2 py-8 text-center text-xs text-slate-400 flex flex-col items-center gap-1.5">
                  <AlertCircle className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                  <span>No security outlets match your query. Try a different area.</span>
                </div>
              ) : (
                filteredStations.map((station, index) => {
                  const sName = language === 'hi' ? station.nameHi : station.nameEn;
                  const sArea = language === 'hi' ? station.areaHi : station.areaEn;
                  const sDist = language === 'hi' ? station.districtHi : station.districtEn;

                  return (
                    <div key={index} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex justify-between items-center group hover:border-pink-500/35 transition-colors duration-200">
                      <div>
                        <h4 className="font-heading font-bold text-xs text-slate-800 dark:text-white">
                          {sName}
                        </h4>
                        <p className="text-[10px] text-pink-500 font-semibold">{sArea}, {sDist}</p>
                        
                        <div className="flex flex-wrap gap-x-3 gap-y-1.5 items-center text-[10px] text-slate-400 mt-2">
                          <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3 text-pink-500" />{station.distance}</span>
                          <span className="flex items-center gap-0.5"><Heart className="h-3 w-3 text-red-500 fill-red-500" />{station.rating} ({station.ratingCount} reviews)</span>
                          <a 
                            href={`tel:${station.phone}`} 
                            className="flex items-center gap-0.5 text-slate-600 dark:text-slate-300 font-mono font-bold hover:text-emerald-500 transition-colors"
                          >
                            <Phone className="h-3 w-3 text-emerald-500" /> CUG: {station.phone}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setCoordinates({ lat: station.lat, lon: station.lon })}
                          className="p-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors cursor-pointer"
                          title={t('helplines.viewMapBtn') || "Locate on Safety Map"}
                        >
                          <MapPin className="h-4.5 w-4.5" />
                        </button>
                        <a
                          href={`tel:${station.phone}`}
                          className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors cursor-pointer"
                          title={t('helplines.dialBtn') || "Call Station"}
                        >
                          <Phone className="h-4.5 w-4.5" />
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Interactive Geolocation Radar Map */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-2">
              <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Visual Area Scan Grid
              </h4>
              <button
                onClick={getGPSCoordinates}
                disabled={loadingGPS}
                className="text-[10px] font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Compass className={`h-3 w-3 ${loadingGPS ? 'animate-spin' : ''}`} />
                <span>{loadingGPS ? "Updating Location..." : "Sync Live GPS Coordinates"}</span>
              </button>
            </div>
            
            <SafeMap coordinates={coordinates} />
          </div>

        </div>

      </div>

    </div>
  );
}
