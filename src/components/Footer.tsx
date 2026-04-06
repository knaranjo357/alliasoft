import React from 'react';
import { useTranslation } from 'react-i18next';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-slate-900 pt-24 pb-12 border-t border-black/[0.03]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:pr-8">
            <div className="text-3xl font-bold mb-6 tracking-tight">Alliasoft</div>
            <p className="text-slate-500 mb-8 leading-relaxed text-[0.95rem]">
              {t('footer.description')}
            </p>
            <div className="flex space-x-3">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-300 border border-slate-100/50">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-tight">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              {['home', 'whyUs', 'portfolio'].map((link, idx) => (
                <li key={idx}>
                  <a href={`#${link === 'whyUs' ? 'why-us' : link}`} className="text-slate-500 hover:text-blue-600 transition-colors text-[0.95rem] font-medium">
                    {t(`nav.${link}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-tight">{t('footer.services')}</h3>
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((num) => (
                <li key={num}>
                  <a href="#services" className="text-slate-500 hover:text-blue-600 transition-colors text-[0.95rem] font-medium">
                    {t(`services.service${num}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-tight">{t('nav.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 mb-1">Email</span>
                <a href={`mailto:${t('contact.email.value')}`} className="text-slate-500 hover:text-blue-600 transition-colors text-[0.95rem] font-medium">
                  {t('contact.email.value')}
                </a>
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-sm font-bold text-slate-900 mb-1">{t('contact.phone.title')}</span>
                <a href={`tel:${t('contact.phone.value')}`} className="text-slate-500 hover:text-blue-600 transition-colors text-[0.95rem] font-medium">
                  {t('contact.phone.value')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-black/[0.05] pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm font-medium">{t('footer.copyright', { year: currentYear })}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;