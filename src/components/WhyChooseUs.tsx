import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Zap, Lock, HeadsetIcon, DollarSign, UsersIcon, Layers } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();

  const reasonsData = [
    {
      title: t('whyUs.reason1.title'),
      description: t('whyUs.reason1.description'),
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: t('whyUs.reason2.title'),
      description: t('whyUs.reason2.description'),
      icon: <Lock className="w-6 h-6" />,
    },
    {
      title: t('whyUs.reason3.title'),
      description: t('whyUs.reason3.description'),
      icon: <HeadsetIcon className="w-6 h-6" />,
    },
    {
      title: t('whyUs.reason4.title'),
      description: t('whyUs.reason4.description'),
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: t('whyUs.reason5.title'),
      description: t('whyUs.reason5.description'),
      icon: <UsersIcon className="w-6 h-6" />,
    },
    {
      title: t('whyUs.reason6.title'),
      description: t('whyUs.reason6.description'),
      icon: <Layers className="w-6 h-6" />,
    },
  ];

  return (
    <section id="why-us" className="py-32 px-6 bg-[#FAFAFA]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
          }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            {t('whyUs.heading')}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            {t('whyUs.subheading')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {reasonsData.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 md:p-10 rounded-[2rem] bg-white border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500"
            >
              <div className="w-16 h-16 bg-blue-50/50 rounded-2xl flex items-center justify-center mb-8 text-blue-600 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-500 ease-out">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4 tracking-tight">
                {reason.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-[1.05rem]">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;