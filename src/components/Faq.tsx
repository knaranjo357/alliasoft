import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Search } from 'lucide-react';
import { LayersIcon, PriceTagIcon, SlidersIcon } from './icons/AlliaIcons';
import '../styles/closing.css';

interface FaqItem { q: string; a: string; }
type Category = 'all' | 'general' | 'tecnico' | 'planes';
const categoryConfig: Record<Exclude<Category, 'all'>, { label: string; icon: React.ElementType; indices: number[] }> = {
  general: { label: 'General', icon: LayersIcon, indices: [0, 1] },
  tecnico: { label: 'Técnico', icon: SlidersIcon, indices: [2, 3] },
  planes: { label: 'Planes & Precios', icon: PriceTagIcon, indices: [4] },
};

const Faq: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const isEnglish = i18n.resolvedLanguage === 'en';
  const items = t('faq.items', { returnObjects: true }) as FaqItem[];
  const filteredItems = useMemo(() => items
    .map((item, idx) => ({ ...item, originalIndex: idx }))
    .filter((item) => {
      const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' ||
        categoryConfig[activeCategory].indices.includes(item.originalIndex);
      return matchesSearch && matchesCategory;
    }), [items, searchQuery, activeCategory]);
  const categories: { key: Category; label: string; icon?: React.ElementType }[] = [
    { key: 'all', label: isEnglish ? 'All' : 'Todas' },
    ...Object.entries(categoryConfig).map(([key, val]) => ({
      key: key as Category,
      label: isEnglish
        ? ({ general: 'General', tecnico: 'Technical', planes: 'Plans & Pricing' } as Record<string, string>)[key]
        : val.label,
      icon: val.icon,
    })),
  ];

  return (
    <section id="faq" className="studio-faq" aria-labelledby="faq-heading">
      <div className="studio-closing-container studio-faq-grid">
        <div className="studio-faq-intro">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="studio-closing-eyebrow"><span aria-hidden="true" />{t('faq.tag')}</span>
            <h2 id="faq-heading">{t('faq.heading')}</h2>
            <p className="studio-faq-subheading">{t('faq.subheading')}</p>
          </motion.div>
          <div className="studio-faq-contact">
            <h3>{isEnglish ? 'Still have questions?' : '¿Aún tienes preguntas?'}</h3>
            <p>{isEnglish
              ? 'Our team is available to discuss any questions about the solutions.'
              : 'Nuestro equipo está disponible para conversar sobre cualquier duda de las soluciones.'}</p>
            <a href="#contact">
              {isEnglish ? 'Talk to our team' : 'Hablar con el equipo'}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="studio-faq-content">
          <div className="studio-faq-search" role="search">
            <Search size={18} aria-hidden="true" />
            <label htmlFor="faq-search" className="studio-closing-sr-only">{t('faq.searchPlaceholder')}</label>
            <input id="faq-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder={t('faq.searchPlaceholder')} aria-controls="faq-results" />
          </div>
          <div className="studio-faq-categories" role="group" aria-label={t('faq.tag')}>
            {categories.map(({ key, label, icon: Icon }) => (
              <button type="button" key={key} aria-pressed={activeCategory === key} aria-controls="faq-results" onClick={() => { setActiveCategory(key); setOpenIndex(null); }}>
                {Icon && <Icon size={15} aria-hidden="true" />}{label}
              </button>
            ))}
          </div>
          <div id="faq-results" className="studio-faq-list">
            {filteredItems.map((item) => {
              const isOpen = openIndex === item.originalIndex;
              const questionId = `faq-question-${item.originalIndex}`;
              const answerId = `faq-answer-${item.originalIndex}`;
              return (
                <div key={item.originalIndex} className={`studio-faq-item${isOpen ? ' is-open' : ''}`}>
                  <h3>
                    <button type="button" id={questionId} aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIndex(isOpen ? null : item.originalIndex)}>
                      <span className="studio-faq-number" aria-hidden="true">{String(item.originalIndex + 1).padStart(2, '0')}</span>
                      <span className="studio-faq-question">{item.q}</span>
                      <span className="studio-faq-toggle" aria-hidden="true"><Plus size={18} /></span>
                    </button>
                  </h3>
                  <div id={answerId} role="region" aria-labelledby={questionId} aria-hidden={!isOpen}>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div className="studio-faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                          <p>{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
            {filteredItems.length === 0 && (
              <div className="studio-faq-empty" role="status">
                <Search size={24} aria-hidden="true" />
                <p>{isEnglish ? 'No matching questions were found.' : 'No se encontraron preguntas que coincidan.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
