import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Features: React.FC = () => {
  const { t } = useTranslation();
  const items = t('features.items', { returnObjects: true }) as string[];

  return (
    <section className="py-24 px-6 bg-slate-900 text-white shrink-0">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {t('features.title')}
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
              {t('features.description')}
            </p>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="flex items-start rounded-xl p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
                  <span className="text-slate-200 font-medium tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;