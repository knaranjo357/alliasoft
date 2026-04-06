import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "100px",
  });
  
  const [formState, setFormState] = useState({
    fullname: '',
    email: '',
    service: 'landing',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      setFormState({
        fullname: '',
        email: '',
        service: 'landing',
        message: '',
      });
    }, 1000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8 text-blue-500" />,
      title: t('contact.email.title'),
      value: t('contact.email.value'),
      description: t('contact.email.description'),
      link: `mailto:${t('contact.email.value')}`,
    },
    {
      icon: <Phone className="w-8 h-8 text-blue-500" />,
      title: t('contact.phone.title'),
      value: t('contact.phone.value'),
      description: t('contact.phone.description'),
      link: `https://wa.me/573001002352`,
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-500" />,
      title: "WhatsApp",
      value: "+57 300 100 2352",
      description: "Mensaje directo 24/7",
      link: `https://wa.me/573001002352?text=${encodeURIComponent("Hola, me gustaría obtener más información sobre sus servicios.")}`,
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: t('contact.response.title'),
      value: t('contact.response.value'),
      description: t('contact.response.description'),
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 bg-[#FAFAFA]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t('contact.heading')}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {t('contact.subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] transform hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-100/50">{method.icon}</div>
                    <div className="ml-4">
                      <h3 className="text-base font-bold text-slate-900 mb-1">{method.title}</h3>
                      {method.link ? (
                        <a 
                          href={method.link}
                          target={method.link.startsWith('http') ? '_blank' : undefined}
                          rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-blue-600 font-medium hover:text-blue-700 transition-colors block text-sm"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-blue-600 font-medium text-sm block">{method.value}</p>
                      )}
                      <p className="text-slate-500 text-xs mt-1 font-medium tracking-wide uppercase">{method.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="bg-gradient-to-br from-blue-50/50 to-teal-50/50 p-8 rounded-2xl border border-blue-100/50 shadow-sm"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{t('contact.guarantee.title')}</h3>
                  <p className="text-slate-600 mt-2 text-sm leading-relaxed">{t('contact.guarantee.description')}</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-10"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-6 shadow-sm border border-blue-100">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">¡Gracias!</h3>
                <p className="text-slate-600">Tu mensaje ha sido enviado. Te contactaremos pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="fullname" className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('contact.form.fullname')}
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formState.fullname}
                    onChange={handleChange}
                    placeholder={t('contact.form.fullname_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.email_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('contact.form.service')}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="landing">{t('contact.form.services.landing')}</option>
                    <option value="hosting">{t('contact.form.services.hosting')}</option>
                    <option value="chatbot">{t('contact.form.services.chatbot')}</option>
                    <option value="maintenance">{t('contact.form.services.maintenance')}</option>
                  </select>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message_placeholder')}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-[0_4px_14px_0_rgba(15,23,42,0.2)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.23)] transform hover:-translate-y-1 transition-all duration-300"
                >
                  {t('contact.form.submit')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;