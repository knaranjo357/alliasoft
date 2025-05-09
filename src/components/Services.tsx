import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, price, description, features, cta, index }) => {
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
      className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-full transform hover:scale-105 transition-transform duration-300"
    >
      <div className="p-6 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-xl font-bold">{price}</div>
      </div>
      
      <div className="p-6 flex-grow">
        <p className="text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="ml-3 text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="px-6 pb-6 mt-auto">
        <a
          href="#contact"
          className="w-full block py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-colors"
        >
          {cta}
        </a>
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
    },
    {
      title: t('services.service2.title'),
      price: t('services.service2.price'),
      description: t('services.service2.description'),
      features: t('services.service2.features', { returnObjects: true }) as string[],
      cta: t('services.service2.cta'),
    },
    {
      title: t('services.service3.title'),
      price: t('services.service3.price'),
      description: t('services.service3.description'),
      features: t('services.service3.features', { returnObjects: true }) as string[],
      cta: t('services.service3.cta'),
    },
    {
      title: t('services.service4.title'),
      price: t('services.service4.price'),
      description: t('services.service4.description'),
      features: t('services.service4.features', { returnObjects: true }) as string[],
      cta: t('services.service4.cta'),
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.heading')}
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4">
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
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;