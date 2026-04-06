import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, PhoneCall, CheckCircle, ShieldCheck, Zap, BellOff } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({ fullname: '', email: '', service: 'landing', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormState({ fullname: '', email: '', service: 'landing', message: '' });
    }, 1000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: t('contact.email.title'),
      value: t('contact.email.value'),
      description: t('contact.email.description'),
      link: `mailto:${t('contact.email.value')}`,
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
      title: t('contact.chat.title'),
      value: t('contact.chat.value'),
      description: t('contact.chat.description'),
      link: `https://wa.me/573176964215`,
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-violet-600" />,
      title: t('contact.call.title'),
      value: t('contact.call.value'),
      description: t('contact.call.description'),
      link: undefined,
    },
  ];

  const trustItems = [
    { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: t('contact.form.trust1') },
    { icon: <Zap className="w-3.5 h-3.5" />, label: t('contact.form.trust2') },
    { icon: <BellOff className="w-3.5 h-3.5" />, label: t('contact.form.trust3') },
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-[#FAFAFA] shrink-0">
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
            {t('nav.contact')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            {t('contact.heading')}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            {t('contact.subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Contact methods */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          >
            <div className="space-y-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="flex items-start group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-black/[0.04] group-hover:scale-110 shadow-[0_4px_24px_rgb(0,0,0,0.03)] transition-transform duration-500">
                    {method.icon}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">{method.title}</h3>
                    {method.link ? (
                      <a
                        href={method.link}
                        target={method.link.startsWith('http') ? '_blank' : undefined}
                        rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-slate-600 hover:text-blue-600 transition-colors font-semibold text-[1.05rem] mt-1 block"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-slate-600 font-semibold text-[1.05rem] mt-1 block">{method.value}</p>
                    )}
                    <p className="text-slate-400 text-sm mt-1">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="lg:col-span-7 bg-white rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_40px_rgb(0,0,0,0.03)] p-8 md:p-12 relative overflow-hidden"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-8 border-[6px] border-white shadow-lg">
                  <CheckCircle className="w-11 h-11" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                  {t('contact.form.submitted_title')}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto">
                  {t('contact.form.submitted_body')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="fullname" className="block text-sm font-bold text-slate-700 ml-1">
                      {t('contact.form.fullname')}
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      value={formState.fullname}
                      onChange={handleChange}
                      placeholder={t('contact.form.fullname_placeholder')}
                      className="w-full px-5 py-4 rounded-2xl border border-black/[0.06] bg-[#FAFAFA] text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.email_placeholder')}
                      className="w-full px-5 py-4 rounded-2xl border border-black/[0.06] bg-[#FAFAFA] text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="block text-sm font-bold text-slate-700 ml-1">
                    {t('contact.form.service')}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-2xl border border-black/[0.06] bg-[#FAFAFA] text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="landing">{t('contact.form.services.landing')}</option>
                    <option value="hosting">{t('contact.form.services.hosting')}</option>
                    <option value="chatbot">{t('contact.form.services.chatbot')}</option>
                    <option value="maintenance">{t('contact.form.services.maintenance')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-bold text-slate-700 ml-1">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message_placeholder')}
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl border border-black/[0.06] bg-[#FAFAFA] text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 px-6 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.28)] hover:-translate-y-0.5 transition-all duration-300 mt-2 text-lg flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </button>

                {/* Trust badge row */}
                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 pt-2">
                  {trustItems.map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                      <span className="text-slate-400">{item.icon}</span>
                      {item.label}
                    </span>
                  ))}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;