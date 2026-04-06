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
  const icons = [
    <LineChart className="w-6 h-6" />,
    <Network className="w-6 h-6" />,
    <Lightbulb className="w-6 h-6" />,
    <Cpu className="w-6 h-6" />,
    <Users className="w-6 h-6" />,
  ];

  return (
    <section id="why-us" className="py-32 px-6 bg-[#FAFAFA]">
      <div className="container mx-auto max-w-7xl">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
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
          {reasons.slice(0, 5).map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 md:p-10 rounded-[2rem] bg-white border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_24px_48px_rgb(0,0,0,0.07)] transition-all duration-500 relative overflow-hidden"
            >
              {/* Watermark number */}
              <span className="absolute top-3 right-6 text-[5.5rem] font-black text-slate-900/[0.032] leading-none select-none pointer-events-none tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-500 ease-out relative z-10">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight leading-snug relative z-10">
                {reason.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-[1.02rem] relative z-10">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;