import React from 'react';
import { useTranslation } from 'react-i18next';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold mb-4">Alliasoft</div>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.pricing')}
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.whyUs')}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.portfolio')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {t('services.service1.title')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {t('services.service2.title')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {t('services.service3.title')}
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  {t('services.service4.title')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">Email:</span>
                <a href="mailto:info@alliasoft.com" className="text-gray-400 hover:text-white transition-colors">
                  {t('contact.email.value')}
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">{t('contact.phone.title')}:</span>
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                  {t('contact.phone.value')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;