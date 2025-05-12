import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, Rocket, Globe, Bot, PenTool as Tool } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  cta, 
  icon,
  index 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full transform hover:scale-105 transition-all duration-300 relative group"
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px' }}>
        <div className="absolute inset-0 bg-white rounded-2xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.05]" />
          <motion.div 
            className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white">
              {icon}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <div className="text-2xl font-bold text-white">{price}</div>
        </div>
      </div>
      
      <div className="p-8 flex-grow relative">
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
            >
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="ml-3 text-gray-700">{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      <div className="px-8 pb-8 mt-auto relative">
        <motion.a
          href="#contact"
          className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-medium rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {cta}
        </motion.a>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: t('services.service1.title'),
      price: t('services.service1.price'),
      description: t('services.service1.description'),
      features: t('services.service1.features', { returnObjects: true }) as string[],
      cta: t('services.service1.cta'),
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      title: t('services.service2.title'),
      price: t('services.service2.price'),
      description: t('services.service2.description'),
      features: t('services.service2.features', { returnObjects: true }) as string[],
      cta: t('services.service2.cta'),
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: t('services.service3.title'),
      price: t('services.service3.price'),
      description: t('services.service3.description'),
      features: t('services.service3.features', { returnObjects: true }) as string[],
      cta: t('services.service3.cta'),
      icon: <Bot className="w-6 h-6" />,
    },
    {
      title: t('services.service4.title'),
      price: t('services.service4.price'),
      description: t('services.service4.description'),
      features: t('services.service4.features', { returnObjects: true }) as string[],
      cta: t('services.service4.cta'),
      icon: <Tool className="w-6 h-6" />,
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent mb-6">
            {t('services.heading')}
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            {t('services.subheading')}
          </h3>
          <p className="text-gray-600 text-lg">
            {t('services.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              price={service.price}
              description={service.description}
              features={service.features}
              cta={service.cta}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;