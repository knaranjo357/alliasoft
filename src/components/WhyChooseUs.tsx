import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Lock, HeadsetIcon, DollarSign, UsersIcon, Layers } from 'lucide-react';

interface ReasonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ title, description, icon, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
    >

      <div className="relative p-8">
        <motion.div 
          className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300"
        >
          <div className="text-blue-600">
            {icon}
          </div>
        </motion.div>

        <motion.h3 
          className="text-xl font-bold text-slate-900 mb-3 tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p 
          className="text-slate-600 leading-relaxed text-[0.95rem]"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reasonsData = [
    {
      title: t('whyUs.reason1.title'),
      description: t('whyUs.reason1.description'),
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: t('whyUs.reason2.title'),
      description: t('whyUs.reason2.description'),
      icon: <Lock className="w-8 h-8" />,
    },
    {
      title: t('whyUs.reason3.title'),
      description: t('whyUs.reason3.description'),
      icon: <HeadsetIcon className="w-8 h-8" />,
    },
    {
      title: t('whyUs.reason4.title'),
      description: t('whyUs.reason4.description'),
      icon: <DollarSign className="w-8 h-8" />,
    },
    {
      title: t('whyUs.reason5.title'),
      description: t('whyUs.reason5.description'),
      icon: <UsersIcon className="w-8 h-8" />,
    },
    {
      title: t('whyUs.reason6.title'),
      description: t('whyUs.reason6.description'),
      icon: <Layers className="w-8 h-8" />,
    },
  ];

  return (
    <section id="why-us" className="py-24 px-4 bg-white relative overflow-hidden border-b border-gray-100">

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t('whyUs.heading')}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('whyUs.subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasonsData.map((reason, index) => (
            <ReasonCard
              key={index}
              title={reason.title}
              description={reason.description}
              icon={reason.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;