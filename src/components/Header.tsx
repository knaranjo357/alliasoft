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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'pricing', href: '#pricing' },
    { key: 'whyUs', href: '#why-us' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Alliasoft
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <a 
                key={item.key}
                href={item.href} 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1 text-sm font-medium rounded-md transition-colors hover:bg-gray-100"
            >
              <img 
                src={i18n.language === 'en' 
                  ? "https://flagcdn.com/w40/us.png"
                  : "https://flagcdn.com/w40/es.png"
                }
                alt={i18n.language === 'en' ? "English" : "Español"}
                className="w-6 h-4 mr-2"
              />
              <span>{t('language')}</span>
            </button>
            
            <a
              href="#contact"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t('nav.contact')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md"
            >
              <img 
                src={i18n.language === 'en' 
                  ? "https://flagcdn.com/w40/us.png"
                  : "https://flagcdn.com/w40/es.png"
                }
                alt={i18n.language === 'en' ? "English" : "Español"}
                className="w-6 h-4"
              />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="py-2 px-4 space-y-1">
              {navItems.map(item => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block py-2 text-base font-medium text-gray-800 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <a
                href="#contact"
                className="block py-2 mt-2 text-center text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;