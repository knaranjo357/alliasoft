import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { AgentIcon, DashboardIcon, DiagnosisIcon, GrowthIcon, IntegrationIcon, MultiDeviceIcon } from './icons/AlliaIcons';
import '../styles/showcase.css';

interface SolutionsProps {
  onOpenQuote?: (serviceId?: string) => void;
}

interface SolutionItem {
  key: 'performance' | 'design' | 'control' | 'experience' | 'support' | 'investment';
  icon: React.ElementType;
  serviceId: string;
  features: string[];
}

const solutionList: SolutionItem[] = [
  {
    key: 'performance', icon: DiagnosisIcon, serviceId: 'custom_platform',
    features: ['Auditoría de cuellos de botella operativos', 'Mapeo de arquitectura de información', 'Matriz de impacto y prioridad antes de desarrollar'],
  },
  {
    key: 'design', icon: AgentIcon, serviceId: 'ai_agent',
    features: ['Agentes entrenados en documentación propia', 'Integración nativa con WhatsApp Business API', 'Escalamiento humano inteligente con alertas'],
  },
  {
    key: 'control', icon: DashboardIcon, serviceId: 'custom_platform',
    features: ['CRMs y Dashboards construidos desde cero', 'Modelado de permisos por rol de usuario', 'Paneles analíticos en tiempo real'],
  },
  {
    key: 'experience', icon: IntegrationIcon, serviceId: 'automation',
    features: ['Conexión bidireccional entre ERP y WhatsApp', 'Sincronización instantánea de inventario', 'Automatización de alertas y cobranza'],
  },
  {
    key: 'support', icon: MultiDeviceIcon, serviceId: 'custom_platform',
    features: ['UX pensada para cero fricción de aprendizaje', 'Diseño responsive adaptado a móvil y tablet', 'Optimización de rendimiento y accesibilidad'],
  },
  {
    key: 'investment', icon: GrowthIcon, serviceId: 'ai_agent',
    features: ['Monitoreo proactivo post-lanzamiento', 'Iteración mensual según métricas de uso', 'Acompañamiento y medición de uso del equipo'],
  },
];

const englishFeatures: Record<SolutionItem['key'], string[]> = {
  performance: ['Operational bottleneck review', 'Information architecture mapping', 'Impact and priority matrix before development'],
  design: ['Agents grounded in company documentation', 'WhatsApp Business API integration', 'Human handoff with contextual alerts'],
  control: ['Custom CRM and dashboard development', 'Role-based permissions', 'Operational analytics panels'],
  experience: ['Two-way ERP and WhatsApp connections', 'Inventory synchronization', 'Alerts and collection workflows'],
  support: ['UX designed around real user workflows', 'Responsive mobile and tablet design', 'Performance and accessibility optimization'],
  investment: ['Post-launch monitoring', 'Iteration using agreed usage indicators', 'Team support and usage measurement'],
};

const Solutions: React.FC<SolutionsProps> = ({ onOpenQuote }) => {
  const { t, i18n } = useTranslation();
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const isEnglish = i18n.resolvedLanguage === 'en';

  const openQuote = (serviceId?: string) => {
    if (onOpenQuote) onOpenQuote(serviceId);
    else window.location.hash = 'contact';
  };

  return (
    <section id="solutions" className="studio-solutions" aria-labelledby="solutions-heading">
      <div className="showcase-shell">
        <div className="showcase-section-label">
          <span className="showcase-label-dot" aria-hidden="true" />
          <span>{isEnglish ? 'Our solutions' : 'Nuestras soluciones'}</span>
          <span className="showcase-label-index" aria-hidden="true">01 — 06</span>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="solutions-intro"
        >
          <h2 id="solutions-heading">{t('solutions.heading')}</h2>
          <div className="solutions-intro-copy">
            <p>{t('solutions.description')}</p>
            <button type="button" onClick={() => openQuote()} className="showcase-text-link">
              {t('solutions.cta')}
            </button>
          </div>
        </motion.div>

        <div className="solutions-catalog">
          {solutionList.map((solution, index) => {
            const isSelected = selectedSolution === solution.key;
            const Icon = solution.icon;
            const features = isEnglish ? englishFeatures[solution.key] : solution.features;
            const panelId = `solution-panel-${solution.key}`;
            const headingId = `solution-heading-${solution.key}`;

            return (
              <motion.div
                key={solution.key}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: (index % 2) * 0.05 }}
                className={`solution-entry ${index < 2 ? 'solution-entry-featured' : ''} ${isSelected ? 'is-expanded' : ''}`}
              >
                <div className="solution-entry-top" aria-hidden="true">
                  <span className="solution-index">0{index + 1}</span>
                  <Icon className="solution-symbol" strokeWidth={1.25} />
                </div>
                <h3 id={headingId}>{t(`solutions.items.${solution.key}.title`)}</h3>
                <p className="solution-description">{t(`solutions.items.${solution.key}.description`)}</p>
                <button
                  type="button"
                  className="solution-toggle"
                  aria-expanded={isSelected}
                  aria-controls={panelId}
                  aria-labelledby={`${headingId} solution-toggle-label-${solution.key}`}
                  onClick={() => setSelectedSolution((previous) => previous === solution.key ? null : solution.key)}
                >
                  <span id={`solution-toggle-label-${solution.key}`}>
                    {isSelected
                      ? (isEnglish ? 'Hide details' : 'Ocultar detalles')
                      : (isEnglish ? 'View capabilities' : 'Ver funcionalidades')}
                  </span>
                  <Plus size={18} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isSelected && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={headingId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.25 }}
                      className="solution-details"
                    >
                      <div className="solution-details-inner">
                        <p className="solution-details-label">{isEnglish ? 'Key capabilities' : 'Funcionalidades clave'}</p>
                        <ul>
                          {features.map((feature) => (
                            <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>
                          ))}
                        </ul>
                        <button type="button" onClick={() => openQuote(solution.serviceId)} className="showcase-text-link">
                          {isEnglish ? 'Discuss this solution' : 'Conversar sobre esta solución'}
                          <ArrowUpRight size={17} aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="solutions-principles">
          <div><span>{isEnglish ? 'Custom-built' : 'A medida'}</span><p>{isEnglish ? 'Scope defined with your team' : 'Alcance definido con tu equipo'}</p></div>
          <div><span>{isEnglish ? 'In stages' : 'Por etapas'}</span><p>{isEnglish ? 'Functional progress you can validate' : 'Avances funcionales y validables'}</p></div>
          <span className="solutions-principles-mark" aria-hidden="true">↗</span>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
