import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  Calendar,
  CheckCircle,
  ShieldCheck,
  Clock,
  Send,
  Sparkles,
  Loader2,
} from 'lucide-react';
import BookingScheduler from './BookingScheduler';

/* ─── Types ─── */
interface ContactProps {
  quotePrefill?: { serviceTitle: string; selectedFeatures: string[] } | null;
}

type LeadPayload = {
  lead_id: string;
  created_at: string;
  source: string;
  locale: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  page_url: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  consent: boolean;
  consent_at: string;
  whatsapp_opened: boolean;
};

const PENDING_LEADS_KEY = 'alliasoft-pending-leads';

function getPendingLeads(): LeadPayload[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(PENDING_LEADS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.slice(-5) : [];
  } catch {
    return [];
  }
}

function setPendingLeads(leads: LeadPayload[]) {
  localStorage.setItem(PENDING_LEADS_KEY, JSON.stringify(leads.slice(-5)));
}

async function sendLead(payload: LeadPayload) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      keepalive: true,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeout);
  }
}

/* ─── Animated floating input ─── */
const FloatingInput: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, type = 'text', value, required, onChange }) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative group">
      <input
        id={name === 'fullname' ? 'contact-name' : name}
        aria-label={label}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="floating-field-input peer w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 pt-6 pb-3 text-sm text-white placeholder-transparent
                   focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06]
                   focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15),0_0_20px_-5px_rgba(59,130,246,0.2)]
                   transition-all duration-300"
        placeholder={label}
      />
      <label
        htmlFor={name === 'fullname' ? 'contact-name' : name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none
          ${isActive
            ? 'top-2 text-[10px] font-bold tracking-widest uppercase text-blue-400'
            : 'top-1/2 -translate-y-1/2 text-sm text-slate-500'
          }`}
      >
        {label}
      </label>
      {/* Bottom gradient line on focus */}
      <div
        className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-500
          ${focused ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
      />
    </div>
  );
};

/* ─── Confetti particle ─── */
const ConfettiParticle: React.FC<{ delay: number; color: string }> = ({ delay, color }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ background: color }}
    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
    animate={{
      opacity: [1, 1, 0],
      scale: [0, 1.2, 0.6],
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200 - 60,
    }}
    transition={{ duration: 1.2, delay, ease: 'easeOut' }}
  />
);

/* ─── Main Contact Component ─── */
const Contact: React.FC<ContactProps> = ({ quotePrefill }) => {
  const { t, i18n } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, setFormState] = useState({
    fullname: '',
    email: '',
    phone: '',
    company: '',
    service: 'landing',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);

  useEffect(() => {
    const pendingLeads = getPendingLeads();
    if (pendingLeads.length === 0) return;

    void (async () => {
      const remaining: LeadPayload[] = [];
      for (const lead of pendingLeads) {
        if (!(await sendLead(lead))) remaining.push(lead);
      }
      setPendingLeads(remaining);
    })();
  }, []);

  useEffect(() => {
    if (quotePrefill) {
      const summaryMsg =
        '[' + t('contact.form.quotePrefix') + ']: ' + quotePrefill.serviceTitle + '\n' +
        t('contact.form.features') + ': ' +
        (
          quotePrefill.selectedFeatures.length > 0
            ? quotePrefill.selectedFeatures.join(', ')
            : t('contact.form.standardDiagnostic')
        );
      setFormState((prev) => ({ ...prev, message: summaryMsg }));
    }
  }, [quotePrefill, t]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving || !consentAccepted) return;

    setIsSaving(true);
    const serviceLabel = t(`contact.form.services.${formState.service}`);
    const whatsappMessage = [
      t('contact.form.whatsappIntro'),
      '',
      `${t('contact.form.fullname')}: ${formState.fullname.trim()}`,
      `${t('contact.form.email')}: ${formState.email.trim()}`,
      `${t('contact.form.phone')}: ${formState.phone.trim()}`,
      `${t('contact.form.company')}: ${formState.company.trim() || '-'}`,
      `${t('contact.form.service')}: ${serviceLabel}`,
      `${t('contact.form.message')}:`,
      formState.message.trim(),
    ].join('\n');
    const url = `https://wa.me/573176964215?text=${encodeURIComponent(whatsappMessage)}`;

    const query = new URLSearchParams(window.location.search);
    const now = new Date().toISOString();
    const lead: LeadPayload = {
      lead_id: window.crypto?.randomUUID?.() || `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      created_at: now,
      source: 'alliasoft_webpage',
      locale: i18n.resolvedLanguage === 'en' ? 'en' : 'es',
      full_name: formState.fullname.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      company: formState.company.trim(),
      service: serviceLabel,
      message: formState.message.trim(),
      page_url: window.location.href,
      referrer: document.referrer,
      utm_source: query.get('utm_source') || '',
      utm_medium: query.get('utm_medium') || '',
      utm_campaign: query.get('utm_campaign') || '',
      utm_content: query.get('utm_content') || '',
      utm_term: query.get('utm_term') || '',
      consent: true,
      consent_at: now,
      whatsapp_opened: true,
    };

    const pending = getPendingLeads().filter((item) => item.lead_id !== lead.lead_id);
    setPendingLeads([...pending, lead]);
    const popup = window.open(url, '_blank');
    if (popup) {
      popup.opener = null;
    } else {
      window.location.assign(url);
    }

    const saved = await sendLead(lead);
    if (saved) {
      setPendingLeads(getPendingLeads().filter((item) => item.lead_id !== lead.lead_id));
    }
    setIsSubmitted(true);
    setIsSaving(false);
  };

  /* ─── Contact method cards data ─── */
  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      iconColor: 'text-blue-400',
      glowColor: 'group-hover:shadow-blue-500/20',
      iconBg: 'bg-blue-500/15 border-blue-500/30',
      cardClass: 'glass-card-blue hover-glow-blue',
      title: t('contact.email.title'),
      value: t('contact.email.value'),
      link: `mailto:${t('contact.email.value')}`,
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      iconColor: 'text-emerald-400',
      glowColor: 'group-hover:shadow-emerald-500/20',
      iconBg: 'bg-emerald-500/15 border-emerald-500/30',
      cardClass: 'glass-card hover-glow-teal',
      title: t('contact.chat.title'),
      value: t('contact.chat.value'),
      link: 'https://wa.me/573176964215',
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      iconColor: 'text-purple-400',
      glowColor: 'group-hover:shadow-purple-500/20',
      iconBg: 'bg-purple-500/15 border-purple-500/30',
      cardClass: 'glass-card-purple hover-glow-purple',
      title: t('contact.call.title'),
      value: t('contact.call.value'),
      link: '#booking',
    },
  ];

  /* ─── Confetti colors ─── */
  const confettiColors = [
    '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981',
    '#f59e0b', '#ec4899', '#6366f1', '#14b8a6',
  ];

  /* ─── Trust badges ─── */
  const trustBadges = [
    { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, label: 'Tus datos viajan directo a WhatsApp' },
    { icon: <Clock className="w-4 h-4 text-blue-400" />, label: 'Respuesta en un día hábil' },
  ];

  const localizedTrustBadges = i18n.isInitialized
    ? [
        { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, label: t('contact.form.trust1') },
        { icon: <Clock className="w-4 h-4 text-blue-400" />, label: t('contact.form.trust2') },
      ]
    : trustBadges;
  const messageIsActive = messageFocused || formState.message.length > 0;

  return (
    <section
      id="contact"
      className="relative py-28 px-6 text-white overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #030712 0%, #0c1631 50%, #030712 100%)',
      }}
    >
      {/* ─── Radial glow center ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.04) 40%, transparent 80%)',
        }}
      />

      {/* ─── Top gradient divider line ─── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

      {/* ─── Floating orb decorations ─── */}
      <div className="absolute top-32 left-[10%] w-72 h-72 bg-blue-600/[0.06] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-64 h-64 bg-indigo-600/[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
              {t('nav.contact')}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              {t('contact.heading')}
            </span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl">
            {t('contact.subheading')}
          </p>
        </motion.div>

        {/* ─── 2-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ─── Left Column: Contact method cards ─── */}
          <div className="lg:col-span-5 space-y-4">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target={method.link?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`group relative block p-5 rounded-2xl ${method.cardClass} cursor-pointer`}
              >
                {/* Animated border gradient on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(59,130,246,0.1) 50%, transparent 70%)',
                  }}
                />

                <div className="relative flex items-center gap-4">
                  <div className={`p-3 rounded-xl border ${method.iconBg} ${method.iconColor} shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    {method.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                      {method.title}
                    </p>
                    <p className="text-base font-bold text-white truncate">{method.value}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* ─── Trust badges (below contact cards) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 pt-4 pl-1"
            >
              {localizedTrustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  {badge.icon}
                  <span>{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right Column: Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            {/* Animated border gradient wrapper */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-indigo-500/20 opacity-60 pointer-events-none" />

            <div className="glass-card rounded-3xl p-6 sm:p-10 relative">
              {/* Inner subtle top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* ─── Success State ─── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center py-16 relative"
                  >
                    {/* Confetti particles */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {confettiColors.map((color, i) => (
                        <ConfettiParticle key={i} delay={i * 0.06} color={color} />
                      ))}
                      {confettiColors.map((color, i) => (
                        <ConfettiParticle key={`b-${i}`} delay={0.1 + i * 0.07} color={color} />
                      ))}
                    </div>

                    {/* Check icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                      className="relative mx-auto w-20 h-20 mb-6"
                    >
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold text-white mb-3"
                    >
                      {t('contact.form.sent_title')}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 }}
                      className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed mb-6"
                    >
                      {t('contact.form.sent_body')}
                    </motion.p>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-300 transition-all duration-300"
                    >
                      {t('contact.form.sendAnother')}
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ─── Form ─── */
                  <motion.form
                    key="form"
                    ref={formRef}
                    id="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Name & Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FloatingInput
                        label={t('contact.form.fullname')}
                        name="fullname"
                        value={formState.fullname}
                        required
                        onChange={handleChange}
                      />
                      <FloatingInput
                        label={t('contact.form.email')}
                        name="email"
                        type="email"
                        value={formState.email}
                        required
                        onChange={handleChange}
                      />
                      <FloatingInput
                        label={t('contact.form.phone')}
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        required
                        onChange={handleChange}
                      />
                      <FloatingInput
                        label={t('contact.form.company')}
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Service select */}
                    <div className="relative group">
                      <label className="absolute top-2 left-4 text-[10px] font-bold tracking-widest uppercase text-blue-400 pointer-events-none z-10">
                        {t('contact.form.service')}
                      </label>
                      <select
                        id="contact-service"
                        aria-label={t('contact.form.service')}
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 pt-6 pb-3 text-sm text-white appearance-none
                                   focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06]
                                   focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15),0_0_20px_-5px_rgba(59,130,246,0.2)]
                                   transition-all duration-300 cursor-pointer"
                      >
                        <option value="landing" className="bg-slate-900">{t('contact.form.services.landing')}</option>
                        <option value="hosting" className="bg-slate-900">{t('contact.form.services.hosting')}</option>
                        <option value="chatbot" className="bg-slate-900">{t('contact.form.services.chatbot')}</option>
                        <option value="maintenance" className="bg-slate-900">{t('contact.form.services.maintenance')}</option>
                      </select>
                      {/* Dropdown arrow */}
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Message textarea */}
                    <div className="relative group">
                      <textarea
                        id="contact-message"
                        aria-label={t('contact.form.message')}
                        name="message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setMessageFocused(true)}
                        onBlur={() => setMessageFocused(false)}
                        placeholder={t('contact.form.message')}
                        className="floating-field-input peer w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 pt-7 pb-3 text-sm text-white placeholder-transparent resize-none
                                   focus:outline-none focus:border-blue-500/60 focus:bg-white/[0.06]
                                   focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15),0_0_20px_-5px_rgba(59,130,246,0.2)]
                                   transition-all duration-300"
                      />
                      <label
                        htmlFor="contact-message"
                        className={`absolute left-4 transition-all duration-300 pointer-events-none
                          ${messageIsActive
                            ? 'top-2 text-[10px] font-bold tracking-widest uppercase text-blue-400'
                            : 'top-5 text-sm text-slate-500'
                          }`}
                      >
                        {t('contact.form.message')}
                      </label>
                      <div
                        className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-500
                          ${messageFocused ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                      />
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-xs leading-5 text-slate-400">
                      <input
                        type="checkbox"
                        checked={consentAccepted}
                        onChange={(event) => setConsentAccepted(event.target.checked)}
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 accent-blue-500"
                      />
                      <span>
                        {t('contact.form.consentPrefix')}{' '}
                        <a className="font-bold text-blue-300 underline underline-offset-2" href="/privacy-notice.html" target="_blank" rel="noreferrer">
                          {t('contact.form.privacyNotice')}
                        </a>{' '}
                        {t('contact.form.and')}{' '}
                        <a className="font-bold text-blue-300 underline underline-offset-2" href="/privacy.html" target="_blank" rel="noreferrer">
                          {t('contact.form.privacyPolicy')}
                        </a>.
                      </span>
                    </label>

                    {/* Submit button with shimmer */}
                    <button
                      type="submit"
                      disabled={isSaving || !consentAccepted}
                      className="group/btn relative w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500
                                 text-white font-bold text-sm overflow-hidden
                                 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]
                                 hover:shadow-[0_0_50px_-5px_rgba(59,130,246,0.6)]
                                 active:scale-[0.98]
                                 disabled:opacity-70 disabled:cursor-not-allowed
                                 transition-all duration-300"
                    >
                      {/* Shimmer overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                        <div
                          className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                          }}
                        />
                      </div>

                      <span className="relative flex items-center justify-center gap-2.5">
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <Send className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        )}
                        <span>{isSaving ? t('contact.form.saving') : t('contact.form.submit')}</span>
                      </span>
                    </button>

                    {/* Trust badges below form */}
                    <div className="flex items-center justify-center gap-6 pt-2">
                      {localizedTrustBadges.map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                          {badge.icon}
                          <span>{badge.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        <BookingScheduler />
      </div>
    </section>
  );
};

export default Contact;
