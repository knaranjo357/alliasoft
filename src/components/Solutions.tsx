import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Shield, Rocket, Clock, DollarSign, Star } from 'lucide-react';

interface SolutionItemProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  index: number;
}

const SolutionItem: React.FC<SolutionItemProps> = ({ title, description, features, icon, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-teal-500" />
      <div className="p-8">
        <div className="flex items-start mb-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="space-y-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="ml-3 text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Solutions: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const solutions = [
    {
      title: t('solutions.items.performance.title'),
      description: t('solutions.items.performance.description'),
      features: t('solutions.items.performance.features', { returnObjects: true }) as string[],
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: t('solutions.items.design.title'),
      description: t('solutions.items.design.description'),
      features: t('solutions.items.design.features', { returnObjects: true }) as string[],
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      title: t('solutions.items.control.title'),
      description: t('solutions.items.control.description'),
      features: t('solutions.items.control.features', { returnObjects: true }) as string[],
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: t('solutions.items.experience.title'),
      description: t('solutions.items.experience.description'),
      features: t('solutions.items.experience.features', { returnObjects: true }) as string[],
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: t('solutions.items.support.title'),
      description: t('solutions.items.support.description'),
      features: t('solutions.items.support.features', { returnObjects: true }) as string[],
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: t('solutions.items.investment.title'),
      description: t('solutions.items.investment.description'),
      features: t('solutions.items.investment.features', { returnObjects: true }) as string[],
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {t('solutions.heading')}
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            {t('solutions.subheading')}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('solutions.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((item, index) => (
            <SolutionItem
              key={index}
              title={item.title}
              description={item.description}
              features={item.features}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300"
          >
            {t('solutions.cta')}
            <Rocket className="w-5 h-5 ml-2 animate-pulse" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;