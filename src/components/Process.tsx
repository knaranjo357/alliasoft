import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface StepCardProps {
  title: string;
  description: string;
  index: number;
}

const stepGradients = [
  'from-blue-500 to-indigo-500',
  'from-violet-500 to-purple-500',
  'from-teal-500 to-emerald-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
];

const StepCard: React.FC<StepCardProps> = ({ title, description, index }) => (
  <div className="w-full bg-white p-8 rounded-3xl border border-black/[0.04] shadow-[0_4px_24px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_48px_rgb(0,0,0,0.07)] transition-all duration-500 relative overflow-hidden group hover:-translate-y-1">
    {/* Top gradient accent */}
    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stepGradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    {/* Watermark */}
    <span className="absolute -bottom-3 -right-2 text-[6rem] font-black text-slate-900/[0.03] leading-none select-none pointer-events-none tabular-nums group-hover:text-slate-900/[0.05] transition-all duration-500">
      {index + 1}
    </span>
    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight leading-snug relative z-10">
      {title}
    </h3>
    <p className="text-slate-500 leading-relaxed text-[1.02rem] relative z-10">
      {description}
    </p>
  </div>
);

const Process: React.FC = () => {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true }) as { title: string; description: string }[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="process" className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-[20%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-blue-50/60 to-indigo-50/40 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-br from-teal-50/50 to-emerald-50/30 blur-[60px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">
            {t('nav.process')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {t('process.heading')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line — desktop only, with gradient */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-7 bottom-7 w-px bg-gradient-to-b from-blue-200/0 via-blue-300/40 to-blue-200/0 z-0" />

          <motion.div
            className="flex flex-col gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
          >
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const gradient = stepGradients[index] || stepGradients[0];
              return (
                <motion.div key={index} variants={itemVariants}>

                  {/* ── MOBILE layout: left number + right card ── */}
                  <div className="flex items-start gap-5 md:hidden">
                    <div className={`w-12 h-12 shrink-0 mt-1 rounded-full bg-gradient-to-br ${gradient} text-white font-black text-sm flex items-center justify-center shadow-[0_0_0_5px_white,0_4px_16px_rgba(0,0,0,0.1)] tabular-nums z-10`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <StepCard title={step.title} description={step.description} index={index} />
                    </div>
                  </div>

                  {/* ── DESKTOP layout: 3-column grid ── */}
                  <div className="hidden md:grid grid-cols-[1fr_72px_1fr] items-center gap-0">
                    {/* Left cell */}
                    <div className="flex justify-end pr-6">
                      {isEven
                        ? <StepCard title={step.title} description={step.description} index={index} />
                        : null
                      }
                    </div>

                    {/* Center bubble */}
                    <div className="flex justify-center z-10">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} text-white font-black text-base flex items-center justify-center shadow-[0_0_0_6px_white,0_4px_20px_rgba(0,0,0,0.1)] tabular-nums`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Right cell */}
                    <div className="flex justify-start pl-6">
                      {!isEven
                        ? <StepCard title={step.title} description={step.description} index={index} />
                        : null
                      }
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Process;
