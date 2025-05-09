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
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
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
    <section id="why-us" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('whyUs.heading')}
          </h2>
          <p className="text-gray-600 text-lg">
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