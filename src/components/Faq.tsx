import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, MessageCircle, Layers, Settings, CreditCard } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

type Category = 'all' | 'general' | 'tecnico' | 'planes';

const categoryConfig: Record<Exclude<Category, 'all'>, {
  label: string;
  icon: React.ElementType;
  indices: number[];
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
}> = {
  general: {
    label: 'General',
    icon: Layers,
    indices: [0, 1],
    color: 'from-blue-500 to-cyan-400',
    borderColor: 'border-l-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
  },
  tecnico: {
    label: 'Técnico',
    icon: Settings,
    indices: [2, 3],
    color: 'from-emerald-500 to-teal-400',
    borderColor: 'border-l-emerald-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
  },
  planes: {
    label: 'Planes & Precios',
    icon: CreditCard,
    indices: [4],
    color: 'from-amber-500 to-orange-400',
    borderColor: 'border-l-amber-500',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
  },
};

function getCategoryForIndex(idx: number): Exclude<Category, 'all'> {
  for (const [key, config] of Object.entries(categoryConfig)) {
    if (config.indices.includes(idx)) return key as Exclude<Category, 'all'>;
  }
  return 'general';
}

const Faq: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const items = t('faq.items', { returnObjects: true }) as FaqItem[];

  const filteredItems = useMemo(() => {
    return items
      .map((item, idx) => ({ ...item, originalIndex: idx }))
      .filter((item) => {
        const matchesSearch =
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          activeCategory === 'all' ||
          categoryConfig[activeCategory].indices.includes(item.originalIndex);
        return matchesSearch && matchesCategory;
      });
  }, [items, searchQuery, activeCategory]);

  const categories: { key: Category; label: string; icon?: React.ElementType }[] = [
    { key: 'all', label: 'Todos' },
    ...Object.entries(categoryConfig).map(([key, val]) => ({
      key: key as Category,
      label: val.label,
      icon: val.icon,
    })),
  ];

  return (
    <section
      id="faq"
      className="py-28 px-6 bg-gradient-to-b from-[#04080f] via-[#060c19] to-[#040810] text-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-600/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-5 inline-flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" />
            {t('faq.tag')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight mt-4 mb-5 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-tight">
            {t('faq.heading')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            {t('faq.subheading')}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            const IconComp = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setOpenIndex(null);
                }}
                className={`
                  relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300
                  ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20 shadow-lg shadow-white/5'
                      : 'bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-slate-200 hover:border-white/10'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  {IconComp && <IconComp className="w-3.5 h-3.5" />}
                  {cat.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="faq-tab-indicator"
                    className="absolute inset-0 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative max-w-lg mx-auto mb-12"
        >
          <div
            className={`
              absolute -inset-[2px] rounded-2xl transition-opacity duration-500
              bg-gradient-to-r from-emerald-500/60 via-blue-500/60 to-emerald-500/60
              ${isSearchFocused ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ filter: 'blur(1px)' }}
          />
          <div className="relative glass-card rounded-2xl">
            <Search
              className={`w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                isSearchFocused ? 'text-emerald-400' : 'text-slate-500'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={t('faq.searchPlaceholder')}
              className="w-full bg-transparent rounded-2xl py-4 pl-12 pr-5 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const cat = getCategoryForIndex(item.originalIndex);
            const config = categoryConfig[cat];

            return (
              <motion.div
                key={item.originalIndex}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`
                  glass-card rounded-2xl overflow-hidden
                  border-l-[3px] ${config.borderColor}
                  hover:border-l-[3px]
                  ${isOpen ? 'ring-1 ring-white/[0.08]' : ''}
                `}
                style={{ transform: 'translateY(0)' }} // prevent glass-card hover transform
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`
                        w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold
                        ${config.bgColor} ${config.textColor}
                      `}
                    >
                      {item.originalIndex + 1}
                    </div>
                    <span className="font-bold text-base md:text-lg text-slate-100 group-hover:text-white transition-colors leading-snug">
                      {item.q}
                    </span>
                  </div>
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center shrink-0
                      transition-all duration-300 ease-out
                      ${
                        isOpen
                          ? 'rotate-180 bg-emerald-500/15 text-emerald-400 shadow-lg shadow-emerald-500/10'
                          : 'bg-white/[0.05] text-slate-500 group-hover:bg-white/[0.08] group-hover:text-slate-300'
                      }
                    `}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" />
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed pl-12">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Search className="w-10 h-10 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 text-sm">No se encontraron preguntas que coincidan.</p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-2xl p-8 md:p-10 max-w-xl mx-auto relative overflow-hidden" style={{ transform: 'translateY(0)' }}>
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-emerald-500/10 blur-[60px] rounded-full" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                ¿Aún tienes preguntas?
              </h3>
              <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
                Nuestro equipo está disponible para ayudarte con cualquier duda sobre nuestras soluciones.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.03] transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Chatea con nuestro equipo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
