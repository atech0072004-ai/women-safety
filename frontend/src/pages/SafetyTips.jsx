import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TipCard from '../components/Tips/TipCard';
import { BookOpen, ShieldAlert, Laptop, Compass } from 'lucide-react';

export default function SafetyTips() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const tipsList = language === 'hi' ? [
    // Physical Defense (शारीरिक रक्षा)
    {
      title: "संवेदनशील चेहरे के हिस्सों को निशाना बनाएं",
      desc: "निकट शारीरिक खतरों के दौरान, हमलावर को तुरंत बेअसर करने और भागने का समय पाने के लिए आंखों, नाक की हड्डी या गले को निशाना बनाकर हथेली या उंगलियों से प्रहार करें।",
      category: "physical"
    },
    {
      title: "आवाज का उपयोग एक निवारक के रूप में करें",
      desc: "चुप न रहें। भारी आवाज में चिल्लाएं 'पीछे हटो!' या 'बचाओ!'। हमलावर समर्पण पर निर्भर होते हैं; तेज़ आवाज़ उनका नियंत्रण तोड़ देती है।",
      category: "physical"
    },
    {
      title: "कमजोर अंगों पर काउंटर-स्ट्राइक",
      desc: "पैरों के बीच ऊपर की ओर तेजी से किया गया घुटने का प्रहार तुरंत असहनीय दर्द पैदा करता है, जिससे आपको सुरक्षित रूप से भागने का समय मिल जाता है।",
      category: "physical"
    },
    // Cyber Safety (साइबर सुरक्षा)
    {
      title: "एसओएस लॉक स्क्रीन जीपीएस सक्रिय करें",
      desc: "अपने पावर बटन को 5 बार दबाकर मूक लॉक स्क्रीन एसओएस सिग्नल सक्रिय करें। यह आपातकालीन नंबर डायल करता है और संपर्कों को लाइव लोकेशन भेजता है।",
      category: "cyber"
    },
    {
      title: "डिजिटल स्थान गोपनीयता सुरक्षित करें",
      desc: "सुनिश्चित करें कि सोशल मीडिया पोस्ट में लाइव स्थान टैग न हों। अपनी लाइव लोकेशन को सार्वजनिक प्रोफ़ाइल से छिपाएं और केवल विश्वसनीय लोगों तक सीमित रखें।",
      category: "cyber"
    },
    {
      title: "सुरक्षा खातों पर टू-फैक्टर ऑथेंटिकेशन",
      desc: "स्थान ट्रैकिंग अनुमतियों को सुरक्षित रखने और अनधिकृत पहुंच को रोकने के लिए अपने मुख्य संचार उपकरणों (व्हाट्सएप, ईमेल) पर 2FA सक्षम करें।",
      category: "cyber"
    },
    // Travel & Transit (यात्रा सुरक्षा)
    {
      title: "हेडफ़ोन के साथ भी सतर्क रहें",
      desc: "अंधेरी गलियों या सुनसान प्लेटफॉर्म से गुजरते समय एक कान हेडफ़ोन से मुक्त रखें। सुनने की सजगता आपको किसी के पास आने की आहट देती है।",
      category: "travel"
    },
    {
      title: "सुरक्षित स्थानों की पहचान करें",
      desc: "अपने दैनिक मार्ग में उजाले वाली दुकानों, 24 घंटे खुले पेट्रोल पंपों या पुलिस चौकियों की पहचान करके रखें ताकि पीछा किए जाने पर वहां शरण ली जा सके।",
      category: "travel"
    },
    {
      title: "कैब ड्राइवर के विवरण को सत्यापित करें",
      desc: "कैब में बैठने से पहले, पंजीकरण नंबर का मिलान करें, यह सुनिश्चित करें कि पीछे के दरवाजों का चाइल्ड लॉक बंद हो, और अपना यात्रा मार्ग लिंक दूसरों से साझा करें।",
      category: "travel"
    }
  ] : [
    // Physical Defense
    {
      title: "Target Vulnerable Facial Areas",
      desc: "In close-quarters physical threats, use palm strikes or fingers targeting eyes, nose bridge, or throat to incapacitate an assailant instantly and secure time to run.",
      category: "physical"
    },
    {
      title: "Use Your Voice as Deterrent",
      desc: "Do not remain silent. Shout 'BACK OFF!' or 'FIRE!' with a deep chest voice. assailing forces depend on submission; loud alerts break their control.",
      category: "physical"
    },
    {
      title: "Vulnerable Groin Counter-Strike",
      desc: "A rapid, vertical knee strike or instep kick directly upward between the legs forces immediate pain reflexes, giving you a safe escape window.",
      category: "physical"
    },
    // Cyber Safety
    {
      title: "Enable SOS Lock Screen Coordinates",
      desc: "Activate silent lock screen SOS signals by clicking your power button 5 times. It dials emergency dispatch and coordinates live tracking links to contacts.",
      category: "cyber"
    },
    {
      title: "Secure Digital Location Privacy",
      desc: "Verify that social media posts do not carry active location tags. Hide live tracking links from open profiles and limit viewing to verified circles.",
      category: "cyber"
    },
    {
      title: "Two-Factor Auth On Safety Accounts",
      desc: "Set up 2FA protection on primary communication tools (WhatsApp, Email) to safeguard tracking permissions and prevent credential takeover.",
      category: "cyber"
    },
    // Travel & Transit
    {
      title: "Active Headphone Awareness",
      desc: "Keep one ear free of headphone units when transiting dark streets or platforms. Auditory alert awareness detects approaching steps.",
      category: "travel"
    },
    {
      title: "Identify Safe Haven Stations",
      desc: "Memorize locations of bright storefronts, round-the-clock fuel desks, or police desks on your daily transit path to turn into if followed.",
      category: "travel"
    },
    {
      title: "Verify Cab Driver Credentials",
      desc: "Before stepping in a cab, match the registration plate to the app dashboard, ensure child lock switches on rear doors are disabled, and share the route link.",
      category: "travel"
    }
  ];

  const filteredTips = activeCategory === 'all' 
    ? tipsList 
    : tipsList.filter(tip => tip.category === activeCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
      
      {/* Page Header */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-heading font-extrabold text-3xl text-slate-800 dark:text-white uppercase tracking-wider">
          {t('tips.title')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-[#a89ec4] max-w-md mx-auto leading-normal">
          {t('tips.subtitle')}
        </p>
      </div>

      {/* Categories Toggle Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 bg-slate-100 dark:bg-[#23101e] p-2.5 rounded-2xl border border-slate-200/50 dark:border-white/5 w-max mx-auto max-w-full">
        <button
          onClick={() => setActiveCategory('all')}
          className={`py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-colors cursor-pointer ${
            activeCategory === 'all' 
              ? 'bg-pink-600 text-white shadow-md' 
              : 'text-slate-500 hover:bg-slate-200/50 dark:hover:bg-white/5'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>{t('tips.catAll')}</span>
        </button>
        
        <button
          onClick={() => setActiveCategory('physical')}
          className={`py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-colors cursor-pointer ${
            activeCategory === 'physical' 
              ? 'bg-pink-600 text-white shadow-md' 
              : 'text-slate-500 hover:bg-slate-200/50 dark:hover:bg-white/5'
          }`}
        >
          <ShieldAlert className="h-4 w-4" />
          <span>{t('tips.catPhysical')}</span>
        </button>

        <button
          onClick={() => setActiveCategory('cyber')}
          className={`py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-colors cursor-pointer ${
            activeCategory === 'cyber' 
              ? 'bg-pink-600 text-white shadow-md' 
              : 'text-slate-500 hover:bg-slate-200/50 dark:hover:bg-white/5'
          }`}
        >
          <Laptop className="h-4 w-4" />
          <span>{t('tips.catCyber')}</span>
        </button>

        <button
          onClick={() => setActiveCategory('travel')}
          className={`py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold text-xs transition-colors cursor-pointer ${
            activeCategory === 'travel' 
              ? 'bg-pink-600 text-white shadow-md' 
              : 'text-slate-500 hover:bg-slate-200/50 dark:hover:bg-white/5'
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>{t('tips.catTravel')}</span>
        </button>
      </div>

      {/* Tips Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip, index) => (
          <TipCard 
            key={index} 
            title={tip.title} 
            desc={tip.desc} 
            category={tip.category} 
          />
        ))}
      </div>

    </div>
  );
}
