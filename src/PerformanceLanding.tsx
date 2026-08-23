import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LeanHeader from './components/LeanHeader';
import LeanHero from './components/LeanHero';
import SeoOverview from './components/SeoOverview';

const Features = lazy(() => import('./components/Features'));
const AiPlayground = lazy(() => import('./components/AiPlayground'));
const Solutions = lazy(() => import('./components/Solutions'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Process = lazy(() => import('./components/Process'));
const RoiCalculator = lazy(() => import('./components/RoiCalculator'));
const Faq = lazy(() => import('./components/Faq'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const QuoteModal = lazy(() => import('./components/QuoteModal'));
const SmartChatWidget = lazy(() => import('./components/SmartChatWidget'));

const PerformanceLanding: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showChat, setShowChat] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteServiceId, setQuoteServiceId] = useState('ai_agent');
  const [quotePrefill, setQuotePrefill] = useState<{ serviceTitle: string; selectedFeatures: string[] } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowChat(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const language = i18n.resolvedLanguage === 'en' ? 'en' : 'es';
    const title = t('seo.title');
    const description = t('seo.description');
    document.documentElement.lang = language;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'en' ? 'en_US' : 'es_CO');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [i18n.resolvedLanguage, t]);

  const openQuote = (serviceId = 'ai_agent') => {
    setQuoteServiceId(serviceId);
    setIsQuoteOpen(true);
  };

  const handleQuoteSubmit = (quote: { serviceTitle: string; selectedFeatures: string[] }) => {
    setQuotePrefill(quote);
    window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-slate-100 selection:bg-cyan-300 selection:text-slate-950">
      <a href="#main-content" className="skip-link">{t('accessibility.skipToContent')}</a>
      <LeanHeader />
      <main id="main-content">
        <LeanHero />
        <SeoOverview />
        <Suspense fallback={<div className="min-h-[41rem]" aria-hidden="true" />}><Features /></Suspense>
        <Suspense fallback={<div className="min-h-[47rem]" aria-hidden="true" />}><AiPlayground onOpenQuote={openQuote} /></Suspense>
        <Suspense fallback={<div className="min-h-[56rem]" aria-hidden="true" />}><Solutions onOpenQuote={openQuote} /></Suspense>
        <Suspense fallback={<div className="min-h-[58rem]" aria-hidden="true" />}><Portfolio /></Suspense>
        <Suspense fallback={<div className="min-h-[44rem]" aria-hidden="true" />}><Process /></Suspense>
        <Suspense fallback={<div className="min-h-[45rem]" aria-hidden="true" />}><RoiCalculator onOpenQuote={openQuote} /></Suspense>
        <Suspense fallback={<div className="min-h-[48rem]" aria-hidden="true" />}><Faq /></Suspense>
        <Suspense fallback={<div className="min-h-[52rem]" aria-hidden="true" />}><Contact quotePrefill={quotePrefill} /></Suspense>
      </main>
      <Suspense fallback={<div className="min-h-80" aria-hidden="true" />}><Footer onOpenQuote={() => openQuote()} /></Suspense>

      {isQuoteOpen ? (
        <Suspense fallback={null}>
          <QuoteModal
            isOpen={isQuoteOpen}
            onClose={() => setIsQuoteOpen(false)}
            initialServiceId={quoteServiceId}
            onSubmitQuote={handleQuoteSubmit}
          />
        </Suspense>
      ) : null}

      {showChat ? (
        <Suspense fallback={null}>
          <SmartChatWidget />
        </Suspense>
      ) : null}
    </div>
  );
};

export default PerformanceLanding;
