import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Sparkles } from 'lucide-react';

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
      whileHover={{ y: -10 }}
      className={`relative rounded-2xl overflow-hidden transform transition-all duration-300 ${
        popular ? 'ring-2 ring-blue-500 ring-offset-2' : 'border border-gray-200'
      }`}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px' }}>
        <div className="absolute inset-0 bg-white rounded-2xl" />
      </div>

      {popular && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500" />
          <div className="relative text-white text-center py-2 text-sm font-medium flex items-center justify-center">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            {popular}
            <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
          </div>
        </div>
      )}
      
      <div className="relative p-8">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
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
          <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {price}
          </span>
          {period && (
            <span className="ml-2 text-gray-500">{period}</span>
          )}
        </div>
        
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
              </div>
              <span className="ml-3 text-gray-700">{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 ${
            popular
              ? 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          {cta}
        </motion.button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/5 to-teal-500/5 rounded-tr-full transform group-hover:scale-150 transition-transform duration-500" />
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
    <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background pattern */}
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
            {t('pricing.heading')}
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            {t('pricing.subheading')}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
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