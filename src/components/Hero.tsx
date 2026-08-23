import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Zap, Sparkles, Play, ShieldCheck, ArrowRight, Activity, TrendingUp, Globe, Terminal } from 'lucide-react';

/* ── Typewriter Effect for Terminal ── */
const TypewriterLine: React.FC<{ text: string; delay: number; color: string; prefix: string; prefixColor: string }> = ({ text, delay, color, prefix, prefixColor }) => {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setShowCursor(false);
    const fullText = text;
    let idx = 0;
    let intervalId: number | undefined;
    let cursorTimer: number | undefined;
    const startCursorTimer = window.setTimeout(() => setShowCursor(true), delay);
    const typingTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        idx++;
        setDisplayed(fullText.slice(0, idx));
        if (idx >= fullText.length) {
          window.clearInterval(intervalId);
          cursorTimer = window.setTimeout(() => setShowCursor(false), 600);
        }
      }, 25);
    }, delay + 100);
    return () => {
      window.clearTimeout(startCursorTimer);
      window.clearTimeout(typingTimer);
      if (intervalId) window.clearInterval(intervalId);
      if (cursorTimer) window.clearTimeout(cursorTimer);
    };
  }, [text, delay]);
  return (
    <div className={`flex items-start gap-2 ${color}`}>
      <span className={`${prefixColor} font-bold shrink-0`}>{prefix}</span>
      <span>{displayed}{showCursor && <span className="animate-pulse text-blue-400">▎</span>}</span>
    </div>
  );
};

/* ── 3D Tilt Card ── */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px); y.set(py);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`will-change-transform ${className}`}
    >{children}</motion.div>
  );
};

/* ── Hero ── */
interface HeroProps { onOpenQuote?: () => void }

const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden text-white">
      {/* ── Rich Layered Background ── */}
      <div className="absolute inset-0 bg-[#030712]" />
      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {/* Animated gradient orbs */}
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15], x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-15%] left-[5%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-blue-600/40 via-indigo-600/25 to-transparent blur-[160px]" />
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.3, 0.1], x: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[-5%] right-[0%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-teal-500/35 via-cyan-500/15 to-transparent blur-[160px]" />
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-6 z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Status Pills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-7">
              <span className="px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-slate-300 text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg">
                <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative rounded-full h-2.5 w-2.5 bg-emerald-500" /></span>
                {t('hero.statusBadge')}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-blue-500/[0.08] border border-blue-500/20 text-blue-400 text-xs font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />{t('hero.badge')}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mb-7">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold tracking-tight leading-[1.06]">
                {t('hero.title_line1')}<br />
                {t('hero.title_line2')}{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">{t('hero.title_highlight')}</span>
                  <motion.span animate={{ scaleX: [0, 1] }} transition={{ duration: 0.8, delay: 1 }}
                    className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 rounded-full origin-left" />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              {t('hero.description')}
            </motion.p>

            {/* Action Buttons */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-6">
              <motion.button onClick={() => onOpenQuote ? onOpenQuote() : (window.location.href = '#contact')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all duration-300 flex items-center justify-center gap-2.5 text-sm sm:text-base w-full sm:w-auto overflow-hidden"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                <Sparkles className="w-4 h-4 text-amber-300 relative z-10" />
                <span className="relative z-10">{t('hero.cta1')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>

              <motion.a href="#demo"
                className="px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-slate-200 font-bold rounded-2xl transition-all text-sm sm:text-base w-full sm:w-auto justify-center flex items-center gap-2 backdrop-blur-sm"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Play className="w-4 h-4 text-blue-400 fill-current" />
                <span>{t('hero.cta2')}</span>
              </motion.a>
            </motion.div>

            {/* Trust footer */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
              className="text-slate-500 text-xs font-medium tracking-wide mb-10 flex items-center justify-center lg:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('hero.support')}</span>
            </motion.p>

          </div>

          {/* ── Right Column: 3D Tilt Interactive Terminal ── */}
          <motion.div initial={{ opacity: 0, scale: 0.92, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative hidden lg:block">

            <TiltCard className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-teal-500/15 rounded-[2rem] blur-2xl" />

              <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 shadow-[0_8px_64px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Animated border shimmer */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.15),transparent,rgba(20,184,166,0.15),transparent)]" />
                </div>
                <div className="absolute inset-[1px] bg-[#0a0f1e] rounded-3xl" />

                <div className="relative z-10 space-y-4">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-3 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                        <Terminal className="w-3 h-3" /> {t('hero.preview.engine')}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative rounded-full h-2 w-2 bg-emerald-500" /></span>
                      {t('hero.preview.live')}
                    </span>
                  </div>

                  {/* Terminal Body with Typewriter */}
                  <div className="bg-black/40 border border-white/[0.04] rounded-2xl p-4 space-y-3 font-mono text-[12px] min-h-[140px]">
                    <TypewriterLine delay={400} text={t('hero.preview.line1')}
                      prefix="[WhatsApp #102]:" prefixColor="text-blue-400" color="text-slate-300" />
                    <TypewriterLine delay={1800} text={t('hero.preview.line2')}
                      prefix="✓ IA (0.8s):" prefixColor="text-emerald-400" color="text-slate-300" />
                    <TypewriterLine delay={3200} text={t('hero.preview.line3')}
                      prefix="[ERP Sync]:" prefixColor="text-purple-400" color="text-slate-300" />
                  </div>

                  {/* Live Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] group hover:bg-white/[0.06] transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('hero.preview.leads')}</span>
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-xl font-extrabold font-mono bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">1,480</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] group hover:bg-white/[0.06] transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('hero.preview.savings')}</span>
                        <Zap className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-xl font-extrabold font-mono bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">$4,200</span>
                    </div>
                  </div>

                  {/* CTA inside card */}
                  <button onClick={() => onOpenQuote ? onOpenQuote() : (window.location.href = '#contact')}
                    className="w-full py-3 px-4 rounded-xl bg-blue-500/[0.08] border border-blue-500/20 text-blue-400 font-bold text-xs hover:bg-blue-500/15 transition-all flex items-center justify-center gap-2 group">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{t('hero.preview.quoteCta')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </TiltCard>

            {/* Floating Badge */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-xl shadow-blue-500/30 border border-white/20 flex items-center gap-1.5 z-20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {t('hero.preview.responseBadge')}
            </motion.div>

            {/* Bottom-left floating metric */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-3 -left-4 px-4 py-2.5 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] text-slate-300 font-bold text-xs shadow-xl flex items-center gap-2 z-20">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="font-mono">{t('hero.preview.availability')}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-6 left-0 right-0 flex justify-center z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <motion.a href="#demo" aria-label={t('hero.preview.scroll')} animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm flex items-center justify-center hover:border-white/[0.15] transition-colors">
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
