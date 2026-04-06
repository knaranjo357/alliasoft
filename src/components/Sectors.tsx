import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  UtensilsCrossed,
  ShoppingBag,
  Plane,
  Truck,
  BarChart2,
  MessageCircle,
  Code2,
} from 'lucide-react';

const sectorIcons = [
  { icon: <UtensilsCrossed className="w-5 h-5" />, color: 'text-amber-600 bg-amber-50' },
  { icon: <ShoppingBag className="w-5 h-5" />, color: 'text-rose-600 bg-rose-50' },
  { icon: <Plane className="w-5 h-5" />, color: 'text-teal-600 bg-teal-50' },
  { icon: <Truck className="w-5 h-5" />, color: 'text-blue-600 bg-blue-50' },
  { icon: <BarChart2 className="w-5 h-5" />, color: 'text-violet-600 bg-violet-50' },
  { icon: <MessageCircle className="w-5 h-5" />, color: 'text-emerald-600 bg-emerald-50' },
  { icon: <Code2 className="w-5 h-5" />, color: 'text-indigo-600 bg-indigo-50' },
];

const Sectors: React.FC = () => {
  const { t } = useTranslation();
  const items = t('sectors.items', { returnObjects: true }) as string[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="sectors" className="py-28 px-6 bg-slate-950 border-t border-white/[0.04] relative overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase mb-4 block">
            {t('nav.sectors')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            {t('sectors.heading')}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {items.map((item, index) => {
            const meta = sectorIcons[index] || sectorIcons[0];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4 px-5 py-4 bg-white/[0.04] border border-white/[0.07] rounded-2xl hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-300 group cursor-default hover:-translate-y-0.5"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.color} opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}
                >
                  {meta.icon}
                </div>
                <span className="text-slate-200 font-semibold text-sm leading-snug group-hover:text-white transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Sectors;
