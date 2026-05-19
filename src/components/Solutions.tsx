import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Bot, Monitor, Link, Layout, LifeBuoy, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const solutionMeta = [
  { icon: <Search className="w-6 h-6" />, accent: 'from-blue-500 to-indigo-500', glow: 'group-hover:shadow-blue-500/20' },
  { icon: <Bot className="w-6 h-6" />, accent: 'from-violet-500 to-purple-500', glow: 'group-hover:shadow-violet-500/20' },
  { icon: <Monitor className="w-6 h-6" />, accent: 'from-teal-500 to-emerald-500', glow: 'group-hover:shadow-teal-500/20' },
  { icon: <Link className="w-6 h-6" />, accent: 'from-amber-500 to-orange-500', glow: 'group-hover:shadow-amber-500/20' },
  { icon: <Layout className="w-6 h-6" />, accent: 'from-rose-500 to-pink-500', glow: 'group-hover:shadow-rose-500/20' },
  { icon: <LifeBuoy className="w-6 h-6" />, accent: 'from-slate-600 to-slate-800', glow: 'group-hover:shadow-slate-500/20' },
];

const Solutions: React.FC = () => {
  const { t } = useTranslation();

  const solutions = [
    { title: t('solutions.items.performance.title'), description: t('solutions.items.performance.description'), ...solutionMeta[0] },
    { title: t('solutions.items.design.title'), description: t('solutions.items.design.description'), ...solutionMeta[1] },
    { title: t('solutions.items.control.title'), description: t('solutions.items.control.description'), ...solutionMeta[2] },
    { title: t('solutions.items.experience.title'), description: t('solutions.items.experience.description'), ...solutionMeta[3] },
    { title: t('solutions.items.support.title'), description: t('solutions.items.support.description'), ...solutionMeta[4] },
    { title: t('solutions.items.investment.title'), description: t('solutions.items.investment.description'), ...solutionMeta[5] },
  ];

  return (
    <section className="py-32 px-6 bg-[#FAFAFA] relative overflow-hidden" id="solutions">
      {/* Ambient background blob */}
      <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-100/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-teal-100/30 to-emerald-100/20 blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">
            {t('nav.services')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {t('solutions.heading')}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            {t('solutions.description')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group p-8 md:p-10 bg-white rounded-[2rem] border border-black/[0.03] shadow-[0_4px_24px_rgb(0,0,0,0.02)] hover:shadow-[0_24px_64px_rgb(0,0,0,0.08)] ${item.glow} transition-all duration-500 relative overflow-hidden flex flex-col hover:-translate-y-2`}
            >
              {/* Gradient accent line at top */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Watermark number */}
              <span className="absolute top-4 right-6 text-[5rem] font-black text-slate-900/[0.03] leading-none select-none pointer-events-none tabular-nums group-hover:text-slate-900/[0.05] transition-all duration-500">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 text-white bg-gradient-to-br ${item.accent} shadow-[0_4px_14px_rgba(0,0,0,0.12)] group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] group-hover:rotate-3 transition-all duration-500 ease-out`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-[1.02rem] flex-1">
                {item.description}
              </p>

              {/* Hover arrow indicator */}
              <div className="mt-6 flex items-center gap-2 text-slate-400 group-hover:text-blue-600 transition-colors duration-300">
                <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center flex justify-center"
        >
          <a
            href="#contact"
            className="group relative px-10 py-5 bg-slate-900 text-white font-semibold rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.3)] hover:-translate-y-1 transition-all duration-500 flex items-center text-lg overflow-hidden"
          >
            <span className="relative z-10">{t('solutions.cta')}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;