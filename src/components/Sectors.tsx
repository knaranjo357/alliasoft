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
  { icon: <UtensilsCrossed className="w-5 h-5" />, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', glow: 'group-hover:shadow-amber-500/10' },
  { icon: <ShoppingBag className="w-5 h-5" />, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', glow: 'group-hover:shadow-rose-500/10' },
  { icon: <Plane className="w-5 h-5" />, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20', glow: 'group-hover:shadow-teal-500/10' },
  { icon: <Truck className="w-5 h-5" />, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', glow: 'group-hover:shadow-blue-500/10' },
  { icon: <BarChart2 className="w-5 h-5" />, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20', glow: 'group-hover:shadow-violet-500/10' },
  { icon: <MessageCircle className="w-5 h-5" />, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', glow: 'group-hover:shadow-emerald-500/10' },
  { icon: <Code2 className="w-5 h-5" />, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', glow: 'group-hover:shadow-indigo-500/10' },
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
    <section id="sectors" className="py-32 px-6 bg-slate-950 border-t border-white/[0.04] relative overflow-hidden noise-overlay">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent z-10" />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-[-15%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-blue-500/[0.04] blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-violet-500/[0.04] blur-[80px] pointer-events-none z-0" />

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
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
                className={`flex items-center gap-4 px-5 py-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-500 group cursor-default hover:-translate-y-1 backdrop-blur-sm ${meta.glow} hover:shadow-[0_12px_32px_var(--tw-shadow-color)]`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${meta.color} border group-hover:scale-110 transition-all duration-500`}
                >
                  {meta.icon}
                </div>
                <span className="text-slate-300 font-semibold text-sm leading-snug group-hover:text-white transition-colors duration-300">
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
