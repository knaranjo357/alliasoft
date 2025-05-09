import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, BarChart3, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center"
    >
      <div className="bg-blue-50 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-blue-600" />}
            title={t('features.title')}
            description={t('features.description')}
            delay={0.1}
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-blue-600" />}
            title={t('features.title2')}
            description={t('features.description2')}
            delay={0.2}
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-blue-600" />}
            title={t('features.title3')}
            description={t('features.description3')}
            delay={0.3}
          />
        </div>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16 text-gray-500 flex items-center justify-center"
        >
          <span>{t('features.scroll')}</span>
          <svg className="w-5 h-5 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;