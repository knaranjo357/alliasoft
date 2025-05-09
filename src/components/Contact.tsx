import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MessageCircle, Clock, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
    // In a real app, you would submit the form data to your backend here
    
    // Simulating form submission
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
    },
    {
      icon: <Phone className="w-8 h-8 text-blue-500" />,
      title: t('contact.phone.title'),
      value: t('contact.phone.value'),
      description: t('contact.phone.description'),
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
      title: t('contact.chat.title'),
      value: t('contact.chat.value'),
      description: t('contact.chat.description'),
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: t('contact.response.title'),
      value: t('contact.response.value'),
      description: t('contact.response.description'),
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('contact.heading')}
          </h2>
          <p className="text-gray-600 text-lg">
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-lg"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">{method.icon}</div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{method.title}</h3>
                      <p className="text-blue-600 font-semibold">{method.value}</p>
                      <p className="text-gray-500 text-sm mt-1">{method.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-lg"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{t('contact.guarantee.title')}</h3>
                  <p className="text-gray-600 mt-1">{t('contact.guarantee.description')}</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-600">Your message has been sent successfully. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.fullname')}
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formState.fullname}
                    onChange={handleChange}
                    placeholder={t('contact.form.fullname_placeholder')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.email_placeholder')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.service')}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="landing">{t('contact.form.services.landing')}</option>
                    <option value="hosting">{t('contact.form.services.hosting')}</option>
                    <option value="chatbot">{t('contact.form.services.chatbot')}</option>
                    <option value="maintenance">{t('contact.form.services.maintenance')}</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message_placeholder')}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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