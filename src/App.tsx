import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Solutions from './components/Solutions';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Sectors from './components/Sectors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set default language based on browser
    const defaultLang = navigator.language.startsWith('es') ? 'es' : 'en';
    i18n.changeLanguage(defaultLang);
    
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;
    
    // Update page title
    const titleElement = document.querySelector('title');
    if (titleElement) {
      titleElement.textContent = 'Alliasoft — ' + 
        (i18n.language === 'es' 
          ? 'Transformación Operativa con IA' 
          : 'Operational Transformation with AI');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 font-sans overflow-x-hidden antialiased">
      <Header />
      <main className="relative bg-[#FAFAFA]">
        <Hero />
        <Features />
        <Solutions />
        <Process />
        <Portfolio />
        <Sectors />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;