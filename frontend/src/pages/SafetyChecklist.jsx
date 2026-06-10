import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Compass, Laptop, Home, CheckSquare, Square } from 'lucide-react';

export default function SafetyChecklist() {
  const { t, language } = useLanguage();
  const [checkedItems, setCheckedItems] = useState([]);

  const initialChecklist = {
    street: [
      { id: 's1', text: language === 'hi' ? 'प्रस्थान करने से पहले एक विश्वसनीय संपर्क के साथ अपना मार्ग/ETA साझा करें।' : 'Share your route/ETA with a contact before departing.' },
      { id: 's2', text: language === 'hi' ? 'हमेशा सिर उठाकर चलें, आत्मविश्वास से कदम मिलाएं।' : 'Always walk with head up, matching steps confidently.' },
      { id: 's3', text: language === 'hi' ? 'दोनों हेडफ़ोन पहनने से बचें; एक कान पूरी तरह से खुला रखें।' : 'Avoid wearing dual headphones; keep one ear fully open.' },
      { id: 's4', text: language === 'hi' ? 'अपने दैनिक मार्ग पर कम से कम दो सार्वजनिक सुरक्षित स्थानों की पहचान करें।' : 'Identify at least two public safe havens on your daily route.' }
    ],
    digital: [
      { id: 'd1', text: language === 'hi' ? 'अपने फोन पर आपातकालीन एसओएस शॉर्टकट कॉन्फ़िगर करें।' : 'Configure emergency SOS shortcuts on your physical phone.' },
      { id: 'd2', text: language === 'hi' ? 'विश्वसनीय परिवार के लिए लाइव लोकेशन शेयरिंग समन्वय स्थापित करें।' : 'Set up Location Sharing coordinates for trusted family.' },
      { id: 'd3', text: language === 'hi' ? 'अपने कॉल लॉग में आपातकालीन प्रेषण या पुलिस नंबर पिन करें।' : 'Pin emergency dispatch or police numbers to your call log.' },
      { id: 'd4', text: language === 'hi' ? 'इमरजेंसी बैकअप मैप्स को ऑफलाइन डाउनलोड करें।' : 'Install emergency backup browser applications or maps offline.' }
    ],
    home: [
      { id: 'h1', text: language === 'hi' ? 'बाहरी रोशनी को चालू और अच्छी तरह से प्रकाशित रखें।' : 'Keep outdoor lighting functional and well-illuminated.' },
      { id: 'h2', text: language === 'hi' ? 'मुख्य ताले की दोबारा जाँच करें और सूर्यास्त के समय खिड़कियाँ बंद रखें।' : 'Double check main locks and verify windows are latched at sunset.' },
      { id: 'h3', text: language === 'hi' ? 'जांचें कि मुख्य दरवाजा के लेंस या सुरक्षा कैमरे साफ हैं।' : 'Ensure peepholes or security cams are free of obstructions.' },
      { id: 'h4', text: language === 'hi' ? 'एक आत्मरक्षा टॉर्च या अलार्म उपकरण को हमेशा पास रखें।' : 'Keep a self-defense flashlight or deterrence sound tool accessible.' }
    ]
  };

  useEffect(() => {
    const savedChecked = JSON.parse(localStorage.getItem('aura_checklist_checked') || '[]');
    setCheckedItems(savedChecked);
  }, []);

  const toggleCheckItem = (itemId) => {
    let nextChecked = [...checkedItems];
    if (nextChecked.includes(itemId)) {
      nextChecked = nextChecked.filter(id => id !== itemId);
    } else {
      nextChecked.push(itemId);
    }
    setCheckedItems(nextChecked);
    localStorage.setItem('aura_checklist_checked', JSON.stringify(nextChecked));
  };

  const getProgressStats = () => {
    const total = initialChecklist.street.length + initialChecklist.digital.length + initialChecklist.home.length;
    const completed = checkedItems.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  const stats = getProgressStats();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10 font-body">
      
      {/* Page Header */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-heading font-extrabold text-3xl text-slate-800 dark:text-white uppercase tracking-wider flex items-center justify-center gap-2">
          <ShieldCheck className="h-8 w-8 text-pink-500" />
          <span>{language === 'hi' ? 'सुरक्षा तैयारी चेकलिस्ट' : 'Safety Preparation Checklist'}</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-[#a89ec4] max-w-md mx-auto leading-normal">
          {language === 'hi' 
            ? 'भौतिक, डिजिटल और घरेलू वातावरण में अपनी सुरक्षा को सुदृढ़ करने के लिए इन दिशानिर्देशों को पूरा करें।' 
            : 'Track and verify vital preps to secure your safety in physical, transit, and digital environments.'}
        </p>
      </div>

      {/* Progress Circle & Stats */}
      <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto w-full transition-all duration-300">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">
            {language === 'hi' ? 'आपकी तैयारी का स्तर' : 'Your Preparation Level'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-[#a89ec4]">
            {stats.completed} {language === 'hi' ? 'में से' : 'of'} {stats.total} {language === 'hi' ? 'पूर्ण' : 'items completed'}
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-pink-500/10 flex items-center justify-center">
            <span className="font-black text-xl text-pink-600 dark:text-pink-400 font-mono">{stats.percentage}%</span>
          </div>
          <svg className="absolute w-24 h-24 transform -rotate-90">
            <circle 
              cx="48" 
              cy="48" 
              r="44" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="transparent" 
              className="text-pink-500" 
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * stats.percentage) / 100}
            />
          </svg>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Category 1: Transit & Street */}
        <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
          <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
            <Compass className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            <span>{language === 'hi' ? 'मार्ग और पारगमन' : 'Street & Travel'}</span>
          </h3>

          <ul className="flex flex-col gap-3">
            {initialChecklist.street.map(item => (
              <li 
                key={item.id} 
                onClick={() => toggleCheckItem(item.id)}
                className={`p-3 bg-slate-50 dark:bg-[#160913]/30 border rounded-xl flex items-start gap-3 cursor-pointer hover:border-pink-500/30 transition-all duration-200 select-none ${
                  checkedItems.includes(item.id) 
                    ? 'border-pink-500/40 opacity-75' 
                    : 'border-slate-100 dark:border-white/5'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {checkedItems.includes(item.id) ? (
                    <CheckSquare className="h-4.5 w-4.5 text-pink-600 dark:text-pink-400" />
                  ) : (
                    <Square className="h-4.5 w-4.5 text-slate-400" />
                  )}
                </div>
                <span className={`text-xs leading-relaxed ${
                  checkedItems.includes(item.id) 
                    ? 'line-through text-slate-400' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Category 2: Digital Security */}
        <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
          <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
            <Laptop className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            <span>{language === 'hi' ? 'डिजिटल और फोन' : 'Digital & Phone'}</span>
          </h3>

          <ul className="flex flex-col gap-3">
            {initialChecklist.digital.map(item => (
              <li 
                key={item.id} 
                onClick={() => toggleCheckItem(item.id)}
                className={`p-3 bg-slate-50 dark:bg-[#160913]/30 border rounded-xl flex items-start gap-3 cursor-pointer hover:border-pink-500/30 transition-all duration-200 select-none ${
                  checkedItems.includes(item.id) 
                    ? 'border-pink-500/40 opacity-75' 
                    : 'border-slate-100 dark:border-white/5'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {checkedItems.includes(item.id) ? (
                    <CheckSquare className="h-4.5 w-4.5 text-pink-600 dark:text-pink-400" />
                  ) : (
                    <Square className="h-4.5 w-4.5 text-slate-400" />
                  )}
                </div>
                <span className={`text-xs leading-relaxed ${
                  checkedItems.includes(item.id) 
                    ? 'line-through text-slate-400' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Category 3: Home & Night Safety */}
        <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
          <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
            <Home className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            <span>{language === 'hi' ? 'घरेलू सुरक्षा' : 'Home & Night'}</span>
          </h3>

          <ul className="flex flex-col gap-3">
            {initialChecklist.home.map(item => (
              <li 
                key={item.id} 
                onClick={() => toggleCheckItem(item.id)}
                className={`p-3 bg-slate-50 dark:bg-[#160913]/30 border rounded-xl flex items-start gap-3 cursor-pointer hover:border-pink-500/30 transition-all duration-200 select-none ${
                  checkedItems.includes(item.id) 
                    ? 'border-pink-500/40 opacity-75' 
                    : 'border-slate-100 dark:border-white/5'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {checkedItems.includes(item.id) ? (
                    <CheckSquare className="h-4.5 w-4.5 text-pink-600 dark:text-pink-400" />
                  ) : (
                    <Square className="h-4.5 w-4.5 text-slate-400" />
                  )}
                </div>
                <span className={`text-xs leading-relaxed ${
                  checkedItems.includes(item.id) 
                    ? 'line-through text-slate-400' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
