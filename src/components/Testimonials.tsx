import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
    { quote: t('testimonials.testimonial1.quote'), name: t('testimonials.testimonial1.name'), position: t('testimonials.testimonial1.position') },
    { quote: t('testimonials.testimonial2.quote'), name: t('testimonials.testimonial2.name'), position: t('testimonials.testimonial2.position') },
    { quote: t('testimonials.testimonial3.quote'), name: t('testimonials.testimonial3.name'), position: t('testimonials.testimonial3.position') },
    { quote: t('testimonials.testimonial4.quote'), name: t('testimonials.testimonial4.name'), position: t('testimonials.testimonial4.position') },
  ];

  return (
    <section className="py-32 px-6 bg-white shrink-0">
      <div className="container mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">{t('testimonials.heading')}</h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">{t('testimonials.subheading')}</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants} className="group p-8 md:p-12 bg-[#FAFAFA] rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 relative flex flex-col">
              <Quote className="w-12 h-12 text-blue-100 absolute top-8 left-8 transform -scale-x-100 group-hover:text-blue-200 transition-colors" />
              <div className="relative z-10 pt-8 flex-1 flex flex-col">
                <p className="text-slate-700 text-xl md:text-2xl font-light mb-10 leading-relaxed flex-1">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold tracking-wider shrink-0 text-xl shadow-sm border border-slate-100">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-5">
                    <h4 className="text-lg font-bold text-slate-900 tracking-tight">{testimonial.name}</h4>
                    <p className="text-[0.85rem] font-medium text-slate-500 uppercase tracking-wider">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default Testimonials;