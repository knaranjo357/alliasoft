import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/573176964215?text=Hola%20Alliasoft%2C%20quiero%20contarles%20un%20reto%20de%20mi%20empresa.';

const LeanHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  const isEnglish = i18n.resolvedLanguage === 'en';

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
      const sections = ['ecosystem', 'solutions', 'portfolio', 'process', 'faq'];
      setActiveSection(sections.filter(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) < 180).pop() || '');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsMobileMenuOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('alliasoft-theme', next); } catch { /* Theme remains usable when storage is disabled. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#080c12' : '#f4f5ef');
  };
  const themeLabel = theme === 'dark' ? (isEnglish ? 'Light mode' : 'Modo claro') : (isEnglish ? 'Dark mode' : 'Modo oscuro');
  const navItems = [
    { id: 'ecosystem', label: isEnglish ? 'Ecosystem' : 'Ecosistema' },
    { id: 'solutions', label: t('nav.services') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'process', label: t('nav.process') },
    { id: 'faq', label: t('nav.faq') },
  ];

  return (
    <header className={`studio-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="studio-container studio-header-inner">
        <a href="#home" className="studio-brand" aria-label={t('accessibility.home')}>
          <img src="/images/logo.png" alt="" width="36" height="36" decoding="async" />
          <span>alliasoft<span className="studio-brand-dot">.</span></span>
        </a>
        <nav className="studio-desktop-nav" aria-label={t('accessibility.primaryNav')}>
          {navItems.map(item => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined}>{item.label}</a>)}
        </nav>
        <div className="studio-header-tools">
          <button type="button" className="studio-icon-button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>{theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}</button>
          <button type="button" className="studio-language" onClick={() => i18n.changeLanguage(isEnglish ? 'es' : 'en')} aria-label={t('accessibility.changeLanguage')}>{isEnglish ? 'ES' : 'EN'}</button>
          <a className="studio-header-cta" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t('contact_btn.button')}<ArrowUpRight size={16} aria-hidden="true" /></a>
          <button ref={menuButton} type="button" className="studio-icon-button studio-menu-toggle" onClick={() => setIsMobileMenuOpen(open => !open)} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation" aria-label={isMobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}>{isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </div>
      {isMobileMenuOpen && <nav id="mobile-navigation" className="studio-mobile-nav" aria-label={t('accessibility.mobileNav')}>
        {navItems.map((item, index) => <a key={item.id} href={`#${item.id}`} onClick={() => setIsMobileMenuOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="studio-mobile-contact">{t('contact_btn.button')}<ArrowUpRight size={18} aria-hidden="true" /></a>
      </nav>}
    </header>
  );
};

export default LeanHeader;
