import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Plane,
  UtensilsCrossed,
  Truck,
  ShoppingCart,
  Store,
  Inbox,
} from 'lucide-react';

/* ─── Category Themes ──────────────────────────────────────────── */

const categoryThemes: Record<
  string,
  {
    gradient: string;
    border: string;
    activePill: string;
    text: string;
    tagBg: string;
    tagBorder: string;
    icon: React.ReactNode;
    watermark: string;
  }
> = {
  ai: {
    gradient: 'from-teal-600/80 via-emerald-700/60 to-teal-900/90',
    border: 'hover:border-teal-400/40',
    activePill: 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25',
    text: 'text-teal-400',
    tagBg: 'bg-teal-500/10',
    tagBorder: 'border-teal-500/20',
    icon: <Plane className="w-16 h-16" />,
    watermark: 'AI & TOURISM',
  },
  product: {
    gradient: 'from-amber-600/80 via-orange-700/60 to-amber-900/90',
    border: 'hover:border-amber-400/40',
    activePill: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25',
    text: 'text-amber-400',
    tagBg: 'bg-amber-500/10',
    tagBorder: 'border-amber-500/20',
    icon: <UtensilsCrossed className="w-16 h-16" />,
    watermark: 'PRODUCT',
  },
  crm: {
    gradient: 'from-blue-600/80 via-indigo-700/60 to-blue-900/90',
    border: 'hover:border-blue-400/40',
    activePill: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25',
    text: 'text-blue-400',
    tagBg: 'bg-blue-500/10',
    tagBorder: 'border-blue-500/20',
    icon: <Truck className="w-16 h-16" />,
    watermark: 'LOGISTICS',
  },
  ecommerce: {
    gradient: 'from-violet-600/80 via-purple-700/60 to-violet-900/90',
    border: 'hover:border-violet-400/40',
    activePill: 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25',
    text: 'text-violet-400',
    tagBg: 'bg-violet-500/10',
    tagBorder: 'border-violet-500/20',
    icon: <ShoppingCart className="w-16 h-16" />,
    watermark: 'E-COMMERCE',
  },
  retail: {
    gradient: 'from-rose-600/80 via-pink-700/60 to-rose-900/90',
    border: 'hover:border-rose-400/40',
    activePill: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25',
    text: 'text-rose-400',
    tagBg: 'bg-rose-500/10',
    tagBorder: 'border-rose-500/20',
    icon: <Store className="w-16 h-16" />,
    watermark: 'RETAIL',
  },
};

/* ─── Static Project Data ──────────────────────────────────────── */

const projectMeta = [
  {
    url: 'https://wa.me/573176964215?text=Hola%20quiero%20demo%20de%20agente%20turismo',
    category: 'ai',
    industry: 'Tourism & Travel',
  },
  {
    url: 'https://alliafood.com',
    category: 'product',
    industry: 'Gastronomy & Food',
  },
  {
    url: '#contact',
    category: 'crm',
    industry: 'Logistics & Fleet',
  },
  {
    url: '#contact',
    category: 'ecommerce',
    industry: 'International Commerce',
  },
  {
    url: '#contact',
    category: 'retail',
    industry: 'Retail & B2B',
  },
];

/* ─── Filter Definitions ───────────────────────────────────────── */

const filters = [
  { id: 'all', label: 'Todos los Casos', color: 'all' as const },
  { id: 'ai', label: 'IA & WhatsApp', color: 'ai' as const },
  { id: 'product', label: 'AlliaFood (Producto)', color: 'product' as const },
  { id: 'crm', label: 'Logística & CRM', color: 'crm' as const },
  { id: 'ecommerce', label: 'E-commerce', color: 'ecommerce' as const },
];

/* ─── Shimmer Keyframes (injected once) ────────────────────────── */

const shimmerStyle = `
@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(12deg); }
  100% { transform: translateX(100%) rotate(12deg); }
}
`;

