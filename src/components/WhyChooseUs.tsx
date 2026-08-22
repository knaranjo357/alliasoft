import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Network, LineChart, Cpu, Lightbulb, Users } from 'lucide-react';

/* ─── Mini Bar Chart Visualization for the Hero Card ─── */
const MiniBarChart: React.FC = () => {
  const bars = [
    { height: '45%', color: 'bg-blue-500/70', delay: 0.3 },
    { height: '70%', color: 'bg-blue-400/80', delay: 0.45 },
    { height: '55%', color: 'bg-blue-500/60', delay: 0.6 },
    { height: '90%', color: 'bg-blue-300/90', delay: 0.75 },
    { height: '65%', color: 'bg-blue-400/70', delay: 0.9 },
    { height: '80%', color: 'bg-blue-300/80', delay: 1.05 },
  ];

  return (
    <div className="flex items-end gap-1.5 h-20 mt-5 px-1">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className={`w-3 rounded-t-sm ${bar.color}`}
          initial={{ height: 0 }}
          whileInView={{ height: bar.height }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: bar.delay, ease: 'easeOut' }}
        />
      ))}
      <div className="ml-3 flex flex-col justify-end pb-1">
        <span className="text-2xl font-extrabold text-white leading-none">+97%</span>
        <span className="text-[10px] text-blue-300/70 font-medium tracking-wide uppercase">Efficiency</span>
      </div>
    </div>
  );
};

/* ─── Card Configuration ─── */
interface CardConfig {
  icon: React.ReactNode;
  glassClass: string;
  glowClass: string;
  gridSpan: string;
  iconBg: string;
  numberColor: string;
  isHero?: boolean;
}

const cardConfigs: CardConfig[] = [
  {
    icon: <LineChart className="w-7 h-7 text-blue-400" />,
    glassClass: 'glass-card-blue',
    glowClass: 'hover-glow-blue',
    gridSpan: 'md:col-span-2 md:row-span-2',
    iconBg: 'bg-blue-500/15 border-blue-500/30',
    numberColor: 'text-blue-500/15',
    isHero: true,
  },
  {
    icon: <Network className="w-6 h-6 text-teal-400" />,
    glassClass: 'glass-card-teal',
    glowClass: 'hover-glow-teal',
    gridSpan: 'md:col-span-1',
    iconBg: 'bg-teal-500/15 border-teal-500/30',
    numberColor: 'text-teal-500/15',
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-purple-400" />,
    glassClass: 'glass-card-purple',
    glowClass: 'hover-glow-purple',
    gridSpan: 'md:col-span-1',
    iconBg: 'bg-purple-500/15 border-purple-500/30',
    numberColor: 'text-purple-500/15',
  },
  {
    icon: <Cpu className="w-6 h-6 text-amber-400" />,
    glassClass: 'glass-card-amber',
    glowClass: 'hover-glow-amber',
    gridSpan: 'md:col-span-2',
    iconBg: 'bg-amber-500/15 border-amber-500/30',
    numberColor: 'text-amber-500/15',
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-400" />,
    glassClass: 'glass-card',
    glowClass: 'hover-glow-indigo',
    gridSpan: 'md:col-span-1',
    iconBg: 'bg-indigo-500/15 border-indigo-500/30',
    numberColor: 'text-indigo-500/15',
  },
];

/* ─── Component ─── */
const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();
  const reasons = t('whyUs.reasons', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  return (
    <section
      id="why-us"
      className="relative py-28 px-6 text-white overflow-hidden bg-gradient-to-b from-[#030a1c] via-[#071025] to-[#050d1f]"
    >
      {/* ── Ambient Orbs ── */}
      <div className="absolute top-1/4 -left-32 w-[420px] h-[420px] rounded-full bg-blue-600/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[380px] h-[380px] rounded-full bg-amber-500/[0.05] blur-[110px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-5">
            {t('nav.whyUs')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight mt-1 mb-5 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-[1.15]">
            {t('whyUs.heading')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t('whyUs.subheading')}
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
          {reasons.slice(0, 5).map((reason, index) => {
            const cfg = cardConfigs[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8 }}
                className={`
                  ${cfg.glassClass} ${cfg.glowClass} ${cfg.gridSpan}
                  rounded-3xl p-8 relative overflow-hidden group cursor-default
                  ${cfg.isHero ? 'md:p-10' : ''}
                `}
              >
                {/* Watermark Number */}
                <span
                  className={`absolute top-4 right-6 font-black select-none font-mono pointer-events-none ${cfg.numberColor} ${
                    cfg.isHero ? 'text-[5.5rem] -top-2 right-5' : 'text-6xl'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon Box */}
                <motion.div
                  className={`w-13 h-13 rounded-2xl border flex items-center justify-center mb-6 ${cfg.iconBg} ${
                    cfg.isHero ? 'w-14 h-14' : 'w-12 h-12'
                  }`}
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {cfg.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className={`font-bold text-white mb-3 leading-snug ${
                    cfg.isHero ? 'text-2xl md:text-[1.65rem]' : 'text-xl'
                  }`}
                >
                  {reason.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-slate-400 leading-relaxed ${
                    cfg.isHero ? 'text-[0.94rem] max-w-md' : 'text-sm'
                  }`}
                >
                  {reason.description}
                </p>

                {/* Hero Card — Mini Bar Chart */}
                {cfg.isHero && <MiniBarChart />}

                {/* Subtle inner light on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;