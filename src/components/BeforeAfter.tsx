import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

const BeforeAfter: React.FC<{ onOpenQuote?: () => void }> = ({ onOpenQuote }) => {
  const { t } = useTranslation();
  const items = t('beforeAfter.items', { returnObjects: true }) as { before: string; after: string }[];

  return (
    <section id="transformation" className="relative py-28 px-6 overflow-hidden">
      {/* Rich gradient BG — warm magenta / crimson undertone */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0515] via-[#0c0a18] to-[#08061a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_20%,rgba(236,72,153,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(16,185,129,0.06),transparent)]" />
      {/* Top/bottom glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-5 inline-flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            {t('beforeAfter.tag')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4 mb-5 text-white leading-[1.1]">{t('beforeAfter.heading')}</h2>
          <p className="text-slate-400 text-lg leading-relaxed">{t('beforeAfter.subheading')}</p>
        </motion.div>

        {/* Comparison Rows — NOT side-by-side cards */}
        <div className="space-y-4">
          {items.map((item, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/[0.04] group hover:border-white/[0.08] transition-colors"
            >
              {/* Before */}
              <div className="p-5 md:p-6 bg-rose-950/20 flex items-start gap-3 border-b md:border-b-0 md:border-r border-white/[0.04]">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <XCircle className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400/70 block mb-1">Antes</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.before}</p>
                </div>
              </div>

              {/* After */}
              <div className="p-5 md:p-6 bg-emerald-950/15 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/70 block mb-1">Con Alliasoft</span>
                  <p className="text-white text-sm font-medium leading-relaxed">{item.after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button onClick={() => onOpenQuote?.() ?? (window.location.href = '#contact')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all inline-flex items-center gap-2 group">
            <span>Agendar Transformación Operativa</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
