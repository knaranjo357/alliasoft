import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { BookIcon, ClocheIcon, CoinIcon, MailIcon, ShareIcon, WhatsAppIcon } from './icons/AlliaIcons';

interface FooterProps { onOpenQuote?: () => void; }

const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const isEnglish = i18n.resolvedLanguage === 'en';
  const encodedSiteUrl = encodeURIComponent('https://alliasoft.com/');
  const encodedShareText = encodeURIComponent(isEnglish
    ? 'Artificial intelligence, automation, and custom software for companies'
    : 'Inteligencia artificial, automatización y software a medida para empresas');

  return (
    <footer className="studio-footer">
      <div className="studio-closing-container">
        <div className="studio-footer-grid">
          <div className="studio-footer-intro">
            <a href="#home" className="studio-footer-monogram" aria-label={t('accessibility.home')}>
              <img src="/images/logo.png" alt="Alliasoft" width="44" height="44" loading="lazy" />
              <span>Alliasoft <small>AI</small></span>
            </a>
            <p>{t('footer.description')}</p>
            <div className="studio-footer-actions">
              <a href="https://wa.me/573176964215" target="_blank" rel="noopener noreferrer" className="studio-footer-primary">
                {t('footer.whatsapp')}<ArrowUpRight size={17} aria-hidden="true" />
              </a>
              {onOpenQuote && <button type="button" onClick={onOpenQuote} className="studio-footer-quote">{t('footer.quote')}<ArrowUpRight size={17} aria-hidden="true" /></button>}
            </div>
          </div>
          <nav className="studio-footer-navigation" aria-label={t('footer.quickLinks')}>
            <h2>{t('footer.quickLinks')}</h2>
            <ul>
              {[
                ['nav.demo', '#demo'], ['nav.services', '#solutions'], ['nav.portfolio', '#portfolio'],
                ['nav.process', '#process'], ['nav.faq', '#faq'],
              ].map(([label, href]) => <li key={href}><a href={href}>{t(label)}<ArrowUpRight size={14} aria-hidden="true" /></a></li>)}
            </ul>
          </nav>
          <div className="studio-footer-contact">
            <h2>{t('footer.contactTitle')}</h2>
            <p>{t('footer.contactBody')}</p>
            <div className="studio-footer-contact-links">
              <a href="mailto:alliasoftsas@gmail.com"><MailIcon size={17} />alliasoftsas@gmail.com</a>
              <a href="https://wa.me/573176964215" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={17} />+57 317 696 4215</a>
            </div>
          </div>
        </div>
        <nav className="studio-footer-ecosystem" aria-labelledby="footer-ecosystem-heading">
          <div className="studio-footer-ecosystem-heading">
            <span aria-hidden="true" />
            <h2 id="footer-ecosystem-heading">{isEnglish ? 'Our ecosystem' : 'Nuestro ecosistema'}</h2>
          </div>
          <div className="studio-footer-ecosystem-brand">
            <a className="studio-footer-ecosystem-name" href="https://alliafood.com" target="_blank" rel="noopener noreferrer">AlliaFood<ArrowUpRight size={16} aria-hidden="true" /></a>
            <span className="studio-footer-ecosystem-category"><ClocheIcon size={14} />{isEnglish ? 'Restaurants' : 'Restaurantes'}</span>
            <div className="studio-footer-ecosystem-links"><a href="https://alliafood.com" target="_blank" rel="noopener noreferrer">{isEnglish ? 'Platform' : 'Plataforma'}</a></div>
          </div>
          <div className="studio-footer-ecosystem-brand">
            <a className="studio-footer-ecosystem-name" href="https://alliaedu.com" target="_blank" rel="noopener noreferrer">AlliaEdu<ArrowUpRight size={16} aria-hidden="true" /></a>
            <span className="studio-footer-ecosystem-category"><BookIcon size={14} />{isEnglish ? 'ICFES preparation' : 'Preparación ICFES'}</span>
            <div className="studio-footer-ecosystem-links">
              <a href="https://alliaedu.com" target="_blank" rel="noopener noreferrer">{isEnglish ? 'Platform' : 'Plataforma'}</a>
              <a href="https://www.youtube.com/@AlliaEdu" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>
          <div className="studio-footer-ecosystem-brand">
            <a className="studio-footer-ecosystem-name" href="https://www.tiktok.com/@alliamoney" target="_blank" rel="noopener noreferrer">AlliaMoney<ArrowUpRight size={16} aria-hidden="true" /></a>
            <span className="studio-footer-ecosystem-category"><CoinIcon size={14} />{isEnglish ? 'Finance' : 'Finanzas'}</span>
            <div className="studio-footer-ecosystem-links"><a href="https://www.tiktok.com/@alliamoney" target="_blank" rel="noopener noreferrer">TikTok</a></div>
          </div>
        </nav>
        <div className="studio-footer-signature">
          <a href="#home" className="studio-footer-wordmark" aria-label={t('accessibility.home')}>Alliasoft<span aria-hidden="true">.</span></a>
          <a href="#home" className="studio-footer-signature-arrow" aria-label={t('footer.backToTop')}><ArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="studio-footer-bottom">
          <div className="studio-footer-legal">
            <p>{t('footer.copyright', { year: currentYear })}</p>
            <div><a href="/privacy-notice.html">{t('footer.privacyNotice')}</a><a href="/privacy.html">{t('footer.privacyPolicy')}</a></div>
          </div>
          <div className="studio-footer-share">
            <p><ShareIcon size={14} />{isEnglish ? 'Share Alliasoft' : 'Compartir Alliasoft'}</p>
            <div>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedSiteUrl}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`https://twitter.com/intent/tweet?url=${encodedSiteUrl}&text=${encodedShareText}`} target="_blank" rel="noopener noreferrer">X</a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedSiteUrl}`} target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
          <a href="#home" className="studio-footer-back">{t('footer.backToTop')}<ArrowUp size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
