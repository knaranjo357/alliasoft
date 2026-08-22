import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, Clock, DollarSign, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

const RoiCalculator: React.FC<{ onOpenQuote?: () => void }> = ({ onOpenQuote }) => {
  const { t } = useTranslation();
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(12);
  const [hourlyRate, setHourlyRate] = useState<number>(18);

  // Calculations
  const monthlyManualHours = teamSize * hoursPerWeek * 4.33;
  const monthlyHoursSaved = Math.round(monthlyManualHours * 0.75); // 75% average efficiency gain
  const monthlyMoneySaved = Math.round(monthlyHoursSaved * hourlyRate);
  const annualSavings = Math.round(monthlyMoneySaved * 12);

  return (
    <section id="roi" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-teal-500/15 via-blue-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold tracking-widest uppercase mb-4 inline-flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5 text-teal-400" />
            {t('roiCalculator.tag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3 mb-4 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            {t('roiCalculator.heading')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            {t('roiCalculator.subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Inputs Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-8">
              {/* Control 1: Team Size */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300">
                    {t('roiCalculator.teamSize')}
                  </label>
                  <span className="text-lg font-extrabold text-teal-400 font-mono bg-teal-950/60 border border-teal-800/60 px-3 py-1 rounded-lg">
                    {teamSize} personas
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>1</span>
                  <span>25</span>
                  <span>50+</span>
                </div>
              </div>

              {/* Control 2: Hours Per Week */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300">
                    {t('roiCalculator.hoursPerWeek')}
                  </label>
                  <span className="text-lg font-extrabold text-blue-400 font-mono bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-lg">
                    {hoursPerWeek} hrs / sem
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>2 hrs</span>
                  <span>18 hrs</span>
                  <span>35 hrs</span>
                </div>
              </div>

              {/* Control 3: Hourly Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300">
                    {t('roiCalculator.hourlyRate')}
                  </label>
                  <span className="text-lg font-extrabold text-indigo-400 font-mono bg-indigo-950/60 border border-indigo-800/60 px-3 py-1 rounded-lg">
                    ${hourlyRate} USD/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>$5</span>
                  <span>$50</span>
                  <span>$100+</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Basado en promedios reales de adopción operativa (−75% tareas repetitivas)</span>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-2">
                {t('roiCalculator.resultsTitle')}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {/* Metric 1 */}
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{t('roiCalculator.monthlyHoursSaved')}</span>
                  </div>
                  <span className="text-3xl md:text-4xl font-extrabold text-white font-mono tracking-tight">
                    {monthlyHoursSaved.toLocaleString()} <span className="text-sm font-normal text-slate-400">hrs</span>
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>{t('roiCalculator.monthlyMoneySaved')}</span>
                  </div>
                  <span className="text-3xl md:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
                    ${monthlyMoneySaved.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span>{t('roiCalculator.annualSavings')}</span>
                  </div>
                  <span className="text-3xl md:text-4xl font-extrabold text-purple-300 font-mono tracking-tight">
                    ${annualSavings.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span>
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>{t('roiCalculator.paybackPeriod')}</span>
                  </div>
                  <span className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono tracking-tight">
                    {t('roiCalculator.paybackValue')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => (onOpenQuote ? onOpenQuote() : (window.location.href = '#contact'))}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>{t('roiCalculator.cta')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
