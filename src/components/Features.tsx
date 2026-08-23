import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Bot, Layout, Share2, HeartHandshake, Sparkles, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

const cardConfigs = [
  {
    icon: Search,
    number: '01',
    spanClass: 'col-span-12 lg:col-span-7',
    gradientBg: 'from-cyan-950/30 via-slate-900/60 to-slate-950/80',
    borderColor: 'border-cyan-500/20 hover:border-cyan-400/50',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(6,182,212,0.15)]',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    iconRing: 'bg-cyan-500/15 text-cyan-400 border-cyan-400/30 group-hover:bg-cyan-500/25 group-hover:scale-110',
    accentText: 'text-cyan-400',
    pillText: 'Diagnóstico Operativo',
    illustration: 'radar',
  },
  {
    icon: Bot,
    number: '02',
    spanClass: 'col-span-12 lg:col-span-5',
    gradientBg: 'from-purple-950/30 via-slate-900/60 to-slate-950/80',
    borderColor: 'border-purple-500/20 hover:border-purple-400/50',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    iconRing: 'bg-purple-500/15 text-purple-400 border-purple-400/30 group-hover:bg-purple-500/25 group-hover:scale-110',
    accentText: 'text-purple-400',
    pillText: 'IA Generativa Corporativa',
    illustration: 'bot-wave',
  },
  {
    icon: Layout,
    number: '03',
    spanClass: 'col-span-12 md:col-span-6 lg:col-span-4',
    gradientBg: 'from-blue-950/30 via-slate-900/60 to-slate-950/80',
    borderColor: 'border-blue-500/20 hover:border-blue-400/50',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    iconRing: 'bg-blue-500/15 text-blue-400 border-blue-400/30 group-hover:bg-blue-500/25 group-hover:scale-110',
    accentText: 'text-blue-400',
    pillText: 'Sistemas a Medida',
    illustration: 'layout-grid',
  },
  {
    icon: Share2,
    number: '04',
    spanClass: 'col-span-12 md:col-span-6 lg:col-span-4',
    gradientBg: 'from-emerald-950/30 via-slate-900/60 to-slate-950/80',
    borderColor: 'border-emerald-500/20 hover:border-emerald-400/50',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.15)]',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    iconRing: 'bg-emerald-500/15 text-emerald-400 border-emerald-400/30 group-hover:bg-emerald-500/25 group-hover:scale-110',
    accentText: 'text-emerald-400',
    pillText: 'Integración Ecosistema',
    illustration: 'network',
  },
  {
    icon: HeartHandshake,
    number: '05',
    spanClass: 'col-span-12 lg:col-span-4',
    gradientBg: 'from-rose-950/30 via-slate-900/60 to-slate-950/80',
    borderColor: 'border-rose-500/20 hover:border-rose-400/50',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(244,63,94,0.15)]',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    iconRing: 'bg-rose-500/15 text-rose-400 border-rose-400/30 group-hover:bg-rose-500/25 group-hover:scale-110',
    accentText: 'text-rose-400',
    pillText: 'Acompañamiento Total',
    illustration: 'handshake',
  },
];

