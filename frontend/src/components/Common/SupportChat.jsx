import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MessageCircle, X, Send, ShieldCheck, User } from 'lucide-react';

export default function SupportChat() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Initial welcome message based on language
  useEffect(() => {
    const defaultWelcome = language === 'hi'
      ? "नमस्ते! मैं आपकी SafeHer शील्ड सहायक हूँ। आज मैं आपकी सुरक्षा में कैसे मदद कर सकती हूँ?"
      : "Hello! I am your SafeHer Shield assistant. How can I help you be prepared and secure today?";
    
    setMessages([
      { id: 'welcome', text: defaultWelcome, isBot: true, timestamp: new Date() }
    ]);
  }, [language]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Quick reply options in English and Hindi
  const quickReplies = language === 'hi' 
    ? [
        { label: "एसओएस (SOS) कैसे शुरू करें?", val: "sos" },
        { label: "शिकायत कहां दर्ज करें?", val: "complaint" },
        { label: "यदि कोई पीछा करे तो क्या करें?", val: "followed" },
        { label: "राष्ट्रीय हेल्पलाइन नंबर", val: "helpline" }
      ]
    : [
        { label: "How to trigger SOS?", val: "sos" },
        { label: "Where to file a complaint?", val: "complaint" },
        { label: "What to do if followed?", val: "followed" },
        { label: "National helpline numbers", val: "helpline" }
      ];

  const getBotResponse = (val, textInput = '') => {
    const text = (val || textInput).toLowerCase();
    
    if (language === 'hi') {
      if (text.includes('sos') || text.includes('siren') || text.includes('अलार्म') || text.includes('एसओएस')) {
        return "एसओएस अलार्म चालू करने के लिए, 'आपातकालीन (Emergency)' पृष्ठ पर जाएं और बड़े लाल बटन को दबाएं। यह सायरन बजाएगा और आपके अभिभावकों को आपकी लाइव लोकेशन भेज देगा।";
      }
      if (text.includes('complaint') || text.includes('report') || text.includes('शिकायत') || text.includes('दर्ज')) {
        return "आप 'घटना रिपोर्ट (Report Incident)' पृष्ठ पर जाकर उत्पीड़न या असुरक्षित क्षेत्र की रिपोर्ट दर्ज कर सकते हैं। आप चाहें तो गुमनाम (anonymous) रहकर भी सबूत अपलोड कर सकते हैं।";
      }
      if (text.includes('followed') || text.includes('stalk') || text.includes('पीछा') || text.includes('असुरक्षित')) {
        return "यदि कोई आपका पीछा कर रहा है, तो भीड़भाड़ वाली जगह पर जाएं। कमान केंद्र (Dashboard) से तुरंत किसी विश्वसनीय संपर्क को फोन करें, या 'पुलिस और हेल्पलाइन' पेज से 112 डायल करें।";
      }
      if (text.includes('helpline') || text.includes('number') || text.includes('नंबर') || text.includes('पुलिस')) {
        return "मुख्य राष्ट्रीय नंबर: पुलिस (112), महिला पावर लाइन (1090), घरेलू हिंसा हेल्पलाइन (181), साइबर अपराध (1930)। अधिक जानकारी के लिए 'पुलिस और हेल्पलाइन' पृष्ठ देखें।";
      }
      return "मैं आपकी मदद के लिए यहाँ हूँ। आप एसओएस बटन दबा सकते हैं, विश्वसनीय संपर्क जोड़ सकते हैं, या हेल्पलाइन डायरेक्टरी देख सकते हैं। मुझे बताएं कि आप क्या जानना चाहते हैं।";
    } else {
      if (text.includes('sos') || text.includes('siren') || text.includes('alarm')) {
        return "To trigger the emergency SOS, go to the Emergency screen and click the large pulsating button. It will sound a high-decibel siren and instantly broadcast your coordinates to your trusted contacts.";
      }
      if (text.includes('complaint') || text.includes('report') || text.includes('harass') || text.includes('unsafe')) {
        return "You can file complaints securely at the 'Report Incident' page. You can attach image evidence and submit anonymously if you want to protect your identity.";
      }
      if (text.includes('followed') || text.includes('stalk') || text.includes('follow') || text.includes('chase')) {
        return "If someone is following you, remain in a well-lit public area. Navigate to the Emergency screen to locate nearest police checkpoints or call a trusted contact from your Dashboard circles immediately.";
      }
      if (text.includes('helpline') || text.includes('number') || text.includes('police') || text.includes('phone')) {
        return "You can call Police (112), Women Power Line (1090), Domestic Violence (181), or Cyber Cell (1930) directly. Visit the 'Police & Helplines' page for the full local safety station directory.";
      }
      return "I'm here to help. You can trigger the SOS alarm, add trusted guardians in your Dashboard, view safety tips, or contact local authorities via the Helplines page. What else can I assist with?";
    }
  };

  const handleSend = (textVal, isQuick = false) => {
    if (!textVal.trim()) return;

    // Add user message
    const userMsg = { id: 'u-' + Date.now(), text: textVal, isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate bot typing response
    setTimeout(() => {
      const responseText = getBotResponse(isQuick ? isQuick : null, textVal);
      const botMsg = { id: 'b-' + Date.now(), text: responseText, isBot: true, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body">
      
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer animate-bounce border-2 border-white/20"
          title="SafeHer Assist Desk"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[460px] bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-3 flex items-center justify-between text-white border-b border-pink-500/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-pink-200 animate-pulse" />
              <div>
                <h4 className="font-heading font-extrabold text-xs tracking-wider uppercase">SafeHer Guard Desk</h4>
                <p className="text-[9px] text-pink-100 uppercase tracking-widest font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  AI Advisor Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-pink-200 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto custom-scroll flex flex-col gap-3 bg-slate-50/50 dark:bg-[#160913]/30">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex gap-2.5 max-w-[85%] ${msg.isBot ? 'self-start' : 'self-end flex-row-reverse'}`}
              >
                {/* Avatar Icon */}
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-white ${
                  msg.isBot ? 'bg-pink-600' : 'bg-slate-500'
                }`}>
                  {msg.isBot ? <ShieldCheck className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
                </div>

                {/* Message Bubble */}
                <div className={`p-3 rounded-2xl text-xs leading-normal shadow-sm ${
                  msg.isBot 
                    ? 'bg-white dark:bg-[#2c1527] text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-white/5' 
                    : 'bg-pink-600 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Tray */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-1.5 bg-white dark:bg-[#23101e]">
            {quickReplies.map((qr, index) => (
              <button
                key={index}
                onClick={() => handleSend(qr.label, qr.val)}
                className="text-[10px] px-2.5 py-1 bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-200/50 dark:border-pink-500/25 rounded-full hover:bg-pink-100 dark:hover:bg-pink-500/20 transition-colors cursor-pointer text-left font-medium"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-100 dark:border-white/5 flex gap-2 bg-white dark:bg-[#23101e]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder={t('chat.placeholder') || "Ask about SOS features..."}
              className="flex-grow text-xs px-3.5 py-2 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
