import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, MotionConfig, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';

const AiPlayground = lazy(() => import('./components/AiPlayground'));
const BeforeAfter = lazy(() => import('./components/BeforeAfter'));
const Solutions = lazy(() => import('./components/Solutions'));
const Process = lazy(() => import('./components/Process'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const RoiCalculator = lazy(() => import('./components/RoiCalculator'));
const Sectors = lazy(() => import('./components/Sectors'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Faq = lazy(() => import('./components/Faq'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const QuoteModal = lazy(() => import('./components/QuoteModal'));
const ChatWidget = lazy(() => import('./components/ChatWidget'));

/* ── Gradient Section Divider ── */
const SectionDivider: React.FC<{ color?: string }> = ({ color = 'blue' }) => {
  const colors: Record<string, string> = {
    blue: 'via-blue-500/25',
    teal: 'via-teal-500/25',
    purple: 'via-purple-500/25',
    indigo: 'via-indigo-500/25',
    emerald: 'via-emerald-500/25',
    rose: 'via-rose-500/25',
    amber: 'via-amber-500/25',
    cyan: 'via-cyan-500/25',
  };
  return <div className={`h-px bg-gradient-to-r from-transparent ${colors[color] || colors.blue} to-transparent`} />;
};

function App() {
  const { t, i18n } = useTranslation();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteServiceId, setQuoteServiceId] = useState<string>('ai_agent');
  const [quotePrefill, setQuotePrefill] = useState<{ serviceTitle: string; selectedFeatures: string[] } | null>(null);
  const [showChat, setShowChat] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const syncDocumentMetadata = (language: string) => {
      document.documentElement.lang = language.startsWith('es') ? 'es' : 'en';
      document.title = i18n.t('seo.title');
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', i18n.t('seo.description'));
    };

    syncDocumentMetadata(i18n.resolvedLanguage || i18n.language);
    i18n.on('languageChanged', syncDocumentMetadata);
    return () => i18n.off('languageChanged', syncDocumentMetadata);
  }, [i18n]);

  useEffect(() => {
    const chatTimer = window.setTimeout(() => setShowChat(true), 6500);
    return () => window.clearTimeout(chatTimer);
  }, []);

  const handleOpenQuote = (serviceId: string = 'ai_agent') => {
    setQuoteServiceId(serviceId);
    setIsQuoteOpen(true);
  };

  const handleQuoteSubmit = (quoteData: { serviceTitle: string; selectedFeatures: string[] }) => {
    setQuotePrefill(quoteData);
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('contact-name')?.focus({ preventScroll: true });
    }, 80);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#030712] text-slate-100 font-sans overflow-x-hidden antialiased selection:bg-blue-600 selection:text-white">
        <a href="#main-content" className="skip-link">{t('accessibility.skipToContent')}</a>
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 z-[60] origin-left"
        />

        <Header onOpenQuote={handleOpenQuote} />
        <main id="main-content" className="relative">
          <Hero onOpenQuote={handleOpenQuote} />
          <SectionDivider color="blue" />
          <Features />
          <Suspense fallback={<div className="min-h-32 bg-[#030712]" aria-hidden="true" />}>
            <SectionDivider color="indigo" />
            <AiPlayground onOpenQuote={handleOpenQuote} />
            <SectionDivider color="rose" />
            <BeforeAfter onOpenQuote={handleOpenQuote} />
            <SectionDivider color="emerald" />
            <Solutions onOpenQuote={handleOpenQuote} />
            <SectionDivider color="purple" />
            <Portfolio />
            <SectionDivider color="teal" />
            <Process />
            <SectionDivider color="cyan" />
            <RoiCalculator onOpenQuote={handleOpenQuote} />
            <SectionDivider color="indigo" />
            <Sectors />
            <SectionDivider color="amber" />
            <WhyChooseUs />
            <SectionDivider color="teal" />
            <Faq />
            <SectionDivider color="blue" />
            <Contact quotePrefill={quotePrefill} />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer onOpenQuote={handleOpenQuote} />
          {isQuoteOpen ? (
            <QuoteModal
              isOpen={isQuoteOpen}
              onClose={() => setIsQuoteOpen(false)}
              initialServiceId={quoteServiceId}
              onSubmitQuote={handleQuoteSubmit}
            />
          ) : null}
          {showChat ? <ChatWidget /> : null}
        </Suspense>
      </div>
    </MotionConfig>
  );
}

export default App;