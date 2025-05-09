import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(37,99,235,0.9) 0%, rgba(13,148,136,0.9) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden z-0">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-2xl md:text-3xl font-light mb-6"
          >
            {t('hero.title1')}
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-2">
              {t('hero.title2')}
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-2">
              {t('hero.title3')}
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8">
              {t('hero.title4')}
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-10"
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a 
              href="#contact" 
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              {t('hero.cta1')}
            </a>
            <a 
              href="#services" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              {t('hero.cta2')}
            </a>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.5
          }}
        >
          <ChevronDown className="w-8 h-8 text-white mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;