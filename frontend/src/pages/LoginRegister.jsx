import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Mail, User, ShieldAlert } from 'lucide-react';

export default function LoginRegister() {
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Mode toggles: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState('login');

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        setSuccessMsg('Logged in successfully!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else if (mode === 'register') {
        await signup(email, password, displayName);
        setSuccessMsg('Registered and logged in successfully!');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccessMsg('Password reset instructions sent to your email.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  }

  // 2. Google OAuth trigger
  async function handleGoogleLogin() {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await loginWithGoogle();
      setSuccessMsg('Logged in with Google!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-16 flex flex-col gap-6 font-body">
      
      {/* Brand Header */}
      <div className="text-center flex flex-col gap-1 items-center">
        <div className="p-3 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-2xl w-max mb-2">
          <ShieldAlert className="h-8 w-8 animate-pulse" />
        </div>
        <h1 className="font-heading font-extrabold text-2xl tracking-wide bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
          SafeHer Platform
        </h1>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          {mode === 'login' ? t('auth.loginTitle') : mode === 'register' ? t('auth.registerTitle') : 'Reset Portal'}
        </p>
      </div>

      {/* Main card box */}
      <div className="bg-white dark:bg-[#23101e] border border-slate-200 dark:border-pink-500/10 p-6 rounded-2xl shadow-2xl transition-all duration-300">
        
        {/* Error notification banner */}
        {errorMsg && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] py-2 px-3 rounded-lg leading-relaxed font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Success notification banner */}
        {successMsg && (
          <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] py-2 px-3 rounded-lg leading-relaxed font-semibold">
            {successMsg}
          </div>
        )}

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {mode === 'register' && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('auth.name')}</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="text" 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                  placeholder="e.g. Aura User"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('auth.email')}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                placeholder="email@domain.com"
                required
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('auth.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-3.5 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-pink-500 text-slate-800 dark:text-white" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 mt-2 shadow-lg shadow-pink-500/20"
          >
            {loading ? 'Authenticating...' : mode === 'login' ? t('auth.btnSignIn') : mode === 'register' ? t('auth.btnSignUp') : t('auth.btnSendReset')}
          </button>
        </form>

        {/* Separator */}
        {mode !== 'forgot' && (
          <div className="flex flex-col gap-4 mt-6">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-100 dark:border-white/5 w-full"></div>
              <span className="absolute bg-white dark:bg-[#23101e] px-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">or</span>
            </div>

            {/* Google OAuth Login */}
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 bg-slate-50 dark:bg-[#160913]/50 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-[#a89ec4] hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-brands fa-google text-red-500"></i>
              <span>{t('auth.btnGoogle')}</span>
            </button>

            {/* Admin Login Shortcut */}
            {mode === 'login' && (
              <button 
                type="button"
                onClick={() => {
                  setEmail('admin@safeher.com');
                  setPassword('admin123');
                  setSuccessMsg('Simulated Admin account details loaded! Click Sign In to enter admin commands.');
                }}
                disabled={loading}
                className="w-full py-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-xs font-bold text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Quick Admin Simulator Login</span>
              </button>
            )}
          </div>
        )}

        {/* Footer toggles */}
        <div className="mt-6 flex flex-col gap-2.5 text-center text-xs text-slate-400 dark:text-[#a89ec4]/60 font-medium">
          {mode === 'login' ? (
            <>
              <button onClick={() => setMode('register')} className="hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer">{t('auth.toggleSignUp')}</button>
              <button onClick={() => setMode('forgot')} className="hover:text-pink-600 dark:hover:text-pink-400 mt-1 cursor-pointer">{t('auth.btnForgot')}</button>
            </>
          ) : mode === 'register' ? (
            <button onClick={() => setMode('login')} className="hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer">{t('auth.toggleSignIn')}</button>
          ) : (
            <button onClick={() => setMode('login')} className="hover:text-pink-600 dark:hover:text-pink-400 cursor-pointer">{t('auth.toggleSignIn')}</button>
          )}
        </div>

      </div>

    </div>
  );
}
