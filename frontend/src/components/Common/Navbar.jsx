import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  ShieldAlert, 
  Menu, 
  X, 
  Globe, 
  LogOut, 
  User, 
  Settings
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, logout, isMock } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  // Check if current user has admin status (mock or supabase)
  const isAdmin = currentUser && currentUser.email && currentUser.email.toLowerCase().includes('admin');

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 dark:bg-[#160913]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <ShieldAlert className="h-7 w-7 text-pink-500 animate-pulse" />
              <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                SafeHer
              </span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/emergency" className="flex items-center gap-1 text-sm font-bold text-red-500 hover:text-red-600 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              {t('nav.emergency')}
            </Link>
            <Link to="/tips" className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              {t('nav.tips')}
            </Link>
            <Link to="/checklist" className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              {t('nav.checklist')}
            </Link>
            <Link to="/fakecall" className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              {t('nav.fakecall')}
            </Link>
            <Link to="/report" className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              {t('nav.report')}
            </Link>
            <Link to="/helplines" className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              {t('nav.helplines')}
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              {t('nav.contact')}
            </Link>

            {isAdmin && (
              <Link to="/admin" className="text-sm font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1 hover:text-pink-700 transition-colors">
                <Settings className="h-4.5 w-4.5" />
                {t('nav.admin')}
              </Link>
            )}

            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium flex items-center gap-1 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  <User className="h-4 w-4" />
                  {t('nav.dashboard')}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-1 text-sm font-medium text-slate-500 dark:text-[#a89ec4] hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 rounded-md hover:from-pink-500 hover:to-rose-500 shadow-md hover:shadow-pink-500/20 transition-all duration-300"
              >
                {t('nav.login')}
              </Link>
            )}

            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-4">
              <button 
                onClick={toggleLanguage} 
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Change Language / भाषा बदलें"
              >
                <Globe className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                <span className="sr-only">Lang</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3">
            <button 
              onClick={toggleLanguage} 
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Globe className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden animate-fadeIn bg-white dark:bg-[#160913] border-b border-slate-200 dark:border-white/5">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/emergency" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-bold text-red-500 hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.emergency')}
            </Link>
            <Link 
              to="/tips" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.tips')}
            </Link>
            <Link 
              to="/checklist" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.checklist')}
            </Link>
            <Link 
              to="/fakecall" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.fakecall')}
            </Link>
            <Link 
              to="/report" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.report')}
            </Link>
            <Link 
              to="/helplines" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.helplines')}
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
            >
              {t('nav.contact')}
            </Link>

            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-pink-600 dark:text-pink-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                {t('nav.admin')}
              </Link>
            )}

            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  {t('nav.dashboard')}
                </Link>
                <button 
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="block mx-3 my-2 text-center py-2 text-base font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-600 rounded-md hover:from-pink-500 hover:to-rose-500"
              >
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
