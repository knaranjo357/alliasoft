import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Zap, Shield, Rocket, Clock, DollarSign, Star, Check } from 'lucide-react';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

const Solutions: React.FC = () => {
  const { t } = useTranslation();

  const solutions = [
    { title: t('solutions.items.performance.title'), description: t('solutions.items.performance.description'), features: t('solutions.items.performance.features', { returnObjects: true }) as string[], icon: <Zap className="w-6 h-6" /> },
    { title: t('solutions.items.design.title'), description: t('solutions.items.design.description'), features: t('solutions.items.design.features', { returnObjects: true }) as string[], icon: <Rocket className="w-6 h-6" /> },
    { title: t('solutions.items.control.title'), description: t('solutions.items.control.description'), features: t('solutions.items.control.features', { returnObjects: true }) as string[], icon: <Shield className="w-6 h-6" /> },
    { title: t('solutions.items.experience.title'), description: t('solutions.items.experience.description'), features: t('solutions.items.experience.features', { returnObjects: true }) as string[], icon: <Star className="w-6 h-6" /> },
    { title: t('solutions.items.support.title'), description: t('solutions.items.support.description'), features: t('solutions.items.support.features', { returnObjects: true }) as string[], icon: <Clock className="w-6 h-6" /> },
    { title: t('solutions.items.investment.title'), description: t('solutions.items.investment.description'), features: t('solutions.items.investment.features', { returnObjects: true }) as string[], icon: <DollarSign className="w-6 h-6" /> },
  ];

  return (
    <section className="py-32 px-6 bg-[#FAFAFA]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
           initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
           variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
           className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">Solutions</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">{t('solutions.heading')}</h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">{t('solutions.description')}</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
          {solutions.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="group p-8 md:p-10 bg-white rounded-[2rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center mb-8 text-blue-600 group-hover:scale-110 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-500 ease-out">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed text-[1.05rem] flex-1">{item.description}</p>
              <div className="space-y-3 mt-auto">
                {item.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-blue-50/50 flex items-center justify-center mr-3 shrink-0"><Check className="w-3 h-3 text-blue-600" /></div>
                    <span className="text-slate-600 text-[0.95rem] font-medium leading-tight pt-0.5">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <a href="#contact" className="inline-flex items-center px-10 py-5 bg-slate-900 text-white font-semibold rounded-2xl shadow-[0_8px_20px_rgb(15,23,42,0.15)] hover:shadow-[0_12px_28px_rgb(15,23,42,0.25)] hover:-translate-y-1 transition-all duration-300 text-lg">
            {t('solutions.cta')}
            <Rocket className="w-5 h-5 ml-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
export default Solutions;