const Features: React.FC = () => {
  const { t, i18n } = useTranslation();
  const rawItems = t('features.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? (rawItems as string[]) : [];
  const isEnglish = i18n.resolvedLanguage === 'en';
  const pillLabels = isEnglish
    ? ['Operational discovery', 'Business AI', 'Custom systems', 'System integration', 'Team enablement']
    : cardConfigs.map((card) => card.pillText);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="features"
      className="py-32 px-6 bg-gradient-to-b from-[#060b18] via-[#0b132b] to-[#080c1d] text-white relative overflow-hidden noise-overlay shrink-0"
    >
      {/* Background Mesh Light Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-blue-600/[0.04] blur-[150px] pointer-events-none z-0" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Top glowing edge line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent z-10" />

      {/* Floating Decorative Accent Badge */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [0, 4, -4, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="hidden xl:flex absolute top-24 right-12 z-20 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl pointer-events-none"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
            {isEnglish ? 'Decisions with context' : 'Decisiones con contexto'}
          </div>
          <div className="text-xs font-semibold text-cyan-400">
            {isEnglish ? 'We understand the process first' : 'Primero entendemos el proceso'}
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEnglish ? 'How we add value' : 'Cómo aportamos valor'}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-[1.15] bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            {t('features.title')}
          </h2>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            {t('features.description')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {cardConfigs.map((config, index) => {
            const itemText = items[index] || '';
            const IconComponent = config.icon;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`${config.spanClass} group relative rounded-3xl p-8 bg-gradient-to-b ${config.gradientBg} border ${config.borderColor} ${config.glowColor} backdrop-blur-xl transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-default`}
              >
                {/* Background Card Ambient Glow */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors duration-500 blur-2xl pointer-events-none" />

                {/* Card Top Bar: Badge Number + Category Pill */}
                <div className="flex items-center justify-between gap-4 mb-8 z-10">
                  <div className="flex items-center gap-3">
                    {/* Icon Ring */}
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-lg ${config.iconRing}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Category Tag */}
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${config.badgeBg}`}>
                      {pillLabels[index]}
                    </span>
                  </div>

                  {/* Number Badge */}
                  <span className="text-2xl font-black tracking-tighter text-slate-500 group-hover:text-white transition-colors duration-300">
                    {config.number}
                  </span>
                </div>

                {/* Card Main Title */}
                <div className="z-10 mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {itemText}
                  </h3>
                </div>

                {/* Graphic Pattern / Visual Graphic per Card */}
                <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  {/* Card Illustration Graphic */}
                  {config.illustration === 'radar' && (
                    <div className="w-full flex items-center justify-between gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="font-mono text-[11px] text-cyan-300">
                          {isEnglish ? 'Process review: active' : 'Revisión del proceso: activa'}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-slate-500">
                        <span>{isEnglish ? 'Process map' : 'Mapa de proceso'}</span>
                        <span>•</span>
                        <span>{isEnglish ? 'Clear priorities' : 'Prioridades claras'}</span>
                      </div>
                    </div>
                  )}

                  {config.illustration === 'bot-wave' && (
                    <div className="w-full flex items-center justify-between gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1 items-end h-4">
                          <span className="w-1 bg-purple-400 animate-pulse h-2 rounded-full"></span>
                          <span className="w-1 bg-purple-400 animate-pulse h-4 rounded-full delay-100"></span>
                          <span className="w-1 bg-purple-400 animate-pulse h-3 rounded-full delay-200"></span>
                          <span className="w-1 bg-purple-400 animate-pulse h-1 rounded-full delay-150"></span>
                        </div>
                        <span className="font-mono text-[11px] text-purple-300">
                          {isEnglish ? 'AI grounded in company context' : 'IA con contexto corporativo'}
                        </span>
                      </div>
                      <span className="text-[10px] text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                        Entrenado con tus datos
                      </span>
                    </div>
                  )}

                  {config.illustration === 'layout-grid' && (
                    <div className="w-full flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 text-blue-300 font-mono text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{isEnglish ? 'Custom workflow' : 'Flujo personalizado'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-1.5 rounded-full bg-blue-500/30 group-hover:bg-blue-400/60 transition-colors" />
                        <div className="w-3 h-1.5 rounded-full bg-blue-500/20" />
                        <div className="w-2 h-1.5 rounded-full bg-blue-500/20" />
                      </div>
                    </div>
                  )}

                  {config.illustration === 'network' && (
                    <div className="w-full flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-300">
                        <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>API & WhatsApp & ERP</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {isEnglish ? 'Validated sync' : 'Sincronización validada'}
                      </span>
                    </div>
                  )}

                  {config.illustration === 'handshake' && (
                    <div className="w-full flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-rose-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                        <span>{isEnglish ? 'Adoption support' : 'Acompañamiento de adopción'}</span>
                      </div>
                      <span className="text-[10px] font-bold text-rose-400">
                        {isEnglish ? 'On-site + remote' : 'Presencial + virtual'}
                      </span>
                    </div>
                  )}

                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-2" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
