import React, { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { AgentIcon, CodeWindowIcon, IntegrationIcon, PinIcon, WhatsAppIcon } from './icons/AlliaIcons';
import '../styles/hero-evolution.css';

const WHATSAPP_URL = 'https://wa.me/573176964215?text=Hola%20Alliasoft%2C%20quiero%20evaluar%20una%20soluci%C3%B3n%20para%20mi%20empresa.';

const LeanHero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeCapability, setActiveCapability] = useState(0);
  const graphicId = useId().replace(/:/g, '');
  const isEnglish = i18n.resolvedLanguage === 'en';
  const capabilities = [
    { icon: AgentIcon, label: t('hero.preview.aiAgents'), description: t('solutions.items.design.description'), code: '01' },
    { icon: CodeWindowIcon, label: t('hero.preview.customSoftware'), description: t('solutions.items.control.description'), code: '02' },
    { icon: IntegrationIcon, label: t('hero.preview.integrations'), description: t('solutions.items.experience.description'), code: '03' },
  ];
  const selected = capabilities[activeCapability];

  return (
    <section id="home" className="studio-hero hero-evolution" aria-labelledby="hero-heading">
      <div className="studio-container">
        <div className="studio-hero-topline">
          <span className="studio-eyebrow"><span className="studio-status-dot" aria-hidden="true" />{t('hero.badge')}</span>
          <span className="studio-hero-location"><PinIcon size={14} />{t('hero.statusBadge')}</span>
        </div>
        <div className="studio-hero-grid">
          <div className="studio-hero-copy">
            <h1 id="hero-heading">{t('hero.title_line1')} <span>{t('hero.title_highlight')}</span></h1>
            <p className="studio-hero-description">{t('hero.description')}</p>
            <div className="studio-hero-actions">
              <a className="studio-button studio-button-primary" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {t('hero.cta1')}<ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="studio-button studio-button-text" href="#solutions">{t('hero.cta2')}<ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <a href="#process" className="studio-hero-process"><span><ArrowDown size={14} aria-hidden="true" /></span>{t('hero.preview.scroll')}</a>
          </div>

          <div className="evo-architecture" role="group" aria-label={t('hero.preview.engine')}>
            <div className="evo-architecture-topline"><span>{t('hero.preview.engine')}</span><span><span className="studio-status-dot" aria-hidden="true" />{t('hero.preview.live')}</span></div>
            <div className="evo-architecture-scene" data-active={activeCapability}>
              <svg className="evo-architecture-svg" viewBox="0 0 600 460" fill="none" aria-hidden="true">
                <defs>
                  <radialGradient id={`${graphicId}-ambient`}><stop stopColor="currentColor" stopOpacity=".15" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
                  <linearGradient id={`${graphicId}-face`} x1="300" y1="120" x2="300" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="currentColor" stopOpacity=".15" /><stop offset="1" stopColor="currentColor" stopOpacity=".025" /></linearGradient>
                  <linearGradient id={`${graphicId}-edge`}><stop stopColor="currentColor" stopOpacity="0" /><stop offset=".5" stopColor="currentColor" stopOpacity=".7" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient>
                  <filter id={`${graphicId}-glow`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="4" /></filter>
                </defs>
                <ellipse cx="300" cy="257" rx="278" ry="193" fill={`url(#${graphicId}-ambient)`} />
                <g className="evo-floor-grid">
                  <path d="M36 244 300 112 564 244 300 376ZM36 282 300 150 564 282 300 414ZM36 320 300 188 564 320 300 452Z" />
                  <path d="M110 207 374 339M185 170 449 302M260 132 524 264M76 264 340 396M151 302 415 170M226 339 490 207" />
                  <path d="M300 83V431M14 282H586" strokeDasharray="3 8" />
                </g>
                <path d="M36 282 300 150 564 282 300 414Z" className="evo-foundation-outline" />
                <g className="evo-circuit-paths">
                  <path className={`evo-route${activeCapability === 0 ? ' is-selected' : ''}`} d="M108 234 183 197 225 218 300 180" />
                  <path className={`evo-route${activeCapability === 1 ? ' is-selected' : ''}`} d="M492 234 417 197 375 218 300 256" />
                  <path className={`evo-route${activeCapability === 2 ? ' is-selected' : ''}`} d="M300 399V357L223 319" />
                  <circle cx="108" cy="234" r="5" /><circle cx="492" cy="234" r="5" /><circle cx="300" cy="399" r="5" />
                </g>
                <g className={`evo-stack-layer evo-stack-bottom${activeCapability === 2 ? ' is-selected' : ''}`}>
                  <path className="evo-layer-shadow" d="M144 297 300 375 456 297 300 219Z" />
                  <path className="evo-layer-side" d="M144 278V296L300 374 456 296V278L300 356Z" />
                  <path className="evo-layer-face" d="M144 278 300 200 456 278 300 356Z" />
                  <path d="M144 278 300 356 456 278M300 356V374" />
                  <path className="evo-layer-trace" d="M169 278 300 344 431 278" />
                  <path className="evo-layer-detail" d="m205 270 95-47 95 47-95 47ZM236 270l64-32 64 32-64 32Z" />
                  <path className="evo-layer-glow" d="M145 278 300 356 455 278" filter={`url(#${graphicId}-glow)`} />
                </g>
                <g className={`evo-stack-layer evo-stack-middle${activeCapability === 1 ? ' is-selected' : ''}`}>
                  <path className="evo-layer-side" d="M186 213V231L300 288 414 231V213L300 270Z" />
                  <path className="evo-layer-face" d="M186 213 300 156 414 213 300 270Z" />
                  <path d="M186 213 300 270 414 213M300 270V288" />
                  <path className="evo-layer-trace" d="m208 213 92 46 92-46" />
                  <path className="evo-layer-detail" d="m250 202 28-14 28 14-28 14Zm44 22 28-14 28 14-28 14ZM250 224l28 14m44-50 28 14" />
                  <path className="evo-layer-glow" d="M187 213 300 270 413 213" filter={`url(#${graphicId}-glow)`} />
                </g>
                <g className={`evo-stack-layer evo-stack-top${activeCapability === 0 ? ' is-selected' : ''}`}>
                  <path className="evo-layer-side" d="M225 142V166L300 204 375 166V142L300 180Z" />
                  <path className="evo-layer-face" d="M225 142 300 104 375 142 300 180Z" />
                  <path d="M225 142 300 180 375 142M300 180V204" />
                  <path className="evo-layer-trace" d="m239 142 61 31 61-31" />
                  <path className="evo-layer-logo" d="m271 146 29-30 29 30-14 7-15-16-15 16Zm14 7 15-16 15 16" />
                  <path className="evo-layer-glow" d="M226 142 300 180 374 142" filter={`url(#${graphicId}-glow)`} />
                </g>
                <g className="evo-architecture-guides">
                  <path d="M375 142H446L465 123H527M414 213H469L490 192H548M456 278H493L513 298H563" />
                  <circle cx="375" cy="142" r="3" /><circle cx="414" cy="213" r="3" /><circle cx="456" cy="278" r="3" />
                  <text x="489" y="114" className={activeCapability === 0 ? 'is-selected' : ''}>01 / AI</text>
                  <text x="504" y="183" className={activeCapability === 1 ? 'is-selected' : ''}>02 / APP</text>
                  <text x="519" y="319" className={activeCapability === 2 ? 'is-selected' : ''}>03 / API</text>
                </g>
                <g className="evo-satellite"><path d="m80 224 28-14 28 14v19l-28 14-28-14Z" /><path d="m80 224 28 14 28-14m-28 14v19" /><circle cx="108" cy="224" r="3" /></g>
                <g className="evo-satellite"><path d="m464 224 28-14 28 14v19l-28 14-28-14Z" /><path d="m464 224 28 14 28-14m-28 14v19" /><circle cx="492" cy="224" r="3" /></g>
                <path d="M172 416H428" stroke={`url(#${graphicId}-edge)`} />
                <text x="300" y="442" textAnchor="middle" className="evo-diagram-wordmark">alliasoft</text>
              </svg>
              <span className="evo-drawing-index" aria-hidden="true">A / 001</span>
            </div>
            <div className="evo-capability-controls" aria-label={t('hero.preview.engine')}>
              {capabilities.map(({ icon: Icon, label, code }, index) => (
                <button key={code} type="button" className={`evo-capability-control${activeCapability === index ? ' is-selected' : ''}`} onClick={() => setActiveCapability(index)} aria-pressed={activeCapability === index} aria-controls="hero-capability-detail">
                  <Icon size={17} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span><span className="evo-control-index" aria-hidden="true">{code}</span>
                </button>
              ))}
            </div>
            <div id="hero-capability-detail" className="evo-capability-detail" aria-live="polite" aria-atomic="true">
              <span aria-hidden="true">{selected.code} /</span><p>{selected.description}</p><a href="#solutions" aria-label={`${t('hero.cta2')}: ${selected.label}`}><ArrowUpRight size={19} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
        <div className="evo-hero-bridge">
          <a className="evo-conversation" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={19} strokeWidth={1.4} /><div><strong>{t('hero.preview.availability')}</strong><span>{t('hero.preview.line1')}</span></div><ArrowUpRight size={16} aria-hidden="true" /></a>
          <div className="evo-ecosystem-link"><span>{isEnglish ? 'The Alliasoft ecosystem' : 'El ecosistema Alliasoft'}</span><a href="#ecosystem"><span>AlliaEdu</span><i aria-hidden="true">/</i><span>AlliaFood</span><i aria-hidden="true">/</i><span>AlliaMoney</span><ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </div>
      </div>
    </section>
  );
};

export default LeanHero;
