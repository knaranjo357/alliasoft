import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
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
      <div className={`pointer-events-auto transition-all duration-500 ease-[0.22,1,0.36,1] w-full max-w-5xl rounded-[2rem] border ${isScrolled ? 'bg-white/80 backdrop-blur-2xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] py-3 px-6' : 'bg-transparent border-transparent py-4 px-6'}`}>
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
              Alliasoft
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <a key={item.key} href={item.href} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors tracking-wide">
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleLanguage} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors">
              <img src={i18n.language === 'en' ? "https://flagcdn.com/w40/us.png" : "https://flagcdn.com/w40/es.png"} alt="Language" className="w-5 h-5 rounded-sm object-cover" />
            </button>
            
            <a href="#contact" className="px-6 py-3 text-sm font-bold text-white bg-slate-900 rounded-full shadow-[0_4px_14px_rgba(15,23,42,0.15)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.2)] hover:-translate-y-0.5 transition-all">
              {t('contact_btn.button')}
            </a>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-black/5">
              <img src={i18n.language === 'en' ? "https://flagcdn.com/w40/us.png" : "https://flagcdn.com/w40/es.png"} alt="Language" className="w-5 h-5 rounded-sm object-cover" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-900 hover:bg-black/5 rounded-full">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden mt-4 pt-4 border-t border-black/5">
              <div className="flex flex-col space-y-4 pb-4">
                {navItems.map(item => (
                  <a key={item.key} href={item.href} className="text-base font-bold text-slate-700 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {t(`nav.${item.key}`)}
                  </a>
                ))}
                <a href="#contact" className="text-center text-base font-bold text-white bg-slate-900 rounded-full py-3 mt-2" onClick={() => setIsMobileMenuOpen(false)}>
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