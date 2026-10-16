import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import { BlueprintIcon, DiagnosisIcon, IntegrationIcon, LaunchIcon, ModulesIcon } from './icons/AlliaIcons';

const stepIcons = [DiagnosisIcon, BlueprintIcon, ModulesIcon, IntegrationIcon, LaunchIcon];

const stepDeliverables = {
  es: [
    ['Entrevistas con el equipo clave', 'Mapa de procesos actuales', 'Matriz de fricción operativa'],
    ['Arquitectura de software y datos', 'Priorización por impacto y retorno', 'Indicadores de éxito acordados'],
    ['Desarrollo modular por entregas', 'Agentes de IA con fuentes aprobadas', 'Demostraciones funcionales periódicas'],
    ['Integración con APIs, WhatsApp y ERP', 'Pruebas con usuarios y casos reales', 'Ajustes antes del lanzamiento'],
    ['Capacitación del equipo', 'Monitoreo y soporte según acuerdo', 'Evolución y mejora continua'],
  ],
  en: [
    ['Interviews with key team members', 'Current process map', 'Operational friction matrix'],
    ['Software and data architecture', 'Prioritization by impact and return', 'Agreed success indicators'],
    ['Modular development in increments', 'AI agents grounded in approved sources', 'Regular working demos'],
    ['API, WhatsApp, and ERP integration', 'Testing with real users and cases', 'Adjustments before launch'],
    ['Team training', 'Monitoring and support as agreed', 'Ongoing evolution and improvement'],
  ],
} as const;

const Process: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage === 'en';
  const deliverables = stepDeliverables[isEnglish ? 'en' : 'es'];
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = t('process.steps', { returnObjects: true }) as { title: string; description: string }[];
  const ActiveIcon = stepIcons[activeStep];

  return (
    <section id="process" aria-labelledby="process-title" className="editorial-section editorial-process">
      <div className="editorial-container">
        <div className="editorial-kicker"><span aria-hidden="true">06 /</span><p>{isEnglish ? 'The Alliasoft method' : 'Metodología Alliasoft'}</p></div>
        <div className="editorial-process-heading">
          <h2 id="process-title" className="editorial-title">{t('process.heading')}</h2>
          <span className="editorial-process-count" aria-hidden="true">01 — 05 <ArrowUpRight size={24} strokeWidth={1} /></span>
        </div>

        <div className="editorial-process-layout">
          <div className="editorial-phase-list">
            {steps.map((step, idx) => {
              const Icon = stepIcons[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  id={`process-phase-${idx}`}
                  aria-pressed={activeStep === idx}
                  aria-controls="process-phase-panel"
                  onClick={() => setActiveStep(idx)}
                  className={`editorial-phase${activeStep === idx ? ' is-active' : ''}`}
                >
                  <span className="editorial-phase-number">{isEnglish ? 'Phase' : 'Fase'} 0{idx + 1}</span>
                  <span className="editorial-phase-title">{step.title}</span>
                  <Icon size={20} strokeWidth={1.4} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div id="process-phase-panel" role="region" aria-labelledby={`process-phase-${activeStep}`} className="editorial-phase-panel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
                className="editorial-phase-content"
              >
                <div className="editorial-phase-display" aria-hidden="true"><span>0{activeStep + 1}</span><ActiveIcon size={54} strokeWidth={0.8} /></div>
                <span className="editorial-phase-eyebrow">{isEnglish ? `Phase 0${activeStep + 1} of 05` : `Fase 0${activeStep + 1} de 05`}</span>
                <h3>{steps[activeStep].title}</h3>
                <p className="editorial-phase-description">{steps[activeStep].description}</p>
                <div className="editorial-deliverables">
                  <h4>{isEnglish ? 'Key deliverables' : 'Entregables clave de la fase'}</h4>
                  <ul>{deliverables[activeStep]?.map((deliverable) => <li key={deliverable}><Check size={16} strokeWidth={1.5} aria-hidden="true" /><span>{deliverable}</span></li>)}</ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
