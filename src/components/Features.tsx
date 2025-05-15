import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, BarChart3, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "50px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform"
    >
      <motion.div 
        className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 rounded-full mb-6 w-16 h-16 flex items-center justify-center"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-blue-600">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "50px",
  });

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title={t('features.title')}
            description={t('features.description')}
            delay={0.1}
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title={t('features.title2')}
            description={t('features.description2')}
            delay={0.2}
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8" />}
            title={t('features.title3')}
            description={t('features.description3')}
            delay={0.3}
          />
        </div>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-16 text-gray-500 flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex items-center space-x-2"
          >
            <span className="text-blue-600 font-medium">{t('features.scroll')}</span>
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;