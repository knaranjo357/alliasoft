import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDownRight, ArrowUpRight, Play } from 'lucide-react';
import { BookIcon, ClocheIcon, TikTokIcon, YouTubeIcon } from './icons/AlliaIcons';
import '../styles/ecosystem.css';

const Ecosystem: React.FC = () => {
  const { i18n } = useTranslation();
  const en = i18n.resolvedLanguage === 'en';

  return (
    <section id="ecosystem" className="studio-ecosystem" aria-labelledby="ecosystem-heading">
      <div className="ecosystem-shell">
        <div className="ecosystem-overline"><span><span aria-hidden="true" />{en ? 'The Alliasoft ecosystem' : 'El ecosistema Alliasoft'}</span><span>{en ? 'Ideas with a life of their own' : 'Ideas con vida propia'} <ArrowDownRight size={17} aria-hidden="true" /></span></div>
        <div className="ecosystem-intro">
          <h2 id="ecosystem-heading">{en ? 'We build technology.' : 'Creamos tecnología.'}<br /><span>{en ? 'We open possibilities.' : 'Abrimos posibilidades.'}</span></h2>
          <p>{en ? 'Our ecosystem brings together software, education, and financial content. Different ideas, the same drive to create something useful.' : 'Nuestro ecosistema reúne software, educación y contenido financiero. Ideas distintas, una misma intención: crear algo útil para las personas.'}</p>
        </div>

        <div className="ecosystem-grid">
          <article className="ecosystem-brand ecosystem-edu" aria-labelledby="alliaedu-title">
            <div className="ecosystem-edu-art" aria-hidden="true">
              <div className="ecosystem-art-meta"><BookIcon size={19} strokeWidth={1.5} /><span>{en ? 'EDUCATION / COLOMBIA' : 'EDUCACIÓN / COLOMBIA'}</span><span>01</span></div>
              <div className="edu-orbit edu-orbit-one" /><div className="edu-orbit edu-orbit-two" />
              <div className="edu-paper edu-paper-back" />
              <div className="edu-paper edu-paper-front">
                <div className="edu-book-top"><span>alliaedu</span><ArrowUpRight size={20} /></div>
                <span className="edu-book-title">{en ? <>Your<br />next<br /><em>step.</em></> : <>Tu<br />siguiente<br /><em>paso.</em></>}</span>
                <div className="edu-book-bottom"><span>ICFES</span><span className="edu-book-star">✳</span></div>
              </div>
              <div className="edu-bookmark"><span>Aa</span><span>01 / ∞</span></div>
              <span className="ecosystem-art-caption">{en ? 'Learning opens doors.' : 'Aprender abre caminos.'}</span>
            </div>
            <div className="ecosystem-brand-copy">
              <div className="ecosystem-brand-heading"><h3 id="alliaedu-title">AlliaEdu</h3><span className="ecosystem-category">{en ? 'Education' : 'Educación'}</span></div>
              <p className="ecosystem-brand-purpose">{en ? 'Get ready for the ICFES.' : 'Prepárate para el ICFES.'}</p>
              <p className="ecosystem-brand-description">{en ? 'Our ICFES preparation platform, with an educational channel on YouTube. Discover AlliaEdu and take the next step in your preparation.' : 'Nuestra plataforma de preparación para el ICFES, con un canal educativo en YouTube. Conoce AlliaEdu y da el siguiente paso en tu preparación.'}</p>
              <div className="ecosystem-brand-links">
                <a className="ecosystem-primary-link" href="https://alliaedu.com/" target="_blank" rel="noopener noreferrer">{en ? 'Explore the platform' : 'Conocer la plataforma'}<ArrowUpRight size={17} aria-hidden="true" /></a>
                <a className="ecosystem-secondary-link" href="https://www.youtube.com/@AlliaEdu" target="_blank" rel="noopener noreferrer" aria-label={en ? 'AlliaEdu on YouTube' : 'AlliaEdu en YouTube'}><YouTubeIcon size={18} />YouTube<ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
            </div>
          </article>

          <article className="ecosystem-brand ecosystem-money" aria-labelledby="alliamoney-title">
            <div className="ecosystem-money-art" aria-hidden="true">
              <div className="ecosystem-art-meta"><TikTokIcon size={18} strokeWidth={1.5} /><span>{en ? 'FINANCE / TIKTOK' : 'FINANZAS / TIKTOK'}</span><span>02</span></div>
              <span className="money-backdrop-type">money.</span>
              <div className="money-phone">
                <div className="money-phone-top"><span>alliamoney</span><TikTokIcon size={15} /></div>
                <span className="money-phone-title">{en ? <>Let’s talk<br />about <em>money.</em></> : <>Hablemos<br />de <em>dinero.</em></>}</span>
                <div className="money-coin"><span>$</span><span aria-hidden="true">✦</span></div>
                <div className="money-phone-bottom"><span className="money-play"><Play size={15} fill="currentColor" /></span><span>@alliamoney</span></div>
              </div>
              <span className="money-sticker">$<span>+</span></span>
              <span className="ecosystem-art-caption">{en ? 'A conversation worth having.' : 'Una conversación que vale la pena.'}</span>
            </div>
            <div className="ecosystem-brand-copy">
              <div className="ecosystem-brand-heading"><h3 id="alliamoney-title">AlliaMoney</h3><span className="ecosystem-category">{en ? 'Content' : 'Contenido'}</span></div>
              <p className="ecosystem-brand-purpose">{en ? 'Let’s talk about money.' : 'Hablemos de dinero.'}</p>
              <p className="ecosystem-brand-description">{en ? 'Our finance channel on TikTok. A space for financial content, new perspectives, and conversations about money.' : 'Nuestro canal de finanzas en TikTok. Un espacio para encontrar contenido financiero, nuevas perspectivas y conversaciones sobre el dinero.'}</p>
              <div className="ecosystem-brand-links"><a className="ecosystem-primary-link" href="https://www.tiktok.com/@alliamoney" target="_blank" rel="noopener noreferrer"><TikTokIcon size={17} />{en ? 'Visit AlliaMoney on TikTok' : 'Ver AlliaMoney en TikTok'}<ArrowUpRight size={17} aria-hidden="true" /></a></div>
            </div>
          </article>
        </div>

        <div className="ecosystem-food">
          <div className="ecosystem-food-brand"><span className="ecosystem-food-symbol"><ClocheIcon size={26} strokeWidth={1.4} /></span><div><span className="ecosystem-food-kicker">03 / {en ? 'Restaurant software' : 'Software gastronómico'}</span><h3>AlliaFood</h3></div></div>
          <p>{en ? 'Technology for every table. POS, orders, kitchen workflows, and inventory in one connected operation.' : 'Tecnología para cada mesa. POS, pedidos, cocina e inventario en una operación conectada.'}</p>
          <a href="https://alliafood.com" target="_blank" rel="noopener noreferrer">{en ? 'Explore AlliaFood' : 'Conocer AlliaFood'}<ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <div className="ecosystem-signature"><span>ALLIASOFT — {en ? 'AN ECOSYSTEM IN MOTION' : 'UN ECOSISTEMA EN MOVIMIENTO'}</span><span aria-hidden="true">↗</span></div>
      </div>
    </section>
  );
};

export default Ecosystem;
