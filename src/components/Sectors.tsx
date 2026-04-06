import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Sectors: React.FC = () => {
  const { t } = useTranslation();
  const items = t('sectors.items', { returnObjects: true }) as string[];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

  return (
    <section id="sectors" className="py-24 px-6 bg-slate-900 border-t border-white/5">
      <div className="container mx-auto max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
           className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase mb-4 block">
            {t('nav.sectors')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            {t('sectors.heading')}
          </h2>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm cursor-default hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
            >
              <span className="text-slate-200 font-semibold tracking-wide text-sm md:text-base">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Sectors;
