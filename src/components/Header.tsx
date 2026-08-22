import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onOpenQuote?: (serviceId?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlight
      const sections = ['home', 'demo', 'solutions', 'process', 'portfolio', 'roi', 'faq', 'contact'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobileMenu();
    };
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const navItems: Array<{ key: string; href: string; id: string; label?: string }> = [
    { key: 'demo', href: '#demo', id: 'demo' },
    { key: 'services', href: '#solutions', id: 'solutions' },
    { key: 'portfolio', href: '#portfolio', id: 'portfolio' },
    { key: 'process', href: '#process', id: 'process' },
    { key: 'roi', href: '#roi', id: 'roi' },
    { key: 'faq', href: '#faq', id: 'faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 md:px-0 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto transition-all duration-500 ease-[0.22,1,0.36,1] w-full max-w-6xl rounded-[2rem] border ${
          isScrolled
            ? 'bg-slate-950/85 backdrop-blur-xl border-slate-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-3 px-6 md:px-8'
            : 'bg-slate-950/50 backdrop-blur-md border-slate-800/40 py-4 px-6 md:px-8'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group" aria-label={t('accessibility.home')}>
            <img
              src="/images/logo.png"
              alt=""
              width="36"
              height="36"
              className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform"
            />
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
              Alliasoft <span className="text-blue-500 text-xs font-mono font-normal">AI</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-6" aria-label={t('accessibility.primaryNav')}>
            {navItems.map((item) => {
              const label = item.label || t(`nav.${item.key}`);
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-xs font-bold transition-all tracking-wide relative py-1.5 ${
                    isActive ? 'text-blue-400 font-extrabold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden xl:flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              aria-label={t('accessibility.changeLanguage')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors border border-slate-800"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{i18n.language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            {onOpenQuote && (
              <button
                onClick={() => onOpenQuote()}
                className="px-4 py-2 text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded-full transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {t('quoteModal.shortLabel')}
              </button>
            )}

            <a
              href="#contact"
              className="group relative px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all overflow-hidden flex items-center gap-1.5"
            >
              <span className="relative z-10">{t('contact_btn.button')}</span>
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={toggleLanguage}
              aria-label={t('accessibility.changeLanguage')}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>

            {onOpenQuote && (
              <button
                onClick={() => onOpenQuote()}
                aria-label={t('quoteModal.shortLabel')}
                className="p-2 rounded-full bg-slate-900 border border-slate-800 text-amber-400"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="p-2 text-white bg-slate-900 border border-slate-800 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              id="mobile-navigation"
              className="xl:hidden overflow-hidden mt-4 pt-4 border-t border-slate-800"
            >
              <nav className="flex flex-col space-y-3 pb-4" aria-label={t('accessibility.mobileNav')}>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="text-sm font-bold text-slate-300 hover:text-blue-400 transition-colors py-1"
                    onClick={closeMobileMenu}
                  >
                    {item.label || t(`nav.${item.key}`)}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="text-center text-xs font-bold text-white bg-blue-600 rounded-full py-3 mt-2 block shadow-md"
                  onClick={closeMobileMenu}
                >
                  {t('contact_btn.button')}
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
