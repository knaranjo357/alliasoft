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
      title: "Optimized Performance",
      description: "Lightning-fast websites that keep your visitors engaged",
      features: [
        "Ultra-fast loading times",
        "Improved SEO rankings",
        "Higher user retention"
      ],
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Professional Design",
      description: "Stand out with a unique and powerful brand identity",
      features: [
        "Custom-tailored designs",
        "Brand differentiation",
        "Enhanced credibility"
      ],
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      title: "Complete Control",
      description: "Full ownership and control of your digital assets",
      features: [
        "Secure domain management",
        "Full asset ownership",
        "Complete autonomy"
      ],
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Seamless Experience",
      description: "Modern web applications with smooth navigation",
      features: [
        "Fluid transitions",
        "Enhanced user experience",
        "Higher engagement"
      ],
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: "24/7 Support",
      description: "Expert technical support whenever you need it",
      features: [
        "Instant response times",
        "Professional expertise",
        "Peace of mind"
      ],
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: "Smart Investment",
      description: "Maximum value for your technology investment",
      features: [
        "Competitive pricing",
        "Guaranteed results",
        "Optimized ROI"
      ],
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
            Transforming Your Digital Vision
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            Innovative Solutions for Modern Businesses
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            We deliver cutting-edge solutions that help your business thrive in the digital world. Experience the power of modern technology combined with expert support.
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
            Start Your Digital Transformation
            <Rocket className="w-5 h-5 ml-2 animate-pulse" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;