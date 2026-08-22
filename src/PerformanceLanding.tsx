import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LeanHeader from './components/LeanHeader';
import LeanHero from './components/LeanHero';

const Features = lazy(() => import('./components/Features'));
const AiPlayground = lazy(() => import('./components/AiPlayground'));
const BeforeAfter = lazy(() => import('./components/BeforeAfter'));
const Solutions = lazy(() => import('./components/Solutions'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Process = lazy(() => import('./components/Process'));
const RoiCalculator = lazy(() => import('./components/RoiCalculator'));
const Sectors = lazy(() => import('./components/Sectors'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Faq = lazy(() => import('./components/Faq'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const QuoteModal = lazy(() => import('./components/QuoteModal'));
const SmartChatWidget = lazy(() => import('./components/SmartChatWidget'));

function DeferredSection({ children, minHeight = 520 }: { children: React.ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '700px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={ref} style={isVisible ? undefined : { minHeight }}>
      {isVisible ? <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>{children}</Suspense> : null}
    </div>
  );
}

const PerformanceLanding: React.FC = () => {
  const { i18n } = useTranslation();
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
    const title = language === 'en'
      ? 'Alliasoft | AI, automation and custom software in Colombia'
      : 'Alliasoft | IA, automatización y software a medida en Colombia';
    const description = language === 'en'
      ? 'AI agents, AlliaFood, business automation, integrations, and custom software for companies in Colombia and Latin America.'
      : 'Agentes de IA, AlliaFood, automatización empresarial, integraciones y software a medida para empresas en Colombia y Latinoamérica.';
    document.documentElement.lang = language;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [i18n.resolvedLanguage]);

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
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <LeanHeader />
      <main id="main-content">
        <LeanHero />
        <DeferredSection minHeight={650}><Features /></DeferredSection>
        <DeferredSection minHeight={760}><AiPlayground onOpenQuote={openQuote} /></DeferredSection>
        <DeferredSection minHeight={680}><BeforeAfter onOpenQuote={openQuote} /></DeferredSection>
        <DeferredSection minHeight={900}><Solutions onOpenQuote={openQuote} /></DeferredSection>
        <DeferredSection minHeight={940}><Portfolio /></DeferredSection>
        <DeferredSection minHeight={720}><Process /></DeferredSection>
        <DeferredSection minHeight={720}><RoiCalculator onOpenQuote={openQuote} /></DeferredSection>
        <DeferredSection minHeight={560}><Sectors /></DeferredSection>
        <DeferredSection minHeight={720}><WhyChooseUs /></DeferredSection>
        <DeferredSection minHeight={760}><Faq /></DeferredSection>
        <DeferredSection minHeight={820}><Contact quotePrefill={quotePrefill} /></DeferredSection>
      </main>
      <DeferredSection minHeight={360}><Footer onOpenQuote={() => openQuote()} /></DeferredSection>

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
