import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Sparkles, ArrowRight, CheckCircle, Cpu, Zap, RefreshCw, Terminal } from 'lucide-react';

type TabKey = 'whatsapp' | 'leads' | 'extraction';

const tabColors: Record<TabKey, { ring: string; bg: string; text: string; glow: string }> = {
  whatsapp: { ring: 'ring-emerald-500', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  leads: { ring: 'ring-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  extraction: { ring: 'ring-violet-500', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'shadow-violet-500/20' },
};

const AiPlayground: React.FC<{ onOpenQuote?: (serviceId?: string) => void }> = ({ onOpenQuote }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('whatsapp');
  const [showThinking, setShowThinking] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [keyCounter, setKeyCounter] = useState(0);

  const sc = {
    title: t(`aiPlayground.scenarios.${activeTab}.title`),
    subtitle: t(`aiPlayground.scenarios.${activeTab}.subtitle`),
    userMsg: t(`aiPlayground.scenarios.${activeTab}.userMsg`),
    agentThinking: t(`aiPlayground.scenarios.${activeTab}.agentThinking`),
    agentReply: t(`aiPlayground.scenarios.${activeTab}.agentReply`),
    metrics: t(`aiPlayground.scenarios.${activeTab}.metrics`, { returnObjects: true }) as { label: string; value: string }[],
  };

  useEffect(() => {
    setShowThinking(false);
    setShowReply(false);
    const t1 = setTimeout(() => setShowThinking(true), 500);
    const t2 = setTimeout(() => { setShowThinking(false); setShowReply(true); }, 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [activeTab, keyCounter]);

  const colors = tabColors[activeTab];

  return (
    <section id="demo" className="relative py-28 px-6 overflow-hidden">
      {/* Layered gradient background — NOT flat slate */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#0c1222] to-[#0a0f1e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.12),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-5 inline-flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            {t('aiPlayground.tag')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4 mb-5 text-white leading-[1.1]">
            {t('aiPlayground.heading')}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">{t('aiPlayground.subheading')}</p>
          <p className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] px-5 py-3 text-sm leading-6 text-amber-100/80">
            {t('aiPlayground.disclaimer')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(['whatsapp', 'leads', 'extraction'] as TabKey[]).map((tab) => {
            const c = tabColors[tab];
            const active = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  active
                    ? `${c.bg} ${c.text} ring-2 ${c.ring} shadow-lg ${c.glow}`
                    : 'bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                }`}
              >
                {tab === 'whatsapp' && <Zap className="w-4 h-4" />}
                {tab === 'leads' && <Cpu className="w-4 h-4" />}
                {tab === 'extraction' && <RefreshCw className="w-4 h-4" />}
                {t(`aiPlayground.tabs.${tab}`)}
              </button>
            );
          })}
        </div>

        {/* Main Container */}
        <motion.div layout className="rounded-[2rem] border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-2 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[1.75rem] overflow-hidden bg-slate-950/60">
            
            {/* Chat Column */}
            <div className="lg:col-span-7 p-6 md:p-8 flex flex-col min-h-[460px] border-r border-white/[0.04]">
              {/* Chat header */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/25`}>
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      AlliaBot Pro
                      <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" /></span>
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">{sc.subtitle}</p>
                  </div>
                </div>
                <button onClick={() => setKeyCounter(p => p + 1)}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all">
                  <RefreshCw className="w-3 h-3" /> {t('aiPlayground.tryPrompt')}
                </button>
              </div>

              {/* Messages */}
              <div className="flex-grow space-y-5">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end gap-2.5">
                  <div className="bg-blue-600 text-white p-4 rounded-[1.25rem] rounded-tr-md max-w-[82%] text-sm shadow-lg shadow-blue-600/20">
                    <p className="leading-relaxed">{sc.userMsg}</p>
                    <span className="text-[10px] text-blue-200/70 block text-right mt-1.5 font-mono">10:42 AM ✓✓</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 mt-1"><User className="w-4 h-4 text-slate-400" /></div>
                </motion.div>

                <AnimatePresence>
                  {showThinking && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-indigo-500/[0.08] border border-indigo-500/20 w-fit text-xs text-indigo-300">
                      <div className="flex gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" /><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" /><span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" /></div>
                      <span className="font-mono">{sc.agentThinking}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {showReply && (
                  <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', damping: 22 }}
                    className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shrink-0 mt-1 shadow-md"><Bot className="w-4 h-4 text-white" /></div>
                    <div className="bg-white/[0.04] border border-white/[0.08] text-slate-200 p-4 rounded-[1.25rem] rounded-tl-md max-w-[88%] text-sm shadow-xl">
                      <p className="leading-relaxed">{sc.agentReply}</p>
                      <span className="text-[10px] text-slate-500 mt-2 font-mono flex items-center gap-1.5 pt-2 border-t border-white/[0.05]">
                        <CheckCircle className="w-3 h-3 text-emerald-400" /> Alliasoft · {t('aiPlayground.tag')}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Metrics Column */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-transparent to-blue-950/20">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">{t('aiPlayground.flowTitle')}</span>
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-1.5 tracking-tight">{sc.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{sc.subtitle}</p>

                <div className="space-y-3">
                  {sc.metrics?.map((m, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between group hover:bg-white/[0.06] transition-colors">
                      <span className="text-slate-400 text-sm">{m.label}</span>
                      <span className={`text-lg font-black font-mono ${colors.text}`}>{m.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <button onClick={() => onOpenQuote?.('ai_agent') ?? (window.location.href = '#contact')}
                className="mt-8 w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group">
                <span>{t('aiPlayground.quoteTrigger')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AiPlayground;
