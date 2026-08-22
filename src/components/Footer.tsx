import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, MessageSquare, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenQuote?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#02050b] text-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.12),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto max-w-6xl px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3 group" aria-label={t('accessibility.home')}>
              <img
                src="/images/logo.png"
                alt=""
                width="40"
                height="40"
                className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform"
              />
              <span className="text-2xl font-extrabold tracking-tight">
                Alliasoft <span className="text-xs font-mono font-normal text-blue-400">AI</span>
              </span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              {t('footer.description')}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://wa.me/573176964215"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-emerald-400 focus-visible:outline-emerald-300"
              >
                <MessageSquare className="h-4 w-4" />
                {t('footer.whatsapp')}
              </a>
              {onOpenQuote ? (
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold text-slate-200 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  {t('footer.quote')}
                </button>
              ) : null}
            </div>
          </div>

          <nav className="md:col-span-3" aria-label={t('footer.quickLinks')}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
              {t('footer.quickLinks')}
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              {[
                ['nav.demo', '#demo'],
                ['nav.services', '#solutions'],
                ['nav.portfolio', '#portfolio'],
                ['nav.process', '#process'],
                ['nav.faq', '#faq'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a className="transition hover:text-white" href={href}>
                    {t(label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
              {t('footer.contactTitle')}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {t('footer.contactBody')}
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="mailto:alliasoftsas@gmail.com"
                className="flex items-center gap-3 text-sm font-semibold text-slate-200 transition hover:text-blue-300"
              >
                <Mail className="h-4 w-4 text-blue-400" />
                alliasoftsas@gmail.com
              </a>
              <a
                href="https://wa.me/573176964215"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-slate-200 transition hover:text-emerald-300"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                +57 317 696 4215
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-7 text-xs text-slate-500 sm:flex-row">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-slate-400 transition hover:border-white/10 hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
            {t('footer.backToTop')}
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
