import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Bot,
  Layout,
  Share2,
  Sparkles,
  Users,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';

interface SolutionsProps {
  onOpenQuote?: (serviceId?: string) => void;
}

interface SolutionItem {
  key: 'performance' | 'design' | 'control' | 'experience' | 'support' | 'investment';
  icon: React.ElementType;
  serviceId: string;
  borderColor: string;
  glowColor: string;
  iconBgColor: string;
  checkColor: string;
  accentBadge: string;
  features: string[];
}

const solutionList: SolutionItem[] = [
  {
    key: 'performance',
    icon: Activity,
    serviceId: 'custom_platform',
    borderColor: 'border-l-blue-500',
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.25)] hover:border-blue-500/40',
    iconBgColor: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    checkColor: 'text-blue-400',
    accentBadge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    features: [
      'Auditoría de cuellos de botella operativos',
      'Mapeo de arquitectura de información',
      'Matriz de impacto y prioridad antes de desarrollar',
    ],
  },
  {
    key: 'design',
    icon: Bot,
    serviceId: 'ai_agent',
    borderColor: 'border-l-emerald-500',
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)] hover:border-emerald-500/40',
    iconBgColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    checkColor: 'text-emerald-400',
    accentBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    features: [
      'Agentes entrenados en documentación propia',
      'Integración nativa con WhatsApp Business API',
      'Escalamiento humano inteligente con alertas',
    ],
  },
  {
    key: 'control',
    icon: Layout,
    serviceId: 'custom_platform',
    borderColor: 'border-l-purple-500',
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.25)] hover:border-purple-500/40',
    iconBgColor: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    checkColor: 'text-purple-400',
    accentBadge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    features: [
      'CRMs y Dashboards construidos desde cero',
      'Modelado de permisos por rol de usuario',
      'Paneles analíticos en tiempo real',
    ],
  },
  {
    key: 'experience',
    icon: Share2,
    serviceId: 'automation',
    borderColor: 'border-l-cyan-500',
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)] hover:border-cyan-500/40',
    iconBgColor: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    checkColor: 'text-cyan-400',
    accentBadge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    features: [
      'Conexión bidireccional entre ERP y WhatsApp',
      'Sincronización instantánea de inventario',
      'Automatización de alertas y cobranza',
    ],
  },
  {
    key: 'support',
    icon: Sparkles,
    serviceId: 'custom_platform',
    borderColor: 'border-l-amber-500',
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.25)] hover:border-amber-500/40',
    iconBgColor: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    checkColor: 'text-amber-400',
    accentBadge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    features: [
      'UX pensada para cero fricción de aprendizaje',
      'Diseño responsive adaptado a móvil y tablet',
      'Optimización de rendimiento y accesibilidad',
    ],
  },
  {
    key: 'investment',
    icon: Users,
    serviceId: 'ai_agent',
    borderColor: 'border-l-pink-500',
    glowColor: 'hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.25)] hover:border-pink-500/40',
    iconBgColor: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    checkColor: 'text-pink-400',
    accentBadge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    features: [
      'Monitoreo proactivo post-lanzamiento',
      'Iteración mensual según métricas de uso',
      'Acompañamiento y medición de uso del equipo',
    ],
  },
];

const Solutions: React.FC<SolutionsProps> = ({ onOpenQuote }) => {
  const { t, i18n } = useTranslation();
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const isEnglish = i18n.resolvedLanguage === 'en';
  const englishFeatures: Record<SolutionItem['key'], string[]> = {
    performance: ['Operational bottleneck review', 'Information architecture mapping', 'Impact and priority matrix before development'],
    design: ['Agents grounded in company documentation', 'WhatsApp Business API integration', 'Human handoff with contextual alerts'],
    control: ['Custom CRM and dashboard development', 'Role-based permissions', 'Operational analytics panels'],
    experience: ['Two-way ERP and WhatsApp connections', 'Inventory synchronization', 'Alerts and collection workflows'],
    support: ['UX designed around real user workflows', 'Responsive mobile and tablet design', 'Performance and accessibility optimization'],
    investment: ['Post-launch monitoring', 'Iteration using agreed usage indicators', 'Team support and usage measurement'],
  };

  const toggleSolution = (key: string) => {
    setSelectedSolution((prev) => (prev === key ? null : key));
  };

  return (
    <section
      id="solutions"
      className="py-24 px-6 bg-gradient-to-b from-[#0a0f1d] via-[#060913] to-[#080d1a] text-white relative overflow-hidden"
    >
      {/* Background Decorative Mesh & Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Mesh Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/15 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Sticky Header & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>NUESTRAS SOLUCIONES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
              {t('solutions.heading')}
            </h2>

            <p className="text-slate-300/80 text-base sm:text-lg leading-relaxed">
              {t('solutions.description')}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => (onOpenQuote ? onOpenQuote() : (window.location.href = '#contact'))}
                className="group relative px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(37,99,235,0.35)] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">{t('solutions.cta')}</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Sub-card highlights summary */}
            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-slate-800/80 mt-8">
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
                <span className="text-lg font-extrabold text-blue-400 block">A medida</span>
                <span className="text-xs text-slate-400">Alcance definido con tu equipo</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
                <span className="text-lg font-extrabold text-emerald-400 block">Por etapas</span>
                <span className="text-xs text-slate-400">Avances funcionales y validables</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Scrollable Solution Cards */}
          <div className="lg:col-span-7 space-y-4">
            {solutionList.map((sol, index) => {
              const isSelected = selectedSolution === sol.key;
              const IconComponent = sol.icon;
              const displayFeatures = isEnglish ? englishFeatures[sol.key] : sol.features;

              return (
                <motion.div
                  key={sol.key}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  onClick={() => toggleSolution(sol.key)}
                  className={`bg-slate-900/70 backdrop-blur-xl border-l-4 ${sol.borderColor} ${
                    isSelected
                      ? 'border-slate-700 bg-slate-900/95 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] ring-1 ring-white/10'
                      : 'border-r border-t border-b border-slate-800/80 hover:bg-slate-900/90'
                  } ${sol.glowColor} rounded-2xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden group`}
                >
                  {/* Inner subtle glow accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${sol.iconBgColor}`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors flex items-center gap-2">
                          {t(`solutions.items.${sol.key}.title`)}
                        </h3>
                        <p className="text-slate-300/80 text-sm leading-relaxed mt-1">
                          {t(`solutions.items.${sol.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Features */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 mt-5 border-t border-slate-800/80 space-y-3">
                          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase block mb-2">
                            {isEnglish ? 'Key capabilities' : 'Funcionalidades clave'}
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-1 gap-2.5">
                            {displayFeatures.map((feat, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/50 text-sm text-slate-200"
                              >
                                <CheckCircle2 className={`w-4 h-4 ${sol.checkColor} shrink-0`} />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 flex items-center justify-between">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenQuote) {
                                  onOpenQuote(sol.serviceId);
                                } else {
                                  window.location.href = '#contact';
                                }
                              }}
                              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${sol.accentBadge} hover:brightness-125`}
                            >
                              <span>{isEnglish ? 'Discuss this solution' : 'Conversar sobre esta solución'}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Toggle Indicator Footer Line */}
                  <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                    <span className="flex items-center gap-1.5">
                      {isSelected
                        ? (isEnglish ? 'Hide details' : 'Ocultar detalles')
                        : (isEnglish ? 'View capabilities' : 'Ver funcionalidades')}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full bg-slate-800/60 flex items-center justify-center transition-transform duration-300 ${
                        isSelected ? 'rotate-90 bg-blue-500/20 text-blue-400' : 'text-slate-400'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
