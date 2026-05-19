import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'whyUs', href: '#why-us' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-0 flex justify-center pointer-events-none">
      <div className={`pointer-events-auto transition-all duration-500 ease-[0.22,1,0.36,1] w-full max-w-5xl rounded-[2rem] border ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)] py-3 px-8' 
          : 'bg-transparent border-transparent py-5 px-8'
      }`}>
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center group">
            <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-slate-950 via-slate-800 to-blue-600 bg-clip-text text-transparent tracking-tight group-hover:opacity-90 transition-opacity">
              Alliasoft
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <a 
                key={item.key} 
                href={item.href} 
                className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors tracking-wide relative group py-2"
              >
                {t(`nav.${item.key}`)}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-xs font-bold text-slate-700 transition-colors border border-black/[0.04]"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{i18n.language === 'en' ? 'EN' : 'ES'}</span>
            </button>
            
            <a 
              href="#contact" 
              className="group relative px-6 py-3 text-sm font-bold text-white bg-slate-900 rounded-full shadow-[0_4px_14px_rgba(15,23,42,0.15)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">{t('contact_btn.button')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </a>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={toggleLanguage} 
              className="p-2 rounded-full hover:bg-black/5 flex items-center justify-center"
            >
              <Globe className="w-5 h-5 text-slate-700" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-slate-900 hover:bg-black/5 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              transition={{ duration: 0.3, ease: 'easeInOut' }} 
              className="md:hidden overflow-hidden mt-4 pt-4 border-t border-black/5"
            >
              <div className="flex flex-col space-y-4 pb-4">
                {navItems.map(item => (
                  <a 
                    key={item.key} 
                    href={item.href} 
                    className="text-base font-bold text-slate-700 hover:text-blue-600 transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                ))}
                <a 
                  href="#contact" 
                  className="text-center text-base font-bold text-white bg-slate-900 rounded-full py-3 mt-2 block shadow-md" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.contact')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;