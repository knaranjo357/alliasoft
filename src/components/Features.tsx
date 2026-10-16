import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { AiCoreIcon, DashboardIcon, DiagnosisIcon, IntegrationIcon, ShieldIcon, TeamIcon } from './icons/AlliaIcons';
import '../styles/editorial.css';

const capabilityIcons = [DiagnosisIcon, AiCoreIcon, DashboardIcon, IntegrationIcon, TeamIcon];

const Features: React.FC = () => {
  const { t, i18n } = useTranslation();
  const reduceMotion = useReducedMotion();
  const rawItems = t('features.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as string[]) : [];
  const isEnglish = i18n.resolvedLanguage === 'en';
  const labels = isEnglish
    ? ['Operational discovery', 'Business AI', 'Custom systems', 'System integration', 'Team enablement']
    : ['Diagnóstico Operativo', 'IA Generativa Corporativa', 'Sistemas a Medida', 'Integración Ecosistema', 'Acompañamiento Total'];
  const footnotes = isEnglish
    ? ['Process review: active', 'AI grounded in company context', 'Custom workflow', 'API & WhatsApp & ERP', 'Adoption support']
    : ['Revisión del proceso: activa', 'IA con contexto corporativo', 'Flujo personalizado', 'API & WhatsApp & ERP', 'Acompañamiento de adopción'];
  const details = [
    isEnglish ? 'Process map · Clear priorities' : 'Mapa de proceso · Prioridades claras',
    isEnglish ? 'Grounded in your data' : 'Entrenado con tus datos',
    '',
    isEnglish ? 'Validated sync' : 'Sincronización validada',
    isEnglish ? 'On-site + remote' : 'Presencial + virtual',
  ];

  return (
    <section id="features" aria-labelledby="features-title" className="editorial-section editorial-features">
      <div className="editorial-container">
        <div className="editorial-kicker"><span aria-hidden="true">02 /</span><p>{isEnglish ? 'How we add value' : 'Cómo aportamos valor'}</p></div>
        <div className="editorial-features-heading">
          <h2 id="features-title">{t('features.title')}</h2>
          <div className="editorial-features-aside">
            <p>{t('features.description')}</p>
            <div className="editorial-principle">
              <span className="editorial-status-dot" aria-hidden="true" />
              <div><span>{isEnglish ? 'Decisions with context' : 'Decisiones con contexto'}</span><strong>{isEnglish ? 'We understand the process first' : 'Primero entendemos el proceso'}</strong></div>
            </div>
          </div>
        </div>

        <div className="editorial-capabilities">
          {capabilityIcons.map((Icon, index) => (
            <motion.article
              key={labels[index]}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.04 }}
              className={`editorial-capability${index === 0 ? ' editorial-capability-featured' : ''}`}
            >
              <div className="editorial-capability-meta">
                <span className="editorial-capability-number" aria-hidden="true">0{index + 1}</span>
                <p>{labels[index]}</p>
                <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3>{items[index] || ''}</h3>
              {index === 0 && (
                <svg className="editorial-diagnostic" viewBox="0 0 340 220" fill="none" aria-hidden="true">
                  <path d="M35 50H118V110H222V170H305M35 170H118V110M222 110V50H305M118 110V200M222 110H305" />
                  <path className="editorial-diagnostic-route" d="M35 50H118V110H222V50H305" />
                  <circle cx="118" cy="110" r="31" className="editorial-diagnostic-halo" />
                  <circle cx="118" cy="110" r="21" />
                  <circle cx="118" cy="110" r="6" className="editorial-diagnostic-point" />
                  <circle cx="222" cy="110" r="5" />
                  <rect x="23" y="38" width="24" height="24" rx="3" />
                  <rect x="23" y="158" width="24" height="24" rx="3" />
                  <rect x="293" y="38" width="24" height="24" rx="3" />
                  <rect x="293" y="158" width="24" height="24" rx="3" />
                  <circle cx="305" cy="110" r="4" />
                  <circle cx="118" cy="200" r="4" />
                </svg>
              )}
              <div className="editorial-capability-footer">
                <span>{index === 4 ? <ShieldIcon size={14} /> : <span className="editorial-status-dot" aria-hidden="true" />}{footnotes[index]}</span>
                {details[index] && <span className="editorial-capability-detail">{details[index]}</span>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
