import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ArrowLeft, Sparkles, Send, Clock } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  onSubmitQuote?: (quoteData: { serviceTitle: string; selectedFeatures: string[] }) => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'ai_agent',
  onSubmitQuote,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(initialServiceId);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'WhatsApp Business API Integration',
    'Real-time metrics dashboard',
  ]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedService(initialServiceId);
    setStep(1);
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [initialServiceId, isOpen, onClose]);

  if (!isOpen) return null;

  const services = [
    { id: 'ai_agent', title: t('quoteModal.services.0.title'), desc: t('quoteModal.services.0.desc') },
    { id: 'custom_platform', title: t('quoteModal.services.1.title'), desc: t('quoteModal.services.1.desc') },
    { id: 'alliafood', title: t('quoteModal.services.2.title'), desc: t('quoteModal.services.2.desc') },
    { id: 'automation', title: t('quoteModal.services.3.title'), desc: t('quoteModal.services.3.desc') },
  ];

  const featuresList = t('quoteModal.featuresList', { returnObjects: true }) as string[];

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleFinish = () => {
    const serviceObj = services.find((s) => s.id === selectedService);
    const serviceTitle = serviceObj ? serviceObj.title : t('quoteModal.standardDiagnostic');
    if (onSubmitQuote) {
      onSubmitQuote({ serviceTitle, selectedFeatures });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-slate-800 text-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden my-8"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 id="quote-modal-title" className="font-bold text-lg text-white">{t('quoteModal.title')}</h3>
                <p className="text-xs text-slate-400">{t('quoteModal.subtitle')}</p>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              aria-label={t('quoteModal.closeBtn')}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between my-6 text-xs font-bold font-mono">
            <span className={step >= 1 ? 'text-blue-400' : 'text-slate-600'}>
              {t('quoteModal.step1')}
            </span>
            <span className="text-slate-700">→</span>
            <span className={step >= 2 ? 'text-blue-400' : 'text-slate-600'}>
              {t('quoteModal.step2')}
            </span>
            <span className="text-slate-700">→</span>
            <span className={step >= 3 ? 'text-emerald-400' : 'text-slate-600'}>
              {t('quoteModal.step3')}
            </span>
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">{t('quoteModal.selectService')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv.id)}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedService === srv.id}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') setSelectedService(srv.id);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedService === srv.id
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="font-bold text-sm text-white">{srv.title}</h5>
                      {selectedService === srv.id && <Check className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Features Checklist */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">{t('quoteModal.featuresTitle')}</h4>
              <div className="grid grid-cols-1 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                {featuresList.map((feat, idx) => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleFeature(feat)}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isChecked}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') toggleFeature(feat);
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-indigo-950/40 border-indigo-500/50 text-white'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-medium">{feat}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                          isChecked ? 'bg-indigo-600 text-white' : 'bg-slate-800 border border-slate-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Summary & Action */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  {t('quoteModal.summaryTitle')}
                </h4>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {services.find((s) => s.id === selectedService)?.title}
                </div>
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">{t('quoteModal.modulesLabel')}:</span>{' '}
                  {selectedFeatures.length > 0 ? selectedFeatures.join(', ') : t('quoteModal.standardDiagnostic')}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    {t('quoteModal.estTime')}
                  </span>
                  <span className="text-emerald-400 font-bold">{t('quoteModal.estTimeVal')}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center leading-relaxed">
                {t('quoteModal.summaryNote')}
              </p>
            </motion.div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t('quoteModal.back')}
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                {t('quoteModal.next')}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <Send className="w-4 h-4" />
                {t('quoteModal.sendQuoteBtn')}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuoteModal;
