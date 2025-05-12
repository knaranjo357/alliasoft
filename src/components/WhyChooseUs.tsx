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
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden group"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px' }}>
        <div className="absolute inset-0 bg-white rounded-2xl" />
      </div>

      <div className="relative p-8">
        <motion.div 
          className="w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-blue-600">
            {icon}
          </div>
        </motion.div>

        <motion.h3 
          className="text-xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p 
          className="text-gray-600 leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          {description}
        </motion.p>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/5 to-teal-500/5 rounded-tr-full transform group-hover:scale-150 transition-transform duration-500" />
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
    <section id="why-us" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-teal-50 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-grid-white pointer-events-none" />
      
      {/* Floating decorative elements */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block w-64 h-64 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            delay: i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            top: `${20 + i * 30}%`,
            left: `${10 + i * 30}%`,
          }}
        />
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {t('whyUs.heading')}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
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