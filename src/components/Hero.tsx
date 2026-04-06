import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden bg-[#FAFAFA]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-200/30 blur-3xl mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tl from-teal-100/40 to-blue-200/40 blur-3xl mix-blend-multiply" 
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center mb-8"
          >
            <span className="px-5 py-2.5 rounded-full bg-white border border-black/[0.04] text-slate-800 text-sm font-bold tracking-wide flex items-center shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
              <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
              {t('hero.title1')}
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-900 tracking-tight leading-[1.05]">
              {t('hero.title2')} <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                {t('hero.title3')}
              </span> <br className="hidden md:block" />
              {t('hero.title4')}
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
          >
            <motion.a 
              href="#contact" 
              className="px-10 py-5 bg-slate-900 text-white font-semibold rounded-full shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.25)] hover:-translate-y-1 transition-all flex items-center text-lg w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta1')}
            </motion.a>
            <motion.a 
              href="#portfolio" 
              className="px-10 py-5 bg-white border border-black/[0.05] text-slate-700 font-semibold rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all text-lg w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta2')}
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-500 text-sm font-medium tracking-wide max-w-lg mx-auto"
          >
            {t('hero.support')}
          </motion.p>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-8 h-8 text-slate-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;