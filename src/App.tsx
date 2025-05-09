import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Solutions from './components/Solutions';
import Services from './components/Services';
import Pricing from './components/Pricing';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
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
      titleElement.textContent = 'Alliasoft - ' + 
        (i18n.language === 'es' ? 'Tu Socio Tecnológico' : 'Your Technology Partner');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Solutions />
        <Services />
        <Pricing />
        <WhyChooseUs />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;