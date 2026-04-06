import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';

interface CountUpProps {
  end: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 1.8 }) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isPercent = end.includes('%');
          const hasPlus = end.includes('+');
          const numeric = parseFloat(end.replace(/[^0-9.]/g, ''));
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numeric);
            const prefix = hasPlus ? '+' : '';
            const suffix = isPercent ? '%' : '';
            setDisplay(`${prefix}${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{display}</span>;
};

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: t('hero.stat1_value'), label: t('hero.stat1_label') },
    { value: t('hero.stat2_value'), label: t('hero.stat2_label') },
    { value: t('hero.stat3_value'), label: t('hero.stat3_label') },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#FAFAFA]"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-12%] left-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-300/30 blur-3xl mix-blend-multiply"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[-8%] right-[8%] w-[42vw] h-[42vw] rounded-full bg-gradient-to-tl from-teal-200/40 to-blue-200/40 blur-3xl mix-blend-multiply"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-[40%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-violet-200/30 to-purple-200/20 blur-3xl mix-blend-multiply"
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center mb-10"
          >
            <span className="px-5 py-2.5 rounded-full bg-white border border-black/[0.06] text-slate-700 text-sm font-bold tracking-wide flex items-center gap-2 shadow-[0_2px_16px_rgb(0,0,0,0.04)]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-900 tracking-tight leading-[1.05]">
              {t('hero.title_line1')}
              <br />
              {t('hero.title_line2')}{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
                {t('hero.title_highlight')}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
          >
            <motion.a
              href="#contact"
              className="px-10 py-5 bg-slate-900 text-white font-semibold rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.28)] hover:-translate-y-1 transition-all flex items-center text-lg w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta1')}
            </motion.a>
            <motion.a
              href="#portfolio"
              className="px-10 py-5 bg-white border border-black/[0.06] text-slate-700 font-semibold rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all text-lg w-full sm:w-auto justify-center flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('hero.cta2')}
            </motion.a>
          </motion.div>

          {/* Support line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="text-slate-400 text-sm font-medium tracking-wide mb-20"
          >
            {t('hero.support')}
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex flex-col sm:flex-row items-center gap-0 bg-white border border-black/[0.05] rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center px-10 py-6 ${
                  i < stats.length - 1
                    ? 'border-b sm:border-b-0 sm:border-r border-black/[0.05]'
                    : ''
                }`}
              >
                <span className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
                  <CountUp end={stat.value} />
                </span>
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-7 h-7 text-slate-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;