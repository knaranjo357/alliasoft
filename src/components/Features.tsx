import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, BarChart3, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Zap className="w-8 h-8" />, title: t('features.title'), description: t('features.description') },
    { icon: <BarChart3 className="w-8 h-8" />, title: t('features.title2'), description: t('features.description2') },
    { icon: <Globe className="w-8 h-8" />, title: t('features.title3'), description: t('features.description3') },
  ];

  return (
    <section className="py-32 px-6 bg-white shrink-0">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="group flex flex-col p-8 md:p-10 bg-[#FAFAFA] rounded-[2rem] border border-black/[0.03] shadow-[0_4px_24px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 text-slate-800 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-500 ease-out z-10 relative">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 tracking-tight z-10 relative">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-[1.05rem] z-10 relative">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
           initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
           className="text-center mt-20 text-slate-400 flex items-center justify-center"
        >
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex items-center space-x-2">
            <span className="text-sm font-medium tracking-wide uppercase">{t('features.scroll')}</span>
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default Features;