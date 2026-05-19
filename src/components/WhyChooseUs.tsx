import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Network, LineChart, Cpu, Lightbulb, Users } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();
  const reasons = t('whyUs.reasons', { returnObjects: true }) as { title: string; description: string }[];
  
  const iconMeta = [
    { icon: <LineChart className="w-6 h-6" />, bg: 'bg-blue-50 text-blue-600', hoverBg: 'group-hover:bg-blue-100/80', glow: 'group-hover:shadow-blue-500/10' },
    { icon: <Network className="w-6 h-6" />, bg: 'bg-indigo-50 text-indigo-600', hoverBg: 'group-hover:bg-indigo-100/80', glow: 'group-hover:shadow-indigo-500/10' },
    { icon: <Lightbulb className="w-6 h-6" />, bg: 'bg-amber-50 text-amber-600', hoverBg: 'group-hover:bg-amber-100/80', glow: 'group-hover:shadow-amber-500/10' },
    { icon: <Cpu className="w-6 h-6" />, bg: 'bg-teal-50 text-teal-600', hoverBg: 'group-hover:bg-teal-100/80', glow: 'group-hover:shadow-teal-500/10' },
    { icon: <Users className="w-6 h-6" />, bg: 'bg-rose-50 text-rose-600', hoverBg: 'group-hover:bg-rose-100/80', glow: 'group-hover:shadow-rose-500/10' },
  ];

  return (
    <section id="why-us" className="py-32 px-6 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[15%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-indigo-100/30 to-blue-100/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-8%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-violet-100/30 to-pink-100/20 blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">
            {t('nav.whyUs')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {t('whyUs.heading')}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            {t('whyUs.subheading')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {reasons.slice(0, 5).map((reason, index) => {
            const meta = iconMeta[index] || iconMeta[0];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group p-8 md:p-10 rounded-[2rem] bg-white border border-black/[0.03] shadow-[0_4px_24px_rgb(0,0,0,0.02)] hover:shadow-[0_24px_64px_rgb(0,0,0,0.08)] ${meta.glow} transition-all duration-500 relative overflow-hidden hover:-translate-y-2`}
              >
                {/* Watermark number */}
                <span className="absolute top-3 right-6 text-[5.5rem] font-black text-slate-900/[0.03] leading-none select-none pointer-events-none tabular-nums group-hover:text-slate-900/[0.05] transition-all duration-500">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className={`w-14 h-14 ${meta.bg} ${meta.hoverBg} rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ease-out relative z-10 group-hover:scale-110 group-hover:rotate-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]`}>
                  {meta.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight leading-snug relative z-10 group-hover:text-blue-900 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-[1.02rem] relative z-10">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;