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
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
    >
      <motion.div 
        className="bg-blue-50/50 p-4 rounded-2xl mb-6 w-14 h-14 flex items-center justify-center"
      >
        <div className="text-blue-600">
          {icon}
        </div>
      </motion.div>
      
      <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">
        {title}
      </h3>
      
      <p className="text-slate-600 leading-relaxed text-[0.95rem]">
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
    <section className="py-24 px-4 bg-white relative overflow-hidden text-slate-900 border-b border-gray-100">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-7 h-7" />}
            title={t('features.title')}
            description={t('features.description')}
            delay={0.1}
          />
          <FeatureCard
            icon={<BarChart3 className="w-7 h-7" />}
            title={t('features.title2')}
            description={t('features.description2')}
            delay={0.2}
          />
          <FeatureCard
            icon={<Globe className="w-7 h-7" />}
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
          className="text-center mt-16 text-slate-500 flex items-center justify-center font-medium"
        >
          <motion.div
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex items-center space-x-2"
          >
            <span className="text-blue-600">{t('features.scroll')}</span>
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;