import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Features: React.FC = () => {
  const { t } = useTranslation();
  const items = t('features.items', { returnObjects: true }) as string[];

  return (
    <section id="features" className="py-32 px-6 bg-slate-950 text-white relative overflow-hidden noise-overlay shrink-0">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* Top glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-10" />
      {/* Ambient glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/[0.06] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-teal-500/[0.05] blur-[80px] pointer-events-none z-0" />

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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white">
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
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
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
                  className="flex items-center gap-5 rounded-2xl px-6 py-5 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-500 group cursor-default backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center shrink-0 group-hover:border-blue-400/60 group-hover:from-blue-500/30 group-hover:to-indigo-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-500">
                    <span className="text-blue-400 text-xs font-bold group-hover:text-blue-300 transition-colors">
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