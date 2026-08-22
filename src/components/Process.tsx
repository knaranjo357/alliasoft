import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Layers, FileCheck, Code, Rocket, Activity } from 'lucide-react';

const stepIcons = [
  <Layers className="w-5 h-5 text-blue-400" />,
  <Activity className="w-5 h-5 text-indigo-400" />,
  <FileCheck className="w-5 h-5 text-purple-400" />,
  <Code className="w-5 h-5 text-emerald-400" />,
  <Rocket className="w-5 h-5 text-teal-400" />,
];

const stepDeliverables = [
  ['Entrevistas con equipo clave', 'Mapa de procesos actuales', 'Matriz de dolor operativo'],
  ['Priorización por retorno ROI', 'Identificación de cuellos de botella', 'Definición de KPIs de éxito'],
  ['Arquitectura de software', 'Wireframes de experiencia', 'Propuesta técnica y tiempos'],
  ['Desarrollo modular continuo', 'Integración con APIs / WhatsApp', 'Pruebas con usuarios reales'],
  ['Capacitación del personal', 'Monitoreo proactivo 24/7', 'Evolución y optimización continua'],
];

const Process: React.FC = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = t('process.steps', { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="process" className="py-24 px-6 bg-slate-950 text-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 inline-block">
            METODOLOGÍA ALLIASOFT
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3 mb-4 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {t('process.heading')}
          </h2>
        </motion.div>

        {/* Timeline Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold font-mono text-blue-400">FASE 0{idx + 1}</span>
                  <div className="w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-bold line-clamp-2">{step.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-blue-400 block">
                Fase 0{activeStep + 1} de 05
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                {steps[activeStep].title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Entregables Clave de la Fase:
              </h4>
              <div className="space-y-2.5">
                {stepDeliverables[activeStep]?.map((deliv, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Process;
