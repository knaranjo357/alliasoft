import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true }) as { title: string, description: string }[];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section id="process" className="py-32 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
           className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">
            {t('nav.process')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            {t('process.heading')}
          </h2>
        </motion.div>

        <motion.div 
          className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-slate-900 text-white font-bold text-lg shadow-[0_0_0_4px_rgba(255,255,255,1)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 mx-4 md:mx-0">
                {index + 1}
              </div>
              
              <div className="w-[calc(100%-5rem)] md:w-[calc(50%-3rem)] bg-[#FAFAFA] p-8 rounded-3xl border border-black/[0.03] shadow-[0_4px_20px_rgb(0,0,0,0.02)] group-hover:shadow-[0_12px_30px_rgb(0,0,0,0.06)] transition-all duration-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[1.05rem]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
