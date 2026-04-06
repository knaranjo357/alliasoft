import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  const { t } = useTranslation();
  const items = t('features.items', { returnObjects: true }) as string[];

  return (
    <section className="py-28 px-6 bg-slate-950 text-white relative overflow-hidden shrink-0">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: copy */}
          <motion.div
            className="flex-1 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400 mb-6 block">
              Por qué Alliasoft
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
              {t('features.title')}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {t('features.description')}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group"
            >
              Hablar con un experto
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right: items */}
          <motion.div
            className="flex-1 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <div className="flex flex-col gap-3">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                  }}
                  className="flex items-center gap-5 rounded-2xl px-6 py-5 bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 group cursor-default"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-blue-500/40 bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:border-blue-400/70 group-hover:bg-blue-500/20 transition-all duration-300">
                    <span className="text-blue-400 text-xs font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-slate-200 font-semibold text-[1.05rem] tracking-tight group-hover:text-white transition-colors duration-300">
                    {item}
                  </span>
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