/* ─── Component ────────────────────────────────────────────────── */

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Pull translated project data
  const projectsData = t('portfolio.projects', {
    returnObjects: true,
  }) as { title: string; description: string; tags: string[] }[];

  // Merge translated text with static meta
  const projects = projectsData.map((proj, i) => ({
    ...proj,
    url: projectMeta[i]?.url || '#',
    category: projectMeta[i]?.category || 'ai',
    industry: projectMeta[i]?.industry || '',
    theme: categoryThemes[projectMeta[i]?.category || 'ai'],
  }));

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleCardClick = (url: string) => {
    if (url.startsWith('#')) {
      const el = document.querySelector(url);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {/* Inject shimmer animation */}
      <style>{shimmerStyle}</style>

      <section
        id="portfolio"
        className="relative py-28 px-6 bg-gradient-to-b from-[#050510] via-[#0a0820] to-[#06051a] text-white overflow-hidden"
      >
        {/* ── Section Divider ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

        {/* ── Ambient Glow ── */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/[0.04] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-teal-600/[0.03] blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-bold tracking-[0.2em] uppercase mb-5">
              {t('nav.portfolio')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.1] mb-5 bg-gradient-to-r from-white via-violet-100 to-violet-300/80 bg-clip-text text-transparent">
              {t('portfolio.heading')}
            </h2>
            <p className="text-slate-400/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {t('portfolio.subheading')}
            </p>
          </motion.div>

          {/* ── Filter Pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2.5 mb-14"
          >
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              const theme = f.id !== 'all' ? categoryThemes[f.id] : null;

              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`
                    px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300
                    ${
                      isActive
                        ? f.id === 'all'
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                          : theme?.activePill || ''
                        : 'bg-transparent text-slate-400 border border-slate-700/60 hover:border-slate-500/80 hover:text-slate-200'
                    }
                  `}
                >
                  {f.label}
                </button>
              );
            })}
          </motion.div>

          {/* ── Masonry Grid ── */}
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              /* ── Empty State ── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center mb-6">
                  <Inbox className="w-9 h-9 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">
                  No hay proyectos en esta categoría
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Selecciona otra categoría o vuelve a "Todos los Casos" para ver todos los proyectos.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="columns-1 md:columns-2 gap-6 space-y-6"
              >
                {filteredProjects.map((project, index) => {
                  const theme = project.theme;
                  // Vary card heights for masonry effect
                  const isFeature = index % 3 === 0;

                  return (
                    <motion.div
                      key={`${activeFilter}-${index}`}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onClick={() => handleCardClick(project.url)}
                      className={`
                        break-inside-avoid group cursor-pointer
                        rounded-2xl overflow-hidden
                        bg-[#0c0b1a]/80 backdrop-blur-sm
                        border border-slate-800/50
                        ${theme.border}
                        transition-all duration-500
                        hover:shadow-2xl hover:shadow-black/40
                        hover:-translate-y-1
                      `}
                    >
                      {/* ── Card Header with Gradient + Watermark ── */}
                      <div
                        className={`
                          relative overflow-hidden
                          ${isFeature ? 'h-56' : 'h-48'}
                          bg-gradient-to-br ${theme.gradient}
                        `}
                      >
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/15" />

                        {/* Animated Shimmer */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
                            animation: 'shimmer 2.5s infinite',
                          }}
                        />

                        {/* Watermark Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                          <span className="text-[4.5rem] md:text-[5.5rem] font-black text-white/[0.05] tracking-[0.15em] whitespace-nowrap leading-none">
                            {theme.watermark}
                          </span>
                        </div>

                        {/* Category Icon */}
                        <div className="absolute bottom-4 right-4 text-white/[0.1] group-hover:text-white/[0.18] transition-all duration-500 group-hover:scale-110">
                          {theme.icon}
                        </div>

                        {/* Top Row: Industry Badge + External Link */}
                        <div className="relative z-10 flex justify-between items-start p-5">
                          <span className={`px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase ${theme.text}`}>
                            {project.industry}
                          </span>
                          <span
                            className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>

                        {/* Title at bottom of header */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 pt-8 bg-gradient-to-t from-black/50 to-transparent">
                          <h3 className="relative z-10 text-lg md:text-xl font-extrabold text-white leading-snug drop-shadow-lg">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      {/* ── Card Body ── */}
                      <div className="p-5 md:p-6">
                        <p className="text-slate-400/90 text-[13px] md:text-sm leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className={`
                                px-3 py-1 rounded-lg text-[11px] font-semibold
                                ${theme.tagBg} ${theme.tagBorder} border
                                ${theme.text}
                              `}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom section divider ── */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </section>
    </>
  );
};

export default Portfolio;