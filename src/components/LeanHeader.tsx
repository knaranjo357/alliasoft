import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe2, Menu, MessageCircle, Moon, Sun, X } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/573176964215?text=Hola%20Alliasoft%2C%20quiero%20contarles%20un%20reto%20de%20mi%20empresa.';

const LeanHeader: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'es' : 'en');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('alliasoft-theme', nextTheme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      nextTheme === 'dark' ? '#030712' : '#f8fafc',
    );
  };

  const themeLabel = theme === 'dark'
    ? (i18n.resolvedLanguage === 'en' ? 'Light mode' : 'Modo claro')
    : (i18n.resolvedLanguage === 'en' ? 'Dark mode' : 'Modo oscuro');

  const navItems = [
    { href: '#solutions', label: t('nav.services') },
    { href: '#portfolio', label: t('nav.portfolio') },
    { href: '#process', label: t('nav.process') },
    { href: '#faq', label: t('nav.faq') },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-6xl rounded-2xl border px-4 transition-colors sm:px-5 ${
          isScrolled
            ? 'border-white/10 bg-slate-950/95 shadow-2xl shadow-slate-950/40 backdrop-blur-xl'
            : 'border-white/[0.08] bg-slate-950/80 backdrop-blur-lg'
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#home" className="flex min-w-0 items-center gap-2.5" aria-label={t('accessibility.home')}>
            <img
              src="/images/logo.png"
              alt=""
              width="40"
              height="40"
              decoding="async"
              className="h-10 w-10 shrink-0 rounded-xl ring-1 ring-white/10"
            />
            <span className="truncate text-xl font-extrabold tracking-tight text-white">
              Alliasoft<span className="text-cyan-400">.</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex" aria-label={t('accessibility.primaryNav')}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="theme-toggle inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-xs font-bold text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
              <span>{theme === 'dark' ? (i18n.resolvedLanguage === 'en' ? 'Light' : 'Claro') : (i18n.resolvedLanguage === 'en' ? 'Dark' : 'Oscuro')}</span>
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t('accessibility.changeLanguage')}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-xs font-bold text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              {i18n.resolvedLanguage === 'en' ? 'ES' : 'EN'}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-emerald-400 px-4 text-sm font-extrabold text-slate-950 transition hover:bg-emerald-300"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t('contact_btn.button')}
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="theme-toggle grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t('accessibility.changeLanguage')}
              className="h-10 rounded-full border border-white/10 px-3 text-xs font-bold text-slate-300"
            >
              {i18n.resolvedLanguage === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <nav id="mobile-navigation" className="border-t border-white/[0.08] py-4 lg:hidden" aria-label={t('accessibility.mobileNav')}>
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.05]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-extrabold text-slate-950"
              >
                <MessageCircle className="h-4 w-4" />
                {t('contact_btn.button')}
              </a>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
};

export default LeanHeader;
