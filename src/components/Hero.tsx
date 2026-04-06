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
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#FAFAFA]"
    >
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y, opacity }}
      >
        {/* Very subtle elegant gradient orb in the background */}
        <div className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tl from-teal-100/40 to-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </motion.div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-8 space-x-2"
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold tracking-wide flex items-center shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('hero.title1')}
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
            }}
            className="space-y-4 mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              {t('hero.title2')} <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                {t('hero.title3')}
              </span> <br className="hidden md:block" />
              {t('hero.title4')}
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
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
              className="px-8 py-4 bg-slate-900 text-white font-medium rounded-xl shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_8px_30px_rgba(15,23,42,0.25)] hover:-translate-y-1 transition-all flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta1')}
            </motion.a>
            <motion.a 
              href="#portfolio" 
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta2')}
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-0 right-0 text-center flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1,
          delay: 1.5,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;