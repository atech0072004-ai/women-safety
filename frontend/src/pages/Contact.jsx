import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, PhoneCall, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSent(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 flex flex-col gap-10 font-body">
      
      {/* Page Header */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-heading font-extrabold text-3xl text-slate-800 dark:text-white uppercase tracking-wider">
          {t('contact.title')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-[#a89ec4] max-w-md mx-auto leading-normal">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Contact details */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex items-start gap-4">
            <div className="p-3.5 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-xl flex-shrink-0">
              <Mail className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white mb-1">
                Email Dispatch desk
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
                Send feedback, suggestions, or technical queries.
              </p>
              <a href="mailto:support@safeher.org" className="text-sm font-extrabold text-pink-600 dark:text-pink-400 mt-2 block">
                support@safeher.org
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl flex items-start gap-4">
            <div className="p-3.5 bg-red-500/10 text-red-500 rounded-xl flex-shrink-0">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-white mb-1">
                Emergency Liaison Office
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#a89ec4] leading-relaxed">
                Connect with our team directly for partner associations.
              </p>
              <a href="tel:112" className="text-sm font-extrabold text-red-500 mt-2 block">
                112 dispatch
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-xl transition-all duration-300">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle className="h-12 w-12 text-emerald-500 animate-bounce" />
              <h3 className="font-heading font-extrabold text-sm text-emerald-500">Message Transmitted</h3>
              <p className="text-[10px] text-slate-400">Our safety operators will reply to your request soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('contact.labelName')}</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                  placeholder="e.g. your name"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('contact.labelEmail')}</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                  placeholder="e.g. email@domain.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('contact.labelMsg')}</label>
                <textarea 
                  rows="4"
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs p-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white leading-relaxed resize-none" 
                  placeholder="Insert query details here..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-pink-500/20"
              >
                <Send className="h-4 w-4" />
                <span>{t('contact.btnSend')}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
