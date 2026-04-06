import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  position: string;
  index: number;
  isActive: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, position, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
      transition={{ duration: 0.5 }}
      className={`absolute top-0 left-0 right-0 ${isActive ? 'z-10' : 'z-0'}`}
    >
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-10 relative">
        <Quote className="w-12 h-12 text-blue-500/10 absolute top-6 left-6" />
        
        <div className="relative z-10 px-4 pt-2">
          <p className="text-slate-700 text-xl md:text-2xl italic mb-10 leading-relaxed font-light">"{quote}"</p>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-100 tracking-wider">
              {name.split(' ').map(part => part[0]).join('')}
            </div>
            <div className="ml-4 text-left">
              <h4 className="text-base font-bold text-slate-900">{name}</h4>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{position}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      quote: t('testimonials.testimonial1.quote'),
      name: t('testimonials.testimonial1.name'),
      position: t('testimonials.testimonial1.position'),
    },
    {
      quote: t('testimonials.testimonial2.quote'),
      name: t('testimonials.testimonial2.name'),
      position: t('testimonials.testimonial2.position'),
    },
    {
      quote: t('testimonials.testimonial3.quote'),
      name: t('testimonials.testimonial3.name'),
      position: t('testimonials.testimonial3.position'),
    },
    {
      quote: t('testimonials.testimonial4.quote'),
      name: t('testimonials.testimonial4.name'),
      position: t('testimonials.testimonial4.position'),
    },
  ];

  const nextTestimonial = useCallback(() => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isAutoPlaying) {
      interval = setInterval(nextTestimonial, 5000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-24 px-4 bg-[#FAFAFA] border-b border-gray-100">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t('testimonials.heading')}
          </h2>
          <p className="text-slate-600 text-lg">
            {t('testimonials.subheading')}
          </p>
        </motion.div>

        <div className="relative">
          <div className="relative h-[350px] md:h-[280px]">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                position={testimonial.position}
                index={index}
                isActive={activeIndex === index}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-12 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-slate-300 w-2 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;