import React from 'react';
import { useTranslation } from 'react-i18next';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-slate-900 pt-24 pb-12 border-t border-black/[0.02] relative overflow-hidden">
      {/* Subtle bottom glowing blob */}
      <div className="absolute bottom-0 right-[-10%] w-[30vw] h-[30vw] rounded-full bg-blue-50/50 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:pr-8">
            <div className="text-3xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-slate-950 via-slate-800 to-blue-600 bg-clip-text text-transparent">
              Alliasoft
            </div>
            <p className="text-slate-500 mb-8 leading-relaxed text-[0.95rem] font-medium">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 border border-slate-100/50"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              {['home', 'whyUs', 'portfolio'].map((link, idx) => (
                <li key={idx}>
                  <a href={`#${link === 'whyUs' ? 'why-us' : link}`} className="text-slate-500 hover:text-blue-600 transition-colors text-[0.95rem] font-bold">
                    {t(`nav.${link}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">{t('footer.services')}</h3>
            <ul className="space-y-4">
              {['performance', 'design', 'control', 'experience'].map((key) => (
                <li key={key}>
                  <a href="#solutions" className="text-slate-500 hover:text-blue-600 transition-colors text-[0.95rem] font-bold">
                    {t(`solutions.items.${key}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-6">{t('nav.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="text-xs font-extrabold text-slate-900 mb-1 uppercase tracking-wider">Email</span>
                <a href={`mailto:${t('contact.email.value')}`} className="text-slate-500 hover:text-blue-600 transition-colors text-[0.95rem] font-bold">
                  {t('contact.email.value')}
                </a>
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-xs font-extrabold text-slate-900 mb-1 uppercase tracking-wider">{t('contact.chat.title')}</span>
                <a href="https://wa.me/573176964215" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors text-[0.95rem] font-bold">
                  {t('contact.chat.value')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-black/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm font-bold">{t('footer.copyright', { year: currentYear })}</p>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5 shadow-[0_2px_8px_rgba(16,185,129,0.04)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-emerald-700 text-xs font-extrabold tracking-wide uppercase">Disponibles para nuevos proyectos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;