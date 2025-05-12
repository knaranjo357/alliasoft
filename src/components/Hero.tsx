import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      ref.current.style.setProperty('--mouse-x', `${x * 20}px`);
      ref.current.style.setProperty('--mouse-y', `${y * 20}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={ref}
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(37,99,235,0.9) 0%, rgba(13,148,136,0.9) 100%)",
      }}
    >
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
        
        {/* Animated background shapes */}
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div 
            key={index}
            className="absolute bg-white/10 rounded-full animate-float"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 1,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 2
            }}
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              transform: `translate(var(--mouse-x, 0), var(--mouse-y, 0))`,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-6 space-x-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            <h2 className="text-white text-2xl md:text-3xl font-light">
              {t('hero.title1')}
            </h2>
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight animate-gradient-text bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              {t('hero.title2')}
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
              {t('hero.title3')}
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-8">
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
            <motion.a 
              href="#contact" 
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.cta1')}
            </motion.a>
            <motion.a 
              href="#services" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.cta2')}
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-0 right-0 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <ChevronDown className="w-8 h-8 text-white mx-auto animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;