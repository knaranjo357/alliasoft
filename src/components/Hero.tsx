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
      {/* ── Premium ambient background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Primary blob */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.35, 0.18], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-15%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-300/50 to-indigo-400/40 blur-[100px]"
        />

        {/* Secondary blob */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.3, 0.15], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-teal-300/45 to-cyan-300/35 blur-[100px]"
        />

        {/* Accent blob */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[35%] left-[-8%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-violet-300/30 to-purple-300/20 blur-[100px]"
        />

        {/* Orbiting decorative dots */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400/20" style={{ transform: 'translateX(200px)' }} />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
            className="absolute"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400/20" style={{ transform: 'translateX(300px)' }} />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center mb-10"
          >
            <span className="px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-black/[0.06] text-slate-700 text-sm font-bold tracking-wide flex items-center gap-2 shadow-[0_2px_20px_rgb(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)]">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
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
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              {t('hero.title_line1')}
              <br />
              {t('hero.title_line2')}{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text">
                  {t('hero.title_highlight')}
                </span>
                {/* Underline glow */}
                <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600/60 via-indigo-500/60 to-teal-500/60 rounded-full blur-[1px]" />
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
              className="group relative px-10 py-5 bg-slate-900 text-white font-semibold rounded-full shadow-[0_8px_32px_rgba(15,23,42,0.22)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.35)] hover:-translate-y-1 transition-all duration-500 flex items-center text-lg w-full sm:w-auto justify-center overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t('hero.cta1')}</span>
              {/* Shimmer overlay on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </motion.a>
            <motion.a
              href="#portfolio"
              className="px-10 py-5 bg-white/80 backdrop-blur-sm border border-black/[0.06] text-slate-700 font-semibold rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white transition-all duration-500 text-lg w-full sm:w-auto justify-center flex items-center"
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
            className="inline-flex flex-col sm:flex-row items-center gap-0 bg-white/70 backdrop-blur-xl border border-black/[0.04] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.02)] overflow-hidden"
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
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
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
        <motion.a
          href="#features"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-slate-400 hover:bg-white/50 transition-all duration-300"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;