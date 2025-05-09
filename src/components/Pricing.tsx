import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  index: number;
  popular?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  cta,
  index,
  popular,
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
      className={`rounded-2xl overflow-hidden ${
        popular ? 'ring-2 ring-blue-500 ring-offset-2' : 'border border-gray-200'
      }`}
    >
      {popular && (
        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
          {popular}
        </div>
      )}
      
      <div className="p-8">
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            index === 0 ? 'bg-orange-100 text-orange-600' : 
            index === 1 ? 'bg-blue-100 text-blue-600' : 
            index === 2 ? 'bg-purple-100 text-purple-600' :
            'bg-teal-100 text-teal-600'
          }`}>
            {index === 0 && '🚀'}
            {index === 1 && '🌐'}
            {index === 2 && '💬'}
            {index === 3 && '🛠️'}
          </div>
          <h3 className="ml-3 text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          {period && <span className="ml-1 text-gray-500">{period}</span>}
        </div>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="ml-3 text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            popular
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          {cta}
        </button>
      </div>
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      title: t('pricing.plan1.title'),
      price: t('pricing.plan1.price'),
      description: t('pricing.plan1.description'),
      features: t('pricing.plan1.features', { returnObjects: true }) as string[],
      cta: t('pricing.plan1.cta'),
    },
    {
      title: t('pricing.plan2.title'),
      price: t('pricing.plan2.price'),
      period: t('pricing.plan2.period'),
      description: t('pricing.plan2.description'),
      features: t('pricing.plan2.features', { returnObjects: true }) as string[],
      cta: t('pricing.plan2.cta'),
      popular: t('pricing.plan2.popular'),
    },
    {
      title: t('pricing.plan3.title'),
      price: t('pricing.plan3.price'),
      description: t('pricing.plan3.description'),
      features: t('pricing.plan3.features', { returnObjects: true }) as string[],
      cta: t('pricing.plan3.cta'),
    },
    {
      title: t('pricing.plan4.title'),
      price: t('pricing.plan4.price'),
      period: t('pricing.plan4.period'),
      description: t('pricing.plan4.description'),
      features: t('pricing.plan4.features', { returnObjects: true }) as string[],
      cta: t('pricing.plan4.cta'),
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('pricing.heading')}
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-4">
            {t('pricing.subheading')}
          </h3>
          <p className="text-gray-600 text-lg">
            {t('pricing.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              description={plan.description}
              features={plan.features}
              cta={plan.cta}
              index={index}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;